import React from 'react';
import '../CSS/profil.css';
import profilepicture from '../images/defaultpicture.jpg';
import { Icon } from '@iconify/react';
import publicationpicture from '../images/defaultpublic.jpg';
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
      .then(res => this.setState({ pseudo: res[0].user_pseudo.trim(), data:null }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('./searchUser/user1');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    //console.log("requete", reee);
    return body;
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
