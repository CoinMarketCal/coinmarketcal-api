#!/bin/sh
# Requires: export COINMARKETCAL_API_KEY=...
API=https://api.coinmarketcal.com

# Upcoming events for Ethereum and Solana (coin slugs, not tickers).
curl -s "$API/v2/events?coins=ethereum,solana&limit=10" -H "x-api-key: $COINMARKETCAL_API_KEY"

# One event by id.
curl -s "$API/v2/events/48291" -H "x-api-key: $COINMARKETCAL_API_KEY"

# Look up a coin and its canonical slug.
curl -s "$API/v2/coins/ethereum" -H "x-api-key: $COINMARKETCAL_API_KEY"
