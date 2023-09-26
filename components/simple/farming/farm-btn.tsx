import WithWalletBtn from "../../share/with-wallet-btn";

export default function FarmBtn({ isActive }: { isActive: boolean }) {
  return (
    <WithWalletBtn isActive={isActive} onClick={() => {}}>
      Farm it
    </WithWalletBtn>
  );
}
