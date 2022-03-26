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
        <div key= {i} className="themeListIndividuel">
          <h3>{tabListeTheme[keyName].theme_nom}</h3>
          <button onClick={() => this.delete(tabListeTheme[keyName].theme_id)} className="cross">
            <Icon icon="bi:x-circle" className="cross-icon"/>
          </button>
        </div>
    ))
    }else{
      divListe = <p>Il n'y a rien :( ajoute un theme !</p>
    }

    return (
      <div className="liste_paletteTheme">
        <div className="container">
          {divListe}
        </div>
      </div>

    );
  }
}

class ListeThemes extends React.Component {
  constructor(props) {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist');
    const nomlist = queryParams.get('nomlist');
    const icon = queryParams.get('icon');
    super(props);
    //ici on récupère à l'aide d'une requête toutes les listes de thèmes existantes (on peut ajouter un bouton supprimer liste)
    this.state = {
      listeThemes:  "",
      idliste: id,
      nomlist: nomlist,
      icon: icon
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
    const nomlist = queryParams.get('nomlist')
    const icon = queryParams.get('icon')
    const lien="/listthemes/"+id;
    const response = await fetch(lien);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render(){
    return (
      <section className="page page_listes">
        <div className='list_title section'>
        <BoutonRetour/>
          <h3>{this.state.nomlist}</h3> <Icon icon={this.state.icon} className='icon'/>
        </div>
        <Liste listeThemes={this.state.listeThemes}></Liste>
        <div className='editdelete'>
          <button onClick={this.delete}>Supprimer</button>
          <Link to={"/profil/listethemes/modifier?idlist="+this.state.idliste}>Modifier</Link>
        </div>
      </section>
    );
  }
}

export default ListeThemes;
