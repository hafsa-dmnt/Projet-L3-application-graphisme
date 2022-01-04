import React from 'react';
import '../App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

function Calendrier() {
    return (
        <div>
        <h2>Novembre</h2>
        <p>Calendrier</p>
        <p><Link to="/calendrier/defijour">18</Link></p>
        </div>
    );
}

export default Calendrier;
