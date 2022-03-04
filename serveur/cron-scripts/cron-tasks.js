const cron = require("node-cron");
const basedonnee = require('../bd/basedonnee.js');
const getRandomPalette = require('../../client/src/routes/getRandPalette');

/**
 * Toutes les 24h, on tire aléatoirement une palette et un thème pour l'ajouter à un défi du jour s'il n'y en a pas un déjà existant à la date considérée
 */
/*
const createDefi = cron.schedule(
  '* * * * *',
  async function () {

    const dateSelected = new Date();
    var month = Number(dateSelected.getMonth())+1;
    if(month < 10){
        month = "0"+month;
    }
    var day = Number(dateSelected.getDate());
    if(day < 10){
        day = "0"+day;
    }
    var year = 2000 + (Number(dateSelected.getYear())-100);
    var dateDefi = year +"-"+month+"-"+day;

    try {
      var res = await basedonnee.getQuery(
        `SELECT defi_date FROM defi WHERE defi_date = '${dateDefi}';`
      );
      if(res.length > 0){
        console.log("no result, we have to create one");

        res = await basedonnee.getQuery(
          `SELECT max(theme_id) AS maxT, max(palette_id) AS maxP
          FROM theme, palette;`
        );

        var nbPalTheme = res.parse();
        //split , puis split :

        console.log(nbPalTheme);
        console.log(nbPalTheme[0]);

        var themeRetenu = Math.floor(Math.random() * Number(nbPalTheme[0][maxt]))+1; 
        var paletteRetenue = Math.floor(Math.random() * Number(nbPalTheme[0][maxp]))+1; 
        console.log(themeRetenu, paletteRetenue);
        //res = await basedonnee.getQuery(`INSERT INTO defi (defi_date, defi_themeid, defi_paletteid) VALUES ('${dateDefi}', ${themeRetenu}, ${paletteRetenue})`)
        
      }else{
        console.log("we none");
      }
    } catch (err) {
      console.log(err);
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Paris"
  }
);

createDefi.start();
*/

module.exports =  { }
