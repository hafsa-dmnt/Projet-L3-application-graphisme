const cron = require("node-cron");
const basedonnee = require('../bd/basedonnee.js');

/**
 * Toutes les 24h, on tire aléatoirement une palette et un thème pour l'ajouter à un défi du jour s'il n'y en a pas un déjà existant à la date considérée
 */
const createDefi = cron.schedule(
  /*
  "* * *3 * * *",
  async function () {
    const sql = `;`;

    try {
      const listOfDuels = {};
      const res = await getQuery(sql);
      console.log("done");
    } catch (err) {
      Logger.error(err, "Impossible to create a défi");
    }
  }
  */
  '* * * * *', () => { 
    console.log('running a task every minute');
  }
);

createDefi.start();

module.exports =  { createDefi }
