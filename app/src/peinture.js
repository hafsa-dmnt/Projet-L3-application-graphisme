import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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

export default Peinture;
