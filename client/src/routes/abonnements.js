import React from 'react';
import '../CSS/abonnements.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { threshold1x1Nondither } from '@cloudinary/url-gen/qualifiers/dither';
import {defaultImage} from "@cloudinary/url-gen/actions/delivery";


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


class BoutonRetour extends React.Component{
    state = { redirect: null };
    handleClick() {
        let redirect = this.state.redirect;
        redirect = '/profil';
        this.setState({redirect: redirect});
    }
    render() {
        if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
        }
        return(
        <button className='btnRetour' onClick={() => this.handleClick()}>
            <Icon  icon="ant-design:left-circle-outlined" />
        </button>
        );
    }
}

class BoutonGoToProfil extends React.Component{
  state = { redirect: null };
  handleClick() {
      let redirect = this.state.redirect;
      redirect = '/visit?pseudo='+this.props.pseudo;
      this.setState({redirect: redirect});
  }
  render() {
      if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
      }
      return(
      <button className='btnGoToProfil' onClick={() => this.handleClick()}>
          <Icon icon="bi:arrow-right-circle" />
      </button>
      );
  }
}


class DisplayOneUser extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const cld = new Cloudinary({
      cloud: {
        cloudName: "hzcpqfz4w"//process.env.CLOUD_NAME
      }
    });
    var cheminImage = this.props.pseudo.trim() + "_pdp";
    const myImage = cld.image(cheminImage);
    myImage.delivery(defaultImage("profil_default.png"));

    return(
      <header className="profilHead section">
        <div key={this.props.idx} className="profilePic" alt="photo de profil">
          <AdvancedImage cldImg={myImage} />
        </div>
        <h3>{this.props.pseudo.trim()}</h3>
        <BoutonGoToProfil pseudo={this.props.pseudo.trim()}/>
      </header>
    );
  }
}

class DisplayAbos extends React.Component{
    constructor(props){
      super(props);
    }

    render() {
      let divAbos = "";
      var tabAbo = this.props.abos;
      if(tabAbo.length == 0){
        divAbos = <section className='noSub'>
                    <div className='iconNoSub'><Icon icon="clarity:heart-broken-line" /></div>
                  <h3>Aucun résultat</h3>
      </section>;
      }else{
        if(this.props.recherche == false){
          divAbos = tabAbo.map((elt, idx) =>
          <DisplayOneUser pseudo={elt.abonner_suivi} user = {this.props.user}/>  );
        }else{
          divAbos = tabAbo.map((elt, idx) =>
          <DisplayOneUser pseudo={elt.utilisateur_pseudo} user = {this.props.user}/>  );
        }
      }
      return(
        <section>
          {divAbos}
        </section>
      )
    }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = this.state.value;
    this.props.searchUsers(value);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form_section">
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button type="submit" >
            <Icon icon="fluent:search-28-filled" />
          </button>
        </div>
      </form>
    );
  }
}

class Abonnements extends React.Component{
  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(window.location.search);
    var pseudo = queryParams.get('pseudo');

    this.state = {
        tabAbo : [],
        pseudo : pseudo,
        recherche: false
    }

    this.searchUsers = this.searchUsers.bind(this);
  }

  searchUsers(pattern){
    let chemin = [
      "/searchUsers/"+pattern
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.

      var datas = [];

      if(data[0].length > 0){
        datas = data[0];
      }

      var pseudoActuel = this.state.pseudo;
      this.setState({
        pseudo: pseudoActuel,
        tabAbo: datas,
        recherche: true
      })
    });
  }

  componentDidMount(){
    const tokenString = localStorage.getItem('token');
    var temp = JSON.parse(tokenString);
    temp = temp.token;
    const chemin = [
      "/abonnements/"+this.state.pseudo
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.
      var pseudoactu = this.state.pseudo;
      var datas = [];
      if(data[0].length > 0){
        datas = data[0];
      }
      this.setState({
        pseudo : pseudoactu,
        tabAbo : datas
      });
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
      <section className="page page_abonnements">
        <BoutonRetour/>
        <h3 className="titre">Abonnements</h3>
        <div className="search">
          <SearchForm searchUsers={this.searchUsers}/>
        </div>
        <DisplayAbos abos = {this.state.tabAbo} user = {this.state.pseudo} recherche = {this.state.recherche}/>
      </section>
    );
  }
}

  export default Abonnements;
