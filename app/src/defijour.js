import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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

export default Defijour;