import React from 'react';
import '../App.css';
import '../CSS/publication.css';
import { Icon } from '@iconify/react';
import { withRouter } from 'react-router-dom';

import {
    Link
  } from "react-router-dom";


class PublicationDrawing extends React.Component{
  render(){
    return(
      <div className="dessin">
        <img src='defaultpublic.jpg' alt="Logo" />
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
      <Link className="cross" to={this.props.to}>
        <Icon icon="bi:x-circle"/>
      </Link>
    );
  }
}


class Publication extends React.Component {
  render(){
    console.log(window.location.pathname);
    return(
        <div className="page page_publication">
          <div className="publication">
            <CrossButton to={window.location.pathname}/>
            <PublicationDrawing/>
            <PublicationDrawer pseudo = "jefedesdessins"/>
          </div>
        </div>
    );
  }
}


export default Publication;
