import React from 'react';
import '../App.css';
import '../CSS/home.css';
import { Icon } from '@iconify/react';
import { Navigate } from "react-router-dom";

import {getRandomPalette} from "./getRandPalette.js";



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
  state = { redirect: null };
  handleClick() {
      if(this.props.content==''){
        alert("Appuyez sut GetRandomArt() pour avoir des thèmes et palettes !");
        return;
      }
      let redirect = this.state.redirect;
      redirect = `/addToList?type=${this.props.type}&content=${this.props.content}`; //add the content to the url
      this.setState({redirect: redirect});
  }
  render() {
      if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
      }
      return(
      <button className="btnAddToFav" onClick={() => this.handleClick()}>
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
        <AddToFav content={this.props.theme} type="theme"/>
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
        <AddToFav content={this.props.palette.join().replaceAll("#","%23")} type="palette"/>
        <Palette content={this.props.palette}/>
      </div>
    );
  }
}

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
