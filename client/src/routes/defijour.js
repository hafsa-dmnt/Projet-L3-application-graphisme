import React from 'react';
import '../App.css';
import '../CSS/defijour.css';
import { Icon } from '@iconify/react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { Navigate } from "react-router-dom";

import {
  Link
} from "react-router-dom";

class AddToFav extends React.Component{
  state = { redirect: null };
  handleClick() {
      let redirect = this.state.redirect;
      redirect = `/addToList?type=${this.props.type}`; //add the content to the url 
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
        <AddToFav type="theme" content={this.props.theme}/>
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
        <AddToFav type="palette" content={this.props.palette}/>
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

class Publication extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hzcpqfz4w'
      }
    });
  
    const myImage = cld.image('testpdp');
    return(
      <div key={this.props.idx} className="defijour publication">
        <AdvancedImage cldImg={myImage} />
      </div>
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
      day:date,
      publications:[]
    }
  }

  componentDidMount(){
    const chemin = [
      "/defiatdate/"+this.state.day,
      "/publicationsatdate/"+this.state.day
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.
      console.log(data[0], data[1]);
      var tabNoms = Object.values(data[0]);
      var arrayPublications = [];
      if(data[1] != undefined){
        arrayPublications = data[1].map( Object.values );
      }
      this.setState({
        day: this.state.day,
        theme: tabNoms[0].theme_nom,
        palette: tabNoms[0].palette_nom,
        publications: arrayPublications
      })
    })

    function checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    function parseJSON(response) {
      return response.json();
    }
  }

  render(){
    const monthTab = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var dateAffichee = this.state.day.split('-');
    dateAffichee = Number(dateAffichee[2]) + " " + monthTab[Number(dateAffichee[1])-1] + " " + dateAffichee[0];

    const divPubli = this.state.publications.map((elt, idx) =>
    <Publication pseudo = {elt[3]} photo={elt[5]} idx = {idx}/>  );
    
    return (
      <section className="page defijour">
        <h3>{dateAffichee}</h3>
        <ThemeHome theme={this.state.theme}/>
        <PaletteHome palette = {this.state.palette}/>
        <h3>{"Publications"}</h3>
        <section className='divPublis'>
          {divPubli}
        </section>
      </section>
    );
  }
}

export default Defijour;
