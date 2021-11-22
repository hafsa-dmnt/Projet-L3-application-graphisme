import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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

  export default Mesthemes;