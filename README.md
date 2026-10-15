# CoinMarketCal API

Official examples for the [CoinMarketCal](https://coinmarketcal.com) API and MCP server.

CoinMarketCal is a crypto events calendar. Each event has a date, the coins it affects, an editorial category, an impact score and the source it comes from. The same data is available through a REST API and an MCP server for AI agents.

- **Get an API key:** [coinmarketcal.com/developer](https://coinmarketcal.com/developer) (free tier available)
- **Documentation:** [coinmarketcal.com/developer/docs](https://coinmarketcal.com/developer/docs)
- **OpenAPI spec:** [openapi.json](https://coinmarketcal.com/developer/docs/openapi.json)
- **MCP server:** `https://coinmarketcal.com/mcp` ([setup guide](https://coinmarketcal.com/developer/docs/mcp), [MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=com.coinmarketcal/events): `com.coinmarketcal/events`)

## Quick start

Every request sends your key in the `x-api-key` header.

```bash
curl -s "https://api.coinmarketcal.com/v2/events?coins=ethereum&limit=5" \
  -H "x-api-key: $COINMARKETCAL_API_KEY"
```

Each event looks like this (fields depend on your plan):

```json
{
  "id": "48291",
  "slug": "ethereum-pectra-upgrade",
  "title": "Ethereum Pectra Upgrade",
  "date": "2026-05-06T12:00:00Z",
  "dateType": "date",
  "isEstimated": false,
  "displayedDate": "06 May 2026",
  "categories": ["Release"],
  "coins": [{ "slug": "ethereum", "symbol": "eth", "name": "Ethereum" }],
  "impact": 8.5
}
```

When `isEstimated` is `true`, `date` is a deadline or the end of a window, not an exact day. Show `displayedDate` to your users (for example `Q2 2026` or `By 30 May 2026`).

## Use it from an AI agent (MCP)

The MCP server exposes the read endpoints of the API as tools (`list_events`, `get_event`, `list_coins`, …). Event results include the `url` of the event page on coinmarketcal.com. It uses the same key and quota as the REST API.

| Client | Configuration |
|---|---|
| Claude Code | [`mcp/claude-code.sh`](mcp/claude-code.sh) |
| Cursor, VS Code and clients using `mcpServers` | [`mcp/mcp.json`](mcp/mcp.json) |
| Codex CLI | [`mcp/codex.toml`](mcp/codex.toml) |
| Claude Desktop and clients without remote HTTP support | [`mcp/mcp-remote.json`](mcp/mcp-remote.json) |

Replace `YOUR_API_KEY` with your key.

## Examples

| Example | What it does |
|---|---|
| [`examples/curl.sh`](examples/curl.sh) | List upcoming events, read one event, look up a coin |
| [`examples/python/upcoming_events.py`](examples/python/upcoming_events.py) | Fetch every upcoming event for a coin, page by page |
| [`examples/javascript/upcoming-events.mjs`](examples/javascript/upcoming-events.mjs) | Same with Node.js 18+ (`fetch`) |
| [`examples/webhooks/`](examples/webhooks) | Verify the `CMC-Signature` header of a webhook delivery (Node.js, Python, PHP) |

## Data and license

The code in this repository is released under the [MIT license](LICENSE). The CoinMarketCal data you access with it is governed by the [API Terms of Service](https://coinmarketcal.com/api-terms-of-service).

## Support

Questions about the API: [api@coinmarketcal.com](mailto:api@coinmarketcal.com).
