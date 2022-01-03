import React from 'react';
import { Icon } from '@iconify/react';
import logo from './logo.svg';
import './App.css';
import Compte from './routes/compte.js'
import Publication from './routes/publication.js'
import Profil from './routes/profil.js'
import Mesthemes from './routes/mesthemes.js'
import Calendrier from './routes/calendrier.js'
import Defijour from './routes/defijour.js'
import Home from './routes/home.js'
import Peinture from './routes/peinture.js'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Home/>
      <div>
        <Routes>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/profil" element={<Profil/>}/>
          <Route exact path="/profil/mesthemes" element={<Mesthemes/>}/>
          <Route exact path="/profil/mesthemes/peinture" element={<Peinture/>}/>
          <Route exact path="/calendrier" element={<Calendrier/>}/>
          <Route exact path="/calendrier/defijour" element={<Defijour/>}/>
          <Route exact path="/compte/publication" element={<Publication/>}/>
          <Route exact path="/compte" element={<Compte/>}/>
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


export default App;
