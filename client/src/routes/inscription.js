import React from 'react';
import '../CSS/inscription.css';
import profilepicture from '../images/defaultpicture.jpg';
import { Icon } from '@iconify/react';
import publicationpicture from '../images/defaultpublic.jpg';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";




class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
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

        <div class="form_section">
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

      <form onSubmit={this.handleSubmit} classe = "mdpForm">
        <h3>Mot de passe </h3>
        <label>
          <h3>Nouveau :</h3>
        </label>
        <input type="text" name="mdp" value={this.state.mdp} onChange={this.handleChange} />

        <label>
          <h3>Confirmation : </h3>
        </label>
        <input type="text" name="confirm" value={this.state.confirm} onChange={this.handleChange} />

        <label>
          <h3>Ancien : </h3>
        </label>
        <input type="text" name="old" value={this.state.old} onChange={this.handleChange} />

        <button type="submit" >
          <Icon icon="akar-icons:check-box-fill" />
        </button>

      </form>
    );
  }
}


class Inscription extends React.Component{

  render(){
    return (
      <div className="page page_inscription">
        <div className="section pseudo">
          <SimpleForm type="Pseudo"/>
        </div>
        <div className="section mail">
          <SimpleForm type="Mail"/>
        </div>
        <div className="section bio">
          <SimpleForm type="Biographie"/>
        </div>
        <div className="section mdp">
          <MdpForm/>
        </div>

      </div>
    );
  }
}

export default Inscription;
