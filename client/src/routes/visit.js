import React from 'react';
import '../CSS/profil.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";


class Follow extends React.Component{
  constructor(props){
    super(props);
  }

  followSomeone(){
    alert("todo : follow someone");
  }

  render(){
    return(
        <button id="btnFollow" onClick={() => this.followSomeone()}>
          <Icon icon="heroicons-solid:user-add"/>
        </button>
    );
  }
}

class ProfilHead extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let btnAfficher = <Follow/>;
    const cld = new Cloudinary({
      cloud: {
        cloudName: "hzcpqfz4w"//process.env.CLOUD_NAME
      }
    });

    const myImage = cld.image(this.props.photo);
    return(
      <header className="profilHead section">
        <div key={this.props.idx} className="profilePic" alt="photo de profil">
          <AdvancedImage cldImg={myImage} />
        </div>
        <h3>{this.props.pseudo}</h3>
        {btnAfficher}
      </header>
    );
  }
}

class Publication extends React.Component {
  render(){
    const cld = new Cloudinary({
      cloud: {
        cloudName: "hzcpqfz4w"//process.env.CLOUD_NAME
      }
    });

    const myImage = cld.image(this.props.photo);
    return(
      <div key={this.props.idx} className="publication">
        <AdvancedImage cldImg={myImage} />
      </div>
    );
  }
}

class ProfilContent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let tabPublication = this.props.content.reverse();
    let divPubli = <section className='aucunePubli'>
                      <div className='iconPasDePubli'><Icon icon="ep:picture-rounded"/></div>
                      <h3>Aucune publication</h3>
                    </section>;
    if(tabPublication.length > 0){
        divPubli = tabPublication.map((elt, idx) =>
        <Publication photo = {elt.publication_image} idx = {elt.publication_id}/>  );
    }
      

    return(
      <section className="section profilContent">
          <section className="galerie">
            <div className='maGalerie'>
              <h3>Galerie</h3>
            </div>
            {divPubli}
          </section>
        </section>
    );
  }
}

class Profil extends React.Component{
  constructor(props){
    super(props);
    var pseudo = "example";
    const queryParams = new URLSearchParams(window.location.search);
    pseudo = queryParams.get('pseudo');    
    this.state = {
      pseudo: pseudo,
      data: []
    };
  }
  
  componentDidMount(){
    const chemin = [
      "/publicationsofuserpseudo/"+this.state.pseudo, 
      "/pdpuser/"+this.state.pseudo
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.
      var pseudoActuel = this.state.pseudo;
      var datas = [];

      if(data[0].length > 0){
        datas = data[0];
      }
      
      this.setState({
        pseudo: pseudoActuel,
        pdp : ""+data[1][0].utilisateur_pdp,
        data: datas
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

  render(){
    return (
      <div className="profil page">
        <ProfilHead photo = {this.state.pdp} pseudo = {this.state.pseudo}/>
        <ProfilContent content = {this.state.data}/>
      </div>
    );
  }
}

export default Profil;
