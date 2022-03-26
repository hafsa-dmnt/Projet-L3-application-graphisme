import React, { useState } from "react";
import '../CSS/connexion.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {isCompleted} from '../classes/formValidation.js';

async function loginUser(credentials) {
  return fetch('/Connexion/'+credentials.pseudo, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    }).then(data => data.json())
}

async function verifyMdp(pseudo) {
  const chemin = [
    "/pseudoMdp/"+pseudo
  ];
  return Promise.all(chemin.map(url =>
    fetch(url)
    .then(checkStatus)  // check the response of our APIs
    .then(parseJSON)    // parse it to Json
    .catch(error => console.log('There was a problem!', error))
  ))
}


Connexion.propTypes = {
  setToken: PropTypes.func.isRequired,
  setPseudoFromToken: PropTypes.func.isRequired
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

export default function Connexion(prop) {

  const [pseudo, setPseudo] = useState('');
  const [mdp, setMdp] = useState('');

  const handleChangePseudo = (event) => {
    event.preventDefault();
    setPseudo(event.target.value);
  }

  const handleChangeMdp = (event) => {
    event.preventDefault();
    setMdp(event.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if(!(isCompleted('pseudo',pseudo)&isCompleted("mot de passe",mdp))){
      return;
    }

    var body=await verifyMdp(pseudo);

    if(body[0].length==0){
      alert("Le pseudo n'existe pas.")
      return;
    }

    var mdpbd=body[0][0].utilisateur_mdp;
    var passwordHash = require('password-hash');
    var mdpEstBon=passwordHash.verify(mdp, mdpbd.trim());

    if(!mdpEstBon){
      alert('Le mot de passe est incorrect');
      return;
    }

    const token = await loginUser({
      pseudo,
      mdp
    });

    prop.setPseudoFromToken(pseudo);
    prop.setToken(token);
    setPseudo(pseudo);

  }

  return(

    <div className="page page_connexion">
      <div className="section title">
        <h2>Connexion</h2>
      </div>

      <div className="section">

        <form onSubmit={handleSubmit} className = "connexionForm">
          <div className="subSection">
            <label>
              <h3>Pseudo :</h3>
            </label>
            <input type="text" name="pseudo" value={pseudo} onChange={handleChangePseudo} />
          </div>

          <div className="subSection">
            <label>
              <h3>Mot de passe :</h3>
            </label>
            <input type="password" name="mdp" value={mdp} onChange={handleChangeMdp} />
          </div>

          <div className="subSection">
            <button type="submit" onClick={handleSubmit}>
              <Icon icon="akar-icons:check-box-fill" />
            </button>
          </div>

          <div className="subSection link">
              <p>Pas encore de compte ? <Link to={"/inscription"}>Vous pouvez en créer un !</Link></p>
          </div>

        </form>

      </div>

    </div>
  )
}
