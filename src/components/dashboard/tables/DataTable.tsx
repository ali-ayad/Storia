"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import React, { useState } from "react";

export interface HasId {
  id: string;
}

export interface Column<T extends HasId> {
  key: keyof T | string;
  label: string;
  width?: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
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

  const renderCellValue = (column: Column<T>, item: T): React.ReactNode => {
    const value = item[column.key as keyof T];
    return column.render ? column.render(value, item) : (value as React.ReactNode);
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
      <p className="text-center text-muted-foreground p-6">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="pb-4">
      <table className="w-full border-collapse ">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="text-left p-4 font-semibold text-muted-foreground"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="border-b border-border/20 hover:bg-muted/30 transition">
                {columns.map((column) => (
                  <td key={String(column.key)} className="p-4">
                    {renderCellValue(column, item)}
                  </td>
                ))}
              </tr>

              {expandableRow && expandedRow === item.id && (
                <tr className="bg-muted/20">
                  <td colSpan={columns.length} className="p-4">
                    {expandableRow(item)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
    {pagination && (
  <Pagination>
    <PaginationContent className="mt-4">
      
      {/* Previous */}
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

      {/* Page Indicator */}
      <span className="mx-4 text-sm font-medium text-foreground">
         {pagination.page} of{" "}
        {Math.ceil(pagination.total / pagination.pageSize)}
      </span>

      {/* Next */}
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
