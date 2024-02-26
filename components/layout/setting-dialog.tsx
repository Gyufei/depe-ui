import { useState } from "react";
import Image from "next/image";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

import { useMediaQuery } from "@/lib/hooks/common/use-media-query";
import DialogGimp from "../share/dialog-gimp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Triangle from "/public/icons/triangle.svg";

import {
  Select,
  SelectIcon,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyList, TzList } from "@/lib/constant";

export default function Setting({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (_isOpen: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
        <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
          <DialogGimp />
          <DialogTitle className="px-6 pt-6">Settings</DialogTitle>
          <SettingContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <DrawerContent>
        <DrawerTitle>Select Pool</DrawerTitle>
        <SettingContent />
      </DrawerContent>
    </Drawer>
  );
}

function SettingContent() {
  const [rpc, setRpc] = useState<string>();
  const [rpcCheck, setRpcCheck] = useState<string>();
  const [inputRpc, setInputRpc] = useState<string>();
  const [inputError, setInputError] = useState(false);
  console.log(rpc);

  const [tz, setTz] = useState<string>();
  const [currency, setCurrency] = useState<string>();

  const handleCheck = (v: string) => {
    setRpcCheck(v);
    if (v !== "custom") {
      setRpc(v);
    }
  };

  const handleInput = (iV: string) => {
    setInputRpc(iV);
    if (!iV.startsWith("http")) {
      setInputError(true);
    }
  };

  const handleSave = () => {
    if (inputError || !inputRpc) return;
    setRpc(inputRpc);
  };

  return (
    <div className="flex flex-col px-0 md:px-6">
      <div className="mt-2 mb-4 flex items-center justify-between md:mt-0">
        <div className="text-sm text-gray">RPC Endpoint</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray">Tutorial</span>
          <Image
            src="/icons/arrow-right-gray.svg"
            width={20}
            height={20}
            alt="arrow"
          />
        </div>
      </div>

      <RadioGroup
        value={rpcCheck}
        onValueChange={handleCheck}
        className="gap-5 text-black"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rpc1" id="r1" />
            <Label htmlFor="r1">Triton RPC Pool 1</Label>
          </div>
          <Ms type="normal" value={23} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rpc2" id="r2" />
            <Label htmlFor="r2">Triton RPC Pool 2</Label>
          </div>
          <Ms type="delay" value={103} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rpc3" id="r3" />
            <Label htmlFor="r3">Triton RPC Pool 2</Label>
          </div>
          <Ms type="error" value={999} />
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="r3" />
          <Label htmlFor="r3">Custom</Label>
        </div>
      </RadioGroup>

      <div className="relative mt-5">
        <Input
          value={inputRpc || ""}
          onChange={(e) => handleInput(e.target.value)}
          data-state={inputError ? "error" : "normal"}
          className="h-14 rounded-xl border-2 data-[state=normal]:border-black data-[state=error]:border-red"
          type="text"
          placeholder="https://"
        />
        {inputError && (
          <div className="mt-2 ml-1 text-xs text-red">
            Unsupported RPC Endpoint for Solana Mainnet/Testnet
          </div>
        )}
        <button
          disabled={inputError || !inputRpc}
          className="absolute right-2 top-[6px] rounded-xl bg-black px-[22px] py-[10px] text-base font-semibold text-yellow disabled:bg-lightgray disabled:text-white"
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>

      <div className="my-5 border-b-[1px] border-dashed border-b-[#d8d8d8]"></div>

      <div className="mb-2 text-sm leading-5 text-gray">Time Zone</div>
      <Select value={tz} onValueChange={setTz}>
        <SelectTrigger className="h-14 rounded-xl border border-black bg-white px-4">
          <div className="flex w-full items-center justify-between gap-x-1 md:gap-x-2">
            <SelectValue placeholder="time zone" />
            <SelectIcon asChild>
              <Image
                width={8}
                height={4}
                src={Triangle}
                alt="triangle"
                className="data-[state=open]:rotate-180"
              ></Image>
            </SelectIcon>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white">
          {TzList.map((field) => (
            <SelectItem className="h-12" key={field.value} value={field.value}>
              {field.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mb-2 mt-4 text-sm leading-5 text-gray">Currency</div>
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="h-14 rounded-xl border border-black bg-white px-4">
          <div className="flex w-full items-center justify-between gap-x-1 md:gap-x-2">
            <SelectValue placeholder="time zone" />
            <SelectIcon asChild>
              <Image
                width={8}
                height={4}
                src={Triangle}
                alt="triangle"
                className="data-[state=open]:rotate-180"
              ></Image>
            </SelectIcon>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white">
          {CurrencyList.map((field) => (
            <SelectItem className="h-12" key={field.value} value={field.value}>
              {field.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Ms({
  type,
  value,
}: {
  type: "normal" | "delay" | "error";
  value: number;
}) {
  return (
    <div className="flex items-center space-x-[6px]">
      <div
        data-type={type}
        className="h-2 w-2 rounded-full data-[type=normal]:bg-green data-[type=delay]:bg-tan data-[type=error]:bg-red"
      ></div>
      <div
        data-type={type}
        className="left-5 text-sm data-[type=normal]:text-green data-[type=delay]:text-tan data-[type=error]:text-red"
      >
        {value}ms
      </div>
    </div>
  );
}
