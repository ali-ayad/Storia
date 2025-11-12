"use client";

import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChartAreaDefault } from "@/components/ChartArea";

const MainContent: FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Track your stories, authors, and publication progress.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { title: "Total Stories", value: "24", change: "+3 this week", icon: "📖" },
          { title: "Total Authors", value: "12", change: "+1 this week", icon: "✍️" },
          { title: "Published", value: "18", change: "75% published", icon: "✅" },
        ].map((item, i) => (
          <Card
            key={i}
            className="relative overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm transition hover:shadow-md hover:border-border/60"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />

            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-muted-foreground">
                {item.title}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold text-foreground">
                {item.value}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <Badge
                variant={i === 2 ? "default" : "secondary"}
                className="text-xs font-medium px-2 py-0.5"
              >
                {item.change}
              </Badge>
              <div className="text-xl opacity-80">{item.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <ChartAreaDefault />
    </div>
  );
};

export default MainContent;
