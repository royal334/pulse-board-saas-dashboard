"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "10am", value: 55 },
  { time: "11am", value: 30 },
  { time: "12am", value: 58 },
  { time: "01am", value: 38 },
  { time: "02am", value: 24 },
  { time: "03am", value: 50 },
  { time: "04am", value: 15 },
  { time: "05am", value: 35 },
  { time: "06am", value: 65 },
  { time: "07am", value: 80 },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F172A] p-3 rounded-lg shadow-xl border border-slate-800 text-center relative pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-[#0F172A]">
        <p className="text-slate-400 text-xs mb-1">Sales</p>
        <p className="text-white text-xl font-bold">
          {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function ReportChart() {
  return (
    <div className="w-full h-[350px] p-6 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Reports</h2>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <span className="text-2xl leading-none px-2 pb-2">...</span>
        </button>
      </div>

      <div className="h-[250px] w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#F1F5F9"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#818CF8",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              offset={20}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#colorGradient)"
              strokeWidth={4}
              dot={{ r: 6, fill: "white", stroke: "#A78BFA", strokeWidth: 3 }}
              activeDot={{
                r: 8,
                fill: "white",
                stroke: "#A78BFA",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
