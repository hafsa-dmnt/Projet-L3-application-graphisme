import React from 'react';
import '../CSS/profil.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {useToken} from '../classes/useToken';

class Follow extends React.Component{
  constructor(props){
    super(props);
  }

  followSomeone(){
    this.props.handleChange();
  }

  render(){
    return(
        <button id="btnFollow" onClick={() => this.followSomeone()}>
          <Icon icon="heroicons-solid:user-add"/>
        </button>
    );
  }
}

class Unfollow extends React.Component{
  constructor(props){
    super(props);
  }

  followSomeone(){
    this.props.handleChange();
  }

  render(){
    return(
        <button id="btnFollow" onClick={() => this.followSomeone()}>
          <Icon icon="eva:person-remove-fill" />
        </button>
    );
  }
}

class ProfilHead extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log("profil head ", this.props.follow);
    let btnAfficher = <Follow pseudo={this.props.pseudo} handleChange = {this.props.handleFollow}/>;
    if(this.props.follow == true){
      btnAfficher = <Unfollow pseudo={this.props.pseudo} handleChange = {this.props.handleFollow}/>;
    }
    const cld = new Cloudinary({
      cloud: {
        cloudName: "hzcpqfz4w"//process.env.CLOUD_NAME
      }
    });
    var urlpdp = this.props.pseudo+"_pdp";
    const myImage = cld.image(urlpdp);
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
      follow: false,
      data: [], 
      visiteur: ""
    };

    this.handleFollow = this.handleFollow.bind(this);
  }

  handleFollow(){
    var following = this.state.follow;
    var pseudo = this.state.pseudo;
    var data = this.state.data;
    var visiteur = this.state.visiteur;
    this.setState({follow: !following, pseudo: pseudo, data: data, visiteur: visiteur});
    let chemin = [
      '/follow/'+following+'-'+this.state.pseudo+'-'+this.state.visiteur
    ];
    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .catch(error => console.log('There was a problem!', error))
    ))
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
  
  componentDidMount(){
    const tokenString = localStorage.getItem('token');
    var temp = JSON.parse(tokenString);
    temp = temp.token;
    let chemin = [
      "/publicationsofuserpseudo/"+this.state.pseudo, 
      '/pseudouser/'+temp      
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.
      var pseudoActuel = this.state.pseudo.trim();
      var datas = [];

      if(data[0].length > 0){
        datas = data[0];
      }
      
      this.setState({
        pseudo: pseudoActuel,
        data: datas, 
        follow: false, 
        visiteur: data[1][0].utilisateur_pseudo.trim()
      })


      chemin = [
        "/followinguser/"+this.state.pseudo+'.'+this.state.visiteur     
      ];
      Promise.all(chemin.map(url =>
        fetch(url)
        .then(checkStatus)  // check the response of our APIs
        .then(parseJSON)    // parse it to Json
        .catch(error => console.log('There was a problem!', error))
      ))
      .then(data => {
        // assign to requested URL as define in array with array index.
        var pseudo = this.state.pseudo;
        var datas = this.state.data;
        var visiteur = this.state.visiteur;
        var following = data[0].length > 0;
       
        this.setState({
          pseudo: pseudo,
          data: datas, 
          follow: following, 
          visiteur: visiteur
        })
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
        <ProfilHead pseudo = {this.state.pseudo} follow = {this.state.follow} visitor = {this.state.visiteur} handleFollow = {this.handleFollow}/>
        <ProfilContent content = {this.state.data}/>
      </div>
    );
  }
}

export default Profil;
