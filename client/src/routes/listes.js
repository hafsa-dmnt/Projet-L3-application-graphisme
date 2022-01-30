import React from 'react';
import '../CSS/listes.css';
import { Icon } from '@iconify/react';

class Liste extends React.Component{
  render(){
    const tabListe = this.props.content;
    let divListe = "";
    if(this.props.content.length > 0){
      divListe = Object.keys(tabListe).map((keyName, i)  => (
        <div key= {i} onClick={this.props.changeTab} className="iconlist">
          <Icon icon="emojione-monotone:sparkles" />
          {tabListe[keyName].theme_nom}
        </div>
    ))
    }else{
      divListe = <p>Il n'y a rien :( crée ta première liste !</p>
    }
    let titre = <h3>Mes thèmes</h3>;
    if(!this.props.theme){
      titre = <h3>Mes palettes</h3>;
    }
    
    return (
      <div className="liste_paletteTheme">
        {titre}
        {divListe}
      </div>
     
    );
  }
}

class ThemesAndPalettes extends React.Component{
  constructor(props) {
    super(props);
    //ici on récupère à l'aide d'une requête toutes les listes de thèmes existantes (on peut ajouter un bouton supprimer liste)
    this.state = {
      displayThemes: true,
      liste:  []
    }
  } 

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ liste: res}))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/list/user1');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log("requete", body);
    return body;
  };

  /*
  handleClick =  () => {
    if(this.state.tl_name){
      this.setState({liste : []});
    }else{
      this.setState({liste : []});
    }
  }
  **/

  changeCategory = () => {
    let newCategory = !this.state.displayThemes;
    this.setState({displayThemes: newCategory, liste : []});
  }

  render(){
    return (
      <section className="page_listes">
        <Liste content={this.state.liste} theme={this.state.displayThemes}/>
        <button className="btnGetRandomArt" onClick={() => this.changeCategory()}>Changer de catégorie</button>
      </section>
    );
  }
}

  export default ThemesAndPalettes;
