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

function generateRandString(n) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for(var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}


function generateAccessToken(username) {  
  return jwt.sign(username+generateRandString(32), process.env.TOKEN_SECRET, {});
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

app.get('/parametersUser/:token', (req, res) => {
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

app.get('/pseudouser/:token', (req, res) => {
  var sql = `SELECT utilisateur_pseudo, utilisateur_pdp FROM utilisateur WHERE utilisateur_token='${req.params.token}';`;
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
  var sql = `SELECT publication_id, publication_image FROM publication WHERE publication_utilisateurpseudo='${req.params.pseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//TODO supprimer 
app.get('/pdpuser/:pseudo', (req, res) => {
  var sql = `SELECT utilisateur_pdp FROM utilisateur WHERE utilisateur_pseudo='${req.params.pseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/abonnements/:pseudo', (req, res) => {
  var sql = `SELECT abonner_suivi FROM abonner WHERE abonner_suiveur='${req.params.pseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get les listes de themes de l'utilisateur
app.get('/listesthemes/:token', (req, res) => {
  console.log(req.params);
  sql = `SELECT * FROM theme_list, utilisateur`;
  sql += ` WHERE utilisateur_token = '${req.params.token}'`;
  sql +=  `AND utilisateur_pseudo = tl_utilisateurpseudo;`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get les listes de palettes de l'utilisateur
app.get('/listespalettes/:token', (req, res) => {
  console.log(req.params);
  sql = `SELECT * FROM palette_list, utilisateur`;
  sql += ` WHERE utilisateur_token = '${req.params.token}'`;
  sql +=  `AND utilisateur_pseudo = pl_utilisateurpseudo;`;
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

//get l'id d'un theme
app.get('/idduthemes/:nomtheme', (req, res) => {
  console.log(req.params);
  const sql = `SELECT theme_nom, theme_id FROM theme WHERE theme_nom='${req.params.nomtheme}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//get l'id d'une palette
app.get('/iddelapalettes/:nom', (req, res) => {
  var paletteavecd=req.params.nom.replaceAll("%23","#");
  console.log(req.params);
  const sql = `SELECT palette_nom, palette_id FROM palette WHERE palette_nom='${paletteavecd}';`;
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
  var sql = `SELECT * FROM lien_list_theme, theme, theme_list WHERE `;
  sql+=`l_theme_list_id=${req.params.idList} AND l_theme_id = theme_id AND tl_id =l_theme_list_id ;`;
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

app.use('/changeuserinfo/:oldpseudo-:newpseudo-:bio-:mdp-:mail', (req, res) => {
  var sql = `UPDATE utilisateur SET utilisateur_pseudo = '${req.params.newpseudo}', utilisateur_bio = '${req.params.bio}', utilisateur_mdp = '${req.params.mdp}', utilisateur_email = '${req.params.mail}' WHERE utilisateur_pseudo = '${req.params.oldpseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/publicationsatdate/:dateselected', (req, res) => {
  var sql = "SELECT publication_id, publication_image, publication_utilisateurpseudo FROM publication WHERE publication_datedefi = '"+req.params.dateselected+"';";
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
  const sql = `DELETE from theme_list WHERE tl_id = ${req.params.idList};`;
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
  const sql = `DELETE from palette_list WHERE pl_id = ${req.params.idList};`;
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
app.use('/listthemes/creer/:token-:nom---:icon', (req, res) => {
  console.log(req.params);
  var icon = req.params.icon=="empty" ? "" : req.params.icon;
  var sql = `INSERT INTO theme_list (tl_utilisateurpseudo, tl_nom, tl_icon) `;
  sql+=`SELECT utilisateur.utilisateur_pseudo, '${req.params.nom}', '${icon}' FROM utilisateur WHERE utilisateur.utilisateur_token= '${req.params.token}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});


//ajouter nouvelle liste de palettes
app.use('/listpalettes/creer/:token-:nom---:icon', (req, res) => {
  console.log(req.params);
  var icon = req.params.icon=="empty" ? "" : req.params.icon;
  var sql = `INSERT INTO palette_list (pl_utilisateurpseudo, pl_nom, pl_icon) `;
  sql+=`SELECT utilisateur.utilisateur_pseudo, '${req.params.nom}', '${icon}' FROM utilisateur WHERE utilisateur.utilisateur_token= '${req.params.token}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//ajouter un theme à une liste
app.use('/listthemes/element/creer/:idList-:idTheme', (req, res) => {
  console.log(req.params);
  const sql = `INSERT INTO lien_list_theme (l_theme_id, l_theme_list_id) VALUES ( ${req.params.idTheme}, ${req.params.idList});`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});


//ajouter une palette à une liste
app.use('/listpalettes/element/creer/:idList-:idPalette', (req, res) => {
  console.log(req.params);
  const sql = `INSERT INTO lien_list_palette (l_palette_id, l_palette_list_id) VALUES ( ${req.params.idPalette}, ${req.params.idList});`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//ajouter une palette
app.use('/palette/creer/:nom', (req, res) => {
  var paletteavecd=req.params.nom.replaceAll("%23","#");
  console.log(req.params);
  console.log(res);
  const sql = `INSERT INTO palette (palette_nom) VALUES ( '${paletteavecd}') RETURNING *;`;
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

//ajouter nouvel utilisateur
app.use('/inscription/creer/:pseudo-:mail-:bio-:mdp', (req, res) => {
  console.log(req.params);
  const sql = `INSERT INTO utilisateur (utilisateur_pdp, utilisateur_pseudo, utilisateur_email, utilisateur_bio,utilisateur_mdp, utilisateur_admin) VALUES ( 'pdp_${req.params.pseudo}','${req.params.pseudo}', '${req.params.mail}', '${req.params.bio}', '${req.params.mdp}',false);`;
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
  const sql = `UPDATE utilisateur SET utilisateur_token = '${req.params.token}' WHERE utilisateur_pseudo = '${req.params.pseudo}';`;
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//ajouter une nouvelle publication
app.use('/nouvellepublication/:date.:pseudo.:datedefi.:imageurl', (req, res) => {
  const sql = `INSERT INTO publication (publication_date, publication_utilisateurpseudo, publication_datedefi, publication_image) 
  VALUES ('${req.params.date}', '${req.params.pseudo}', '${req.params.datedefi}', '${req.params.imageurl}');`;
  console.log(sql);
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//un utilisateur follow un autre utilisateur 
app.use('/follow/:alreadyfollowing-:suivi-:suiveur', (req, res) => {
  let sql = `INSERT INTO abonner (abonner_suiveur, abonner_suivi) 
  VALUES ('${req.params.suiveur}', '${req.params.suivi}');`;
  if(req.params.alreadyfollowing == "true"){
    sql = `DELETE FROM abonner WHERE abonner_suiveur = '${req.params.suiveur}' AND abonner_suivi = '${req.params.suivi}' ;`;
  }
  console.log(sql);
  basedonnee.getQuery(sql)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

//un utilisateur unfollow un autre utilisateur 
app.get('/followinguser/:pseudosuivi.:pseudosuiveur', (req, res) => {
  const sql = `SELECT * FROM abonner WHERE abonner_suivi = '${req.params.pseudosuivi}' 
  AND  abonner_suiveur = '${req.params.pseudosuiveur}' ;`;
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
