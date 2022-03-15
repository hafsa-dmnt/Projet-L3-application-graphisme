import React from 'react';
import '../CSS/inscription.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";

class CreerListePalettes extends React.Component{
    constructor(props) {
        super(props);
        this.state = {nom:'',icon:'empty'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    const value = event.target.value;
    this.setState({
        // ...this.state c pour garder les 2 autres pas modifiés
        ...this.state,
        [event.target.name]: value
    });
    }

    handleSubmit= async () => {
        const lien="/listpalettes/creer/user1-"+this.state.nom+"-"+this.state.icon;
        const response = await fetch(lien);
    }

    render(){
        return (
        <div className="page page_inscription">
            <div className="section title">
                <h2>Créer une liste de palettes</h2>
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
                    <h3>Icone :</h3>
                </label>
                <input type="text" name="icon" value={this.state.icon} onChange={this.handleChange} />
                <select name="icon" id="inconList">
                  <option value='bi:tree-fill'>Abeille</option>
                  <option value="ph:flower-fill">Fleur</option>
                  <option value="bx:bxs-city">Ville</option>
                  <option value="emojione-monotone:sparkles">Sparkles</option>
                  <option value="bx:bxs-cat">Chat</option>
                  <option value="bi:pencil">Crayon</option>
                  <option value="pepicons:paint-pallet">Palette</option>
                  <option value="ant-design:camera-filled">Photo</option>
                  <option value="eva:people-fill">Personne</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
                  <option value="line-md:computer">Ordinateur</option>
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

export default CreerListePalettes;
