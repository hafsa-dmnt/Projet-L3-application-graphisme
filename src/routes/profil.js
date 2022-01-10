import React from 'react';
import '../CSS/profil.css';
import profilepicture from '../images/defaultpicture.jpg';
import { Icon } from '@iconify/react';
import publicationpicture from '../images/defaultpublic.jpg';
import {Link} from "react-router-dom";


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
        <img src={profilepicture} className= "profilePic" alt="profil"></img>
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
        <img src={publicationpicture} alt="publication"></img>
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

class Profil extends React.Component{
  state = {
    pseudo: null,
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ pseudo: res[0].user_pseudo, data:null }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('./searchUser/1');
    const reee = await response.json();

    if (response.status !== 200) {
      throw Error(reee.message) 
    }
    console.log("requete", reee);
    return reee;
  };

  render(){
    return (
      <div className="profil">
        <ProfilHead pseudo = {this.state.pseudo}/>
        <ProfilContent />
      </div>
    );
  }
}

export default Profil;
