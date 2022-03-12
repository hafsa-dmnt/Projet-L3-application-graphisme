const { simulateColorBlind } = require("@cloudinary/url-gen/actions/effect");

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

function complementaire(firstColor){
  var palette=[];
  if(Math.max(firstColor.r, firstColor.g, firstColor.b)>=100){
    var secondColor={r:Math.abs(firstColor.r-30),g:Math.abs(firstColor.g-30),b:Math.abs(firstColor.b-30)};
    var thirdColor={r:Math.abs(firstColor.r-60),g:Math.abs(firstColor.g-60),b:Math.abs(firstColor.b-60)};
  }else{
    var secondColor={r:Math.abs(firstColor.r+30),g:Math.abs(firstColor.g+30),b:Math.abs(firstColor.b+30)};
    var thirdColor={r:Math.abs(firstColor.r+60),g:Math.abs(firstColor.g+60),b:Math.abs(firstColor.b+60)};
  }
  var complementaryColor={r:255-firstColor.r,g:255-firstColor.g,b:255-firstColor.b};
  if(Math.max(complementaryColor.r, complementaryColor.g, complementaryColor.b)>=100){
    var secondCColor={r:Math.abs(complementaryColor.r-30),g:Math.abs(complementaryColor.g-30),b:Math.abs(complementaryColor.b-30)};
  }else{
    var secondCColor={r:Math.abs(complementaryColor.r+30),g:Math.abs(complementaryColor.g+30),b:Math.abs(complementaryColor.b+30)};
  }
  palette.push(convertRgbInHex([thirdColor.r, thirdColor.g, thirdColor.b]));
  palette.push(convertRgbInHex([secondColor.r, secondColor.g, secondColor.b]));
  palette.push(convertRgbInHex([firstColor.r, firstColor.g, firstColor.b]));
  palette.push(convertRgbInHex([complementaryColor.r, complementaryColor.g, complementaryColor.b]));
  palette.push(convertRgbInHex([secondCColor.r, secondCColor.g, secondCColor.b]));
  return palette;
}

function analogue(maxbit,minbit,nbColors,couleurAChanger,firstColor){
  var palette=[];
  palette.push(convertRgbInHex([firstColor.r, firstColor.g, firstColor.b]));
  var interval=Math.floor((maxbit-minbit)/nbColors);
  var ajout=1;
  if(interval<10){
    if(minbit>=100){
      ajout=-1;
      interval=20;
    }else{
      interval=20;
    }
  }
  var j=1;
  while(j<nbColors){
    if(couleurAChanger=="r"){
      firstColor.r = Math.floor(minbit+(ajout*(j*interval)));
    }else{
      if(couleurAChanger=="g"){
        firstColor.g = Math.floor(minbit+(ajout*(j*interval)));
      }else{
        firstColor.b = Math.floor(minbit+(ajout*(j*interval)));
      }
    }
    palette.push(convertRgbInHex([firstColor.r, firstColor.g, firstColor.b]));
    j++;
  }
  return palette;
}

/**
 * Fonction permettant de générer aléatoirement une palette, qui a une taille potentiellement différente à chaque fois et qui est
 * réalisée à partir de méthodes différentes pour diversifier. 
 * @returns une palette de couleurs générée aléatoirement 
 */ 
function getRandomPalette(){
  //on génère aléatoirement une palette composée de minPalette couleurs à maxPalette couleurs
  let nbColors = Math.floor(Math.random()*(maxPalette-minPalette+1))+minPalette;
  //on génère aléatoirement un nombre pour savoir quelle méthode utiliser dans la palette 
  let tabMethode = 0;//Math.floor(Math.random()*(5));
  console.log("methode numero ", tabMethode);
  //la palette à renvoyer à la fin
  let palette = [];

  //on choisit d'abord une première couleur, format RGB
  var firstColor = {r:Math.floor(Math.random()*(255)), g:Math.floor(Math.random()*(255)), b:Math.floor(Math.random()*(255))};
  
  switch(tabMethode){
    case 0: //complementaires
      palette=complementaire(firstColor);
    break;
    case 1: //carré
    break;
    case 2: //analogue
      var j = 1;
      if(firstColor.r>=firstColor.g && firstColor.r>=firstColor.b){
        var maxbit = firstColor.r;
        var couleurAChanger=firstColor.g>=firstColor.b ? "g" : "b";
        var minbit=firstColor.g>=firstColor.b ? firstColor.g : firstColor.b;
      }else{
        if(firstColor.g>=firstColor.r && firstColor.g>=firstColor.b){
          var maxbit = firstColor.g;
          var couleurAChanger=firstColor.b>=firstColor.r ? "b" : "r";
          var minbit=firstColor.b>=firstColor.r ? firstColor.b : firstColor.r;
        }else{
          var maxbit = firstColor.b;
          var couleurAChanger=firstColor.r>=firstColor.g ? "r" : "g";
          var minbit=firstColor.r>=firstColor.g ? firstColor.r : firstColor.g;
        }
      }
      palette=analogue(maxbit,minbit,nbColors,couleurAChanger,firstColor);
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