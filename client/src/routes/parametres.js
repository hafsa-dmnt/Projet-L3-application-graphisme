import React from 'react';
import '../CSS/parametres.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import useToken from '../classes/useToken';

import {validateEmail,
        passwordConfirmation,
        isCompleted,
        isMailAlreadyUsed,
        isPseudoAlreadyUsed
        } from '../classes/formValidation.js';

//'/changeuserinfo/:oldpseudo-:newpseudo-:bio-:mdp-:mail'

async function changeUser(oldp, newp, bio, mdp, mail){
  const chemin = [
    '/changeuserinfo/'+oldp+'-'+newp+'-'+bio+'-'+mdp+'-'+mail
  ];

  Promise.all(chemin.map(url =>
    fetch(url)
    .then(checkStatus)  // check the response of our APIs
    .then(parseJSON)    // parse it to Json
    .catch(error => console.log('There was a problem!', error))
  ))
  .then(data => { 
    window.location.reload(false);
  })
}

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
      redirect = '/profil/listes';
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

class SimpleForm extends React.Component {
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

    const value = event.target.value;

    switch (this.props.type) {
      case 'pseudo':
        if(!isCompleted('pseudo',this.state.value)){
          return;
        }
        if(isPseudoAlreadyUsed(this.state.value)){
          return;
        }

        changeUser(this.props.pseudo, this.state.value, this.props.bio, this.props.mdp, this.props.mail);
      break;
      case 'mail':
        if(!isCompleted('email',this.state.value)){
          return;
        }
        if(isMailAlreadyUsed(this.state.value)){
          return;
        }

        changeUser(this.props.pseudo, this.props.pseudo, this.props.bio, this.props.mdp, this.state.value);
      break;
      case 'bio':
        if(!isCompleted('biographie',this.state.value)){
          return;
        }

        changeUser(this.props.pseudo, this.props.pseudo, this.state.value, this.props.mdp, this.props.mail);

      break;
    }


  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>
          <h3>{this.props.type} : </h3>
        </label>

        <div className="form_section">
          <input type="text" value={this.state.value} onChange={this.handleChange} />

          <button type="submit" >
            <Icon icon="akar-icons:check-box-fill" />
          </button>
        </div>

      </form>
    );
  }
}

class MdpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mdp: '',confirm:'',old:this.props.mdp};
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
    event.preventDefault();

    if(this.state.mdp != this.state.confirm){
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if(this.state.old != this.props.mdp){
      alert("Le mot de passe ne correspond pas à celui enregistré.");
      return;
    }

    changeUser(this.props.pseudo, this.props.pseudo, this.props.bio, this.state.mdp, this.props.mail);
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} className = "mdpForm">
        <h3>Mot de passe </h3>

        <div className="subSection">
          <label>
            <h3>Nouveau :</h3>
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
          <label>
            <h3>Ancien : </h3>
          </label>
          <input type="password" name="old" value={this.state.old} onChange={this.handleChange} />
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

class ImageForm extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      image: '',
      imageUrl : '',
      url : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      imageUrl: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0]
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    var url = this.props.pseudo.trim()+"_pdp";

    const formData = new FormData();
    formData.append("file", this.state.image);
    formData.append("public_id", url);
    formData.append("upload_preset", "hhd3mufr");
    formData.append("cloud_name","hzcpqfz4w");

    // TODO  : verifier si on envoie nouvo truc avec meme id ca ecrit par dessus ou pas
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

  render(){

    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          <h3>Photo de profil :</h3>
        </label>

        <label htmlFor="file" className="label-file">
          <p>Parcourir...</p>
        </label>

        <input id="file" type="file" accept="image/*" onChange={this.handleChange}/>

        <img src={this.state.file}/>

        <div className="subSection">
          <button type="submit" >
            <Icon icon="akar-icons:check-box-fill" />
          </button>



        </div>
      </form>
    );

  }

}





class Parametres extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      pseudo: null,
      data: null,
      redirect : null
    };
    this.handleInfo = this.handleInfo.bind(this);
    this.deleteToken = this.deleteToken.bind(this);

  }



  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ pseudo: res[0].utilisateur_pseudo.trim(), email: res[0].utilisateur_email.trim(), bio: res[0].utilisateur_bio.trim(), mdp: res[0].utilisateur_mdp }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const tokenString = localStorage.getItem('token');
    var temp = JSON.parse(tokenString);
    temp = temp.token;

    const response = await fetch('/parametersUser/'+temp);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  deleteToken(){
    localStorage.removeItem('token');
    window.location.reload(false);
  }

  handleInfo(){
    this.setState({ redirect: "/informations" });
  }

  render(){

    if (this.state.redirect) {
      return <Navigate to={this.state.redirect}/>
    }

    const dataLoaded = (this.state.pseudo!=null);


    if(dataLoaded){

      // todo mettre la php de base ?

      return (
        <div className="page page_parametre">
          <div className="section pdp">
            <ImageForm pseudo={this.state.pseudo}/>
          </div>

          <div className="section pseudo">
            <SimpleForm type="pseudo" value = {this.state.pseudo} pseudo = {this.state.pseudo} bio = {this.state.bio} mail = {this.state.email} mdp = {this.state.mdp}/>
          </div>
          <div className="section mail">
            <SimpleForm type="mail" value = {this.state.email} pseudo = {this.state.pseudo} bio = {this.state.bio} mail = {this.state.email} mdp = {this.state.mdp}/>
          </div>
          <div className="section bio">
            <SimpleForm type="bio" value = {this.state.bio} pseudo = {this.state.pseudo} bio = {this.state.bio} mail = {this.state.email} mdp = {this.state.mdp}/>
          </div>
          <div className="section mdp">
            <MdpForm pseudo = {this.state.pseudo} bio = {this.state.bio} mail = {this.state.email} mdp = {this.state.mdp}/>
          </div>
          <div className="section info">
            <button onClick={this.handleInfo}>Informations</button>
          </div>
          <div className="section deco">
            <button onClick={this.deleteToken}>Déconnexion</button>
          </div>

        </div>
      );
    }else{
      return (
        <div className="page page_parametre">
          <div className="section pseudo">

            <p>Loading ... </p>

          </div>

        </div>
      );
    }
  }
}



export default Parametres;
