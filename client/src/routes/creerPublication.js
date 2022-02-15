import React, { useState } from "react";
import '../CSS/creerPublication.css';
import DatePicker from "react-datepicker";
import { Icon } from '@iconify/react';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
import axios from 'axios';
registerLocale('fr', fr)


function CreateForm(props){
    const [dateDefi, setDateDefi] = useState(new Date());
    const [image,setImage] = useState();
    const [imageUrl,setImageUrl] = useState("");
    const [defi, setDefi] = useState(false);
    const today = new Date();

    const handleSubmit = (event) => {
      event.preventDefault();
      if(imageUrl == ""){
        alert('Pas d\'image.');
        return;
      }
      // envoyer a la bd tout le bordel
      // chemin de l'image + si c un defi + date du defi + date dans today
      // enregistrer image dans dossier publication

      // Create an object of formData
      const formData = new FormData();

      console.log({image});

      // Update the formData object
      formData.append(
        "myFile",
        {image}
      );

      // Details of the uploaded file
      console.log({image});

      // Request made to the backend api
      // Send formData object
      axios.post("/images", formData);


    }

    const handleChangeImage = (event) => {
      const value = URL.createObjectURL(event.target.files[0]);
      setImageUrl(value);
      setImage(event.target.files[0]);
    }

    const handleChangeCheck = (event) => {
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

            <img src={imageUrl}/>

          </div>

          <div className="subSection">
            <label>
              <h3>Répond à un défi :</h3>
            </label>

            <label className="switch">
              <input type="checkbox" onChange={handleChangeCheck} />
              <span className="slider round"></span>
            </label>


          </div>

          <div className="subSection">
            <label>
              <h3>Date du défi :</h3>
            </label>

            <div className="datePickerContainer">
              <DatePicker selected={dateDefi} onChange={dateDefi => setDateDefi(dateDefi)} locale="fr" dateFormat="dd-MM-y" maxDate={today} />
            </div>

          </div>

          <div className="subSection submitSection">
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
