import React from 'react';
import '../App.css';
import {
  Link
} from "react-router-dom";

class Liste extends React.Component{
  render(){
    const tabListe = this.props.content;
    const divListe = tabListe.map((elt) => <div key= {elt} onClick={this.props.changeTab} className="colorPalette" style={{background:elt}}>{elt}</div>  );
    let titre = "";
    if(this.props.listeglobale){
      titre = <h3>Mes thèmes</h3>;
    }
    return (
      <div>
        {titre}
        {divListe}
      </div>
     
    );
  }
}

class Mesthemes extends React.Component{
  constructor(props) {
    super(props);
    //ici on récupère à l'aide d'une requête toutes les listes de thèmes existantes (on peut ajouter un bouton supprimer liste)
    this.state = {
      maliste:  ["peinture", "fleur", "mer", "ouaisouaisouais"],
      pageGlobale: true
    }
  } 

  handleClick =  () => {
    if(this.state.pageGlobale){
      this.setState({maliste : ["abeille", "ville", "grenouille"], pageGlobale: false});
    }else{
      this.setState({maliste : ["peinture", "fleur", "mer", "ouaisouaisouais"], pageGlobale: true});
    }
  }

  render(){
    return (
      <section>
        <Liste content={this.state.maliste} listeglobale = {this.state.pageGlobale} changeTab = {this.handleClick}/>
      </section>
    );
  }
}

  export default Mesthemes;
