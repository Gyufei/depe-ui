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
      <div className="flex items-center justify-between">
        <CreatePoolBtn />
        <div className="flex items-center">
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
  const currLabel = options.find((o) => o.value === value)?.label;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        data-active={isActive}
        className={cn(
          "h-[32px] rounded-full border border-transparent px-4 hover:border-black hover:bg-white data-[active=true]:border-black data-[active=true]:bg-white data-[active=true]:shadow-2",
          className,
        )}
      >
        <div className="flex items-center gap-x-2">
          <span className="c-font-title-55 whitespace-nowrap text-xs leading-[18px] text-lightgray">
            {label}
          </span>
          <SelectValue placeholder={placeholder || ""}>
            <span className="c-font-text-65 whitespace-nowrap text-xs leading-[18px] text-[#11142d]">
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

function CreatePoolBtn() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
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
    </Dialog>
  );
}
