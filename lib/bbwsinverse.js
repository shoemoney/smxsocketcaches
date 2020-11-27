require("dotenv").config();
const Redis = require("ioredis");

const {WebsocketClient} = require("bybit-api");
const redis = new Redis({host: process.env.REDIS_HOST, db: 5,})
const pub = new Redis({host: process.env.REDIS_HOST, db: 5,});

async function init() {
    const ws = new WebsocketClient({
        livenet: "true",
    });

    ws.subscribe(["trade.BTCUSD"]);

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
            redis.set('cshkey', amt, 'EX', 20)
        }
    })

    ws.on("close", () => {
        console.log("connection closed");
    });

    ws.on("error", (err) => {
        console.error("ERR", err);
    });


}

module.exports = {init};
