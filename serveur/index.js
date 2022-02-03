const express = require('express');
const app = express();
const port = 80;

const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://vhaycjrvwoovdh:801dd13e4cb2b375c4940b437ec9fd8db7676d78a9e7039e1bc79b4d6eef5f79@ec2-23-23-199-57.compute-1.amazonaws.com:5432/d7jqv9s53ricm9",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const basedonnee = require('./bd/basedonnee.js');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/searchUser/:userPseudo', (req, res) => {
  console.log(req.params);
  const sql = "SELECT utilisateur_pseudo FROM utilisateur WHERE utilisateur_pseudo = '"+req.params.userPseudo+"';";
  basedonnee.getQuery(sql, client)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/parametersUser/:userPseudo', (req, res) => {
  console.log(req.params);
  const sql = "SELECT * FROM utilisateur WHERE utilisateur_pseudo = '"+req.params.userPseudo+"';";
  basedonnee.getQuery(sql, client)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/list/:userPseudo-:type', (req, res) => {
  console.log(req.params);
  const sql = "SELECT * FROM";
  if(req.params.type === "theme"){
      sql += "theme_list";
  }else{
      sql += "palette_list";
  }
  sql +=  "WHERE utilisateur_pseudo = '"+req.params.pseudo+"';";
  basedonnee.getQuery(sql, client)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/themeslist', (req, res) => {
  console.log(req.params);
  const sql = "SELECT theme_nom FROM theme;";
  basedonnee.getQuery(sql, client)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});
