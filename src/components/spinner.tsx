"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-[2.5px]",
    md: "w-7 h-7 border-[3px]",
    lg: "w-10 h-10 border-[4px]",
  }[size];

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-muted-foreground/30 border-t-primary",
        sizeClasses,
        className
      )}
    />
  );
};

export default Spinner;
