// Verify CoinMarketCal webhook deliveries (Express). Requires: npm install express
import crypto from "node:crypto";
import express from "express";

const app = express();
const SECRET = process.env.CMC_WEBHOOK_SECRET;

app.post("/cmc/webhooks", express.raw({ type: "application/json" }), (req, res) => {
  const sigHeader = req.header("CMC-Signature") ?? "";
  const expected = "sha256=" + crypto.createHmac("sha256", SECRET).update(req.body).digest("hex");
  const sigBuf = Buffer.from(sigHeader);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return res.status(401).end();
  }
  const event = JSON.parse(req.body.toString("utf8"));
  console.log(event.type, event);
  res.status(200).end();
});

app.listen(3000);
