const Pool = require('pg').Pool
require('dotenv').config()

// Development config files if in development
// const devConfig = {
//     host: process.env.PGHOST,
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     database: process.env.PGDATABASE,
//     port: process.env.PGPORT
// }

// const productionConfig = {
//     connectionString: process.env.DATABASE_URL // heroku addons
// }

// Development config files if in development
const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

// production connectionString to check if in production
const productionConfig = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? productionConfig : devConfig
});

module.exports = pool