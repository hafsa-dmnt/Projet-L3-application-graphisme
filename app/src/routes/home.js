import React, {useState} from 'react';
import '../App.css';
import '../CSS/home.css';
import { Icon } from '@iconify/react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

let minPalette = 3;
let maxPalette = 6;

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

//FONCTION POUR GENERER UNE PALETTE ALEATOIREMENT 
function getRandomPalette(){
  //on génère aléatoirement une palette composée de minPalette couleurs à maxPalette couleurs
  let nbColors = Math.floor(Math.random()*(maxPalette-minPalette+1))+minPalette;
  //on génère aléatoirement un nombre pour savoir quelle méthode utiliser dans la palette 
  let tabMethode = 2; //Math.floor(Math.random()*(6));
  //la palette à renvoyer à la fin
  let palette = [];

  //on choisit d'abord une première couleur, format RGB
  var firstColor = {r:Math.floor(Math.random()*(255)), g:Math.floor(Math.random()*(255)), b:Math.floor(Math.random()*(255))};
  palette.push("rgb("+firstColor.r+", "+firstColor.g+", "+firstColor.b+")");

  var i = 1;
  while(i<nbColors){
    firstColor.r = (firstColor.r + Math.floor(Math.random()*(255-20+1))+20)%255;
    firstColor.g = (firstColor.g + Math.floor(Math.random()*(255-20+1))+20)%255;
    firstColor.b = (firstColor.g + Math.floor(Math.random()*(255-20+1))+20)%255;
    palette.push("rgb("+firstColor.r+", "+firstColor.g+", "+firstColor.b+")");
    ++i;
  }
  /*
  switch(tabMethode){
    case 1: //complementaires

    break;
    case 2: //analogue
      
    break;
    case 3: //triangle

    break;
    case 4: //rectangle

    break;
    case 5: //carré

    break;
  }*/
  return palette;
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

class Palette extends React.Component{
  render(){
    //for avec les bonnes couleurs 
    const tabPalette = this.props.content;
    const divPalette = tabPalette.map((elt) => <div key={elt} className="colorPalette" style={{background:elt}}></div>  );
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
      theme: ""
    }
  }
  handleClick() {
    let tabPal = this.state.palette;
    tabPal = getRandomPalette();
    this.setState({palette: tabPal, theme: "fleur"})
  }
  render(){
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
