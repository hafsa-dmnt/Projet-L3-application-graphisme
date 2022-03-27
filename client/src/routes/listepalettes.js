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
        <div key= {i} className="section paletteListIndividuel">
          <button onClick={() => this.delete(tabListePalette[keyName].palette_id)} className='cross'>
            <Icon icon="bi:x-circle" className="cross-icon"/>
          </button>
            <section className='miniPalette'>
                <p className='small'>{tabListePalette[keyName].palette_nom}</p>
                {tabListePalette[keyName].palette_nom.split(',').map((elt) =>    <div className="minicolorPaletteListe" style={{background:elt}}></div>  )}
            </section>
        </div>
    ))
    }else{
      divListe = <p>Il n'y a rien :( ajoute une palette !</p>
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

class ListePalettes extends React.Component {
  constructor(props) {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist');
    const nomlist = queryParams.get('nomlist');
    const icon = queryParams.get('icon');
    super(props);
    this.state = {
      listePalettes:  "",
      idliste: id,
      nomlist: nomlist,
      icon: icon
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
        <div className='list_title section'>
        <BoutonRetour/>
          <h3>{this.state.nomlist}</h3> <Icon icon={this.state.icon} className='icon'/>
        </div>
        <Liste listePalettes={this.state.listePalettes}></Liste>
        <div className='editdelete'>
          <button onClick={this.delete}>Supprimer</button>
          <Link to={"/profil/listepalettes/modifier?idlist="+this.state.idliste}>Modifier</Link>
        </div>
      </section>
    );
  }
}

export default ListePalettes;
