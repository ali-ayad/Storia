import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data?: T[]; // ✅ optional to avoid runtime crash before data loads
  columns: Column<T>[];
  allActions?: {
    label: string;
    icon: React.ReactNode;
    variant?: "ghost" | "destructive";
    onClick: (item: T) => void;
  }[];
  expandableRow?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export default function DataTable<T>({
  data = [], // ✅ default empty array
  columns,
  allActions = [],
  expandableRow,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  const [expandedRow, setExpandedRow] = useState<null | number>(null);

  const renderCellValue = (column: Column<T>, item: T): React.ReactNode => {
    const value = item[column.key];
    return column.render ? column.render(value, item) : (value as React.ReactNode);
  };

  // ✅ Handle empty state gracefully
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead className="bg-muted/50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="text-left p-4 font-semibold text-muted-foreground"
              style={{ width: column.width }}
            >
              {column.label}
            </th>
          ))}
          {allActions.length > 0 && (
            <th className="text-left p-4 font-semibold text-muted-foreground w-32">
              Actions
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {data.map((item, rowIndex) => (
          <React.Fragment key={(item as any).id ?? rowIndex}>
            <tr className="border-b border-border/20 hover:bg-muted/30 transition-colors">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-4">
                  {column.key === "title" && expandableRow ? (
                    <button
                      className="font-medium text-left hover:text-primary transition-colors"
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === rowIndex ? null : rowIndex
                        )
                      }
                    >
                      {renderCellValue(column, item)}
                    </button>
                  ) : (
                    renderCellValue(column, item)
                  )}
                </td>
              ))}

              {allActions.length > 0 && (
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {allActions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.variant || "ghost"}
                        size="sm"
                        onClick={() => action.onClick(item)}
                        title={action.label}
                        className={
                          action.variant === "destructive"
                            ? "text-destructive hover:text-destructive"
                            : ""
                        }
                      >
                        {action.icon}
                      </Button>
                    ))}
                  </div>
                </td>
              )}
            </tr>

            {expandableRow && expandedRow === rowIndex && (
              <tr className="bg-muted/20">
                <td
                  colSpan={columns.length + (allActions.length > 0 ? 1 : 0)}
                  className="p-4"
                >
                  {expandableRow(item)}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
