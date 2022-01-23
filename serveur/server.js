const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const basedonnee = require('./bd/basedonnee.js');
const server = require('http').createServer(app);

// console.log that your server is up and running
server.listen(port, () => console.log(`Listening on port ${port}`));





// create a GET route
app.get('/searchUser/:userPseudo', (req, res) => {
  console.log(req.params);
  basedonnee.getUsers(req.params.userPseudo)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/parametersUser/:userPseudo', (req, res) => {
  console.log(req.params);
  basedonnee.getUsersAllInfo(req.params.userPseudo)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});
