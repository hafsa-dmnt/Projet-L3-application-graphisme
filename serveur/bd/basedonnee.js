const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const urlDB = process.env.HEROKU_POSTGRESQL_PINK_URL;

const client = new Client({
  connectionString: urlDB,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const getQuery = (sql) => {
    return new Promise(function(resolve, reject) {
      client.query(sql, (error, results) => {
        if (error) {
            reject(error)
        }
        if(results != undefined){
          resolve(JSON.stringify(results.rows));
        }
      });
    })
}

module.exports = {
  getQuery
}
