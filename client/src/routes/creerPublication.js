import React, { useState } from "react";
import '../CSS/creerPublication.css';
import DatePicker from "react-datepicker";
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)


function CreateForm(props){
    const [dateDefi, setDateDefi] = useState(new Date());
    const [image,setImage] = useState("");
    const [defi,setDefi] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      alert('submit');
    }

    const handleChangeImage = (event) => {
      const value = URL.createObjectURL(event.target.files[0]);
      setImage(value);
    }

    const handleChangeDefi = (event) => {
      setDefi(event.target.checked);
    }


    //<DatePicker selected={dateDefi} onChange={dateDefi => setDate2(dateDefi)} />


    return (

      <form onSubmit={handleSubmit}>

        <div className="section">

          <div className="subSection">
            <label>
              <h3>Image :</h3>
            </label>

            <label htmlFor="file-input" className="label-file">
              <p>Parcourir...</p>
            </label>

            <input id="file-input" type="file" accept="image/*" onChange={handleChangeImage}/>

            <img src={image}/>

          </div>

          <div className="subSection">
            <input type="checkbox"/>
            <DatePicker selected={dateDefi} onChange={dateDefi => setDateDefi(dateDefi)} locale="es" dateFormat="dd-MM-y"/>
          </div>

          <div className="subSection">
            <button type="submit" >
              <Icon icon="akar-icons:check-box-fill" />
            </button>
          </div>
        </div>
      </form>

    );
}


function CreerPublication() {

  /*

    image
    defi ?
    date jour courant : auto
    date defi si defi : datepicker
    date picker pas dans le futur que dans passé (jusqua quelle date ??)
    envoyer

  */


    return (
        <section className="page page_creerPubli">
            <CreateForm/>

        </section>
    );
}

export default CreerPublication;
