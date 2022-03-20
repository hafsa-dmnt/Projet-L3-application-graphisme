import React, { useState } from "react";
import { Icon } from '@iconify/react';
//import logo from './logo.svg'; //remplacer par notre logo
import './App.css';
import Publication from './routes/publication.js'
import Profil from './routes/profil.js'
import Visit from './routes/visit.js'
import Calendrier from './routes/calendrier.js'
import Defijour from './routes/defijour.js'
import Home from './routes/home.js'
import ListePalettes from './routes/listepalettes.js'
import ListeThemes from './routes/listethemes.js'
import CreerListeThemes from './routes/creerlistethemes.js'
import CreerListePalettes from './routes/creerlistepalettes.js'
import Parametres from './routes/parametres.js'
import Inscription from './routes/inscription.js'
import Listes from './routes/listes.js'
import AddToList from './routes/addToList.js'
import CreerPublication from './routes/creerPublication.js'
import ModifierListePalettes from './routes/modifierlistepalettes.js'
import ModifierListeThemes from './routes/modifierlistethemes.js'
import Abonnements from './routes/abonnements';
import Informations from './routes/informations';

import Connexion from './routes/connexion.js'
import {useToken} from './classes/useToken';


import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  Link,
} from "react-router-dom";

class AppComponent extends React.Component{
  constructor(props) {
    super(props);

  }


  render(){

    return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/addToList" element={<AddToList/>}/>
            <Route exact path="/profil" element={<Profil/>}/>
            <Route exact path="/visit" element = {<Visit/>}/>
            <Route exact path="/profil/listes" element={<Listes/>}/>
            <Route exact path="/profil/listethemes" element={<ListeThemes/>}/>
            <Route exact path="/profil/listepalettes" element={<ListePalettes/>}/>
            <Route exact path="/profil/abonnements" element={<Abonnements/>}/>
            <Route exact path="/calendrier" element={<Calendrier/>}/>
            <Route exact path="/calendrier/defijour" element={<Defijour/>}/>
            <Route exact path="/parametres" element={<Parametres/>}/>
            <Route exact path="/inscription" element={<Inscription/>}/>
            <Route exact path="/creerPublication" element={<CreerPublication/>}/>
            <Route exact path="/profil/listethemes/creer" element={<CreerListeThemes/>}/>
            <Route exact path="/profil/listepalettes/creer" element={<CreerListePalettes/>}/>
            <Route exact path="/profil/listethemes/modifier" element={<ModifierListeThemes/>}/>
            <Route exact path="/profil/listepalettes/modifier" element={<ModifierListePalettes/>}/>
            <Route exact path="/informations" element={<Informations/>}/>
            <Route exact path="/connexion" element={
              <Connexion  setToken={this.props.setToken} setPseudoFromToken={this.props.setPseudoFromToken}/>}
            />
            <Route path="*" element={<Home/>}/>}
            />
          </Routes>



          <nav className="menu_principal">
            <ul>
              <li>
                <Link to="calendrier">
                  <Icon icon="fa-solid:calendar-alt" />
                </Link>
              </li>
              <li>
                <Link to="home">
                  <Icon icon="bi:dice-3-fill" />
                </Link>
              </li>
              <li>
                <Link to="profil">
                  <Icon icon="bx:bxs-user-circle" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>
    );
  }
}


export default function App() {

  const [valid, setValidate] = useState(false);


  async function validateToken(token) {

    return fetch('/validateToken/'+token, {
      method: 'POST'
    }).then(data => data.json())

  }

  const {token, setToken,setPseudoFromToken} = useToken();

  // va savoir pourquoi il faut deux fonctions mais ca marche pas avec une seule

  if(token){
    Promise.resolve(validateToken(token)).then(function(value) {
      setValidate(value);
    });
  }

  if(!token || !valid){
    return(<Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Connexion setToken={setToken} setPseudoFromToken={setPseudoFromToken} />}/>
          <Route exact path="/inscription" element={<Inscription/>}/>
          <Route exact path="/connexion" element={
            <Connexion setToken={setToken} setPseudoFromToken={setPseudoFromToken} />}
          />
          <Route path="*" element={
            <Connexion setToken={setToken} setPseudoFromToken={setPseudoFromToken} />}
          />
        </Routes>
      </div>
      </Router>
    );
  }
  return(
    <AppComponent setToken={setToken} setPseudoFromToken={setPseudoFromToken}/>
  );

}
