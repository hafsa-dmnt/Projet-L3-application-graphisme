import React, { useState } from "react";
import '../CSS/connexion.css';
import { Icon } from '@iconify/react';
//import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {isCompleted} from '../classes/formValidation.js';


// TODO faire en sorte qye on puisse pas aller dessus si on est coo

async function loginUser(credentials) {
  //TODO chemin en bien
  //
  return fetch('/Connexion/'+credentials.pseudo, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    }).then(data => data.json())
}


Connexion.propTypes = {
  setToken: PropTypes.func.isRequired
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export default function Connexion({setToken}) {

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
    
    // verifier que mdp et pseudo corepondent bd
    // + l'envoyer vers le composant app jsp comment
    console.log(pseudo);
    
    const lien="/pseudoMdp/"+pseudo;
    const response = await fetch(lien);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }

    if(body.length > 0){
      var mdpbd=body[0].utilisateur_mdp;
    
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
      setToken(token);
      setPseudo(pseudo);
    }else{
      alert('Le pseudo saisi est incorrect');
      return;
    }
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

          <div className="subSection">
              <p>Pas encore de compte ? Vous pouvez en créer un .</p>
          </div>

        </form>

      </div>

    </div>
  )
}
