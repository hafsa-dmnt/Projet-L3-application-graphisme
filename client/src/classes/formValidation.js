

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

  // alert('Ce mail est déjà utilisé.');


  // todo requete bd pour verifier

  
  return false;
}

export const isPseudoAlreadyUsed = (pseudo) => {

  //alert('Ce ps est déjà utilisé.');

  // todo requete bd pour verifier


  return false;
}
