"""Print every upcoming event for one coin, following the pagination cursor.

Usage: COINMARKETCAL_API_KEY=... python upcoming_events.py ethereum
Requires: pip install requests
"""

import os
import sys

import requests

API = "https://api.coinmarketcal.com/v2/events"


def upcoming_events(coin_slug: str, api_key: str):
    params = {"coins": coin_slug, "limit": 100}
    while True:
        response = requests.get(API, params=params, headers={"x-api-key": api_key}, timeout=30)
        response.raise_for_status()
        page = response.json()
        yield from page["data"]
        cursor = page["meta"].get("cursor")
        if not cursor:
            return
        params["cursor"] = cursor


if __name__ == "__main__":
    coin = sys.argv[1] if len(sys.argv) > 1 else "ethereum"
    for event in upcoming_events(coin, os.environ["COINMARKETCAL_API_KEY"]):
        # displayedDate respects estimated dates ("Q4 2026", "By 30 May 2026").
        print(f"{event['displayedDate']:>16}  {event['title']}")
