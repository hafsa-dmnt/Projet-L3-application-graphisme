import React from 'react';
import '../CSS/profil.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

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
    let lienListes= <div>
                  <Link to="/profil/listes?type=themes">Mes thèmes et palettes</Link>
                </div>;

    const cld = new Cloudinary({
      cloud: {
        cloudName: "hzcpqfz4w"//process.env.CLOUD_NAME
      }
    });

    const myImage = cld.image(this.props.photo);
    
    return(
      <header className="profilHead section">
        <div key={this.props.idx} className="profilePic" alt="photo de profil">
          <AdvancedImage cldImg={myImage} />
        </div>
        <h3>{this.props.pseudo}</h3>
        {btnAfficher}
        {lienListes}
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

    //todo : change with name of the image from db
    const myImage = cld.image('testpdp');
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
    //requête pour aller chercher les publications d'une personne
    const tabPublication = [];
    let divPubli = <section className='aucunePubli'>
                      <div className='iconPasDePubli'><Icon icon="ep:picture-rounded"/></div>
                      <h3>Aucune publication</h3>
                    </section>;
    if(tabPublication.length > 0){
      divPubli = tabPublication.map((elt, idx) =>
      <Publication photo = {elt} idx = {idx}/>  );
    }

    if(this.props.isSameProfil){
      return(
        <section className="section profilContent">
          <section className="galerie">
            <div className='maGalerie'>
              <h3>Galerie</h3>
              <ButtonClick chemin='/creerPublication' iconbtn="fluent:add-12-filled" idbtn="btnAddPublication"/>
            </div>
            {divPubli}
          </section>
        </section>
      );
    }
    return(
      <section className="section profilContent">
          <section className="galerie">
            <div className='maGalerie'>
              <h3>Galerie</h3>
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
      var pseudos = data[1][0].utilisateur_pseudo;
      var datas = [];
      var pdps = data[1][0].utilisateur_pdp;
      
      if(data[0].length > 0){
        datas = data[0];
      }
      
      this.setState({
        pseudo: pseudos,
        pdp : pdps,
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
        <ProfilHead photo = {this.state.pdp} pseudo = {this.state.pseudo} isSameProfil={this.state.isSameProfil}/>
        <ProfilContent content = {this.state.data} isSameProfil={this.state.isSameProfil}/>
      </div>
    );
  }
}

export default Profil;
