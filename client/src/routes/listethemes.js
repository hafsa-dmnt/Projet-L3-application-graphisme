import React from 'react';
import '../CSS/listes.css';
import {Link} from "react-router-dom";
import { Icon } from '@iconify/react';
import { Navigate } from "react-router-dom";

class BoutonRetour extends React.Component{
  state = { redirect: null };
  handleClick() {
      let redirect = this.state.redirect;
      redirect = '/profil/listes?type=themes';
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

class Liste extends React.Component{

  delete(idTheme){
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist');
    const lien="/listthemes/element/delete/"+id+"-"+idTheme;
    const response = fetch(lien);
  }

  render(){
    const tabListeTheme = this.props.listeThemes;
    let divListe = "";
    if(this.props.listeThemes.length > 0){
      divListe = Object.keys(tabListeTheme).map((keyName, i)  => (
        <div key= {i} className="iconlist">
          {tabListeTheme[keyName].theme_nom}
          <button onClick={() => this.delete(tabListeTheme[keyName].theme_id)}>x</button>
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
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist');
    super(props);
    //ici on récupère à l'aide d'une requête toutes les listes de thèmes existantes (on peut ajouter un bouton supprimer liste)
    this.state = {
      listeThemes:  "",
      idliste: id
    }
  } 

  delete(){
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist');
    const lien="/listthemes/delete/"+id;
    const response = fetch(lien);
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
      <section className="page page_listes">
        <BoutonRetour/>
        <button onClick={this.delete}>Supprimer la liste</button>
        <Link to={"/profil/listethemes/modifier?idlist="+this.state.idliste}>modifier</Link>
        <Liste listeThemes={this.state.listeThemes}></Liste>
      </section>
    );
  }
}

export default ListeThemes;
