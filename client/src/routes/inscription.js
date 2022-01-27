import React from 'react';
import '../CSS/inscription.css';
import profilepicture from '../images/defaultpicture.jpg';
import { Icon } from '@iconify/react';
import publicationpicture from '../images/defaultpublic.jpg';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";


class InscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pseudo:'',mail:'',bio:'', mdp: '',confirmMdp:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleChange(event) {

    const value = event.target.value;

    this.setState({
      // ...this.state c pour garder les 2 autres pas modifiés
      ...this.state,
      [event.target.name]: value
    });

}

  handleSubmit(event) {
    alert('Le pseudo : ' + this.state.pseudo +'\nLe mail : ' + this.state.mail + '\nLa bio : ' + this.state.bio
          + "\nLe mdp : "+ this.state.confirm);
    event.preventDefault();
  }

  render() {
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
            <h3>Biographie :</h3>
          </label>
          <input type="text" name="mdp" value={this.state.bio} onChange={this.handleChange} />
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

        <div className="subSection">
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


      </div>
    );
  }
}

export default Inscription;
