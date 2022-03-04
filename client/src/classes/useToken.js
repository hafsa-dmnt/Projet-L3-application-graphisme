import { useState } from 'react';



export function useToken(){

  const getToken = () => {
    const tokenString = localStorage.getItem('token');

    // todo 1 verifié il est contenu par la BD : sinon set pas user token
    // todo 2 : set le pseudo to pseudo qui corepond au token

    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));

    // todo set it to the database (verifier pas deja dedans btw)

    setToken(userToken.token);
  };

  return {
    token,
    setToken: saveToken,
  }

}
