import React from 'react';
import '../App.css';
import '../CSS/profil.css';
import profilepicture from '../images/defaultpicture.jpg';
import { Icon } from '@iconify/react';
import publicationpicture from '../images/defaultpublic.jpg';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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
  render(){
    return(
      <button id="btnFollow">
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
        <img src={profilepicture} className= "profilePic"></img>
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
        <img src={publicationpicture}></img>
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
        <p><Link to="/profil/mesthemes">Mes thèmes</Link></p>
        <p><Link to="/profil/mespalettes">Mes Palette</Link></p>
        <h2>Galerie</h2>
        <section className="galerie">
          {divPubli}
        </section>
      </section>
    );
  }
}

function Profil() {
    return (
    <div className="profil">
      <ProfilHead pseudo = "xXGrenouilledu39Xx"/>
      <ProfilContent />
    </div>
    );
  }

  export default Profil;
