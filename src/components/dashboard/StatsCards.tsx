"use client"

import { FC, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCard {
  title: string
  value: string | number
  icon: ReactNode
  change?: {
    value: number
    type: "increase" | "decrease"
  }
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
}

interface StatsCardsProps {
  stats: StatCard[]
  className?: string
}

const StatsCards: FC<StatsCardsProps> = ({ stats, className = "" }) => {
  const getTrendIcon = (type: "increase" | "decrease") => {
    return type === "increase" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getTrendColor = (type: "increase" | "decrease") => {
    return type === "increase" ? "text-green-500" : "text-red-500"
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border border-border/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </p>
              {stat.change && (
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(stat.change.type)}
                  <span className={`text-sm ${getTrendColor(stat.change.type)}`}>
                    {stat.change.value > 0 ? "+" : ""}{stat.change.value}%
                  </span>
                </div>
              )}
              {stat.badge && (
                <Badge variant={stat.badge.variant || "secondary"} className="mt-2">
                  {stat.badge.text}
                </Badge>
              )}
            </div>
            <div className="text-2xl opacity-80">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
