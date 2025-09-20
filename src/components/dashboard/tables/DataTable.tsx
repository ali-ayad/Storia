"use client"

import { FC, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"

export interface Column<T> {
  key: keyof T | string
  label: string
  render?: (value: any, item: T) => ReactNode
  sortable?: boolean
  width?: string
}

export interface Action<T> {
  label: string
  icon?: ReactNode
  onClick: (item: T) => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onView?: (item: T) => void
  loading?: boolean
  emptyMessage?: string
  className?: string
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  onEdit,
  onDelete,
  onView,
  loading = false,
  emptyMessage = "No data available",
  className = ""
}: DataTableProps<T>) => {
  const defaultActions: Action<T>[] = []

  if (onView) {
    defaultActions.push({
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: onView,
      variant: "ghost"
    })
  }

  if (onEdit) {
    defaultActions.push({
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: onEdit,
      variant: "ghost"
    })
  }

  if (onDelete) {
    defaultActions.push({
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onDelete,
      variant: "ghost"
    })
  }

  const allActions = [...defaultActions, ...actions]

  const renderCellValue = (column: Column<T>, item: T) => {
    const value = typeof column.key === "string" 
      ? column.key.split('.').reduce((obj, key) => obj?.[key], item)
      : item[column.key]

    if (column.render) {
      return column.render(value, item)
    }

    // Default rendering based on value type
    if (typeof value === "boolean") {
      return value ? "Yes" : "No"
    }

    if (typeof value === "number") {
      return value.toLocaleString()
    }

    if (typeof value === "string" && value.length > 50) {
      return (
        <span title={value}>
          {value.substring(0, 50)}...
        </span>
      )
    }

    return value || "-"
  }

  if (loading) {
    return (
      <div className="bg-card border border-border/20 rounded-lg">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-card border border-border/20 rounded-lg">
        <div className="p-12 text-center">
          <div className="text-muted-foreground text-lg mb-2">📊</div>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-card border border-border/20 rounded-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border/20">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left p-4 font-medium text-muted-foreground"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
              {allActions.length > 0 && (
                <th className="text-left p-4 font-medium text-muted-foreground w-32">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-border/10 hover:bg-muted/30 transition-colors"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-4">
                    {renderCellValue(column, item)}
                  </td>
                ))}
                {allActions.length > 0 && (
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {allActions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant || "ghost"}
                          size="sm"
                          onClick={() => action.onClick(item)}
                          className={action.variant === "destructive" ? "text-destructive hover:text-destructive" : ""}
                          title={action.label}
                        >
                          {action.icon}
                        </Button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
