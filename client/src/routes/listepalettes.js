import React from 'react';
import '../CSS/listes.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";

class BoutonRetour extends React.Component{
  state = { redirect: null };
  handleClick() {
      let redirect = this.state.redirect;
      redirect = '/profil/listes?type=palettes';
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
  delete(idPalette){
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist');
    const lien="/listpalettes/element/delete/"+id+"-"+idPalette;
    const response = fetch(lien);
  }

  render(){
    const tabListePalette = this.props.listePalettes;
    let divListe = "";
    if(this.props.listePalettes.length > 0){
      divListe = Object.keys(tabListePalette).map((keyName, i)  => (
        <div key= {i} className="iconlist">
          {tabListePalette[keyName].palette_nom}
          <button onClick={() => this.delete(tabListePalette[keyName].palette_id)}>x</button>
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
    this.state = {
      listePalettes:  ""
    }
  } 

  delete(){
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist')
    const lien="/listpalettes/delete/"+id;
    const response = fetch(lien);
  }

  componentDidMount(){
    this.callBackendAPI()
      .then(res => this.setState({listePalettes: res}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist')
    const lien="/listpalettes/"+id;
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
        <Liste listePalettes={this.state.listePalettes}></Liste>
      </section>
    );
  }
}

export default ListePalettes;
