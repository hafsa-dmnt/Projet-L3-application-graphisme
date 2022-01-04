import React from 'react';
import '../App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

function Publication() {
    return (
        <div>
        <h2>Un dessin</h2>
        <p>Fait par <Link to="/compte">jefedesdessins</Link></p>
        </div>
    );
}

export default Publication;
