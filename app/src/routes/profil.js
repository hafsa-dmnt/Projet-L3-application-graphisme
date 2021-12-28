import React from 'react';
import '../App.css';
import '../CSS/profil.css';
import profilepicture from '../images/defaultpicture.jpg';
import { Icon } from '@iconify/react';

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

class ProfilHead extends React.Component{
  render(){
    return(
      <header className="profilHead">
        <img src={profilepicture} className= "profilePic"></img>
        <h3>{this.props.pseudo}</h3>
        <Follow/>
      </header>
    );
  }
}

class ProfilContent extends React.Component{
  render(){
    return(
      <section className="profilContent">
        <p><Link to="/profil/mesthemes">Mes thèmes</Link></p>
        <p><Link to="/profil/mespalettes">Mes Palette</Link></p>
        <h2>Galerie</h2>
        <section className="galerie">
          <div className="publication"></div>
          <div className="publication"></div>
          <div className="publication"></div>
          <div className="publication"></div>
          <div className="publication"></div>
          <div className="publication"></div>
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
