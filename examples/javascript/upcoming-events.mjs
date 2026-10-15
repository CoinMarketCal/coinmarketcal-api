// Print every upcoming event for one coin, following the pagination cursor.
// Usage: COINMARKETCAL_API_KEY=... node upcoming-events.mjs ethereum  (Node.js 18+)

const API = "https://api.coinmarketcal.com/v2/events";

async function* upcomingEvents(coinSlug, apiKey) {
  const params = new URLSearchParams({ coins: coinSlug, limit: "100" });
  while (true) {
    const response = await fetch(`${API}?${params}`, { headers: { "x-api-key": apiKey } });
    if (!response.ok) throw new Error(`CoinMarketCal API: HTTP ${response.status}`);
    const page = await response.json();
    yield* page.data;
    if (!page.meta.cursor) return;
    params.set("cursor", page.meta.cursor);
  }
}

const coin = process.argv[2] ?? "ethereum";
for await (const event of upcomingEvents(coin, process.env.COINMARKETCAL_API_KEY)) {
  // displayedDate respects estimated dates ("Q4 2026", "By 30 May 2026").
  console.log(`${event.displayedDate.padStart(16)}  ${event.title}`);
}
