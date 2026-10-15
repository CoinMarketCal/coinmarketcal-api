"""Verify the CMC-Signature header of a CoinMarketCal webhook delivery."""

import hashlib
import hmac


def is_valid_signature(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
