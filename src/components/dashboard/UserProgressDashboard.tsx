"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserProgressDashboard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const getChartData = async () => {
    try {
      const res = await fetch("/api/charts", { method: "GET" });
      const data = await res.json();
      setData(data.data);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <Card className="rounded-2xl bg-white/50 shadow-lg p-2">
      <CardHeader className="pl-6">
        <CardTitle className="text-lg font-medium">
          Total Questions Answered:
        </CardTitle>
        <div className="text-3xl font-bold ml-2">{total.toLocaleString()}<span className="text-sm font-medium"> upto 1 month.</span></div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              axisLine={true}
              tickLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              axisLine={true}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: "12px",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value) => [`${value}`, "Questions Answered"]}
              labelStyle={{ color: "#111827" }}
              itemStyle={{ color: "#16a34a" }}
            />
            <Bar
              dataKey="count"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
