import { useAtomValue } from "jotai";
import { useContractWrite } from "wagmi";
import { encodeAbiParameters, parseUnits } from "viem";

import {
  SBaseTokenAmountAtom,
  SBaseTokenAtom,
  SLeverageAtom,
  SMintNftFlagAtom,
  SPoolAtom,
  SQuoteTokenAmountAtom,
  SQuoteTokenAtom,
} from "@/lib/states/swap";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { DepePositionManagerABI } from "@/lib/abi/DepePositionManager";
import { encodePath } from "@/lib/web3/utils";

export function useSwap() {
  const { chainConfig } = useChainConfig();

  const pool = useAtomValue(SPoolAtom);
  const baseToken = useAtomValue(SBaseTokenAtom);
  const quoteToken = useAtomValue(SQuoteTokenAtom);
  const baseTokenAmount = useAtomValue(SBaseTokenAmountAtom);
  const quoteTokenAmount = useAtomValue(SQuoteTokenAmountAtom);
  const leverage = useAtomValue(SLeverageAtom);
  const mintNFTFlag = useAtomValue(SMintNftFlagAtom);

  const positionManagerAddress = chainConfig?.contract?.DepePositionManager;

  const {
    // data: swapResult,
    isLoading: isSwapLoading,
    isSuccess: isSwapSuccess,
    isError: isSwapError,
    error: swapError,
    write: swapAction,
  } = useContractWrite({
    address: positionManagerAddress,
    abi: DepePositionManagerABI,
    functionName: "openPosition",
  });

  const handleSwap = () => {
    if (
      !pool ||
      !baseToken ||
      !quoteToken ||
      !baseTokenAmount ||
      !quoteTokenAmount ||
      !leverage
    )
      return;

    const path = [quoteToken?.address, baseToken?.address];
    const fees = [500];
    const ePath = encodePath(path, fees);
    const abiEncodedPath = encodeAbiParameters(
      [
        {
          name: "extendedParamsBytes",
          type: "bytes",
        },
      ],
      [ePath],
    );

    const baseAmount = parseUnits(baseTokenAmount, baseToken.decimals);
    const quoteAmount = parseUnits(quoteTokenAmount, quoteToken?.decimals);

    const TxArgs = [
      pool.poolAddr,
      chainConfig?.contract?.UniswapV3Router,
      quoteAmount,
      BigInt(leverage) * 100n,
      baseAmount,
      abiEncodedPath,
      mintNFTFlag,
    ];

    swapAction({
      args: TxArgs as any,
    });
  };

  return {
    isSwapLoading,
    isSwapSuccess,
    swapError,
    isSwapError,
    handleSwap,
  };
}
