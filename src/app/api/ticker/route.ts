import { NextResponse } from 'next/server'

const GAMMA_API = 'https://gamma-api.polymarket.com'

// How many total ticker items to show
const TICKER_TOTAL = 8

export type TickerItem = {
  id: string
  question: string
  probability: number   // 0–1, e.g. 0.34
  outcome: string       // e.g. "Ja" or "Biden"
  volume: number
  pinned: boolean
}

async function fetchMarketById(id: string): Promise<TickerItem | null> {
  try {
    const res = await fetch(`${GAMMA_API}/markets/${id}`, { next: { revalidate: 30 } })
    if (!res.ok) return null
    const m = await res.json()
    return parseMarket(m, true)
  } catch {
    return null
  }
}

async function fetchTopMarkets(limit: number): Promise<TickerItem[]> {
  try {
    const res = await fetch(
      `${GAMMA_API}/markets?active=true&closed=false&limit=${limit * 3}&order=volume&ascending=false`,
      { next: { revalidate: 30 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    // Gamma API returns either an array or { markets: [] }
    const markets: any[] = Array.isArray(data) ? data : (data.markets ?? [])
    return markets
      .map((m) => parseMarket(m, false))
      .filter((m): m is TickerItem => m !== null)
      .slice(0, limit)
  } catch {
    return []
  }
}

function parseMarket(m: any, pinned: boolean): TickerItem | null {
  try {
    const question: string = m.question ?? m.title ?? ''
    if (!question) return null

    // outcomePrices is sometimes a JSON string, sometimes already an array
    const raw = typeof m.outcomePrices === 'string'
      ? JSON.parse(m.outcomePrices)
      : m.outcomePrices ?? []

    const prices: number[] = raw.map((p: string | number) => parseFloat(String(p)))

    // Pick the highest-probability outcome (most interesting to display)
    const maxIdx = prices.indexOf(Math.max(...prices))
    const probability = prices[maxIdx] ?? 0

    const outcomes = typeof m.outcomes === 'string'
      ? JSON.parse(m.outcomes)
      : m.outcomes ?? []

    const outcome: string = outcomes[maxIdx] ?? 'Ja'
    const volume = parseFloat(String(m.volumeNum ?? m.volume ?? 0))

    // Shorten long questions for the ticker
    const label = question.length > 52 ? question.slice(0, 49) + '…' : question

    return {
      id: String(m.id ?? m.conditionId ?? ''),
      question: label,
      probability,
      outcome,
      volume,
      pinned,
    }
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Comma-separated Polymarket market IDs passed from Sanity
  const pinnedParam = searchParams.get('pinned') ?? ''
  const pinnedIds = pinnedParam.split(',').map((s) => s.trim()).filter(Boolean)

  // Fetch pinned markets in parallel
  const pinnedResults = await Promise.all(pinnedIds.map(fetchMarketById))
  const pinned = pinnedResults.filter((m): m is TickerItem => m !== null)

  // Fill remaining slots with top-volume markets, excluding already-pinned IDs
  const autoFillCount = Math.max(0, TICKER_TOTAL - pinned.length)
  let autoFill: TickerItem[] = []

  if (autoFillCount > 0) {
    const top = await fetchTopMarkets(autoFillCount + pinnedIds.length)
    const pinnedIdSet = new Set(pinned.map((m) => m.id))
    autoFill = top.filter((m) => !pinnedIdSet.has(m.id)).slice(0, autoFillCount)
  }

  const items = [...pinned, ...autoFill]

  return NextResponse.json(items, {
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  })
}
