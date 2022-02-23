import React from 'react';
import '../CSS/connexion.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";

class ConnexionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pseudo:'', mdp: ''};
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
    alert(this.state.pseudo, this.state.mdp);
    //connexion avec le serveur
    /*
    SELECT mdp FROM utilisateur WHERE pseudo = this.state.pseudo;
    //redirect to paramètres si le mot de passe est bon, message d'erreur sinon
    */
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} className = "connexionForm">
        <div className="subSection">
          <label>
            <h3>Pseudo :</h3>
          </label>
          <input type="text" name="pseudo" value={this.state.pseudo} onChange={this.handleChange} />
        </div>

        <div className="subSection">
          <label>
            <h3>Mot de passe :</h3>
          </label>
          <input type="password" name="mdp" value={this.state.mdp} onChange={this.handleChange} />
        </div>

        <div className="subSection">
          <button type="submit" onClick={this.handleSubmit}>
            <Icon icon="akar-icons:check-box-fill" />
          </button>
        </div>

        <div className="subSection">
            <p>Pas encore de compte ? Vous pouvez en créer un <Link to="/inscription">ici</Link>.</p>
        </div>

      </form>
    );
  }
}


class Connexion extends React.Component{
  render(){
    return (
      <div className="page page_connexion">
        <div className="section title">
          <h2>Connexion</h2>
        </div>

        <div className="section">
          <ConnexionForm/>
        </div>
      </div>
    );
  }
}

export default Connexion;
