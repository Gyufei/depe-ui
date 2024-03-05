import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import PanelLeaderButton from "../share/panel-leader-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";
import Empty from "../share/empty";

export default function PoolPositions() {
  return (
    <div className="relative md:w-full">
      <div className="md:absolute md:top-[100px] md:-left-[116px] md:-rotate-90">
        <PanelLeaderButton className="bg-pink" defaultActive={true}>
          Positions
        </PanelLeaderButton>
      </div>

      <div
        data-state="active"
        className="c-shadow-panel -mt-2 h-[400px] overflow-hidden p-0"
      >
        <PositionTable />
      </div>
    </div>
  );
}

const data: IPositionRow[] = [
  {
    tokenName: "WIF",
    tokenLogo: "https://cdn.depe.app",
    positionStatus: "Closed",
    hash: "4442321131",
    leverage: 5,
    size: 1,
    margin: "usdt",
    liqPrice: 123,
    pl: 15,
    plPercent: 0.2,
    isNft: true,
  },
  {
    tokenName: "ZIT",
    tokenLogo: "https://cdn.depe.app",
    positionStatus: "Safe",
    hash: "4442321131",
    leverage: 10,
    size: 1,
    margin: "usdt",
    liqPrice: 123,
    pl: 15,
    plPercent: 0.2,
    isNft: false,
  },
  {
    tokenName: "SAO",
    tokenLogo: "https://cdn.depe.app",
    positionStatus: "Risky",
    hash: "4442321131",
    leverage: 10,
    size: 1,
    margin: "usdt",
    liqPrice: 123,
    pl: 15,
    plPercent: 0.2,
    isNft: false,
  },
  {
    tokenName: "WIF",
    tokenLogo: "https://cdn.depe.app",
    positionStatus: "Moderate",
    hash: "4442321131",
    leverage: 10,
    size: 1,
    margin: "usdt",
    liqPrice: 123,
    pl: 15,
    plPercent: 0.2,
    isNft: false,
  },
];

export type IPositionRow = {
  tokenName: string;
  tokenLogo: string;
  positionStatus: string;
  hash: string;
  leverage: number;
  size: number;
  margin: string;
  liqPrice: number;
  pl: number;
  plPercent: number;
  isNft: boolean;
};

export const columns: ColumnDef<IPositionRow>[] = [
  {
    id: "index",
    header: () => <div className="text-sm leading-5 text-lightgray">#</div>,
    cell: ({ row }) => {
      return (
        <div className="text-base leading-6 text-black">{row.index + 1}</div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tokenName",
    header: () => <div className="text-sm leading-5 text-lightgray">Token</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Image
            src={row.original.tokenLogo}
            width={24}
            height={24}
            alt="token"
            className="c-image-shadow"
          />
          <div className="ml-3 flex flex-col">
            <span className="text-base leading-6 text-black">
              {row.getValue("tokenName")}
            </span>
            <PositionStatusTag status={row.original.positionStatus} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "hash",
    header: () => <div className="text-sm leading-5 text-lightgray">Hash</div>,
    cell: ({ row }) => {
      const hash = row.getValue("hash") as string;
      const isNft = row.original.isNft;
      return (
        <div className="flex items-center space-x-1 text-base text-black">
          <div>{hash.slice(0, 5) + "..." + hash.slice(-3)}</div>
          {isNft && (
            <Image
              width={16}
              height={16}
              src="/icons/nft-flag.svg"
              alt="is-nft"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "leverage",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Leverage</div>
    ),
    cell: ({ row }) => (
      <div className="pl-10 text-base text-black">
        {row.getValue("leverage")}×
      </div>
    ),
    size: 60,
  },
  {
    accessorKey: "size",
    header: () => <div className="text-sm leading-5 text-lightgray">Size</div>,
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    accessorKey: "margin",
    header: () => (
      <div className="flex items-center space-x-1">
        <div className="text-sm leading-5 text-lightgray">Margin</div>
        <Image
          width={16}
          height={16}
          src="/icons/solana.svg"
          alt="margin coin"
        />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("margin")}</div>,
  },
  {
    accessorKey: "liqPrice",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Liq.Price</div>
    ),
    cell: ({ row }) => <div>${row.getValue("liqPrice")}</div>,
  },
  {
    accessorKey: "pl",
    header: () => <div className="text-sm leading-5 text-lightgray">P/L</div>,
    cell: ({ row }) => <div>{row.getValue("liqPrice")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return <MoreHorizontal className="h-4 w-4 rotate-90 cursor-pointer" />;
    },
  },
  {
    id: "share",
    enableHiding: false,
    cell: () => {
      return (
        <Image
          src="/icons/share.svg"
          width={16}
          height={16}
          alt="share"
          className="cursor-pointer"
        />
      );
    },
  },
];

function PositionTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    index: false,
    tokenName: false,
    hash: false,
    leverage: false,
    size: false,
    margin: false,
    liqPrice: true,
    pl: true,
    actions: true,
    share: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isDesktop) {
      setColumnVisibility({
        index: false,
        tokenName: false,
        hash: false,
        leverage: false,
        size: false,
        margin: false,
        liqPrice: true,
        pl: true,
        actions: true,
        share: false,
      });
    } else {
      setColumnVisibility({
        index: true,
        tokenName: true,
        hash: true,
        leverage: true,
        size: true,
        margin: true,
        liqPrice: true,
        pl: true,
        actions: true,
        share: true,
      });
    }
  }, [isDesktop]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="mt-3 w-full">
      <Table>
        <TableHeader className="h-[48px] bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="border-none" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white leading-6 text-black">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-none"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Empty />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function PositionStatusTag({ status }: { status: string }) {
  return (
    <div
      data-state={status}
      className="rounded px-1 text-xs 
      data-[state='Closed']:bg-[#F8F8F8] 
      data-[state='Safe']:bg-[#E9F7F1] 
      data-[state='Risky']:bg-[#FDEFEF] 
      data-[state='Moderate']:bg-[#FDF0EA] 
      data-[state='Safe']:text-[#2DB079] 
      data-[state='Risky']:text-[#F16464] 
      data-[state='Moderate']:text-[#EF814E] 
      data-[state='Closed']:text-[#9A96AD]
      "
    >
      {status}
    </div>
  );
}
