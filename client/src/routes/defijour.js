import React from 'react';
import '../App.css';
import '../CSS/defijour.css';
import { Icon } from '@iconify/react';

import {
  Link
} from "react-router-dom";

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

class Palette extends React.Component{
  render(){
    //for avec les bonnes couleurs 
    const tabPalette = this.props.content;
    const divPalette = tabPalette.map((elt) =>    <div className="colorPalette" style={{background:elt}}></div>  );
    return(
      <section className="palette">
        {divPalette}
      </section>
    );
  }
}

function Defijour() {
    return (
      <section className="page home">
        <h2>18 novembre</h2>
        <ThemeHome theme="La mer"/>
        <PaletteHome palette = {["blue", "yellow", "orange"]}/>
        <p><Link to="/compte/publication">Dessin d'un autre compte</Link></p>
      </section>
    );
}

export default Defijour;
