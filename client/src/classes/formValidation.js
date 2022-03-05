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

export const validateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  }
  alert("L'adresse email renseignée est invalide.");
  return (false);
}

export const passwordConfirmation = (mdp,confirm) => {
  if(mdp!=confirm){
    alert('Les mots de passes ne corespondent pas.');
    return false;
  }
  return true;
}

export const isCompleted = (name,value) => {
  if(!value||value==''){
    alert('Le champs '+name+' est vide');
    return false;
  }
  return true;
}

export const isMailAlreadyUsed = (mail) => {
  const chemin = [
    "/mailExists/"+mail
  ];

  let isUsed = false;

  Promise.all(chemin.map(url =>
    fetch(url)
    .then(checkStatus)  // check the response of our APIs
    .then(parseJSON)    // parse it to Json
    .catch(error => console.log('There was a problem!', error))
  ))
  .then(data => {
    if(data.length > 0){
      alert('Ce mail est déjà utilisé.');
      isUsed = true;
    }
  })
  
  return isUsed;
}

export const isPseudoAlreadyUsed = (pseudo) => {
  const chemin = [
    "/userPseudoExists/"+pseudo
  ];

  let isUsed = false;

  Promise.all(chemin.map(url =>
    fetch(url)
    .then(checkStatus)  // check the response of our APIs
    .then(parseJSON)    // parse it to Json
    .catch(error => console.log('There was a problem!', error))
  ))
  .then(data => {
    if(data.length > 0){
      alert('Ce pseudo est déjà utilisé.');
      isUsed = true;
    }
  })
  
  return isUsed;
}
