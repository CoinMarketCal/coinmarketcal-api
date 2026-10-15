#!/bin/sh
# Adds the CoinMarketCal MCP server to Claude Code.
claude mcp add --transport http \
  coinmarketcal https://coinmarketcal.com/mcp \
  --header "x-api-key: YOUR_API_KEY"
