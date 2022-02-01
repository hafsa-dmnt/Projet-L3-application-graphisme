import React, { useState } from 'react';
import '../CSS/calendrier.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

import {
    Link
  } from "react-router-dom";

function Calendrier() {
    const value = useState(new Date());
    const navigate = useNavigate();

    const monthTab = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let month = monthTab[value[0].getMonth()];

    const handleChange = value => {
        //const defiDay = {day: value[0], month: value[0].getMonth(), year: value[0].getFullYear()}
        //navigate to right date : get date, with year and month, to send a query in defijour route 
        navigate("/calendrier/defijour");
      };

    return (
        <section className="page_calendrier">
            <h2>{month}</h2>
            <Calendar value={value}  onChange={handleChange} />
        </section>
    );
}

export default Calendrier;
