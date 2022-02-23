import React, { useState } from "react";
import '../CSS/creerPublication.css';
import DatePicker from "react-datepicker";
import { Icon } from '@iconify/react';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';

import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

registerLocale('fr', fr)


function CreateForm(props){
    const [dateDefi, setDateDefi] = useState(new Date());
    const [defi, setDefi] = useState(false);
    const today = new Date();
    const [imageUrl, setImageUrl] = useState();
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      if(!imageUrl){
        alert('Pas d\'image.');
        return;
      }
      // envoyer a la bd tout le bordel
      // chemin de l'image + si c un defi + date du defi + date dans today

      const formData = new FormData();

      formData.append("file", image)
      formData.append("public_id", "test1")
      formData.append("upload_preset", "hhd3mufr")
      formData.append("cloud_name","hzcpqfz4w")

      console.log({image});

      fetch(" https://api.cloudinary.com/v1_1/hzcpqfz4w/image/upload",{
        method:"post",
        body: formData
      }).then(resp => resp.json()).then(data => {
                                                  setUrl(data.url)
                                            }).catch(err => console.log(err));

      }


    const handleChangeImage = (event) => {
      const value = URL.createObjectURL(event.target.files[0]);
      setImageUrl(value);
      setImage(event.target.files[0]);
    }

    const handleChangeCheck = (event) => {
      setDefi(event.target.checked);
    }

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

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'hzcpqfz4w'
    }
  });

  const myImage = cld.image('test');

//<AdvancedImage cldImg={myImage} />

  return (
      <section className="page page_creerPubli">
          <CreateForm/>

      </section>
  );
}

export default CreerPublication;
