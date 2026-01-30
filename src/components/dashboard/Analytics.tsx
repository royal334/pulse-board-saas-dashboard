"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MoreHorizontal } from "lucide-react";

const data = [
  { name: "Sale", value: 40, color: "#5B93FF" },
  { name: "Distribute", value: 30, color: "#FFD66B" },
  { name: "Return", value: 10, color: "#FF8F6B" },
  { name: "Remaining", value: 20, color: "#F8FAFC" }, // Light gray for the empty part
];

const Analytics = () => {
  return (
    <div className="w-full h-full bg-white dark:bg-card rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-color-black dark:text-white">
          Analytics
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="relative flex-1 min-h-[200px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            {/* <Tooltip />  Optional: Add tooltip if needed */}
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-color-black dark:text-white">
            80%
          </span>
          <span className="text-sm text-gray-500">Transactions</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-4">
        {data.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
