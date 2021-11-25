import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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
  
  export default Profil;