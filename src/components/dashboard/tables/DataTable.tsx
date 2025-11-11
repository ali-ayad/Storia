"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface HasId {
  id: string;
}

export interface Column<T extends HasId> {
  key: keyof T | string;
  label: string;
  width?: string;
  render?: (value: T[keyof T], item: T, index?: number) => React.ReactNode;
}

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T extends HasId> {
  data?: T[];
  columns: Column<T>[];
  expandableRow?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  loading?: boolean;
  pagination?: PaginationProps;
}

export default function DataTable<T extends HasId>({
  data = [],
  columns,
  expandableRow,
  emptyMessage = "No data",
  loading = false,
  pagination,
}: DataTableProps<T>) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const renderCellValue = (
    column: Column<T>,
    item: T,
    index?: number
  ): React.ReactNode => {
    const value = item[column.key as keyof T];
    return column.render
      ? column.render(value, item, index)
      : (value as React.ReactNode);
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <p className="text-center text-muted-foreground p-6">{emptyMessage}</p>
    );
  }

  return (
    <div className="pb-4">
      <ScrollArea className="w-full  h-[50vh]">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  style={{ width: column.width }}
                  className="text-left font-semibold text-muted-foreground"
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item,index) => (
              <React.Fragment key={item.id}>
                <TableRow
                  className="border-b border-border/20 hover:bg-muted/30 transition cursor-pointer"
                  onClick={() =>
                    expandableRow &&
                    setExpandedRow((prev) =>
                      prev === item.id ? null : item.id
                    )
                  }
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className="p-4">
                      {renderCellValue(column, item, index)}
                    </TableCell>
                  ))}
                </TableRow>

               {expandableRow && expandedRow === item.id && (
  <TableRow className="bg-muted/20">
    <TableCell
      colSpan={columns.length}
      className="p-4 whitespace-pre-wrap break-words align-top"
    >
      <div className="flex flex-col gap-2 w-full">
        {expandableRow(item)}
      </div>
    </TableCell>
  </TableRow>
)}

              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* ✅ Pagination Controls */}
      {pagination && (
        <Pagination>
          <PaginationContent className="mt-4">
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                aria-disabled={pagination.page <= 1}
                onClick={() =>
                  pagination.page > 1 &&
                  pagination.onPageChange(pagination.page - 1)
                }
              />
            </PaginationItem>

            <span className="mx-4 text-sm font-medium text-foreground">
              {pagination.page} of{" "}
              {Math.ceil(pagination.total / pagination.pageSize)}
            </span>

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                aria-disabled={
                  pagination.page >=
                  Math.ceil(pagination.total / pagination.pageSize)
                }
                onClick={() =>
                  pagination.page <
                    Math.ceil(pagination.total / pagination.pageSize) &&
                  pagination.onPageChange(pagination.page + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
