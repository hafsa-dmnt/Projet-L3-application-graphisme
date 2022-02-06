import React, { useState } from "react";
import '../CSS/creerPublication.css';
import DatePicker from "react-datepicker";
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";




function CreerPublication() {

  const [date, setDate] = useState(new Date());


    return (
        <section className="page">
            <DatePicker selected={date} onChange={date => setDate(date)} />

        </section>
    );
}

export default CreerPublication;
