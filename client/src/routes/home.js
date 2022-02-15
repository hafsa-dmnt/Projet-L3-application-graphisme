import React from 'react';
import '../App.css';
import '../CSS/home.css';
import { Icon } from '@iconify/react';
/*
import {
  Link
} from "react-router-dom";*/

let minPalette = 5;
let maxPalette = 5;

/*function Home() {
  return (
    <div>
      <h2>GetRandomArt()</h2>
      <p>Thème du jour : forêt</p>
      <p>Palette du jour : bleu vert orange</p>
      <button>getRandomArt()</button>
    </div>
  );
}*/

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
function hsl2rgb(h,s,l) 
{
  let a= s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0),f(8),f(4)];
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
  let tabMethode = Math.floor(Math.random()*(5));
  console.log("methode numero ", tabMethode);
  //la palette à renvoyer à la fin
  let palette = [];

  //on choisit d'abord une première couleur, format RGB
  var firstColor = {r:Math.floor(Math.random()*(255)), g:Math.floor(Math.random()*(255)), b:Math.floor(Math.random()*(255))};
  palette.push(convertRgbInHex([firstColor.r, firstColor.g, firstColor.b]));
  
  switch(tabMethode){
    case 0: //complementaires
      var i = 1;
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

/**
 * Fonction permettant de générer aléatoirement une palette, qui a une taille potentiellement différente à chaque fois et qui est
 * réalisée à partir de méthodes différentes pour diversifier. 
 * @returns une palette de couleurs générée aléatoirement 
 */ 
 function getRandomTheme(list){
   let nbRandom =  Math.floor(Math.random()*(list.length));
   return list[nbRandom].theme_nom;
 }

class AddToFav extends React.Component{
  render(){
    return(
        <button className="btnAddToFav">
          <Icon icon="ant-design:star-filled"/>
        </button>
    );
  }
}

class ThemeHome extends React.Component{
  render(){
    return(
      <div className="themeHome">
        <h3>Thème</h3>
        <AddToFav/>
        <p>{this.props.theme}</p>
      </div>
    );
  }
}

class PaletteHome extends React.Component{
  render(){
    return(
      <div className="paletteHome">
        <h3>Palette</h3>
        <AddToFav/>
        <Palette content={this.props.palette}/>
      </div>
    );
  }
}

/*
class BoutonGetRandomArt extends React.Component{
  handleClick() {
    super.handleClick();
  }
  render(){
    return(
      <button className="btnGetRandomArt" onClick={() => this.handleClick()}>GetRandomArt()</button>
    );
  }
}
*/

/*
TODO : adapter l'affichage des palettes
  - un cercle avec un demi cercle par couleur pour complémentaires
  - des rectangles collés pour analogues
  - un carré pour carré mdr
  - un triangle pour triangle .... 
  - comme carré pour rectangle 
*/
class Palette extends React.Component{
  render(){
    const tabPalette = this.props.content;
    const divPalette = tabPalette.map((elt) => 
      <div key={elt} className="colorPalette" style={{background:elt}}>
        <p>{elt}</p>
      </div>  );
    return(
      <section className="palette">
        {divPalette}
      </section>
    );
  }
}

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      theme: "",
    }
  }
  handleClick() {
    let tabPal = this.state.palette;
    tabPal = getRandomPalette();
    let newTheme = "";
    do {
      newTheme = getRandomTheme(this.state.liste);
    } while(newTheme === this.state.theme);
    let liste = this.state.liste;
    this.setState({palette: tabPal, theme: newTheme, liste: liste});
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ liste: res, theme:"", palette:[]}))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/themeslist');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log("requete", body);
    return body;
  };

  render(){
    //choix du thème aléatoire au début 
    return(
      <div className="page home">
        <ThemeHome theme={this.state.theme}/>
        <PaletteHome palette={this.state.palette}/>
        <button className="btnGetRandomArt" onClick={() => this.handleClick()}>GetRandomArt()</button>
      </div>
    );
  }
}

export default Home;
