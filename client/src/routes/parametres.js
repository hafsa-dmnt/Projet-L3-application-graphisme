import React from 'react';
import '../CSS/parametres.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import useToken from '../classes/useToken';





class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.type = le truc qu'on envoie
    // pseudo mail ou bio
    alert('Le nom a été soumis : ' + this.state.value);

/////// TODO

    // verif mail pas meme que Ancien (en fonction de this.props.type)
    // verif pseudo pas meme que ancien
    // verif mail pas deja dans bd
    // verif pseudo pas deja dans bd
    // verif pas de script etc

    // update bd




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
    this.state = {mdp: '',confirm:'',old:''};
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
    alert('Le new mdp : ' + this.state.mdp
          + "\nconfirm : "+ this.state.confirm
          +"\nold : "+ this.state.old);

    if(this.state.mdp != this.state.mdp){
      alert("Les mots de passes ne correpondent pas.");
      return;
    }
/////// TODO
    // verifier old mdp correspond a celui enregistrer dans bd
    // update mdp

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
    alert('yay');
    event.preventDefault();

///////// TODOOOO
    // BD : get id utilisateur

    // var id = nomUti + 'pdp'

    // pas besoin update bd paske l'id ne change pas


    var id = "test";

    const formData = new FormData();
    formData.append("file", this.state.image);
    formData.append("public_id", id);
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

  state = {
    pseudo: null,
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ pseudo: res[0].utilisateur_pseudo.trim(), email: res[0].utilisateur_email.trim(), bio: res[0].utilisateur_bio.trim(), data:null }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/parametersUser/user2');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    console.log("requete", body);
    return body;
  };


  deleteToken(){
    localStorage.removeItem('token');
    window.location.reload(false);
  }

  render(){

    const dataLoaded = (this.state.pseudo!=null);

    if(dataLoaded){

      // todo mettre la php de base ?

      return (
        <div className="page page_parametre">

          <div className="section pdp">
            <ImageForm/>
          </div>

          <div className="section pseudo">
            <SimpleForm type="pseudo" value={this.state.pseudo} />
          </div>
          <div className="section mail">
            <SimpleForm type="mail" value={this.state.email}/>
          </div>
          <div className="section bio">
            <SimpleForm type="bio" value={this.state.bio}/>
          </div>
          <div className="section mdp">
            <MdpForm/>
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
