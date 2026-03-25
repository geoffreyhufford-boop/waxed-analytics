'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  ResponsiveContainer, PieChart, Pie,
} from 'recharts'
import {
  heroStats, salesOverTimeData, salesBreakdown, channelSplit,
  customerLocations, customerSummary,
  sellThroughStats, reorderSignalItems, agedInventoryItems, agedInventorySummary, suggestedBundles, genrePerformance,
  topGenreDemand, catalogGapItems,
  marketTrends, marketHotspots, capitalFlowData,
  conditionBreakdowns,
} from '@/lib/data'

function ChartWrap({ height, children }: { height: number; children: ReactNode }) {
  return <ResponsiveContainer width="100%" height={height}>{children}</ResponsiveContainer>
}

const tooltipStyle = {
  contentStyle: { background: '#1e2423', border: '1px solid #2d3432', borderRadius: '8px', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace' },
  labelStyle: { color: '#6a6560', fontWeight: 500, fontSize: '10px' },
  itemStyle: { color: '#e8e0d8', fontFamily: 'IBM Plex Mono, monospace' },
}

type EntityType = 'genre' | 'label' | 'artist' | 'record' | 'region' | 'channel'

interface PanelState {
  open: boolean
  type: EntityType
  name: string
}

function EntityLink({ name, type, onClick }: { name: string; type: EntityType; onClick: (type: EntityType, name: string) => void }) {
  return (
    <span
      className="cursor-pointer hover:underline decoration-text-muted underline-offset-2 decoration-dotted"
      onClick={(e) => { e.stopPropagation(); onClick(type, name) }}
    >
      {name}
    </span>
  )
}

function EntityPanel({ panel, onClose }: { panel: PanelState; onClose: () => void }) {
  if (!panel.open) return null

  const typeLabels: Record<EntityType, string> = {
    genre: 'Genre', label: 'Label', artist: 'Artist', record: 'Record', region: 'Region', channel: 'Channel',
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-[420px] bg-surface-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-surface-raised border border-border text-text-muted">{typeLabels[panel.type]}</span>
              <h2 className="text-lg font-semibold text-text mt-2">{panel.name}</h2>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text text-lg leading-none">&times;</button>
          </div>

          {/* Mock analytics */}
          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-semibold tracking-wider text-text-muted mb-3">MARKET ANALYTICS</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Avg Sale Price', value: '$42' },
                  { label: '30d Volume', value: '1,240' },
                  { label: 'Price Trend', value: '+8%' },
                  { label: 'Demand Score', value: '87/100' },
                ].map((s) => (
                  <div key={s.label} className="bg-surface-raised border border-border p-3">
                    <p className="text-[9px] text-text-muted tracking-wider">{s.label}</p>
                    <p className="text-lg font-semibold text-text font-[family-name:var(--font-mono)] mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold tracking-wider text-text-muted mb-3">YOUR INVENTORY</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'In Stock', value: '12' },
                  { label: 'Sold (30d)', value: '5' },
                  { label: 'Revenue', value: '$380' },
                  { label: 'Avg Days to Sell', value: '14d' },
                ].map((s) => (
                  <div key={s.label} className="bg-surface-raised border border-border p-3">
                    <p className="text-[9px] text-text-muted tracking-wider">{s.label}</p>
                    <p className="text-lg font-semibold text-text font-[family-name:var(--font-mono)] mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold tracking-wider text-text-muted mb-3">SALES OVERVIEW</h3>
              <div className="space-y-2">
                {['Last 7 days', 'Last 30 days', 'Last 90 days'].map((period, i) => (
                  <div key={period} className="flex items-center justify-between py-2 border-b border-border-subtle">
                    <span className="text-xs text-text-secondary">{period}</span>
                    <span className="text-xs font-semibold text-text font-[family-name:var(--font-mono)]">${[84, 380, 1120][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-2">
              <button className="w-full py-2.5 bg-positive/10 border border-positive/30 text-positive text-xs font-semibold hover:bg-positive/20 transition-colors">
                View on Restock →
              </button>
              <button className="w-full py-2.5 bg-surface-raised border border-border text-text-secondary text-xs font-semibold hover:text-text transition-colors">
                View on Marketplace →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('ALL')
  const ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL']
  const [panel, setPanel] = useState<PanelState>({ open: false, type: 'genre', name: '' })
  const openPanel = (type: EntityType, name: string) => setPanel({ open: true, type, name })
  const closePanel = () => setPanel((p) => ({ ...p, open: false }))

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-8">
      <EntityPanel panel={panel} onClose={closePanel} />

      {/* ── Master Controls ── */}
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <button className="flex items-center gap-1.5 text-text-secondary hover:text-text">
          <span className="text-[10px]">⌄</span> EXPAND ALL
        </button>
        <span className="text-text-secondary font-medium">Last 30 days ▾</span>
        <span className="text-text-secondary font-medium">All Channels ▾</span>
        <button className="px-3 py-1 border border-border text-text-secondary text-[11px] hover:border-text-secondary">
          Compare
        </button>
      </div>

      {/* ── Hero Metrics ── */}
      <div className="grid grid-cols-5 gap-4">
        {heroStats.map((stat) => (
          <div key={stat.label} className="bg-surface-card border border-border p-4">
            <p className="text-[10px] font-medium tracking-wider text-text-muted">{stat.label}</p>
            <p className="text-2xl font-semibold text-text mt-1 font-[family-name:var(--font-mono)]">{stat.value}</p>
            {stat.trend && (
              <p className={`text-[11px] font-medium mt-1 ${stat.trendUp ? 'text-positive' : 'text-negative'}`}>{stat.trend}</p>
            )}
            {stat.subtext && !stat.trend && (
              <p className="text-[11px] text-text-muted mt-1">{stat.subtext}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── Total Sales Over Time + Breakdown + Channel ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left stack: Sales Chart + Breakdown */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-surface-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-text">Total Sales Over Time</h3>
              <div className="flex items-center gap-0.5">
                {ranges.map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-2.5 py-1 text-[10px] font-medium ${
                      timeRange === r
                        ? 'bg-surface-raised text-text border border-border'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-3xl font-semibold text-text font-[family-name:var(--font-mono)] mb-4">$16,250</p>
            <ChartWrap height={220}>
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
                  <Tooltip {...tooltipStyle} formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']} />
                  <Area type="monotone" dataKey="sales" stroke="#4a9a62" fill="url(#salesGrad)" strokeWidth={2} />
                </AreaChart>
            </ChartWrap>
          </div>

          {/* Total Sales Breakdown */}
          <div className="bg-surface-card border border-border p-5">
            <h3 className="text-[11px] font-semibold text-text-muted tracking-wider mb-4">TOTAL SALES BREAKDOWN</h3>
            <div className="grid grid-cols-4 gap-x-6 gap-y-3">
              {salesBreakdown.map((item) => (
                <div key={item.label} className={`${item.bold ? 'pt-2 border-t border-border-subtle col-span-4 grid grid-cols-4 gap-x-6' : ''}`}>
                  {item.bold ? (
                    <div className="flex items-center justify-between col-span-4">
                      <span className="text-xs font-semibold text-text">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-text font-[family-name:var(--font-mono)]">{item.value}</span>
                        {item.trend && (
                          <span className={`text-[10px] font-medium ${item.trendUp ? 'text-positive' : 'text-negative'}`}>{item.trend}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[10px] text-text-muted mb-0.5">{item.label}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm text-text font-[family-name:var(--font-mono)]">{item.value}</span>
                        {item.trend && (
                          <span className={`text-[10px] font-medium ${item.trendUp ? 'text-positive' : 'text-negative'}`}>{item.trend}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Channel — dense view */}
        <div className="bg-accent-warm/8 border border-accent-warm/20 p-5 flex flex-col">
          <h3 className="text-[11px] font-semibold text-text-muted tracking-wider mb-4">SALES BY CHANNEL</h3>

          {/* AOV header */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-semibold text-text font-[family-name:var(--font-mono)]">$232</span>
            <span className="text-[11px] font-medium text-positive">+14%</span>
          </div>
          <p className="text-[10px] text-text-muted mb-5">avg order value · 70 orders · 2.1 items/order</p>

          {/* Channel rows */}
          <div className="space-y-4 flex-1">
            {channelSplit.map((ch) => {
              const total = channelSplit.reduce((s, c) => s + c.value, 0)
              const pct = Math.round((ch.value / total) * 100)
              return (
                <div key={ch.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                      <span className="text-xs text-text font-medium"><EntityLink name={ch.name} type="channel" onClick={openPanel} /></span>
                      <span className="text-[10px] text-text-muted">{pct}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-text font-[family-name:var(--font-mono)]">
                        ${(ch.value / 1000).toFixed(1)}k
                      </span>
                      <span className={`text-[10px] font-medium ${ch.trendUp ? 'text-positive' : 'text-negative'}`}>{ch.trend}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-surface-raised/50 overflow-hidden">
                    <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: ch.color }} />
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">{ch.orders} orders</span>
                    <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">${ch.aov} avg</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Repeat vs new */}
          <div className="mt-5 pt-4 border-t border-accent-warm/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-text-muted">Repeat customers</span>
              <span className="text-xs font-semibold text-text font-[family-name:var(--font-mono)]">$7,840</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-text-muted">New customers</span>
              <span className="text-xs font-semibold text-text font-[family-name:var(--font-mono)]">$6,410</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Customers by Location ── */}
      <div>
        <h2 className="text-lg font-semibold text-text mb-4">Customers by Location</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Map placeholder */}
          <div className="bg-surface-card border border-border p-5 flex items-center justify-center min-h-[320px]">
            <div className="text-center text-text-muted">
              <div className="text-4xl mb-2 opacity-30">🌎</div>
              <p className="text-xs">Map visualization</p>
            </div>
          </div>

          {/* Customer stats + table */}
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'TOTAL CUSTOMERS', value: customerSummary.totalCustomers },
                { label: 'TOTAL REVENUE', value: customerSummary.totalRevenue },
                { label: 'AVG LTV', value: customerSummary.avgLtv },
                { label: 'TOP STATE', value: customerSummary.topState },
              ].map((s) => (
                <div key={s.label} className="bg-surface-card border border-border p-4">
                  <p className="text-[9px] font-medium tracking-wider text-text-muted">{s.label}</p>
                  <p className="text-lg font-semibold text-text mt-1 font-[family-name:var(--font-mono)]">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-surface-card border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    {['LOCATION', 'CUSTOMERS', 'REVENUE', 'AVG ORDER', 'LAST PURCHASE'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-[9px] font-medium tracking-wider text-text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customerLocations.map((loc) => (
                    <tr key={loc.location} className="border-b border-border-subtle hover:bg-surface-raised/50">
                      <td className="px-4 py-2.5 text-text"><EntityLink name={loc.location} type="region" onClick={openPanel} /></td>
                      <td className="px-4 py-2.5 text-text-secondary text-center">{loc.customers}</td>
                      <td className="px-4 py-2.5 text-text font-[family-name:var(--font-mono)]">${loc.revenue.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-text-secondary font-[family-name:var(--font-mono)]">${loc.avgOrder}</td>
                      <td className="px-4 py-2.5 text-text-muted">{loc.lastPurchase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 text-xs text-text-secondary hover:text-text cursor-pointer">
                View all customers →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          NEW SECTIONS BELOW — Store Inventory Insights
          ════════════════════════════════════════════════════════════ */}

      <div className="border-t border-border pt-8">
        <h2 className="text-[11px] font-medium tracking-widest text-text-muted mb-6">INVENTORY INSIGHTS</h2>

        {/* Sell-Through Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {sellThroughStats.map((stat) => (
            <div key={stat.label} className="bg-surface-card border border-border p-4">
              <p className="text-[9px] font-medium tracking-wider text-text-muted">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl font-semibold text-text font-[family-name:var(--font-mono)]">{stat.value}</p>
                {stat.trend && (
                  <span className={`text-[11px] font-medium ${stat.trendUp ? 'text-positive' : 'text-negative'}`}>{stat.trend}</span>
                )}
              </div>
              {stat.subtext && <p className="text-[11px] text-text-muted mt-1">{stat.subtext}</p>}
            </div>
          ))}
        </div>

        {/* Genre Performance + Condition Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Genre Performance Table */}
          <div className="col-span-2 bg-surface-card border border-border">
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-sm font-semibold text-text">Genre Performance</h3>
              <p className="text-[11px] text-text-muted mt-0.5">Revenue and velocity by genre for this period</p>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  {['GENRE', 'REVENUE', 'UNITS', 'AVG PRICE', 'MARGIN', 'TREND'].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-[9px] font-medium tracking-wider text-text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {genrePerformance.map((g) => (
                  <tr key={g.genre} className="border-b border-border-subtle hover:bg-surface-raised/50">
                    <td className="px-5 py-3 text-text font-medium"><EntityLink name={g.genre} type="genre" onClick={openPanel} /></td>
                    <td className="px-5 py-3 text-text font-[family-name:var(--font-mono)]">${g.revenue.toLocaleString()}</td>
                    <td className="px-5 py-3 text-text-secondary font-[family-name:var(--font-mono)]">{g.unitsSold}</td>
                    <td className="px-5 py-3 text-text-secondary font-[family-name:var(--font-mono)]">${g.avgPrice}</td>
                    <td className="px-5 py-3 text-text-secondary font-[family-name:var(--font-mono)]">{g.margin}%</td>
                    <td className="px-5 py-3">
                      <span className={`text-[11px] font-semibold font-[family-name:var(--font-mono)] ${g.trend > 0 ? 'text-positive' : g.trend < 0 ? 'text-negative' : 'text-text-muted'}`}>
                        {g.trend > 0 ? '+' : ''}{g.trend}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Condition Breakdown */}
          <div className="bg-surface-card border border-border p-5">
            <h3 className="text-sm font-semibold text-text">Condition Breakdown</h3>
            <p className="text-[11px] text-text-muted mt-0.5 mb-4">Inventory distribution by grading</p>
            <div className="space-y-3">
              {conditionBreakdowns.map((c) => (
                <div key={c.shortLabel}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-text-secondary font-[family-name:var(--font-mono)] w-6">{c.shortLabel}</span>
                      <span className="text-xs text-text-muted">{c.count} items</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">~{c.avgDaysToSell}d avg</span>
                      <span className="text-xs font-semibold text-text font-[family-name:var(--font-mono)]">${c.avgPrice}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-surface-raised overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${c.percentage}%`,
                        backgroundColor: c.percentage > 25 ? '#4a9a62' : c.percentage > 10 ? '#c4a24e' : '#6a6560',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle">
              <div className="flex justify-between text-[11px]">
                <span className="text-text-muted">Total inventory</span>
                <span className="text-text font-semibold font-[family-name:var(--font-mono)]">
                  {conditionBreakdowns.reduce((s, c) => s + c.count, 0)} items
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reorder Signal — Carousel */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-tag-red-bg border border-tag-red-border text-negative">Reorder signal</span>
              <h3 className="text-sm font-semibold text-text">Low stock — high velocity items</h3>
            </div>
          </div>
          <p className="text-[11px] text-text-muted mb-4">These titles sold through and are trending. Restock before peak weekend traffic.</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2d3432 transparent' }}>
            {reorderSignalItems.map((item) => (
              <div key={`${item.artist}-${item.title}`} className="flex-shrink-0 w-[200px] bg-surface-card border border-border overflow-hidden group hover:border-text-muted transition-colors">
                {/* Album art */}
                <div className="h-[200px] bg-surface-raised relative overflow-hidden">
                  <img src={item.artwork} alt={`${item.artist} – ${item.title}`} className="w-full h-full object-cover" />
                  {/* Stock badge */}
                  <div className={`absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-semibold font-[family-name:var(--font-mono)] ${
                    item.stockLeft === 0 ? 'bg-negative/20 text-negative' : 'bg-accent-warm/20 text-accent-warm'
                  }`}>
                    {item.stockLeft === 0 ? 'SOLD OUT' : `${item.stockLeft} left`}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-text truncate"><EntityLink name={item.title} type="record" onClick={openPanel} /></p>
                  <p className="text-[11px] text-text-muted truncate"><EntityLink name={item.artist} type="artist" onClick={openPanel} /></p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle">
                    <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">{item.soldLast30} sold / 30d</span>
                    <span className="text-[10px] font-semibold text-positive font-[family-name:var(--font-mono)]">{item.velocity}% vel</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Restock CTA card */}
            <div className="flex-shrink-0 w-[200px] bg-surface-card border border-border-subtle flex items-center justify-center cursor-pointer hover:border-text-muted transition-colors">
              <div className="text-center">
                <p className="text-xs text-text-secondary">Restock these</p>
                <p className="text-xs text-text-secondary">titles →</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aged Inventory — Carousel */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-tag-orange-bg border border-tag-orange-border text-accent-warm">Aged inventory</span>
              <h3 className="text-sm font-semibold text-text">Sitting stock — 60+ days on shelf</h3>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-text-muted font-[family-name:var(--font-mono)]">
              <span>{agedInventorySummary.totalAged} items</span>
              <span>{agedInventorySummary.pctOfInventory}% of inventory</span>
              <span>${agedInventorySummary.totalValue.toLocaleString()} tied up</span>
            </div>
          </div>
          <p className="text-[11px] text-text-muted mb-4">Low velocity, few views. Consider repricing, bundling, or moving to a sale channel.</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2d3432 transparent' }}>
            {agedInventoryItems.map((item) => (
              <div key={`${item.artist}-${item.title}`} className="flex-shrink-0 w-[200px] bg-surface-card border border-border overflow-hidden group hover:border-text-muted transition-colors">
                {/* Album art */}
                <div className="h-[200px] bg-surface-raised relative overflow-hidden">
                  <img src={item.artwork} alt={`${item.artist} – ${item.title}`} className="w-full h-full object-cover" />
                  {/* Days badge */}
                  <div className={`absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-semibold font-[family-name:var(--font-mono)] ${
                    item.daysListed > 120 ? 'bg-negative/20 text-negative' : 'bg-accent-warm/20 text-accent-warm'
                  }`}>
                    {item.daysListed}d
                  </div>
                  {/* Condition badge */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-surface-card/80 text-[10px] font-semibold text-text-secondary font-[family-name:var(--font-mono)]">
                    {item.condition}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-text truncate"><EntityLink name={item.title} type="record" onClick={openPanel} /></p>
                  <p className="text-[11px] text-text-muted truncate"><EntityLink name={item.artist} type="artist" onClick={openPanel} /></p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle">
                    <span className="text-sm font-semibold text-text font-[family-name:var(--font-mono)]">${item.price}</span>
                    <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">{item.views} views</span>
                  </div>
                </div>
              </div>
            ))}
            {/* See all card */}
            <div className="flex-shrink-0 w-[200px] bg-surface-card border border-border-subtle flex items-center justify-center cursor-pointer hover:border-text-muted transition-colors">
              <div className="text-center">
                <p className="text-xs text-text-secondary">View all {agedInventorySummary.totalAged}</p>
                <p className="text-xs text-text-secondary">aged items →</p>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Bundles from Aged Inventory */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-surface-raised border border-border text-text-muted">Suggested</span>
              <h3 className="text-sm font-semibold text-text">Collections from sitting stock</h3>
            </div>
          </div>
          <p className="text-[11px] text-text-muted mb-4">Bundle slow-moving inventory into discounted lots to accelerate sell-through.</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2d3432 transparent' }}>
            {suggestedBundles.map((bundle) => (
              <div key={bundle.name} className="flex-shrink-0 w-[280px] bg-surface-card border border-border p-4 hover:border-text-muted transition-colors">
                <h4 className="text-xs font-semibold text-text">{bundle.name}</h4>
                <p className="text-[10px] text-text-muted mt-1 mb-3">{bundle.description}</p>
                <div className="space-y-1.5 mb-3">
                  {bundle.items.map((item) => {
                    const [artist, title] = item.split(' – ')
                    return (
                      <div key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-text-muted" />
                        <span className="text-[11px] text-text-secondary truncate">
                          <EntityLink name={artist} type="artist" onClick={openPanel} /> – <EntityLink name={title} type="record" onClick={openPanel} />
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="pt-3 border-t border-border-subtle">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-text font-[family-name:var(--font-mono)]">${bundle.suggestedPrice}</span>
                      <span className="text-[10px] text-text-muted line-through font-[family-name:var(--font-mono)]">${bundle.totalRetail}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-positive font-[family-name:var(--font-mono)]">-{bundle.savingsPct}%</span>
                  </div>
                  <button className="w-full mt-3 py-2 bg-accent-warm/10 border border-accent-warm/30 text-accent-warm text-[11px] font-semibold hover:bg-accent-warm/20 transition-colors cursor-pointer">
                    Create this bundle →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MARKET LANDSCAPE — Market-wide analytics
          ════════════════════════════════════════════════════════════ */}

      <div className="border-t border-border pt-8 pb-12">
        <h2 className="text-[11px] font-medium tracking-widest text-text-muted mb-6">MARKET LANDSCAPE</h2>

        {/* Capital Flow Chart + Market Trends */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Capital Flow */}
          <div className="col-span-2 bg-surface-card border border-border p-5">
            <h3 className="text-sm font-semibold text-text">Where Capital Is Flowing</h3>
            <p className="text-[11px] text-text-muted mt-0.5 mb-4">Marketplace-wide spend by genre — indexed to 100 (6 months ago)</p>
            <ChartWrap height={240}>
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
            </ChartWrap>
          </div>

          {/* Market Trends */}
          <div className="bg-surface-card border border-border p-5">
            <h3 className="text-sm font-semibold text-text">Genre Trends</h3>
            <p className="text-[11px] text-text-muted mt-0.5 mb-4">Market-wide momentum shifts</p>
            <div className="space-y-2.5">
              {marketTrends.map((t) => (
                <div key={t.genre} className="flex items-center justify-between py-1.5 border-b border-border-subtle last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      t.direction === 'rising' ? 'bg-positive' : t.direction === 'declining' ? 'bg-negative' : 'bg-text-muted'
                    }`} />
                    <span className="text-xs text-text"><EntityLink name={t.genre} type="genre" onClick={openPanel} /></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">${t.avgPrice} avg</span>
                    <span className={`text-[11px] font-semibold font-[family-name:var(--font-mono)] w-12 text-right ${
                      t.changePct > 0 ? 'text-positive' : t.changePct < 0 ? 'text-negative' : 'text-text-muted'
                    }`}>
                      {t.changePct > 0 ? '+' : ''}{t.changePct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Genre Demand — Label Carousel */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-tag-orange-bg border border-tag-orange-border text-accent-warm">Top genre demand</span>
              <h3 className="text-sm font-semibold text-text">Labels driving {topGenreDemand.topGenre} sales</h3>
            </div>
            <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">{topGenreDemand.labelCount} labels · {topGenreDemand.supplyPct}% of top sellers</span>
          </div>
          <p className="text-[11px] text-text-muted mb-4">{topGenreDemand.topGenre} leads by margin marketplace-wide. Browse catalogs to restock from these distributors.</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2d3432 transparent' }}>
            {topGenreDemand.labels.map((item) => (
              <div key={item.label} className="flex-shrink-0 w-[200px] bg-surface-card border border-border overflow-hidden group hover:border-text-muted transition-colors">
                <div className="h-[200px] bg-surface-raised relative overflow-hidden">
                  <img src={item.artwork} alt={item.label} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-accent-warm/20 text-[10px] font-semibold text-accent-warm font-[family-name:var(--font-mono)]">
                    {item.percentage}%
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-text"><EntityLink name={item.label} type="label" onClick={openPanel} /></p>
                  <div className="h-1.5 bg-surface-raised overflow-hidden mt-2 mb-1">
                    <div className="h-full bg-accent-warm transition-all" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-[10px] text-text-muted">{item.percentage}% of {topGenreDemand.topGenre} supply</span>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[200px] bg-surface-card border border-border-subtle flex items-center justify-center cursor-pointer hover:border-text-muted transition-colors">
              <div className="text-center">
                <p className="text-xs text-text-secondary">Browse all</p>
                <p className="text-xs text-text-secondary">{topGenreDemand.topGenre} labels →</p>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Gap — Record Carousel */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-tag-green-bg border border-tag-green-border text-positive">Catalog gap</span>
              <h3 className="text-sm font-semibold text-text">Trending titles not widely carried</h3>
            </div>
            <span className="text-[10px] text-text-muted font-[family-name:var(--font-mono)]">{catalogGapItems.reduce((s, i) => s + i.searchCount, 0)} searches last month</span>
          </div>
          <p className="text-[11px] text-text-muted mb-4">Buyers searched for these but found low availability across stores.</p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2d3432 transparent' }}>
            {catalogGapItems.map((item) => (
              <div key={`${item.artist}-${item.title}`} className="flex-shrink-0 w-[200px] bg-surface-card border border-border overflow-hidden group hover:border-text-muted transition-colors">
                <div className="h-[200px] bg-surface-raised relative overflow-hidden">
                  <img src={item.artwork} alt={`${item.artist} – ${item.title}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-positive/20 text-[10px] font-semibold text-positive font-[family-name:var(--font-mono)]">
                    x{item.searchCount}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-text truncate"><EntityLink name={item.title} type="record" onClick={openPanel} /></p>
                  <p className="text-[11px] text-text-muted truncate"><EntityLink name={item.artist} type="artist" onClick={openPanel} /></p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle">
                    <span className="text-[10px] text-text-muted">Demand</span>
                    <div className="w-16 h-1.5 bg-surface-raised overflow-hidden">
                      <div className="h-full bg-positive transition-all" style={{ width: `${item.velocity}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[200px] bg-surface-card border border-border-subtle flex items-center justify-center cursor-pointer hover:border-text-muted transition-colors">
              <div className="text-center">
                <p className="text-xs text-text-secondary">Find these in</p>
                <p className="text-xs text-text-secondary">marketplace →</p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Hotspots */}
        <div className="bg-surface-card border border-border">
          <div className="px-5 pt-5 pb-3">
            <h3 className="text-sm font-semibold text-text">Buyer Hotspots</h3>
            <p className="text-[11px] text-text-muted mt-0.5">Top regions by marketplace volume — where collectors are spending</p>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {['REGION', 'TOTAL SALES', 'TOP GENRE', 'AVG ORDER', 'GROWTH'].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-[9px] font-medium tracking-wider text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketHotspots.map((h) => (
                <tr key={h.region} className="border-b border-border-subtle hover:bg-surface-raised/50">
                  <td className="px-5 py-3 text-text font-medium"><EntityLink name={h.region} type="region" onClick={openPanel} /></td>
                  <td className="px-5 py-3 text-text font-[family-name:var(--font-mono)]">${h.totalSales.toLocaleString()}</td>
                  <td className="px-5 py-3 text-text-secondary"><EntityLink name={h.topGenre} type="genre" onClick={openPanel} /></td>
                  <td className="px-5 py-3 text-text-secondary font-[family-name:var(--font-mono)]">${h.avgOrderValue}</td>
                  <td className="px-5 py-3">
                    <span className="text-[11px] font-semibold text-positive font-[family-name:var(--font-mono)]">+{h.growth}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
