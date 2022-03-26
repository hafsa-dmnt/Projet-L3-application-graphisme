import React from 'react';
import '../CSS/listes.css';
import { Icon } from '@iconify/react';

class AddToList extends React.Component{

  handleClick = async (i, istheme) => {
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
    if(istheme==1){
        const chemin = [
            "/idduthemes/"+this.props.content
        ];
        var idtheme=await Promise.all(chemin.map(url =>
            fetch(url)
                .then(checkStatus)  // check the response of our APIs
                .then(parseJSON)    // parse it to Json
                .catch(error => console.log('There was a problem!', error))
        ))
        idtheme=idtheme[0][0];
        idtheme=idtheme.theme_id;
    }else{
        var palettesand=this.props.content.replaceAll("#","%23");
        var chemin = [
            "/palette/creer/"+palettesand
        ];
        var idpalette = await Promise.all(chemin.map(url =>
            fetch(url)
                .then(checkStatus)  // check the response of our APIs
                .then(parseJSON)    // parse it to Json
                .catch(error => console.log('There was a problem!', error))
        ))
        idpalette=idpalette[0][0].palette_id;
    }


    const tokenString = localStorage.getItem('token');
    var temp = JSON.parse(tokenString);
    temp = temp.token;
    var lien="";
    if(istheme==1){
        lien="/listthemes/element/creer/"+i+"-"+idtheme;
    }else{
        lien="/listpalettes/element/creer/"+i+"-"+idpalette;
    }
    const response = await fetch(lien);
    window.location.href = '/home';
  }

  render(){
    const tabListeTheme = this.props.listeTheme;
    const tabListePalette = this.props.listePalette;
    let divListe = "";
    if(this.props.istheme){
      if(this.props.listeTheme.length > 0){
        divListe = Object.keys(tabListeTheme).map((keyName, i)  => (
          <button key= {i} onClick={() => (this.handleClick(tabListeTheme[keyName].tl_id,1))} className="addToList">
            <Icon icon={tabListeTheme[keyName].tl_icon.trim() == "" ? "emojione-monotone:sparkles" : tabListeTheme[keyName].tl_icon.trim()} />
            <p>{tabListeTheme[keyName].tl_nom.trim()}</p>
          </button>
      ))
      }else{
        divListe = <p>Il n'y a rien :( crée une première liste de thèmes !</p>
      }
    }else{
      if(this.props.listePalette.length > 0){
        divListe = Object.keys(tabListePalette).map((keyName, i)  => (
          <button key= {i} onClick={() => (this.handleClick(tabListePalette[keyName].pl_id,0))} className="addToList">
            <Icon icon={tabListePalette[keyName].pl_icon.trim() == "" ? "emojione-monotone:sparkles" : tabListePalette[keyName].pl_icon.trim()} />
            <p>{tabListePalette[keyName].pl_nom.trim()}</p>
          </button>
      ))
      }else{
        divListe = <p className="empty">Il n'y a rien :( crée une première liste de palettes !</p>
      }
    }
    let titre = <h3>A quelle liste veux-tu l'ajouter ?</h3>;

    return (
      <div className="liste_paletteTheme">
        {titre}
        {divListe}
      </div>

    );
  }
}

class ThemesAndPalettes extends React.Component{
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get('type');
    const content = queryParams.get('content');
    var isTheme = true;
    if(type != "theme"){
      isTheme = false;
    }
    this.state = {
      displayThemes: isTheme,
      listeTheme:  [],
      listePalette:  [],
      content: content
    }
  }

  componentDidMount(){
    const tokenString = localStorage.getItem('token');
    var temp = JSON.parse(tokenString);
    temp = temp.token;
    const chemin = [
        "/listesthemes/"+temp,
        "/listespalettes/"+temp
    ];

      Promise.all(chemin.map(url =>
        fetch(url)
            .then(checkStatus)  // check the response of our APIs
            .then(parseJSON)    // parse it to Json
            .catch(error => console.log('There was a problem!', error))
    ))
        .then(data => {
            // assign to requested URL as define in array with array index.
            if(data.length == 0){
              localStorage.removeItem('token');
              window.location.reload(false);
            }
            const data_theme = data[0];
            const data_palette = data[1];
            this.setState({
              listeTheme: data_theme,
              listePalette: data_palette,
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

  handleClick = () => {
    var newCategory = !this.state.displayThemes;
    this.setState({displayThemes: newCategory});

  }

  render(){
    var lien = this.state.displayThemes ? "/profil/listethemes/creer" : "/profil/listepalettes/creer" ;
    return (
      <section className="page page_listes">
        <AddToList listeTheme={this.state.listeTheme} listePalette={this.state.listePalette} istheme={this.state.displayThemes} content={this.state.content}/>
      </section>
    );
  }
}

  export default ThemesAndPalettes;
