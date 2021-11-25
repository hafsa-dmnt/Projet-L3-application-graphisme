import React from 'react';
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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="calendrier">Calendrier</Link>
            </li>
            <li>
              <Link to="home">Home</Link>
            </li>
            <li>
              <Link to="profil">Profil</Link>
            </li>
          </ul>
        </nav>
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
      </div>
    </Router>
  );
}


export default App;
