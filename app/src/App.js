import React from 'react';
import logo from './logo.svg';
import './App.css';
import Compte from './compte.js'
import Publication from './publication.js'
import Profil from './profil.js'
import Mesthemes from './mesthemes.js'
import Calendrier from './calendrier.js'
import Defijour from './defijour.js'

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
              <Link to="/calendrier">Calendrier</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profil">Profil</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
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

function Home() {
  return (
    <div>
      <h2>GetRandomArt()</h2>
      <p>Thème du jour : forêt</p>
      <p>Palette du jour : bleu vert orange</p>
      <button>getRandomArt()</button>
    </div>
  );
}
/*
function Profil() {
  return (
  <div>
    <h2>XxGrenouille_du_39</h2>
    <p><Link to="/profil/mesthemes">Mes thèmes</Link></p>
    <p>Mes Palette</p>
    <p>Galerie</p>
  </div>
  );
}

function Mesthemes() {
  return (
    <div>
      <h2>Mes thèmes</h2>
      <ul>
        <li>A plusieurs</li>
        <li>Photo</li>
        <li><Link to="/profil/mesthemes/peinture">Peinture</Link></li>
      </ul>
    </div>
    );
}
*/
function Peinture() {
  return (
    <div>
      <h2>Peinture</h2>
      <ul>
        <li>Abeille</li>
        <li>Ville</li>
        <li>Grenouille</li>
      </ul>
    </div>
  );
}
/*
function Calendrier() {
  return (
    <div>
      <h2>Novembre</h2>
      <p>Calendrier</p>
      <p><Link to="/calendrier/defijour">18</Link></p>
    </div>
  );
}

function Defijour() {
  return (
    <div>
      <h2>18 novembre</h2>
      <p>Thème du jour : mer</p>
      <p>Palette du jour : bleu jaune orange</p>
      <p><Link to="/compte/publication">Dessin d'un autre compte</Link></p>
    </div>
    );
}

function Publication() {
  return (
    <div>
      <h2>Un dessin</h2>
      <p>Fait par <Link to="/compte">jefedesdessins</Link></p>
    </div>
    );
}

/*
function Compte() {
  return (
    <div>
      <h2>jefedesdessins</h2>
      <ul>
        <li>Un dessin</li>
        <li>Un autre</li>
        <li>Encore un autre</li>
      </ul>
    </div>
    );
}*/

export default App;