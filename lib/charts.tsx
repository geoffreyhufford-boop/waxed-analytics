'use client'

import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  ResponsiveContainer, PieChart, Pie,
} from 'recharts'
import {
  salesOverTimeData, channelSplit, capitalFlowData,
} from '@/lib/data'

const tooltipStyle = {
  contentStyle: { background: '#1e2423', border: '1px solid #2d3432', borderRadius: '8px', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace' },
  labelStyle: { color: '#6a6560', fontWeight: 500, fontSize: '10px' },
  itemStyle: { color: '#e8e0d8', fontFamily: 'IBM Plex Mono, monospace' },
}

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={salesOverTimeData}>
        <defs>
          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4a9a62" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4a9a62" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,52,50,0.6)" />
        <XAxis dataKey="date" tick={{ fill: '#6a6560', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6a6560', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} domain={[0, 18000]} />
        <Tooltip {...tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']} />
        <Area type="monotone" dataKey="sales" stroke="#4a9a62" fill="url(#salesGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function ChannelPie() {
  return (
    <ResponsiveContainer width={64} height={64}>
      <PieChart>
        <Pie data={channelSplit} dataKey="value" cx="50%" cy="50%" innerRadius={18} outerRadius={30} strokeWidth={0}>
          {channelSplit.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export function AOVSparkline() {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={salesOverTimeData.filter((_, i) => i % 3 === 0)}>
        <Line type="monotone" dataKey="sales" stroke="#6a6560" strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function CapitalFlowChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={capitalFlowData}>
        <defs>
          <linearGradient id="jazzGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c4a24e" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#c4a24e" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="electronicGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7b6fa0" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#7b6fa0" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,52,50,0.6)" />
        <XAxis dataKey="month" tick={{ fill: '#6a6560', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6a6560', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="plainline" wrapperStyle={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', paddingTop: '8px' }} />
        <Area type="monotone" dataKey="jazz" stroke="#c4a24e" fill="url(#jazzGrad)" strokeWidth={2} name="Jazz" />
        <Area type="monotone" dataKey="electronic" stroke="#7b6fa0" fill="url(#electronicGrad)" strokeWidth={2} name="Electronic" />
        <Area type="monotone" dataKey="hiphop" stroke="#4a9a62" fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="Hip-Hop" />
        <Area type="monotone" dataKey="rock" stroke="#6a6560" fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="Rock" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function ChartsExport() {
  return null
}
