require('dotenv').config({encoding: ''})
global.MODE = 'www'
//require('./src/lib/constants.js')
// require('./src/lib/utils.js')
// const market = require('./src/lib/market.js')
// const server = require('./src/lib/server.js')
// const agent = require('./src/lib/agent.js')
// const logger = require('./src/lib/chartlogger.js')
// logger.log('logger [OK]')
//
// const db = require('./src/lib/db.js')

async function main() {

    await db.init()
    await market.init(db)
    await server.init(market)
    await agent.init(server, market)

}


main()
