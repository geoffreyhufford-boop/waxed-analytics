// ─── Existing Top-Half Data (matches current analytics page) ──

export interface QuickStat {
  label: string
  value: string
  subtext?: string
  trend?: string
  trendUp?: boolean
}

export const heroStats: QuickStat[] = [
  { label: 'GROSS SALES', value: '$16,250', trend: '+49%', trendUp: true },
  { label: 'RETURNING CUSTOMER RATE', value: '39.1%', subtext: '9 of 23 customers' },
  { label: 'ORDERS FULFILLED', value: '60 / 70', subtext: '86% fulfillment' },
  { label: 'ORDERS', value: '70', trend: '+19%', trendUp: true },
  { label: 'AOV', value: '$232' },
]

export interface SalesTimePoint {
  date: string
  sales: number
}

export const salesOverTimeData: SalesTimePoint[] = [
  { date: 'Dec 14', sales: 1200 },
  { date: 'Dec 19', sales: 2800 },
  { date: 'Dec 24', sales: 4100 },
  { date: 'Dec 29', sales: 5200 },
  { date: 'Jan 3', sales: 5800 },
  { date: 'Jan 7', sales: 6400 },
  { date: 'Jan 12', sales: 7200 },
  { date: 'Jan 17', sales: 8100 },
  { date: 'Jan 22', sales: 8900 },
  { date: 'Jan 27', sales: 9200 },
  { date: 'Feb 1', sales: 9800 },
  { date: 'Feb 6', sales: 10400 },
  { date: 'Feb 11', sales: 11200 },
  { date: 'Feb 16', sales: 12100 },
  { date: 'Feb 21', sales: 13800 },
  { date: 'Feb 26', sales: 14900 },
  { date: 'Mar 3', sales: 15600 },
  { date: 'Mar 16', sales: 16250 },
]

export const salesBreakdown = [
  { label: 'Gross Sales', value: '$16,250', trend: '+49%', trendUp: true, bold: false },
  { label: 'Discounts', value: '$0.00', bold: false },
  { label: 'Returns', value: '-$225.00', bold: false },
  { label: 'Net Sales', value: '$16,025', trend: '+49%', trendUp: true, bold: true },
  { label: 'Shipping', value: '$223.92', trend: '+16%', trendUp: true, bold: false },
  { label: 'Return Fees', value: '$0.00', bold: false },
  { label: 'Taxes', value: '$244.76', trend: '+11%', trendUp: true, bold: false },
  { label: 'Total Sales', value: '$16,250', trend: '+49%', trendUp: true, bold: true },
]

export const channelSplit = [
  { name: 'Discogs', value: 6100, color: '#6A6090', orders: 28, aov: 218, trend: '+12%', trendUp: true },
  { name: 'Storefront', value: 4600, color: '#7B6FA0', orders: 18, aov: 256, trend: '+31%', trendUp: true },
  { name: 'In-Store', value: 3500, color: '#E87B35', orders: 24, aov: 146, trend: '-4%', trendUp: false },
  { name: 'eBay', value: 1800, color: '#4a9a62', orders: 12, aov: 150, trend: '+7%', trendUp: true },
]

export interface CustomerLocation {
  location: string
  customers: number
  revenue: number
  avgOrder: number
  lastPurchase: string
}

export const customerLocations: CustomerLocation[] = [
  { location: 'California', customers: 4, revenue: 1529, avgOrder: 382, lastPurchase: '—' },
  { location: 'New York', customers: 3, revenue: 1359, avgOrder: 453, lastPurchase: '—' },
  { location: 'Montana', customers: 1, revenue: 759, avgOrder: 759, lastPurchase: '—' },
  { location: 'Michigan', customers: 2, revenue: 725, avgOrder: 363, lastPurchase: '—' },
  { location: 'GB', customers: 1, revenue: 408, avgOrder: 408, lastPurchase: '—' },
  { location: 'Utah', customers: 1, revenue: 250, avgOrder: 250, lastPurchase: '—' },
  { location: 'Ohio', customers: 2, revenue: 110, avgOrder: 55, lastPurchase: '—' },
  { location: 'Nevada', customers: 1, revenue: 40, avgOrder: 40, lastPurchase: '—' },
]

