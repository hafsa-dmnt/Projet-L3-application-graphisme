const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const urlDB = process.env.DATABASE_URL;

const client = new Client({
  connectionString: urlDB,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const getQuery = (sql) => {
    return new Promise(function(resolve, reject) {
        console.log("requete sql", sql);
        client.query(sql, (error, results) => {
        if (error) {
            reject(error)
        }
        console.log('results', results);
        resolve(JSON.stringify(results.rows));
        });
    }) 
}

module.exports = {
    getQuery
}
