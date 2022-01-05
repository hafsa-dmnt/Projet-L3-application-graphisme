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


const express = require('express');
const app = express();
const port = 3001;

const basedonnee = require('./basedonnee.js');

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  basedonnee()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});


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
    console.log("requete");
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
