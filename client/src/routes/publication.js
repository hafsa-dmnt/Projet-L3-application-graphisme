import React from 'react';
import '../App.css';
import '../CSS/publication.css';
import { Icon } from '@iconify/react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

import {
    Link
  } from "react-router-dom";


class PublicationDrawing extends React.Component{
  render(){
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'hzcpqfz4w'
      }
    });

    var urlimage = this.props.photo.trim()
    const myImage = cld.image(urlimage);
    return(
      <div key={this.props.photo} className="publication">
        <AdvancedImage cldImg={myImage} />
      </div>
    );
  }
}

class PublicationDrawer extends React.Component{
  render(){
    return(
      <div className="dessinateur">
        {this.props.pseudo}
        <Link to={"/visit?pseudo="+this.props.pseudo}>
          <Icon icon="bi:arrow-right-circle" />
        </Link>
      </div>
    );
  }
}

class CrossButton extends React.Component{
  render(){
    return(
      <Link className="cross" to={this.props.to}>
        <Icon icon="bi:x-circle"/>
      </Link>
    );
  }
}


class Publication extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pseudo: "", 
      publicationName : "", 
      defiDate : ""
    }
  }
  componentDidMount(){  
    const queryParams = new URLSearchParams(window.location.search);
    var pseudo = queryParams.get('pseudo');   
    var type = queryParams.get('type');   
    var publicationName = queryParams.get('publicationname');   
    
    this.setState({
      pseudo: pseudo,
      type: type, 
      publicationName: publicationName
    })
  }
  render(){
    var url = '/profil';
    var drawer = "";
    if(this.state.type == "visit"){
      url = '/visit?pseudo='+this.state.pseudo;
    }else if(this.state.type != "profil"){
      url = '/calendrier/defijour?date='+this.state.type;
      drawer = <PublicationDrawer pseudo = {this.state.pseudo}/>;
    }

    return(
        <div className="page page_publication">
          <div className="publication">
            <CrossButton to={url}/>
            <PublicationDrawing photo = {this.state.publicationName}/>
            {drawer}
          </div>
        </div>
    );
  }
}


export default Publication;
