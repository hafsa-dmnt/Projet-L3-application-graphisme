import React from 'react';
import '../CSS/inscription.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";

class ModifierListeThemes extends React.Component{
    constructor(props) {
        super(props);
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('idlist');
        this.state = {idlist:id, nom:'',icon:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.callBackendAPI()
            .then(res => this.setState({nom: res[0].tl_nom, icon: res[0].tl_icon}))
            .catch(err => console.log(err));
    }
    
    callBackendAPI = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('idlist')
    const lien="/listthemesinfo/"+id;
    const response = await fetch(lien);
    const body = await response.json();
    if (response.status !== 200) {
        throw Error(body.message) 
    }
    console.log("requete", body);
    return body;
    };

    handleChange(event) {
    const value = event.target.value;
    this.setState({
        // ...this.state c pour garder les 2 autres pas modifiés
        ...this.state,
        [event.target.name]: value
    });
    }

    handleSubmit= async () => {
        const lien="/listthemes/modifier/"+this.state.idlist+"-"+this.state.nom+"-"+this.state.icon;
        const response = await fetch(lien);
    }

    render(){
        return (
        <div className="page page_inscription">
            <div className="section title">
                <h2>Modifier une liste de thèmes</h2>
            </div>
            <div className="section">
                <div className="subSection">
                <label>
                    <h3>Nom :</h3>
                </label>
                <input type="text" name="nom" value={this.state.nom} onChange={this.handleChange} />
                </div>
                <div className="subSection">
                <label>
                    <h3>Icon :</h3>
                </label>
                <select name="icon" id="inconList"onChange={this.handleChange} value={this.state.icon}>
                  <option value=''>Vide</option>
                  <option value='bi:tree-fill' >Abeille</option>
                  <option value="ph:flower-fill">Fleur</option>
                  <option value="bx:bxs-city">Ville</option>
                  <option value="emojione-monotone:sparkles">Sparkles</option>
                  <option value="bx:bxs-cat">Chat</option>
                  <option value="bi:pencil">Crayon</option>
                  <option value="pepicons:paint-pallet">Palette</option>
                  <option value="ant-design:camera-filled">Photo</option>
                  <option value="eva:people-fill">Personne</option>
                  <option value="ant-design:home-filled">Maison</option>
                  <option value="fluent:food-apple-20-filled">Pomme</option>
                  <option value="fluent:food-pizza-20-filled">Pizza</option>
                  <option value="akar-icons:face-happy">Sourir</option>
                  <option value="fluent:animal-turtle-24-regular">Tortue</option>
                  <option value="charm:heart">Coeur</option>
                  <option value="whh:flowerpot">Fleur en pot</option>
                  <option value="fa-solid:paint-brush">Pinceau</option>
                  <option value="bi:star-fill">Étoile</option>
                  <option value="fa-solid:skull">Crâne</option>
                  <option value="mdi:bee-flower">Fleur-Abeille</option>
                  <option value="fa-solid:frog">Grenouille</option>
                  <option value="ic:round-format-paint">Peinture</option>
                  <option value="carbon:spray-paint">Peinture en spray</option>
                  </select>
                </div>
                <div className="subSection">
                    <button onClick={this.handleSubmit}>
                        <Icon icon="akar-icons:check-box-fill" />
                    </button>
                </div>
            </div>
        </div>
        );
    }
}

export default ModifierListeThemes;
