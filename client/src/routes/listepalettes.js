import React from 'react';
import '../CSS/listes.css';
import { Icon } from '@iconify/react';

class Liste extends React.Component{
  render(){
    const tabListePalette = this.props.listePalettes;
    let divListe = "";
    if(this.props.listePalettes.length > 0){
      divListe = Object.keys(tabListePalette).map((keyName, i)  => (
        <div key= {i} className="iconlist">
          {tabListePalette[keyName].palette_nom}
        </div>
    ))
    }else{
      divListe = <p>Il n'y a rien :( ajoute une palette !</p>
    }
    
    return (
      <div className="liste_paletteTheme">
        {divListe}
      </div>
     
    );
  }
}

class ListePalettes extends React.Component {
  constructor(props) {
    super(props);
    //ici on récupère à l'aide d'une requête toutes les listes de thèmes existantes (on peut ajouter un bouton supprimer liste)
    this.state = {
      listePalettes:  ""
    }
  } 

  componentDidMount(){
    this.callBackendAPI()
      .then(res => this.setState({listePalettes: res}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/listPalettes/user1-1');
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
        <Liste listePalettes={this.state.listePalettes}></Liste>
      </section>
      
    );
  }
}

export default ListePalettes;
