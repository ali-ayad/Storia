"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// 💾 Fake but smooth data
const data = [
  { date: "Jan", stories: 10, authors: 6 },
  { date: "Feb", stories: 14, authors: 9 },
  { date: "Mar", stories: 18, authors: 11 },
  { date: "Apr", stories: 23, authors: 14 },
  { date: "May", stories: 28, authors: 16 },
  { date: "Jun", stories: 35, authors: 20 },
  { date: "Jul", stories: 40, authors: 23 },
];

// 🎨 Define chart colors here (independent from theme)
const chartColors = {
  stories: "#00C6FF", // cyan-blue
  authors: "#FF8C00", // warm amber-orange
  grid: "rgba(255, 255, 255, 0.15)",
  text: "rgba(255, 255, 255, 0.8)",
  background: "#0A0A0A",
};

export function ChartAreaDefault() {
  return (
    <Card
      className="bg-card border-border/30 shadow-sm"
     
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Stories & Authors Overview
        </CardTitle>
        <CardDescription className="text-gray-400">
          A monthly comparison of growth between stories and authors.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={{
            stories: { label: "Stories", color: chartColors.stories },
            authors: { label: "Authors", color: chartColors.authors },
          }}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={data}>
            {/* ✨ Gradient areas */}
            <defs>
              <linearGradient id="fillStories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.stories} stopOpacity={0.7} />
                <stop offset="95%" stopColor={chartColors.stories} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillAuthors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.authors} stopOpacity={0.7} />
                <stop offset="95%" stopColor={chartColors.authors} stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke={chartColors.grid}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: chartColors.text }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(v) => v}
                  style={{
                    backgroundColor: "#111",
                    borderColor: "#222",
                    color: "#fff",
                  }}
                />
              }
            />

            <Area
              dataKey="stories"
              type="monotone"
              fill="url(#fillStories)"
              stroke={chartColors.stories}
              strokeWidth={2.5}
            />
            <Area
              dataKey="authors"
              type="monotone"
              fill="url(#fillAuthors)"
              stroke={chartColors.authors}
              strokeWidth={2.5}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
