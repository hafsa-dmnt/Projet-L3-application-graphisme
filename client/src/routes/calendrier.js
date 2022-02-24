//import React, { useState } from 'react';
import '../CSS/calendrier.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

function Calendrier() {
    const today = new Date();
    const navigate = useNavigate();
    const minimumDate = new Date(2022,1,1);
    const monthTab = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let month = monthTab[today.getMonth()];

    const handleChange = dateSelected => {
        //const defiDay = {day: value[0], month: value[0].getMonth(), year: value[0].getFullYear()}
        //navigate to right date : get date, with year and month, to send a query in defijour route
        if(dateSelected > today){
            console.log("non bro");
        }
        // yyyy-mm-dd
        var month = Number(dateSelected.getMonth())+1;
        if(month < 10){
            month = "0"+month;
        }
        var day = Number(dateSelected.getDate());
        if(day < 10){
            day = "0"+day;
        }
        var year = 2000 + (Number(dateSelected.getYear())-100);
        var dateDefi = year +"-"+month+"-"+day;
        console.log(dateDefi);
        navigate("/calendrier/defijour?date="+dateDefi);
      };
    
    return (
        <section className="page page_calendrier">
            <h2>{month}</h2>
            <Calendar value={today} onChange={handleChange} maxDate={today} minDate={minimumDate}/>
        </section>
    );
}

export default Calendrier;
