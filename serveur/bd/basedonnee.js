//fonction pour se connecter à la bd  / se déconnecter de la bd ? 




//faire une fonction pour exécuter une requête donnée en paramètre 
//pour se connecter quand on a déjà un compte ; pseudo donné, mdp 
"SELECT user_mdp \
FROM utilisateur \
WHERE utilisateur.pseudo = `pseudo`;"


//pour créer un compte 
"INSERT INTO utilisateur (user_pseudo, user_email, user_mdp, user_pdp) VALUES \
(`pseudo`, `email`, `mdp`, `path_pdp`);"


//pour récupérer les listes de thèmes/palettes/publication d'une personne (peut-être récupérer ça à la connexion)



//pour follow/unfollow une personne 
//userFollower follows otheruser
""


//pour récupérer le défi d'une journée donnée : searchedDefiDate
"SELECT theme_nom, palette_nom \
FROM defi, palette, theme \
WHERE `searchedDefiDate` = defi.defi_date AND defi.defi_themeID = theme.theme_ID AND defi.defi_paletteID = palette.paletteID \
"


//pour ajouter un thème ou une palette aux favoris 
""

