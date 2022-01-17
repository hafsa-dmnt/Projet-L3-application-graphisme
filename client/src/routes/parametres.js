import React from 'react';
import '../CSS/profil.css';
import profilepicture from '../images/defaultpicture.jpg';
import { Icon } from '@iconify/react';
import publicationpicture from '../images/defaultpublic.jpg';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";

class Parametres extends React.Component{
  state = {
    pseudo: null,
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ pseudo: res[0].user_pseudo.trim(), email: res[0].user_email.trim(), bio: res[0].user_bio.trim(), data:null }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('./parametersUser/user1');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log("requete", body);
    return body;
  };

  render(){
    return (
      <div className="profil">
        <p>mon pseudo : {this.state.pseudo}</p>
        <p>mon mail : {this.state.email}</p>
        <p>ma bio : {this.state.bio}</p>
      </div>
    );
  }
}

export default Parametres;
