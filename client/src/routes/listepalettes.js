import React from 'react';
import '../CSS/listes.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";

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
        <Link to={"/profil/listes"} className="btnRetour">
          <Icon icon="akar-icons:arrow-back" />
        </Link>
        <Liste listePalettes={this.state.listePalettes}></Liste>
      </section>
    );
  }
}

export default ListePalettes;
