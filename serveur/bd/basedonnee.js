const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://vhaycjrvwoovdh:801dd13e4cb2b375c4940b437ec9fd8db7676d78a9e7039e1bc79b4d6eef5f79@ec2-23-23-199-57.compute-1.amazonaws.com:5432/d7jqv9s53ricm9",
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

