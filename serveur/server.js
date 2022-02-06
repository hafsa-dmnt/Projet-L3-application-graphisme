const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const basedonnee = require('./bd/basedonnee.js');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/searchUser/:userPseudo', (req, res) => {
  console.log(req.params);
  const sql = "SELECT utilisateur_pseudo FROM utilisateur WHERE utilisateur_pseudo = '"+req.params.userPseudo+"';";
  basedonnee.getQuery(sql)
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
  basedonnee.getQuery(sql)
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
  basedonnee.getQuery(sql)
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
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});
