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
    <div
      data-state="active"
      className="c-shadow-panel mt-[55px] h-[400px] w-[774px] overflow-hidden p-0"
    >
      <BundleTable />
    </div>
  );
}

const data: IBundleRow[] = [
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

export type IBundleRow = {
  bundle: string;
  amount: number;
  date: string;
  value: number;
};

export const columns: ColumnDef<IBundleRow>[] = [
  {
    id: "index",
    header: () => <div className="text-sm leading-5 text-lightgray">#</div>,
    cell: ({ row }) => {
      return row.index + 1;
    },
    footer: () => <div>Total</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bundle",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Bundle</div>
    ),
    cell: ({ row }) => <div>{row.getValue("bundle")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Amount</div>
    ),
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-sm leading-5 text-lightgray">Date</div>,
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    accessorKey: "value",
    header: () => <div className="text-sm leading-5 text-lightgray">Value</div>,
    cell: ({ row }) => <div>{row.getValue("value")}</div>,
  },
];

function BundleTable() {
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
                No Results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
