import React from 'react';
import { Icon } from '@iconify/react';
//import logo from './logo.svg'; //remplacer par notre logo
import './App.css';
import Compte from './routes/compte.js'
import Publication from './routes/publication.js'
import Profil from './routes/profil.js'
import Calendrier from './routes/calendrier.js'
import Defijour from './routes/defijour.js'
import Home from './routes/home.js'
import ListeThemes from './routes/listethemes.js'
import Parametres from './routes/parametres.js'
import Inscription from './routes/inscription.js'
import Listes from './routes/listes.js'
import CreerPublication from './routes/creerPublication.js'



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

class  App extends React.Component{
  constructor(props) {
    super(props);

    let { pseudo } = "user1";//route pour savoir si on est authentifié ou pas Auth.getCurrentUser() || {};

    this.state = {
      user: pseudo
    };
  }
  render(){
    return (
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/profil" element={<Profil/>}/>
            <Route exact path="/profil/listes" element={<Listes/>}/>
            <Route exact path="/profil/listethemes" element={<ListeThemes/>}/>
            <Route exact path="/calendrier" element={<Calendrier/>}/>
            <Route exact path="/calendrier/defijour" element={<Defijour/>}/>
            <Route exact path="/compte/publication" element={<Publication/>}/>
            <Route exact path="/compte" element={<Compte/>}/>
            <Route exact path="/parametres" element={<Parametres/>}/>
            <Route exact path="/inscription" element={<Inscription/>}/>
            <Route exact path="/creerPublication" element={<CreerPublication/>}/>
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


export default App;
