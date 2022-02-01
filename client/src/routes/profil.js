import React from 'react';
import '../CSS/profil.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";



class Follow extends React.Component{
  render(){
    return(
        <button id="btnFollow">
          <Icon icon="heroicons-solid:user-add"/>
        </button>
    );
  }
}

class Parameters extends React.Component{
  state = { redirect: null };
  handleClick() {
    let redirect = this.state.redirect;
    redirect = '/parametres';
    this.setState({redirect: redirect});
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return(
      <button id="btnParameters" onClick={() => this.handleClick()}>
        <Icon icon="ant-design:setting-twotone"/>
      </button>
    );
  }
}

class ProfilHead extends React.Component{
  render(){
    let btnAfficher = <Follow/>;
    var isSameProfil = true;
    if(isSameProfil){
      btnAfficher = <Parameters/>;
    }
    return(
      <header className="profilHead">
        <img src={'defaultpicture.jpg'} className= "profilePic" alt="profil"></img>
        <h3>{this.props.pseudo}</h3>
        {btnAfficher}
      </header>
    );
  }
}

class Publication extends React.Component {
  render(){
    return(
      <div key={this.props.idx} className="publication">
        <img src={'defaultpublic.jpg'} alt="publication"></img>
      </div>
    );
  }
}

class ProfilContent extends React.Component{
  render(){
    //requête pour aller chercher les publications d'une personne 
    const tabPublication = ['../images/defaultpublic.jpg', '../images/defaultpublic.jpg', '../images/defaultpublic.jpg', '../images/defaultpublic.jpg'];
    const divPubli = tabPublication.map((elt, idx) => 
      <Publication photo = {elt} idx = {idx}/>  );
    return(
      <section className="profilContent">
        <p><Link to="/profil/listes">Mes thèmes et palettes</Link></p>
        <h2>Galerie</h2>
        <section className="galerie">
          {divPubli}
        </section>
      </section>
    );
  }
}

class Profil extends React.Component{
  state = {
    pseudo: null,
    data: null
  };


  render(){
    return (
      <div className="profil">
        <ProfilHead pseudo = "pseudo"/>
        <ProfilContent />
      </div>
    );
  }
}

export default Profil;
