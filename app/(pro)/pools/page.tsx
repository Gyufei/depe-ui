"use client";

import Image from "next/image";

import { usePools } from "@/lib/hooks/api/use-pools";
import PoolPanel from "@/components/pro/pool-panel";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectIcon,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePoolsFilter } from "@/lib/hooks/use-pools-filter";
import Triangle from "/public/icons/triangle.svg";
import { cn } from "@/lib/utils/common";
import DialogGimp from "@/components/share/dialog-gimp";
import CreatePoolDialogContent from "@/components/pro/create-pool-dialog-content";
import { useState } from "react";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

export default function Pools() {
  const { data: pools, isLoading } = usePools();

  const {
    sortFields,
    sortBy,
    filterLeverage,
    setFilterLeverage,
    filterLeverageFields,
    expiration,
    setExpiration,
    expirationFields,
    setSortBy,
    filteredPools,
    recordPoolAPY,
  } = usePoolsFilter(pools);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <CreatePoolBtn />
        <div className="mt-2 flex items-center py-4 md:mt-0 md:p-0">
          <CustomSelect
            label="Order by"
            value={sortBy}
            options={sortFields}
            onChange={setSortBy}
            className="mr-6"
            isActive={sortBy !== sortFields[0].value}
          />
          <CustomSelect
            label="Leverage"
            value={filterLeverage}
            options={filterLeverageFields}
            onChange={setFilterLeverage}
            className="mr-6"
            isActive={filterLeverage !== filterLeverageFields[0].value}
          />
          <CustomSelect
            label="Expiration"
            value={expiration}
            options={expirationFields}
            onChange={setExpiration}
            isActive={expiration !== expirationFields[0].value}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-[55px]">
        {filteredPools.length !== 0 &&
          filteredPools.map((pool) => (
            <PoolPanel
              key={pool.poolId}
              pool={pool}
              isLoading={isLoading}
              recordAPY={recordPoolAPY}
            />
          ))}
      </div>
    </div>
  );
}

function CustomSelect({
  value,
  onChange,
  label,
  options,
  className,
  placeholder,
  isActive,
}: {
  value: string;
  label: string;
  onChange: (_v: string) => void;
  options: Array<{
    label: string;
    value: any;
    hide?: boolean;
  }>;
  className?: string;
  placeholder?: string;
  isActive: boolean;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const currLabel = options.find((o) => o.value === value)?.label;

  const [mobileDialog, setMobileDialog] = useState(false);

  const handleDialogSelect = (v: string) => {
    onChange(v);
    setMobileDialog(false);
  };

  if (isDesktop) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          data-active={isActive}
          className={cn(
            "h-[32px] rounded-full border border-black bg-white px-4 hover:border-black hover:bg-white data-[active=true]:border-black data-[active=true]:bg-white data-[active=true]:shadow-2 md:border-transparent md:bg-transparent",
            className,
          )}
        >
          <div className="flex items-center gap-x-1 md:gap-x-2">
            <span className="c-font-title-55 whitespace-nowrap text-xs leading-[18px] text-black md:text-lightgray">
              {label}
            </span>
            <SelectValue placeholder={placeholder || ""}>
              <span className="c-font-text-65 hidden whitespace-nowrap text-xs leading-[18px] text-[#11142d] md:block">
                {currLabel}
              </span>
            </SelectValue>
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
          {options
            .filter((field) => !field.hide)
            .map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Dialog
      open={mobileDialog}
      onOpenChange={(o: boolean) => setMobileDialog(o)}
    >
      <DialogTrigger
        className={cn(
          "h-[32px] rounded-full border border-black bg-white px-4 hover:border-black hover:bg-white data-[active=true]:border-black data-[active=true]:bg-white data-[active=true]:shadow-2 md:border-transparent md:bg-transparent",
          className,
        )}
        asChild
      >
        <div className="flex items-center gap-x-1 md:gap-x-2">
          <span className="c-font-title-55 whitespace-nowrap text-xs leading-[18px] text-black md:text-lightgray">
            {label}
          </span>
          <span className="c-font-text-65 hidden whitespace-nowrap text-xs leading-[18px] text-[#11142d] md:block">
            {currLabel}
          </span>
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
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-52px)] p-2" showClose={false}>
        <div className="flex flex-col">
          {options
            .filter((field) => !field.hide)
            .map((f) => (
              <div
                data-active={value === f.value ? true : false}
                className="flex h-14 items-center justify-between pl-4 pr-2 data-[active=true]:bg-[#f5f6f7]"
                key={f.value}
                onClick={() => handleDialogSelect(f.value)}
              >
                <div className="leading-5 text-black">{f.label}</div>
                {value === f.value && <CircleFlag />}
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CreatePoolBtn() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <button className="c-shadow-translate c-font-text-65 flex w-fit items-center justify-center  rounded-xl border-2 border-black bg-white py-3 px-9 leading-6 shadow-25">
          Create Pool
        </button>
      </DialogTrigger>
      <DialogContent className="w-[400px] p-0 pb-6 md:w-[400px]">
        <DialogGimp />
        <DialogTitle className="px-6 pt-6">Create Pool</DialogTitle>
        <CreatePoolDialogContent />
      </DialogContent>
    </Dialog>;
  }

  return (
    <Drawer open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DrawerTrigger asChild>
        <button className="c-shadow-translate c-font-text-65 flex w-fit items-center justify-center  rounded-xl border-2 border-black bg-white py-3 px-9 leading-6 shadow-25">
          Create Pool
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-full">
        <DrawerTitle>Create Pool</DrawerTitle>
        <CreatePoolDialogContent />
      </DrawerContent>
    </Drawer>
  );
}

function CircleFlag() {
  return (
    <div className="h-3 w-3 rounded-full border-2 border-black bg-yellow"></div>
  );
}
