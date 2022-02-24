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
    const stringtabpalette = this.props.content;
    const tabPalette = stringtabpalette.split(',');
    const divPalette = tabPalette.map((elt) =>    <div className="colorPalette" style={{background:elt}}></div>  );
    return(
      <section className="palette">
        {divPalette}
      </section>
    );
  }
}

class Defijour extends React.Component {
  constructor(props){
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    const date = queryParams.get('date');
    this.state = {
      palette: "",
      theme:"",
      day:date
    }
  }

  componentDidMount(){
    this.callBackendAPI()
      .then(res => this.setState({palette: res[0].palette_nom, theme: res[0].theme_nom, day: this.state.day}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const lien="/defiatdate/"+this.state.day;
    const response = await fetch(lien);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log("res", body);
    return body;
  };

  render(){
    return (
      <section className="page home">
        <h2>{this.state.day}</h2>
        <ThemeHome theme={this.state.theme}/>
        <PaletteHome palette = {this.state.palette}/>
        <p><Link to="/compte/publication">Dessin d'un autre compte</Link></p>
      </section>
    );
  }
}

export default Defijour;
