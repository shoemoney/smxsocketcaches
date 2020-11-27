require('dotenv').config({encoding: ''})
//require('./src/lib/constants.js')
// require('./src/lib/utils.js')
// const market = require('./src/lib/market.js')
// const server = require('./src/lib/server.js')
// const agent = require('./src/lib/agent.js')
// const logger = require('./src/lib/chartlogger.js')
// logger.log('logger [OK]')
//
// const db = require('./src/lib/db.js')

const bbwsinverse = require('./lib/bbwsinverse.js')
const bbwslinear = require('./lib/bbwslinear')


async function main() {

    await bbwsinverse.init()
    await bbwslinear.init()

    // await market.init(db)
    // await server.init(market)
    //
    // await bidsaskCachePrice.init()
    // await marketPriceCache.init()
    //
    // await agent.init(server, market)

}


main().then(r => console.log( 'OK'))
