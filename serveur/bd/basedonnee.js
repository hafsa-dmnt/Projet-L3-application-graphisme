const getQuery = (sql, client) => {
    return new Promise(function(resolve, reject) {
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

