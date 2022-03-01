let minPalette = 5;
let maxPalette = 5;


/**
 * Fonction permettant de convertir une couleur sous forme r, g, b en hexadécimal, sous forme de chaine de caractères. 
 * @param {*} tab Le tableau contenant r, g et b.
 */
function convertRgbInHex(tab){
  var chaineHexa = "#";
  for(const element of tab){
    var interm = element.toString(16);
    if(interm.length === 1){
      chaineHexa += 0+interm;
    }else{
      chaineHexa += interm;
    }
  }
  return chaineHexa.toUpperCase();
}

/**
 * Fonction permettant de convertir une couleur sous forme h, s, l en rgb 
 * (fonction de https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex/54014428#54014428)
 * @param {*} h 
 * @param {*} s 
 * @param {*} l 
 * @returns 
 */
/*
function hsl2rgb(h,s,l) 
{
  let a= s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0),f(8),f(4)];
}  
*/

/**
 * Fonction permettant de générer aléatoirement une palette, qui a une taille potentiellement différente à chaque fois et qui est
 * réalisée à partir de méthodes différentes pour diversifier. 
 * @returns une palette de couleurs générée aléatoirement 
 */ 
function getRandomPalette(){
  //on génère aléatoirement une palette composée de minPalette couleurs à maxPalette couleurs
  let nbColors = Math.floor(Math.random()*(maxPalette-minPalette+1))+minPalette;
  //on génère aléatoirement un nombre pour savoir quelle méthode utiliser dans la palette 
  let tabMethode = 2;//Math.floor(Math.random()*(5));
  console.log("methode numero ", tabMethode);
  //la palette à renvoyer à la fin
  let palette = [];

  //on choisit d'abord une première couleur, format RGB
  var firstColor = {r:Math.floor(Math.random()*(255)), g:Math.floor(Math.random()*(255)), b:Math.floor(Math.random()*(255))};
  palette.push(convertRgbInHex([firstColor.r, firstColor.g, firstColor.b]));
  
  switch(tabMethode){
    case 0: //complementaires
      //var i = 1;
        firstColor.r = (firstColor.r + Math.floor(Math.random()*(21))+128)%255;
        firstColor.g = (firstColor.g + Math.floor(Math.random()*(31))+128)%255;
        firstColor.b = (firstColor.g + Math.floor(Math.random()*(11))+128)%255;
        palette.push(convertRgbInHex([firstColor.r, firstColor.g, firstColor.b]));
    break;
    case 1: //carré
    break;
    case 2: //analogue
      var j = 1;
      while(j<nbColors){
        firstColor.r = (firstColor.r + Math.floor(Math.random()*(50-15+1))+20)%255;
        firstColor.g = (firstColor.g + Math.floor(Math.random()*(50-15+1))+20)%255;
        firstColor.b = (firstColor.g + Math.floor(Math.random()*(50-15+1))+20)%255;
        palette.push(convertRgbInHex([firstColor.r, firstColor.g, firstColor.b]));
        ++j;
      }
    break;
    case 3: //triangle

    break;
    case 4: //rectangle

    break;
    default : 
    break;
  }
  return palette;
}

module.exports =  { getRandomPalette }