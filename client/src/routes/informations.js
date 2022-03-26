import React from 'react';
import '../App.css';
import '../CSS/informations.css';
import { Icon } from '@iconify/react';
import { Navigate } from "react-router-dom";



class Informations extends React.Component{
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div className="page informations">

        <div className="section">
          <h3> Retrouvez-nous sur Instagram !</h3>
          <p>
            <a href="https://www.instagram.com/getrandomart/" target="_blank"> <Icon icon="akar-icons:instagram-fill" /> @getrandomart</a>
          </p>
        </div>

        <div className="section">
          <h3> Une question, un problème ? </h3>
          <p>N'hésitez pas à nous contacter :</p>
          <p> <a href='mailto:getrandomart@gmail.com'>getrandomart@gmail.com</a></p>
        </div>

        <div className="section credits">

          <p> Application réalisée par :</p>
          <p className="names"> Hafsa Demnati - Éléa Jacquin <br/> Marie-Almina Gindre</p>
          <p className="univ"> CMI Informatique <br/> Université de Franche-Comté  </p>

        </div>

      </div>
    );
  }
}

export default Informations;
