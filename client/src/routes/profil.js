import React from 'react';
import '../CSS/profil.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

import {defaultImage} from "@cloudinary/url-gen/actions/delivery";

class Follow extends React.Component{
  constructor(props){
    super(props);
  }

  followSomeone(){
    alert("todo : follow someone");
  }

  render(){
    return(
        <button id="btnFollow" onClick={() => this.followSomeone()}>
          <Icon icon="heroicons-solid:user-add"/>
        </button>
    );
  }
}

class ButtonClick extends React.Component{
  state = { redirect: null };
  handleClick() {
    let redirect = this.state.redirect;
    redirect = this.props.chemin;
    this.setState({redirect: redirect});
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return(
      <button id={this.props.idbtn} onClick={() => this.handleClick()}>
        <Icon icon={this.props.iconbtn}/>
      </button>
    );
  }
}

class ProfilHead extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let btnAfficher = <ButtonClick chemin='/parametres' iconbtn="ant-design:setting-twotone" idbtn="btnParameters"/>
    let lienListes= <div className="link liste">
                  <Link to="/profil/listes?type=themes"> <Icon icon="fluent:text-bullet-list-square-20-filled" /> Mes thèmes et palettes</Link>

                </div>;
    var linkabonnements = "/profil/abonnements?pseudo="+this.props.pseudo;
    let lienAbonnes= <div className="link follow">
      <Link to={linkabonnements}><Icon icon="bi:person-fill" /> Les personnes que je suis</Link>

    </div>;

    const cld = new Cloudinary({
      cloud: {
        cloudName: "hzcpqfz4w"//process.env.CLOUD_NAME
      }
    });


    var myImage = cld.image(this.props.photo);
    myImage.delivery(defaultImage("profil_default.png"));


    return(
      <header className="profilHead section">
        <div key={this.props.idx} className="profilePic" alt="photo de profil">
          <AdvancedImage cldImg={myImage} />
        </div>
        <h3>{this.props.pseudo}</h3>
        {btnAfficher}
        {lienListes}
        {lienAbonnes}
      </header>
    );
  }
}

class Publication extends React.Component {
  render(){
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hzcpqfz4w'
      }
    });

    const myImage = cld.image(this.props.photo);
    return(
      <div key={this.props.idx} className="publication">
        <AdvancedImage cldImg={myImage} />
      </div>
    );
  }
}

class ProfilContent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let tabPublication = this.props.content.reverse();
    let divPubli = <section className='aucunePubli'>
                      <div className='iconPasDePubli'><Icon icon="ep:picture-rounded"/></div>
                      <h3>Aucune publication</h3>
                    </section>;
    if(tabPublication.length > 0){
        divPubli = tabPublication.map((elt, idx) =>
        <Publication photo = {elt.publication_image} idx = {elt.publication_id}/>  );
    }

    return(
      <section className="section profilContent">
        <section className="galerie">
          <div className='maGalerie'>
            <h3>Galerie</h3>
            <ButtonClick chemin={'/creerPublication?pseudo='+this.props.pseudo} iconbtn="fluent:add-12-filled" idbtn="btnAddPublication"/>
          </div>
          {divPubli}
        </section>
      </section>
    );
  }
}


class Profil extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      pseudo: "",
      pdp: "",
      data: []
    };
  }

  componentDidMount(){
    const tokenString = localStorage.getItem('token');
    var temp = JSON.parse(tokenString);
    temp = temp.token;
    const chemin = [
      "/publicationsofuser/"+temp,
      '/pseudouser/'+temp
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.
      if(data[1].length == 0){
        localStorage.removeItem('token');
        window.location.reload(false);
      }


      var pseudos = data[1][0].utilisateur_pseudo.trim();
      var datas = [];

      if(data[0].length > 0){
        datas = data[0];
      }

      this.setState({
        pseudo: pseudos,
        pdp : pseudos+"_pdp",
        data: datas
      })
    })

    function checkStatus(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    function parseJSON(response) {
      return response.json();
    }
  }


  render(){
    return (
      <div className="profil page">
        <ProfilHead photo = {this.state.pdp} pseudo = {this.state.pseudo}/>
        <ProfilContent content = {this.state.data} pseudo = {this.state.pseudo}/>
      </div>
    );
  }
}

export default Profil;
