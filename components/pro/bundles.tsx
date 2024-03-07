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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/lib/hooks/common/use-media-query";

export default function PoolPositions() {
  return (
    <div
      data-state="active"
      className="c-shadow-panel mt-[55px] h-[400px] w-[calc(100w-52px)] overflow-hidden p-0 md:w-[774px]"
    >
      <BundleTable />
    </div>
  );
}

const data: IBundleRow[] = [
  {
    bundle: "1",
    amount: 200,
    date: "2010-01-02",
    value: 33,
  },
  {
    bundle: "2",
    amount: 201,
    date: "2011-01-02",
    value: 34,
  },
  {
    bundle: "3",
    amount: 400,
    date: "2010-01-12",
    value: 38,
  },
];

export type IBundleRow = {
  bundle: string;
  amount: number;
  date: string;
  value: number;
};

export const columns: ColumnDef<IBundleRow>[] = [
  {
    accessorKey: "bundle",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Bundle</div>
    ),
    cell: ({ row }) => (
      <div className="text-base leading-6 text-black">
        #{row.getValue("bundle")}
      </div>
    ),
    footer: () => (
      <div className="pl-4 text-left text-lg font-normal leading-7 text-black">
        Total
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="text-sm leading-5 text-lightgray">Amount</div>
    ),
    cell: ({ row }) => (
      <div className="text-base leading-6 text-black">
        {row.getValue("amount")}
      </div>
    ),
    footer: () => (
      <div className="pl-4 text-left text-lg font-normal leading-7 text-black">
        1856
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <div className="text-sm leading-5 text-lightgray">Date</div>,
    cell: ({ row }) => (
      <div className="text-base leading-6 text-black">
        {row.getValue("value")}
      </div>
    ),
    footer: () => (
      <div className="pl-4 text-left text-lg font-normal leading-7 text-black">
        -
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: () => <div className="text-sm leading-5 text-lightgray">Value</div>,
    cell: ({ row }) => <div>{row.getValue("value")}</div>,
    footer: (res) => {
      console.log(res);
      // const value = data.reduce((total, row) => total + row.value, 0);
      return (
        <div className="pl-4 text-left text-lg font-normal leading-7 text-green">
          ${}
        </div>
      );
    },
  },
];

function BundleTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    index: false,
    bundle: true,
    amount: true,
    date: true,
    value: true,
  });
  const [rowSelection, setRowSelection] = useState({});

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isDesktop) {
      setColumnVisibility({
        index: false,
        bundle: true,
        amount: true,
        date: true,
        value: true,
      });
    } else {
      setColumnVisibility({
        index: true,
        bundle: true,
        amount: true,
        date: true,
        value: true,
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
            <TableRow className="border-none px-1" key={headerGroup.id}>
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
                  <TableCell className="py-6" key={cell.id}>
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
        <tfoot className="before:absolute before:h-1 before:border-t before:border-dashed before:border-lightgray before:w-[calc(100%-40px)] before:left-4 before:content-['']">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="py-5">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
    </div>
  );
}
