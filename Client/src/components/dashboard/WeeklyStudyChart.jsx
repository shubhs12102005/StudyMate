import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts';
import { useSelector } from 'react-redux';
import { Clock, CheckCircle2 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const reachedTarget = data.minutes >= data.target_minutes;
    return (
      <div
        className={`p-2.5 rounded-xl border shadow-desk-md text-xs font-mono ${
          isDark
            ? 'bg-[#161726] border-[#2A2B3D] text-[#ECE7DE]'
            : 'bg-[#FFFDF8] border-[#E8E2D5] text-[#16141F]'
        }`}
      >
        <div className="text-[10px] text-desk-muted mb-1">{label} Study Session</div>
        <div className="font-bold text-desk-ink flex items-center justify-between gap-4">
          <span>Logged Time:</span>
          <span className="text-tangerine">{data.minutes} mins</span>
        </div>
        <div className="text-[11px] text-desk-muted flex items-center justify-between gap-4 mt-0.5">
          <span>Daily Target:</span>
          <span>{data.target_minutes} mins</span>
        </div>
        <div className="mt-1.5 pt-1.5 border-t border-desk-border/40 text-[10px]">
          {reachedTarget ? (
            <span className="text-mint font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Target Achieved
            </span>
          ) : (
            <span className="text-desk-muted">
              {data.target_minutes - data.minutes} mins to target
            </span>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function WeeklyStudyChart({ data = [] }) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === 'midnight';

  const chartData =
    data.length > 0
      ? data
      : [
          { date: 'Mon', minutes: 85, target_minutes: 90 },
          { date: 'Tue', minutes: 110, target_minutes: 90 },
          { date: 'Wed', minutes: 75, target_minutes: 90 },
          { date: 'Thu', minutes: 95, target_minutes: 90 },
          { date: 'Fri', minutes: 130, target_minutes: 90 },
          { date: 'Sat', minutes: 120, target_minutes: 90 },
          { date: 'Sun', minutes: 60, target_minutes: 90 },
        ];

  const totalMinutes = chartData.reduce((acc, curr) => acc + curr.minutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  const gridColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(22, 20, 31, 0.08)';
  const textColor = isDark ? '#8E8D9C' : '#6F6A60';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-violet" />
          <h4 className="font-serif text-base font-bold text-desk-ink">
            Weekly Study Time
          </h4>
        </div>
        <span className="text-[11px] font-mono font-medium text-desk-muted">
          Total: <strong className="text-desk-ink">{totalHours} hrs</strong> this week
        </span>
      </div>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              stroke={textColor}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
              tickFormatter={(v) => `${v}m`}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <ReferenceLine
              y={90}
              stroke={isDark ? '#FFD84D' : '#D9B426'}
              strokeDasharray="3 3"
              label={{
                value: '90m target',
                fill: isDark ? '#FFD84D' : '#A07E05',
                fontSize: 9,
                position: 'insideTopRight',
                fontFamily: 'monospace',
              }}
            />
            <Bar dataKey="minutes" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {chartData.map((entry, index) => {
                const met = entry.minutes >= entry.target_minutes;
                const barColor = met
                  ? '#2EC4A0' // Mint for met target
                  : isDark
                  ? '#6D4AFF' // Violet in dark
                  : '#4B35B8';
                return <Cell key={`cell-${index}`} fill={barColor} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
