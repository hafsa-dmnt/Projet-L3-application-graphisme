const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3001;

console.log("port :", port);

const basedonnee = require('./bd/basedonnee.js');

const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

}

// access config var
var rrrr = process.env.TOKEN_SECRET;

// console.log that your server is up and running
app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));


function generateAccessToken(username) {
  return jwt.sign(username+"ofijf", process.env.TOKEN_SECRET, {});
  // le token expire tout les 30 j (donc reconnexion tout les mois)
}


function validate(token) {


  try {
    var deco = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch(err) {
    return false;
  }

  return true;
 }

app.use('/Connexion/:pseudo', (req, res) => {
  res.send({
    token: generateAccessToken(req.params.pseudo)
  });
});

app.use('/validateToken/:token', (req, res) => {
  res.send(validate(req.params.token));
});


// create a GET route
app.get('/searchUser/:userPseudo', (req, res) => {
  console.log(req.params);
  const sql = `SELECT utilisateur_pseudo FROM utilisateur WHERE utilisateur_pseudo = '${req.params.userPseudo}';`;
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
  const sql = `SELECT * FROM utilisateur WHERE utilisateur_pseudo = '${req.params.userPseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/pseudouser/:token', (req, res) => {
  var sql = `SELECT utilisateur_pseudo FROM utilisateur WHERE utilisateur_token='${req.params.token}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/publicationsofuser/:token', (req, res) => {
  var sql = `SELECT publication_id, publication_image FROM utilisateur, publication WHERE utilisateur_token='${req.params.token}' AND utilisateur_pseudo=publication_utilisateurpseudo;`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/publicationsofuserpseudo/:pseudo', (req, res) => {
  var sql = `SELECT publication_id, publication_image FROM utilisateur, publication WHERE utilisateur_pseudo='${req.params.pseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get les listes de themes ou de palettes de l'utilisateur
app.get('/list/:userPseudo-:type', (req, res) => {
  console.log(req.params);
  sql = `SELECT * FROM `;
  if(req.params.type === "theme"){
      sql += `theme_list WHERE tl_utilisateurpseudo =`;
  }else{
      sql += `palette_list WHERE pl_utilisateurpseudo =`;
  }
  sql +=  ` '${req.params.userPseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get tous les thèmes
app.get('/themeslist', (req, res) => {
  console.log(req.params);
  const sql = `SELECT theme_nom FROM theme;`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get tous les thèmes d'une liste de thème
app.get('/listthemes/:idList', (req, res) => {
  console.log(req.params);
  var sql = `SELECT * FROM lien_list_theme, theme WHERE `;
  sql+=`l_theme_list_id=${req.params.idList} AND l_theme_id = theme_id ;`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get toutes les palettes d'une liste de palettes
app.get('/listpalettes/:idList', (req, res) => {
  console.log(req.params);
  var sql = `SELECT * FROM lien_list_palette, palette WHERE `;
  sql+=`l_palette_list_id=${req.params.idList} AND l_palette_id = palette_id ;`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});


app.get('/defiatdate/:dateselected', (req, res) => {
  var sql = "SELECT theme.theme_nom, palette.palette_nom FROM theme, palette, defi WHERE defi_date = '"+req.params.dateselected+"' AND defi_themeid = theme_id AND defi_paletteid = palette_id;";
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/publicationsatdate/:dateselected', (req, res) => {
  var sql = "SELECT publication_id, publication_image FROM publication WHERE publication_datedefi = '"+req.params.dateselected+"';";
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/mailExists/:mail', (req, res) => {
  var sql = "SELECT * FROM utilisateur WHERE utilisateur_email = '"+req.params.mail+"';";
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get le mot de passe d'un utilisateur
app.get('/pseudomdp/:pseudo', (req, res) => {
  var sql = "SELECT * FROM utilisateur WHERE utilisateur_pseudo = '"+req.params.pseudo+"';";
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/userPseudoExists/:pseudo', (req, res) => {
  var sql = "SELECT * FROM utilisateur WHERE utilisateur_pseudo = '"+req.params.pseudo+"';";
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get les informations d'une liste de thème
app.get('/listthemesinfo/:idList', (req, res) => {
  console.log(req.params);
  const sql = `SELECT * FROM theme_list WHERE tl_id = ${req.params.idList};`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get les informations d'une liste de palettes
app.get('/listpalettesinfo/:idList', (req, res) => {
  console.log(req.params);
  var sql = `SELECT * FROM palette_list WHERE pl_id = ${req.params.idList};`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//delete une liste de themes depuis la page de la liste
app.use('/listthemes/delete/:idList', (req, res) => {
  console.log(req.params);
  sql = "SELECT * FROM palette_list";
  sql +="WHERE pl_utilisateurpseudo = '"+req.params.userPseudo+"';";
  sql +="AND pl_nom = '"+req.params.nomListPalette+"';";
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//delete une liste de palettes depuis la page de la liste
app.use('/listpalettes/delete/:idList', (req, res) => {
  console.log(req.params);
  sql = "SELECT * FROM theme_list";
  sql +="WHERE tl_utilisateurpseudo = '"+req.params.userPseudo+"';";
  sql +="AND tl_nom = '"+req.params.nomListTheme+"';";
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//delete un theme d'une liste
app.use('/listthemes/element/delete/:idList-:idTheme', (req, res) => {
  console.log(req.params);
  const sql = `DELETE from lien_list_theme WHERE l_theme_list_id = ${req.params.idList} AND l_theme_id= ${req.params.idTheme};`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//delete une palette d'une liste
app.use('/listpalettes/element/delete/:idList-:idPalette', (req, res) => {
  console.log(req.params);
  const sql = `DELETE from lien_list_palette WHERE l_palette_list_id = ${req.params.idList} AND l_palette_id= ${req.params.idPalette};`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//ajouter nouvelle liste de themes
app.use('/listthemes/creer/:userpseudo-:nom-:icon', (req, res) => {
  console.log(req.params);
  var icon = req.params.icon=="empty" ? "" : req.params.icon;
  const sql = `INSERT INTO theme_list (tl_utilisateurpseudo, tl_nom, tl_icon) VALUES ( '${req.params.userpseudo}', '${req.params.nom}', '${icon}');`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//ajouter nouvelle liste de palettes
app.use('/listpalettes/creer/:userpseudo-:nom-:icon', (req, res) => {
  console.log(req.params);
  const sql = `INSERT INTO palette_list (pl_utilisateurpseudo, pl_nom, pl_icon) VALUES ( '${req.params.userpseudo}', '${req.params.nom}', '${req.params.icon}');`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//modifier liste de themes
app.use('/listthemes/modifier/:idlist-:nom-:icon', (req, res) => {
  console.log(req.params);
  const sql = `UPDATE theme_list SET tl_nom = '${req.params.nom}', tl_icon = '${req.params.icon}' WHERE tl_id = ${req.params.idlist};`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//modifier liste de palettes
app.use('/listpalettes/modifier/:idlist-:nom-:icon', (req, res) => {
  console.log(req.params);
  const sql = `UPDATE palette_list SET pl_nom = '${req.params.nom}', pl_icon = '${req.params.icon}' WHERE pl_id = ${req.params.idlist};`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//ajouter nouvelle liste de palettes
app.use('/inscription/creer/:pdp-:pseudo-:mail-:bio-:mdp', (req, res) => {
  console.log(req.params);
  const sql = `INSERT INTO utilisateur (utilisateur_pdp, utilisateur_pseudo, utilisateur_email, utilisateur_bio,utilisateur_mdp, utilisateur_admin) VALUES ( '${req.params.pdp}','${req.params.pseudo}', '${req.params.mail}', '${req.params.bio}', '${req.params.mdp}',false);`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get pour vérifier que le token n'est pas déjà présent
app.use('/getVerifToken/:token', (req, res) => {
  console.log(req.params);
  const sql = `SELECT * FROM utilisateur WHERE utilisateur_token = '${req.params.token}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//modifier le token d'une personne
app.use('/modifierToken/:pseudo-:token', (req, res) => {
  console.log("je modifie le token", req.params.pseudo);
  const sql = `UPDATE utilisateur SET utilisateur_token = 'hello' WHERE utilisateur_pseudo = '${req.params.pseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});



/*
delete une liste depuis la page de la liste : fait
"DELETE from theme_list WHERE tl_id = "+req.params.idList+";"
"DELETE from palette_list WHERE tl_id = "+req.params.idList+";"

delete un element d'une liste : fait
`DELETE from lien_list_theme WHERE l_theme_list_id = ${req.params.idList} AND l_theme_id= ${req.params.idTheme};`
"DELETE from lien_list_palette WHERE l_palette_list_id = ${req.params.idList} AND l_palette_id= ${req.params.idPalette};"

ajouter element à liste :
"INSERT INTO lien_list_theme (l_theme_id, l_theme_list_id) VALUES ( ${req.params.idTheme}, ${req.params.idList});"
"INSERT INTO lien_list_palette (l_palette_id, l_palette_list_id) VALUES ( ${req.params.idPalette}, ${req.params.idList});"

ajouter nouvelle liste : fait
"INSERT INTO theme_list (tl_utilisateurpseudo, tl_nom, tl_icon) VALUES ( "+req.params.userPseudo+", "+req.params.nom+", "+req.params.icon+");"
"INSERT INTO palette_list (pl_utilisateurpseudo, pl_nom, pl_icon) VALUES ( "+req.params.userPseudo+", "+req.params.nom+", "+req.params.icon+");"

modifier liste : fait
"UPDATE theme_list SET tl_nom = "+req.params.nom+", tl_icon = "+req.params.icon+" WHERE tl_id = "+req.params.idList+";"
"UPDATE palette_list SET pl_nom = "+req.params.nom+", pl_icon = "+req.params.icon+" WHERE pl_id = "+req.params.idList+";"

sql en dur
INSERT INTO theme_list (tl_utilisateurpseudo, tl_nom) VALUES ( 'user1', 'dessin');
INSERT INTO lien_list_theme (l_theme_id, l_theme_list_id) VALUES ( 1, 1);

});*/

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('/app/client/build/index.html'))
  });
}
