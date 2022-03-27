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

function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b);
  let cmax = Math.max(r,g,b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  // No difference
  if (delta === 0){
    h = 0;
  }
  // Red is max
  else{
    if (cmax === r){
      h = ((g - b) / delta) % 6;
    }
  // Green is max
    else{
      if (cmax === g){
        h = (b - r) / delta + 2;
      }
    // Blue is max
      else{
        h = (r - g) / delta + 4;
      }
    }
  }

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0){
      h += 360;
  }

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = Math.floor(+(s * 100));
  l = Math.floor(+(l * 100));

  return [h,s,l];
}

function HSLToRGB(h,s,l) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c/2;
  let r = 0;
  let g = 0;
  let b = 0;

      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return [r, g,b];
}

function complementaire(firstColor){
  var palette=[];
  var secondColor;
  var thirdColor
  if(Math.max(firstColor.r, firstColor.g, firstColor.b)>=100){
    secondColor={r:Math.abs(firstColor.r-30),g:Math.abs(firstColor.g-30),b:Math.abs(firstColor.b-30)};
    thirdColor={r:Math.abs(firstColor.r-60),g:Math.abs(firstColor.g-60),b:Math.abs(firstColor.b-60)};
  }else{
    secondColor={r:Math.abs(firstColor.r+30),g:Math.abs(firstColor.g+30),b:Math.abs(firstColor.b+30)};
    thirdColor={r:Math.abs(firstColor.r+60),g:Math.abs(firstColor.g+60),b:Math.abs(firstColor.b+60)};
  }
  var complementaryColor={r:255-firstColor.r,g:255-firstColor.g,b:255-firstColor.b};
  var secondCColor;
  if(Math.max(complementaryColor.r, complementaryColor.g, complementaryColor.b)>=100){
    secondCColor={r:Math.abs(complementaryColor.r-30),g:Math.abs(complementaryColor.g-30),b:Math.abs(complementaryColor.b-30)};
  }else{
    secondCColor={r:Math.abs(complementaryColor.r+30),g:Math.abs(complementaryColor.g+30),b:Math.abs(complementaryColor.b+30)};
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
  if(interval<18){
    if(minbit>=128){
      ajout=-1;
      interval=25;
    }else{
      interval=25;
    }
  }
  var j=1;
  while(j<nbColors){
    if(couleurAChanger==="r"){
      firstColor.r = Math.floor(minbit+(ajout*(j*interval)));
    }else{
      if(couleurAChanger==="g"){
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
export function getRandomPalette(){
  //on génère aléatoirement une palette composée de minPalette couleurs à maxPalette couleurs
  let nbColors = Math.floor(Math.random()*(maxPalette-minPalette+1))+minPalette;
  //on génère aléatoirement un nombre pour savoir quelle méthode utiliser dans la palette
  let tabMethode = Math.floor(Math.random()*(5));
  //la palette à renvoyer à la fin
  let palette = [];

  //on choisit d'abord une première couleur, format RGB
  var firstColor = {r:Math.floor(Math.random()*(255)), g:Math.floor(Math.random()*(255)), b:Math.floor(Math.random()*(255))};

  switch(tabMethode){
    case 0: //complementaires
      palette=complementaire(firstColor);
    break;
    case 1: //carré
      var HSL=RGBToHSL(firstColor.r,firstColor.g,firstColor.b);
      var newH2= HSL[0]+90<360 ? HSL[0]+90 : HSL[0]+90 -360 ;
      var HSL2=[newH2,HSL[1],HSL[2]];
      var newH3= HSL[0]-90>=0 ? HSL[0]-90 : 360 + (HSL[0]+90) ;
      var HSL3=[newH3,HSL[1],HSL[2]];
      var newH4= HSL[0]+180<360 ? HSL[0]+180 : HSL[0]+180 -360 ;
      var HSL4=[newH4,HSL[1],HSL[2]];
      var secondHSL1;
      if(HSL[2]>=50){
        secondHSL1=[HSL[0],HSL[1],HSL[2]-20];
      }else{
        secondHSL1=[HSL[0],HSL[1],HSL[2]+20];
      }
      palette.push(convertRgbInHex(HSLToRGB(secondHSL1[0],secondHSL1[1],secondHSL1[2])));
      palette.push(convertRgbInHex([firstColor.r,firstColor.g,firstColor.b]));
      palette.push(convertRgbInHex(HSLToRGB(HSL3[0],HSL3[1],HSL3[2])));
      palette.push(convertRgbInHex(HSLToRGB(HSL2[0],HSL2[1],HSL2[2])));
      palette.push(convertRgbInHex(HSLToRGB(HSL4[0],HSL4[1],HSL4[2])));
    break;
    case 2: //analogue
    var maxbit;
    var couleurAChanger;
    var minbit;
      if(firstColor.r>=firstColor.g && firstColor.r>=firstColor.b){
        maxbit = firstColor.r;
        couleurAChanger=firstColor.g>=firstColor.b ? "g" : "b";
        minbit=firstColor.g>=firstColor.b ? firstColor.g : firstColor.b;
      }else{
        if(firstColor.g>=firstColor.r && firstColor.g>=firstColor.b){
          maxbit = firstColor.g;
          couleurAChanger=firstColor.b>=firstColor.r ? "b" : "r";
          minbit=firstColor.b>=firstColor.r ? firstColor.b : firstColor.r;
        }else{
          maxbit = firstColor.b;
          couleurAChanger=firstColor.r>=firstColor.g ? "r" : "g";
          minbit=firstColor.r>=firstColor.g ? firstColor.r : firstColor.g;
        }
      }
      palette=analogue(maxbit,minbit,nbColors,couleurAChanger,firstColor);
    break;
    case 3: //triangle
      HSL=RGBToHSL(firstColor.r,firstColor.g,firstColor.b);
      newH2= HSL[0]+120<360 ? HSL[0]+120 : HSL[0]+120 -360 ;
      HSL2=[newH2,HSL[1],HSL[2]];
      newH3= HSL[0]-120>=0 ? HSL[0]-120 : 360 + (HSL[0]+120) ;
      HSL3=[newH3,HSL[1],HSL[2]];
      if(HSL[2]>=50){
        secondHSL1=[HSL[0],HSL[1],HSL[2]-20];
        var secondHSL2=[HSL2[0],HSL2[1],HSL2[2]-20];
      }else{
        secondHSL1=[HSL[0],HSL[1],HSL[2]+20];
        secondHSL2=[HSL2[0],HSL2[1],HSL2[2]+20];
      }
      palette.push(convertRgbInHex(HSLToRGB(secondHSL1[0],secondHSL1[1],secondHSL1[2])));
      palette.push(convertRgbInHex([firstColor.r,firstColor.g,firstColor.b]));
      palette.push(convertRgbInHex(HSLToRGB(HSL3[0],HSL3[1],HSL3[2])));
      palette.push(convertRgbInHex(HSLToRGB(HSL2[0],HSL2[1],HSL2[2])));
      palette.push(convertRgbInHex(HSLToRGB(secondHSL2[0],secondHSL2[1],secondHSL2[2])));
    break;
    case 4: //rectangle
      HSL=RGBToHSL(firstColor.r,firstColor.g,firstColor.b);
      newH2= HSL[0]+45<360 ? HSL[0]+45 : HSL[0]+45 -360 ;
      HSL2=[newH2,HSL[1],HSL[2]];
      newH3= HSL[0]+180<360 ? HSL[0]+180 : HSL[0]+180 -360 ;
      HSL3=[newH3,HSL[1],HSL[2]];
      newH4= HSL[0]+225<360 ? HSL[0]+225 : HSL[0]+225 -360 ;
      HSL4=[newH4,HSL[1],HSL[2]];
      if(HSL[2]>=50){
        secondHSL1=[HSL[0],HSL[1],HSL[2]-20];
      }else{
        secondHSL1=[HSL[0],HSL[1],HSL[2]+20];
      }
      palette.push(convertRgbInHex(HSLToRGB(secondHSL1[0],secondHSL1[1],secondHSL1[2])));
      palette.push(convertRgbInHex([firstColor.r,firstColor.g,firstColor.b]));
      palette.push(convertRgbInHex(HSLToRGB(HSL2[0],HSL2[1],HSL2[2])));
      palette.push(convertRgbInHex(HSLToRGB(HSL3[0],HSL3[1],HSL3[2])));
      palette.push(convertRgbInHex(HSLToRGB(HSL4[0],HSL4[1],HSL4[2])));
    break;
    default :
    break;
  }
  return palette;
}
