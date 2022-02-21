import React from 'react';
import '../CSS/parametres.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";




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
    alert('Le nom a été soumis : ' + this.state.value);
    event.preventDefault();
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
    alert('Le new mdp : ' + this.state.mdp
          + "\nconfirm : "+ this.state.confirm
          +"\nold : "+ this.state.old);
    event.preventDefault();
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

    const formData = new FormData();
    formData.append("file", this.state.image);
    // public id c ce que on va aller chercher du coup hehhehe
    formData.append("public_id", "param");
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
            <SimpleForm type="Pseudo" value={this.state.pseudo} />
          </div>
          <div className="section mail">
            <SimpleForm type="Mail" value={this.state.email}/>
          </div>
          <div className="section bio">
            <SimpleForm type="Biographie" value={this.state.bio}/>
          </div>
          <div className="section mdp">
            <MdpForm/>
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
