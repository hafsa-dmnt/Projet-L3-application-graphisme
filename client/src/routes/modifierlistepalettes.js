import React from 'react';
import '../CSS/inscription.css';
import { Icon } from '@iconify/react';
import {Link} from "react-router-dom";

class ModifierListePalettes extends React.Component{
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
            .then(res => this.setState({nom: res[0].pl_nom, icon: res[0].pl_icon}))
            .catch(err => console.log(err));
    }
    
    callBackendAPI = async () => {
    const lien="/listpalettesinfo/"+this.state.idlist;
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
                <h2>Modifier la liste de palettes</h2>
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
                <input type="text" name="icon" value={this.state.icon} onChange={this.handleChange} />
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

export default ModifierListePalettes;
