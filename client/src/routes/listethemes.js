import React from 'react';
import '../CSS/listes.css';
import { Icon } from '@iconify/react';

class Liste extends React.Component{
  render(){
    const tabListeTheme = this.props.listeThemes;
    let divListe = "";
    if(this.props.listeThemes.length > 0){
      divListe = Object.keys(tabListeTheme).map((keyName, i)  => (
        <div key= {i} className="iconlist">
          {tabListeTheme[keyName].theme_nom}
        </div>
    ))
    }else{
      divListe = <p>Il n'y a rien :( ajoute un theme !</p>
    }
    
    return (
      <div className="liste_paletteTheme">
        {divListe}
      </div>
     
    );
  }
}

class ListeThemes extends React.Component {
  constructor(props) {
    super(props);
    //ici on récupère à l'aide d'une requête toutes les listes de thèmes existantes (on peut ajouter un bouton supprimer liste)
    this.state = {
      listeThemes:  ""
    }
  } 

  componentDidMount(){
    this.callBackendAPI()
      .then(res => this.setState({listeThemes: res}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist')
    const lien="/listthemes/"+id;
    const response = await fetch(lien);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log("requete", body);
    return body;
  };

  render(){
    return (
      
      <section className="page_listes">
        <Liste listeThemes={this.state.listeThemes}></Liste>
      </section>
      
    );
  }
}

export default ListeThemes;