export const customerSummary = {
  totalCustomers: 23,
  totalRevenue: '$11,732',
  avgLtv: '$510',
  topState: 'California',
}

// ─── NEW: Store Inventory Insights ───────────────────────────

export const sellThroughStats: QuickStat[] = [
  { label: 'SELL-THROUGH RATE', value: '68%', subtext: '312 of 458 listed items sold', trend: '+4%', trendUp: true },
  { label: 'AVG DAYS TO SELL', value: '18d', subtext: 'From listing to sale', trend: '-3d', trendUp: true },
  { label: 'INVENTORY TURNOVER', value: '2.4x', subtext: 'Times inventory cycled this period', trend: '+0.3x', trendUp: true },
  { label: 'REVENUE PER UNIT', value: '$76', subtext: 'Average selling price all channels', trend: '+$8', trendUp: true },
]

export interface AgedInventoryItem {
  artist: string
  title: string
  daysListed: number
  condition: string
  price: number
  views: number
  artwork: string
}

export const agedInventoryItems: AgedInventoryItem[] = [
  { artist: 'Herbie Hancock', title: 'Head Hunters', daysListed: 142, condition: 'VG', price: 28, views: 3, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/e5/f5/4fe5f511-462e-e87b-0711-d4e42809fb17/dj.goshfswo.jpg/400x400bb.jpg' },
  { artist: 'Ornette Coleman', title: 'The Shape of Jazz to Come', daysListed: 118, condition: 'VG', price: 45, views: 7, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ec/fe/82/ecfe82b7-b821-b318-17ad-512b9cd1717b/s06.afpdcbhn.jpg/400x400bb.jpg' },
  { artist: 'Weather Report', title: 'Heavy Weather', daysListed: 104, condition: 'G+', price: 15, views: 2, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/93/6e/c2/936ec2d4-1cc1-f60a-ff6c-4ba6f9ffcdb5/074646510827.jpg/400x400bb.jpg' },
  { artist: 'Pharoah Sanders', title: 'Karma', daysListed: 97, condition: 'VG+', price: 85, views: 12, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/01/36/a6/0136a666-36d2-caf1-efb1-da77a646d104/06UMGIM03764.rgb.jpg/400x400bb.jpg' },
  { artist: 'Stan Getz', title: 'Getz/Gilberto', daysListed: 89, condition: 'VG', price: 32, views: 5, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/54/04/b8/5404b8fd-3dbf-9fe1-0513-4611c4dec84e/06UMGIM14182.rgb.jpg/400x400bb.jpg' },
  { artist: 'Freddie Hubbard', title: 'Red Clay', daysListed: 82, condition: 'G+', price: 18, views: 1, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music62/v4/2d/b0/b2/2db0b242-4d8f-f240-776b-c70f41cb4ad7/dj.xncuinrp.jpg/400x400bb.jpg' },
]

export const agedInventorySummary = {
  totalAged: 34,
  pctOfInventory: 7.4,
  avgDaysListed: 108,
  totalValue: 1420,
}

export interface SuggestedBundle {
  name: string
  description: string
  items: string[]
  totalRetail: number
  suggestedPrice: number
  savingsPct: number
}

export const suggestedBundles: SuggestedBundle[] = [
  {
    name: 'Jazz Fusion Starter Pack',
    description: 'Bundle 3 slow-moving fusion titles into a discounted lot',
    items: ['Herbie Hancock – Head Hunters', 'Weather Report – Heavy Weather', 'Freddie Hubbard – Red Clay'],
    totalRetail: 61,
    suggestedPrice: 45,
    savingsPct: 26,
  },
  {
    name: 'Spiritual Jazz Collection',
    description: 'Pair two deep cuts that appeal to the same collector profile',
    items: ['Pharoah Sanders – Karma', 'Ornette Coleman – The Shape of Jazz to Come'],
    totalRetail: 130,
    suggestedPrice: 99,
    savingsPct: 24,
  },
  {
    name: 'VG Budget Crate',
    description: 'Move lower-grade stock as a value bundle for new collectors',
    items: ['Stan Getz – Getz/Gilberto', 'Weather Report – Heavy Weather', 'Freddie Hubbard – Red Clay'],
    totalRetail: 65,
    suggestedPrice: 40,
    savingsPct: 38,
  },
]

export interface ReorderSignalItem {
  artist: string
  title: string
  stockLeft: number
  soldLast30: number
  velocity: number
  artwork: string
}

export const reorderSignalItems: ReorderSignalItem[] = [
  { artist: 'Miles Davis', title: 'Kind of Blue', stockLeft: 0, soldLast30: 8, velocity: 98, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music/7f/9f/d6/mzi.vtnaewef.jpg/400x400bb.jpg' },
  { artist: 'Coltrane', title: 'A Love Supreme', stockLeft: 1, soldLast30: 6, velocity: 92, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e5/24/aa/e524aacd-467b-66f3-8931-0fcd6750a4b9/08UMGIM07914.rgb.jpg/400x400bb.jpg' },
  { artist: 'Herbie Hancock', title: 'Head Hunters', stockLeft: 2, soldLast30: 5, velocity: 85, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/e5/f5/4fe5f511-462e-e87b-0711-d4e42809fb17/dj.goshfswo.jpg/400x400bb.jpg' },
  { artist: 'Charles Mingus', title: 'Ah Um', stockLeft: 3, soldLast30: 4, velocity: 72, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music/85/f3/ef/mzi.etlgbitd.jpg/400x400bb.jpg' },
]

export interface GenrePerformance {
  genre: string
  revenue: number
  unitsSold: number
  avgPrice: number
  margin: number
  trend: number
}

export const genrePerformance: GenrePerformance[] = [
  { genre: 'Jazz', revenue: 5840, unitsSold: 82, avgPrice: 71, margin: 48, trend: 18 },
  { genre: 'Techno', revenue: 4280, unitsSold: 94, avgPrice: 46, margin: 42, trend: 5 },
  { genre: 'House', revenue: 3120, unitsSold: 68, avgPrice: 46, margin: 38, trend: 12 },
  { genre: 'Ambient', revenue: 1890, unitsSold: 42, avgPrice: 45, margin: 44, trend: 8 },
  { genre: 'Electro', revenue: 1120, unitsSold: 26, avgPrice: 43, margin: 36, trend: -3 },
]

// ─── NEW: Buying Intelligence ────────────────────────────────

export interface TopGenreLabelItem {
  label: string
  percentage: number
  artwork: string
  topAlbum: string
}

export interface TopGenreDemand {
  topGenre: string
  labelCount: number
  supplyPct: number
  labels: TopGenreLabelItem[]
}

export const topGenreDemand: TopGenreDemand = {
  topGenre: 'Jazz',
  labelCount: 4,
  supplyPct: 78,
  labels: [
    { label: 'Blue Note', percentage: 88, artwork: '/labels/blue-note.jpeg', topAlbum: 'Art Blakey — Moanin\'' },
    { label: 'Impulse!', percentage: 72, artwork: '/labels/impulse.jpeg', topAlbum: 'Coltrane — A Love Supreme' },
    { label: 'ECM', percentage: 55, artwork: '/labels/ecm.jpeg', topAlbum: 'Keith Jarrett — Koln Concert' },
    { label: 'Prestige', percentage: 40, artwork: '/labels/prestige.jpeg', topAlbum: 'Miles Davis — Cookin\'' },
  ],
}

export interface CatalogGapItem {
  artist: string
  title: string
  searchCount: number
  velocity: number
  artwork: string
}

export const catalogGapItems: CatalogGapItem[] = [
  { artist: 'Pharoah Sanders', title: 'Karma', searchCount: 6, velocity: 95, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/01/36/a6/0136a666-36d2-caf1-efb1-da77a646d104/06UMGIM03764.rgb.jpg/400x400bb.jpg' },
  { artist: 'Alice Coltrane', title: 'Ptah', searchCount: 4, velocity: 75, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/71/c5/2a/71c52a48-cd92-fb2b-f74e-c1edf51a25f1/06UMGIM04794.rgb.jpg/400x400bb.jpg' },
  { artist: 'McCoy Tyner', title: 'Sahara', searchCount: 3, velocity: 60, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/d3/7e/42/d37e42e9-d777-d544-431c-108a4f84d6e6/00025218631129.rgb.jpg/400x400bb.jpg' },
  { artist: 'Sun Ra', title: 'Space Is Place', searchCount: 1, velocity: 30, artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/e7/31/78/e731786e-eba2-2d1c-6ff6-ff6e2354d48c/00011105024921.rgb.jpg/400x400bb.jpg' },
]

// ─── NEW: Market Landscape ───────────────────────────────────

export interface MarketTrendItem {
  genre: string
  direction: 'rising' | 'stable' | 'declining'
  changePct: number
  avgPrice: number
  volume: number
}

export const marketTrends: MarketTrendItem[] = [
  { genre: 'Jazz', direction: 'rising', changePct: 18, avgPrice: 42, volume: 12400 },
  { genre: 'Afrobeat', direction: 'rising', changePct: 24, avgPrice: 38, volume: 4800 },
  { genre: 'Ambient', direction: 'rising', changePct: 12, avgPrice: 35, volume: 8200 },
  { genre: 'Classic Rock', direction: 'stable', changePct: 2, avgPrice: 28, volume: 31200 },
  { genre: 'Techno', direction: 'stable', changePct: -1, avgPrice: 32, volume: 18600 },
  { genre: 'Classical', direction: 'declining', changePct: -8, avgPrice: 18, volume: 6400 },
  { genre: 'Pop/Rock 80s', direction: 'declining', changePct: -14, avgPrice: 15, volume: 22800 },
]

export interface MarketHotspot {
  region: string
  totalSales: number
  topGenre: string
  avgOrderValue: number
  growth: number
}

export const marketHotspots: MarketHotspot[] = [
  { region: 'Brooklyn, NY', totalSales: 48200, topGenre: 'Jazz', avgOrderValue: 62, growth: 22 },
  { region: 'Portland, OR', totalSales: 31400, topGenre: 'Ambient', avgOrderValue: 48, growth: 15 },
  { region: 'Chicago, IL', totalSales: 28600, topGenre: 'House', avgOrderValue: 38, growth: 18 },
  { region: 'Austin, TX', totalSales: 22100, topGenre: 'Psych Rock', avgOrderValue: 35, growth: 28 },
  { region: 'Los Angeles, CA', totalSales: 41800, topGenre: 'Funk/Soul', avgOrderValue: 44, growth: 10 },
  { region: 'London, UK', totalSales: 36200, topGenre: 'Techno', avgOrderValue: 52, growth: 14 },
]

export interface CapitalFlowPoint {
  month: string
  jazz: number
  electronic: number
  hiphop: number
  rock: number
}

// ─── Condition Breakdown ─────────────────────────────────────

export interface ConditionBreakdown {
  condition: string
  shortLabel: string
  count: number
  percentage: number
  avgPrice: number
  avgDaysToSell: number
}

export const conditionBreakdowns: ConditionBreakdown[] = [
  { condition: 'Mint (M)', shortLabel: 'M', count: 42, percentage: 9, avgPrice: 95, avgDaysToSell: 8 },
  { condition: 'Near Mint (NM)', shortLabel: 'NM', count: 148, percentage: 32, avgPrice: 68, avgDaysToSell: 12 },
  { condition: 'Very Good Plus (VG+)', shortLabel: 'VG+', count: 156, percentage: 34, avgPrice: 45, avgDaysToSell: 18 },
  { condition: 'Very Good (VG)', shortLabel: 'VG', count: 78, percentage: 17, avgPrice: 28, avgDaysToSell: 32 },
  { condition: 'Good (G)', shortLabel: 'G', count: 28, percentage: 6, avgPrice: 15, avgDaysToSell: 54 },
  { condition: 'Fair / Poor', shortLabel: 'F/P', count: 6, percentage: 2, avgPrice: 8, avgDaysToSell: 90 },
]

export const capitalFlowData: CapitalFlowPoint[] = [
  { month: 'Sep', jazz: 182, electronic: 245, hiphop: 128, rock: 310 },
  { month: 'Oct', jazz: 198, electronic: 258, hiphop: 135, rock: 305 },
  { month: 'Nov', jazz: 224, electronic: 262, hiphop: 142, rock: 298 },
  { month: 'Dec', jazz: 268, electronic: 278, hiphop: 155, rock: 290 },
  { month: 'Jan', jazz: 285, electronic: 272, hiphop: 148, rock: 282 },
  { month: 'Feb', jazz: 312, electronic: 280, hiphop: 162, rock: 275 },
  { month: 'Mar', jazz: 340, electronic: 285, hiphop: 170, rock: 268 },
]
