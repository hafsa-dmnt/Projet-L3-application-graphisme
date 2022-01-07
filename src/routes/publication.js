import React from 'react';
import '../App.css';
import '../CSS/publication.css';
import publi from '../images/defaultpublic.jpg';
import { Icon } from '@iconify/react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

class PublicationDrawing extends React.Component{
  render(){
    return(
      <div className="dessin">
        <img src={publi} alt="Logo" />
      </div>
    );
  }
}

class PublicationDrawer extends React.Component{
  render(){
    return(
      <div className="dessinateur">
        <Link to="/compte">{this.props.pseudo}</Link>
        <button className="follow">
          <Icon icon="ant-design:user-add-outlined" />
        </button>
      </div>
    );
  }
}

class CrossButton extends React.Component{
  render(){
    return(
      <Link class="cross" to={this.props.to}>
        <Icon icon="bi:x-circle"/>
      </Link>
    );
  }
}

class Publication extends React.Component{
  //TODO : le link vers home dans cross enft c'est un retour a ou on etait
  // src devient une requete
  render(){
    return(
      <div className="page page_publication">
        <div className="publication">


          <CrossButton to="/home"/>
          <PublicationDrawing/>
          <PublicationDrawer pseudo = "jefedesdessins"/>

        </div>

      </div>
    );

  }
}

export default Publication;
