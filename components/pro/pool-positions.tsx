import { useState } from "react";
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

export default function PoolPositions() {
  return (
    <div className="relative mt-[55px]">
      <div className="absolute top-[100px] -left-[116px] -rotate-90">
        <PanelLeaderButton className="bg-pink" defaultActive={true}>
          Positions
        </PanelLeaderButton>
      </div>

      <div
        data-state="active"
        className="c-shadow-panel h-[400px] overflow-hidden p-0"
      >
        <PositionTable />
      </div>
    </div>
  );
}

const data: Payment[] = [
  // {
  //   tokenName: "m5gr84i9",
  //   tokenLogo: "usdt",
  //   positionStatus: "success",
  //   hash: "4442321131",
  //   leverage: 5,
  //   size: 1,
  //   margin: "usdt",
  //   liqPrice: 123,
  //   pl: 15,
  //   plPercent: 0.2,
  //   isNft: true,
  // },
  // {
  //   tokenName: "m5gr84i9",
  //   tokenLogo: "sdf",
  //   positionStatus: "success",
  //   hash: "4442321131",
  //   leverage: 10,
  //   size: 1,
  //   margin: "usdt",
  //   liqPrice: 123,
  //   pl: 15,
  //   plPercent: 0.2,
  //   isNft: false,
  // },
];

export type Payment = {
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

export const columns: ColumnDef<Payment>[] = [
  {
    id: "index",
    header: () => <div className="text-sm leading-5 text-lightgray">#</div>,
    cell: ({ row }) => {
      return row.index + 1;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tokenName",
    header: () => <div className="text-sm leading-5 text-lightgray">Token</div>,
    cell: ({ row }) => <div>{row.getValue("tokenName")}</div>,
  },
  {
    accessorKey: "hash",
    header: () => <div className="text-sm leading-5 text-lightgray">Hash</div>,
    cell: ({ row }) => <div>{row.getValue("hash")}</div>,
  },
  {
    accessorKey: "leverage",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Leverage</div>
    ),
    cell: ({ row }) => <div>{row.getValue("leverage")}</div>,
  },
  {
    accessorKey: "size",
    header: () => <div className="text-sm leading-5 text-lightgray">Size</div>,
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    accessorKey: "margin",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Margin</div>
    ),
    cell: ({ row }) => <div>{row.getValue("margin")}</div>,
  },
  {
    accessorKey: "liqPrice",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Liq.Price</div>
    ),
    cell: ({ row }) => <div>{row.getValue("liqPrice")}</div>,
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
      return <MoreHorizontal className="h-4 w-4" />;
    },
  },
  {
    id: "share",
    enableHiding: false,
    cell: () => {
      return <MoreHorizontal className="h-4 w-4" />;
    },
  },
];

function PositionTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
