import React from 'react';
import '../CSS/inscription.css';
import { Icon } from '@iconify/react';

import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

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
    alert('Le pseudo : ' + this.state.pseudo +'\nLe mail : ' + this.state.mail + '\nLa bio : ' + this.state.bio
          + "\nLe mdp : "+ this.state.mdp);
    event.preventDefault();


      if(this.state.pdp_url == '""'){
        alert('Pas d\'image.');
        return;
      }

      const formData = new FormData();

      // todo :
        // image mettre le id correctement
        // envoie a la bd


      formData.append("file", this.state.pdp);
      // public id c ce que on va aller chercher du coup hehhehe
      formData.append("public_id", "test2");
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
