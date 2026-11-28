import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useSelector } from 'react-redux';
import { TrendingUp, Sparkles } from 'lucide-react';

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-2.5 rounded-xl border shadow-desk-md text-xs font-mono ${
          isDark
            ? 'bg-[#161726] border-[#2A2B3D] text-[#ECE7DE]'
            : 'bg-[#FFFDF8] border-[#E8E2D5] text-[#16141F]'
        }`}
      >
        <div className="text-[10px] text-desk-muted mb-1">{label} Assessment</div>
        <div className="flex items-center gap-1.5 font-bold text-tangerine">
          <span>Score:</span>
          <span>{payload[0].value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function QuizTrendChart({ data = [] }) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === 'midnight';

  const chartData =
    data.length > 0
      ? data
      : [
          { date: 'Nov 05', score: 72 },
          { date: 'Nov 10', score: 78 },
          { date: 'Nov 15', score: 84 },
          { date: 'Nov 20', score: 82 },
          { date: 'Nov 23', score: 92 },
        ];

  const gridColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(22, 20, 31, 0.08)';
  const textColor = isDark ? '#8E8D9C' : '#6F6A60';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-tangerine" />
          <h4 className="font-serif text-base font-bold text-desk-ink">
            Quiz Mastery Curve
          </h4>
        </div>
        <span className="text-[11px] font-mono font-medium text-mint bg-mint/10 border border-mint/20 px-2 py-0.5 rounded-full">
          +20% this month
        </span>
      </div>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={textColor}
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              fontFamily="monospace"
            />
            <YAxis
              domain={[60, 100]}
              stroke={textColor}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#FF6B35"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: '#FFFDF8',
                stroke: '#FF6B35',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: '#FF6B35',
                stroke: '#FFFDF8',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
