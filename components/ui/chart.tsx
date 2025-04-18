"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: any
}

const chartColors = {
  revenue: "hsl(var(--chart-1))",
  expenses: "hsl(var(--chart-2))",
  profit: "hsl(var(--chart-3))",
}

export function ChartContainer({ className, config, children }: ChartContainerProps) {
  return <div className={cn("rounded-md border bg-card p-4 shadow-sm", className)}>{children}</div>
}

export function ChartTooltip({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-md border bg-popover p-4 text-popover-foreground shadow-sm", className)} {...props} />
  )
}

export function ChartTooltipContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      <p className="text-sm font-medium capitalize">Revenue</p>
      <p className="text-sm text-muted-foreground">Value</p>
    </div>
  )
}
