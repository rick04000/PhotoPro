"use client"

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RevenueChartProps {
  extended?: boolean
}

// Create more representative mock data
const data = [
  { name: "Jan", revenue: 2500, expenses: 1500, profit: 1000 },
  { name: "Feb", revenue: 3500, expenses: 1700, profit: 1800 },
  { name: "Mar", revenue: 4200, expenses: 2100, profit: 2100 },
  { name: "Apr", revenue: 3800, expenses: 1900, profit: 1900 },
  { name: "May", revenue: 5000, expenses: 2300, profit: 2700 },
  { name: "Jun", revenue: 5500, expenses: 2500, profit: 3000 },
  { name: "Jul", revenue: 6200, expenses: 2800, profit: 3400 },
  { name: "Aug", revenue: 7000, expenses: 3100, profit: 3900 },
  { name: "Sep", revenue: 6500, expenses: 2900, profit: 3600 },
  { name: "Oct", revenue: 5800, expenses: 2600, profit: 3200 },
  { name: "Nov", revenue: 6800, expenses: 3000, profit: 3800 },
  { name: "Dec", revenue: 8500, expenses: 3500, profit: 5000 },
]

export function RevenueChart({ extended = false }: RevenueChartProps) {
  if (extended) {
    return (
      <div className="space-y-8">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              expenses: {
                label: "Expenses",
                color: "hsl(var(--chart-2))",
              },
              profit: {
                label: "Profit",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="h-[300px]">
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              expenses: {
                label: "Expenses",
                color: "hsl(var(--chart-2))",
              },
              profit: {
                label: "Profit",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="var(--color-revenue)"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="expenses" name="Expenses" stroke="var(--color-expenses)" />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="var(--color-profit)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[200px]">
      <ChartContainer
        config={{
          revenue: {
            label: "Revenue",
            color: "hsl(var(--chart-1))",
          },
          profit: {
            label: "Profit",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" name="Profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
