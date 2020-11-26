require("dotenv").config();
const Redis = require("ioredis");
const {WebsocketClient} = require("bybit-api");
const redis = new Redis({
    port: 6379, // Redis port
    host: process.env.REDIS_HOST, // Redis host
    db: 5,
});
const ws = new WebsocketClient({
    "livenet": "true",
    "host": "wss://stream.bytick.com/realtime_public",

});
//ws.subscribe(['trade.BTCUSD', 'trade.ETHUSD', 'trade.EOSUSD', 'trade.XRPUSD'])


ws.subscribe(['trade.BTCUSDT'])
ws.on('open', () => {
    // eslint-disable-next-line no-console
    console.log('connection open')
})

ws.on('update', (message) => {
    console.log(message)
    for (let i = 0; i < message.data.length; i++) {
        const amt = parseFloat(`${message.data[i].price}`)
        let symbol = `${message.data[i].symbol}`
        let cshkey = symbol + '_SPOT_PRICE'
        console.log(symbol, amt, cshkey)
        redis.set('btc_last_trade_price', amt, 'EX', 20)
    }
})

ws.on("close", () => {
    console.log("connection closed");
});

ws.on("error", (err) => {
    console.error("ERR", err);
});
