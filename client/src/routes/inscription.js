import React from 'react';
import '../CSS/inscription.css';
import { Icon } from '@iconify/react';

import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

import {validateEmail,
        passwordConfirmation,
        isCompleted,
        isMailAlreadyUsed,
        isPseudoAlreadyUsed
        } from '../classes/formValidation.js';


class InscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pseudo:'',mail:'',bio:'', mdp: '',confirm:'',pdp:'',url:'',pdp_url:''};
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
      pdp: event.target.files[0],
      pdp_url:value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(!(isCompleted('pseudo',this.state.pseudo)&isCompleted('mail',this.state.mail))){
      return;
    }

    if(!(isCompleted('mail',this.state.mail)&isCompleted('bio',this.state.bio))){
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

    if(this.state.pdp_url === ''){
      alert('Pas d\'image de profil.');
      return;
    }

    const formData = new FormData();

//////// TODO
    // BD : get id utilisateur
    // var id = nomUti + "pdp"

    // envoie a la bd
      // id photo = id
      // pseudo = this.state.pseudo
      // mail = this.state.mail
      // bio = this.state.bio
      // mdp = this.state.mdp

    var id = 'testpdp';


    formData.append("file", this.state.pdp);
    formData.append("public_id", id);
    formData.append("upload_preset", "hhd3mufr");
    formData.append("cloud_name","hzcpqfz4w");


    fetch(" https://api.cloudinary.com/v1_1/hzcpqfz4w/image/upload",{
      method:"post",
      body: formData
    }).then(resp =>
              resp.json()).then(data => {
                                      this.setState({
                                        ...this.state,
                                        url: data.url
                                      })
                                          }).catch(err => console.log(err));

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

          <img src={this.state.pdp_url}/>

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
