//import React, { useState } from 'react';
import '../CSS/calendrier.css';
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";

function Calendrier() {
    const today = new Date();
    const navigate = useNavigate();
    const minimumDate = new Date(2022,1,1);
    //récupération des publications à la date donnée 
    const publicationsAtDate = "";

    const handleChange = dateSelected => {
        //const defiDay = {day: value[0], month: value[0].getMonth(), year: value[0].getFullYear()}
        //navigate to right date : get date, with year and month, to send a query in defijour route

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
        navigate("/calendrier/defijour?date="+dateDefi);
    };
    
    return (
        <section className="page page_calendrier">
            <div className='dateCalendrier'>
                <h3>{"défis".toUpperCase()}</h3>
            </div>
            <Calendar value={today} onChange={handleChange} maxDate={today} minDate={minimumDate}/>
            
        </section>
    );
}

export default Calendrier;
