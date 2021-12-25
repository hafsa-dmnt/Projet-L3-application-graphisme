import React from 'react';
import '../App.css';
import '../CSS/home.css';
import { Icon } from '@iconify/react';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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


class AddToFav extends React.Component{
  render(){
    return(
        <button class="btnAddToFav">
          <Icon icon="ant-design:star-filled"/>
        </button>
    );
  }
}

class ThemeHome extends React.Component{
  render(){
    return(
      <div class="themeHome">
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
      <div class="paletteHome">
        <h3>Palette</h3>
        <AddToFav/>
        <Palette content=""/>
      </div>
    );
  }
}

class Palette extends React.Component{
  // TODO faire en fonction d'un palette donné en propriété
  render(){
    return(
      <div class="palette">
        <div class="colorPalette"></div>
        <div class="colorPalette"></div>
        <div class="colorPalette"></div>
        <div class="colorPalette"></div>
        <div class="colorPalette"></div>
        <div class="colorPalette"></div>

      </div>
    );
  }
}

class BoutonGetRandomArt extends React.Component{
  render(){
    return(
      <button class="btnGetRandomArt">GetRandomArt()</button>
    );
  }
}


class Home extends React.Component{
  render(){
    return(
      <div class="page home">
        <ThemeHome theme="je suis un thème"/>
        <PaletteHome palette=""/>
        <BoutonGetRandomArt/>
      </div>
    );
  }
}

export default Home;
