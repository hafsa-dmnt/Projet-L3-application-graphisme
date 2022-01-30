import React from 'react';
import '../CSS/inscription.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";


class InscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pseudo:'',mail:'',bio:'', mdp: '',confirmMdp:'',pdp:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const value = event.target.value;

    this.setState({
      // ...this.state c pour garder les 2 autres pas modifiés
      ...this.state,
      [event.target.name]: value
    });

  }

  handleChangeImage(event) {

    const value = URL.createObjectURL(event.target.files[0]);

    this.setState({
      ...this.state,
      pdp: value
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

        <div className='subSection'>
          <label>
            <h3>Photo de profil :</h3>
          </label>

          <label htmlFor="file-input" className="label-file">
            <p>Parcourir...</p>
          </label>

          <input id="file-input" type="file" accept="image/*" onChange={this.handleChangeImage}/>

          <img src={this.state.pdp}/>

        </div>

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
          <input type="text" name="bio" value={this.state.bio} onChange={this.handleChange} />
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
