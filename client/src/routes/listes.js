import React from 'react';
import '../CSS/listes.css';


class Liste extends React.Component{
  render(){
    const tabListe = this.props.content;
    const divListe = tabListe.map((elt) => <div key= {elt} onClick={this.props.changeTab} className="colorPalette">{elt}</div>  );
    let titre = "";
    titre = <h3>Mes thèmes</h3>;
    
    return (
      <div>
        {titre}
        {divListe}
      </div>
     
    );
  }
}

class ThemesAndPalettes extends React.Component{
  constructor(props) {
    super(props);
    //ici on récupère à l'aide d'une requête toutes les listes de thèmes existantes (on peut ajouter un bouton supprimer liste)
    this.state = {
      displayThemes: true,
      liste:  ["Photo", "Peinture", "Cinéma", "Random"]
    }
  } 

  /*
  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ liste: res[0].tl_name.trim()}))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('./themeLists/user1-theme');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    //console.log("requete", reee);
    return body;
  };
  */
  /*
  handleClick =  () => {
    if(this.state.tl_name){
      this.setState({liste : []});
    }else{
      this.setState({liste : []});
    }
  }
  **/

  changeCategory = () => {

  }

  render(){
    return (
      <section>
        <Liste content={this.state.liste}/>
      </section>
    );
  }
}

  export default ThemesAndPalettes;
