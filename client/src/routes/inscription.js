import React from 'react';
import '../CSS/inscription.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";



import { Navigate } from "react-router-dom";

import {validateEmail,
        passwordConfirmation,
        isCompleted,
        isMailAlreadyUsed,
        isPseudoAlreadyUsed
        } from '../classes/formValidation.js';


class InscriptionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {pseudo:'',mail:'', mdp: '',confirm:'', redirect: null};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var passwordHash = require('password-hash');

    if(!(isCompleted('pseudo',this.state.pseudo)&isCompleted('mail',this.state.mail))){
      return;
    }

    if(!(isCompleted('mail',this.state.mail))){
      return;
    }

    if(!(isCompleted('mot de passe',this.state.mdp)&isCompleted('confirmation de mot de passe',this.state.confirm))){
      return;
    }

    if(!passwordConfirmation(this.state.mdp,this.state.confirm)){
      return;
    }

    if(!validateEmail(this.state.mail)){
      return;
    }

    if(isMailAlreadyUsed(this.state.mail)){
      return;
    }

    if(isPseudoAlreadyUsed(this.state.pseudo)){
      return;
    }

    var passwordHash = require('password-hash');
    var mdpchiffre = passwordHash.generate(this.state.mdp);
    const lien="/inscription/creer/"+this.state.pseudo+"-"+this.state.mail+"-"+this.state.bio+"-"+mdpchiffre;
    const response = fetch(lien);

    alert("Pensez à compléter votre photo de profil et votre biographie dans les réglages !");
    this.setState({ redirect: "/Connexion" });

    }



  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (

      <form onSubmit={this.handleSubmit} className = "inscriptionForm">

        <div className="subSection">
          <label>
            <h3>Pseudo :</h3>
          </label>
          <input type="text" name="pseudo" value={this.state.pseudo} onChange={this.handleChange} />
        </div>

        <div className="subSection">
          <label>
            <h3>Mail :</h3>
          </label>
          <input type="text" name="mail" value={this.state.mail} onChange={this.handleChange} />
        </div>

        <div className="subSection">
          <label>
            <h3>Mot de passe :</h3>
          </label>
          <input type="password" name="mdp" value={this.state.mdp} onChange={this.handleChange} />
        </div>

        <div className="subSection">
          <label>
            <h3>Confirmation : </h3>
          </label>
          <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} />
        </div>

        <div className="subSection submit">
          <button type="submit" >
            <Icon icon="akar-icons:check-box-fill" />
          </button>
        </div>

      </form>
    );
  }
}


class Inscription extends React.Component{

  render(){
    return (

      <div className="page page_inscription">

        <div className="section title">
          <h2>Inscription</h2>
        </div>

        <div className="section">
          <InscriptionForm type="Pseudo"/>
        </div>

        <div className="section link">
            <p>Déja un compte ? <Link to={"/connexion"}>Connectez-vous !</Link></p>
        </div>

      </div>
    );
  }
}

export default Inscription;
