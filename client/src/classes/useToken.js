import { useState } from 'react';

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

function verifyTokenNotAlreadyPresent(tokenn) {
  const chemin = [
    "/getVerifToken/"+tokenn
  ];
  return Promise.all(chemin.map(url =>
    fetch(url)
    .then(checkStatus)  // check the response of our APIs
    .then(parseJSON)    // parse it to Json
    .catch(error => console.log('There was a problem!', error))
  ))
}

function modifierToken(pseudo, tokenn) {
  const chemin = [
    "/modifierToken/"+pseudo+"-"+tokenn
  ];
  Promise.all(chemin.map(url =>
    fetch(url)
    .then(checkStatus)   // parse it to Json
    .catch(error => console.log('There was a problem!', error))
  ))
}

export function useToken(){

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());
  const [pseudo, setPseudo] = useState("");

  const saveToken = async (userToken) => {
    var body=await verifyTokenNotAlreadyPresent(userToken.token);

    if(body[0].length!=0){
      alert("Problème de connexion, veuillez réessayer.");
      return;
    }else{

      var temp = userToken.token;
      modifierToken(pseudo,temp);

      localStorage.setItem('token', JSON.stringify(userToken));

    // todo set it to the database (verifier pas deja dedans btw)

      setToken(userToken.token);
    }
  };

  const savePseudo = userPseudo => {
    setPseudo(userPseudo);
  };

  return {
    token : token,
    setToken: saveToken,
    setPseudoFromToken : savePseudo
  }

}
