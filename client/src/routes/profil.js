import React from 'react';
import '../CSS/profil.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";


class Follow extends React.Component{
  render(){
    return(
        <button id="btnFollow">
          <Icon icon="heroicons-solid:user-add"/>
        </button>
    );
  }
}

class ButtonClick extends React.Component{
  state = { redirect: null };
  handleClick() {
    let redirect = this.state.redirect;
    redirect = this.props.chemin;
    this.setState({redirect: redirect});
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return(
      <button id={this.props.idbtn} onClick={() => this.handleClick()}>
        <Icon icon={this.props.iconbtn}/>
      </button>
    );
  }
}

class ProfilHead extends React.Component{
  render(){
    let btnAfficher = <Follow/>;
    var isSameProfil = true;
    if(isSameProfil){
      btnAfficher = <ButtonClick/>;
    }
    return(
      <header className="profilHead section">
        <img src={'defaultpicture.jpg'} className= "profilePic" alt="profil"></img>
        <h3>{this.props.pseudo}</h3>
        <ButtonClick chemin='/parametres' iconbtn="ant-design:setting-twotone" idbtn="btnParameters"/>
        <div>
          <Link to="/profil/listes">Mes thèmes et palettes</Link>
        </div>
      </header>
    );
  }
}

class Publication extends React.Component {
  render(){
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hzcpqfz4w'
      }
    });
    
    //todo : change with name of the image from db
    const myImage = cld.image('testpdp');
    return(
      <div key={this.props.idx} className="publication">
        <AdvancedImage cldImg={myImage} />
      </div>
    );
  }
}

class ProfilContent extends React.Component{
  render(){
    //requête pour aller chercher les publications d'une personne
    const tabPublication = ['/defaultpublic.jpg', '/defaultpublic.jpg', '/defaultpublic.jpg', '/defaultpublic.jpg'];
    const divPubli = tabPublication.map((elt, idx) =>
      <Publication photo = {elt} idx = {idx}/>  );
    return(
      <section className="profilContent">
        <section className="galerie">
          <div className='maGalerie'>
            <h3>Galerie</h3>
            <ButtonClick chemin='/creerPublication' iconbtn="fluent:add-12-filled" idbtn="btnAddPublication"/>
          </div>
          {divPubli}
        </section>
      </section>
    );
  }
}

class Profil extends React.Component{
  state = {
    pseudo: "exemple",
    data: null
  };

  /*
  componentDidMount(){
    const chemin = [
      "/pseudoUser/"+token,
      "/publicationsofuser/"+token
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.
      console.log(data[0], data[1]);
      var tabNoms = Object.values(data[0]);
      var arrayPublications = data[1].map( Object.values );
      this.setState({
        pseudo: data[0],
        data: data[1]
      })
    })

    function checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    function parseJSON(response) {
      return response.json();
    }
  }
  */


  render(){
    return (
      <div className="profil page">
        <ProfilHead pseudo = {this.state.pseudo}/>
        <ProfilContent content = {this.state.data}/>
      </div>
    );
  }
}

export default Profil;
