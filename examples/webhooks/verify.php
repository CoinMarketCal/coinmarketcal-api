<?php
$secret  = getenv('CMC_WEBHOOK_SECRET');
$payload = file_get_contents('php://input');
$sig     = $_SERVER['HTTP_CMC_SIGNATURE'] ?? '';
$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);
if (!hash_equals($expected, $sig)) {
  http_response_code(401);
  exit;
}
$event = json_decode($payload, true);
// ... handle event
http_response_code(200);
