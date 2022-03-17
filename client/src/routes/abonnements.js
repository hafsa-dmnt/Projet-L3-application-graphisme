import React from 'react';
import '../CSS/abonnements.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";


class BoutonRetour extends React.Component{
    state = { redirect: null };
    handleClick() {
        let redirect = this.state.redirect;
        redirect = '/profil';
        this.setState({redirect: redirect});
    }
    render() {
        if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
        }
        return(
        <button className='btnRetour' onClick={() => this.handleClick()}>
            <Icon  icon="ant-design:left-circle-outlined" />
        </button>
        );
    }
}

class DisplayOneUser extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let btnAfficher = <BoutonRetour/>//TODO unfollow;

    const cld = new Cloudinary({
      cloud: {
        cloudName: "hzcpqfz4w"//process.env.CLOUD_NAME
      }
    });
    var cheminImage = this.props.pseudo.trim() + "_pdp";
    const myImage = cld.image(cheminImage);
    
    return(
      <header className="profilHead section">
        <div key={this.props.idx} className="profilePic" alt="photo de profil">
          <AdvancedImage cldImg={myImage} />
        </div>
        <h3>{this.props.pseudo.trim()}</h3>
      </header>
    );
  }
}

class DisplayAbos extends React.Component{
    constructor(props){
      super(props);
    }

    render() {
      let divAbos = "";
      var tabAbo = this.props.abos;
      if(tabAbo.length == 0){
        divAbos = <section className='aucunePubli'>
                    <div className='iconPasDePubli'><Icon icon="clarity:heart-broken-line" /></div>
                  <h3>Aucun abonnement</h3>
      </section>;
      }else{
        divAbos = tabAbo.map((elt, idx) =>
        <DisplayOneUser pseudo={elt.abonner_suivi}/>  );
      }
      return(
        <section>
          {divAbos}
        </section>
      )
    }
}

class Abonnements extends React.Component{
  constructor(props) {
    super(props);

    const queryParams = new URLSearchParams(window.location.search);
    var pseudo = queryParams.get('pseudo'); 

    this.state = {
        tabAbo : [],
        pseudo : pseudo
    }
  }

  componentDidMount(){
    const tokenString = localStorage.getItem('token');
    var temp = JSON.parse(tokenString);
    temp = temp.token;
    const chemin = [
      "/abonnements/"+this.state.pseudo
    ];

    Promise.all(chemin.map(url =>
      fetch(url)
      .then(checkStatus)  // check the response of our APIs
      .then(parseJSON)    // parse it to Json
      .catch(error => console.log('There was a problem!', error))
    ))
    .then(data => {
      // assign to requested URL as define in array with array index.
      var pseudoactu = this.state.pseudo;
      var datas = [];
      if(data[0].length > 0){
        datas = data[0];
      }
      this.setState({
        pseudo : pseudoactu,
        tabAbo : datas
      });
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
    console.log("là, ", this.state.tabAbo);
    return (
      <section className="page page_abonnements">
          <BoutonRetour/>
        <h3>Abonnements</h3>
        <DisplayAbos abos = {this.state.tabAbo}/>
      </section>
    );
  }
}

  export default Abonnements;
