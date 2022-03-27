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


class BoutonRetour extends React.Component{
  state = { redirect: null };
  handleClick() {
      let redirect = this.state.redirect;
      redirect = '/calendrier';
      this.setState({redirect: redirect});
  }
  render() {
      if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
      }
      return(
      <button className='btnRetour' onClick={() => this.handleClick()}>
          <Icon  icon="ant-design:left-circle-outlined" />
      </button>
      );
  }
}

class AddToFav extends React.Component{
  state = { redirect: null };
  handleClick() {
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
        <AddToFav content={this.props.palette.replaceAll("#","%23")} type="palette"/>
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
    
    let url = this.props.photo.trim();
    const myImage = cld.image(url);
    let lienPublication = "/publication?pseudo="+this.props.pseudo.trim()+"&type="+this.props.date.trim()+"&publicationname="+this.props.photo.trim();
    return(
      <div key={this.props.idx} className="defijour publication">
        <Link to={lienPublication}><AdvancedImage cldImg={myImage} /></Link>
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

      console.log(arrayPublications);
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

    let divPubli = <section className='aucunePubli'>
                      <div className='iconPasDePubli'><Icon icon="ep:picture-rounded"/></div>
                      <h3>Aucune publication</h3>
                    </section>
    if(this.state.publications.length > 0){
      divPubli = this.state.publications.map((elt, idx) =>
                <Publication photo={elt[1]} idx = {elt[1]+elt[0]} pseudo={elt[2]} date={this.state.day}/>);
    }
    
    return (
      <section className="page defijour">
        <BoutonRetour/>
        <h3>{dateAffichee}</h3>
        <ThemeHome theme={this.state.theme}/>
        <PaletteHome palette = {this.state.palette}/>
        <section className='divPublis'>
          {divPubli}
        </section>
      </section>
    );
  }
}

export default Defijour;
