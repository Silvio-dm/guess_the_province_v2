import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

import GuestPlayButton from './guestButton.jsx'; // Importa il componente GuestPlayButton
import LoggedButton from './loggedButton.jsx';
import SelectProv from './select.jsx';
import CreateButton from './createButton.jsx';


function Home(props)  {
  const [message, setMessage] = useState('Benvenuto! In questo gioco dovrai indovinare a quale provincia appartiene il Comune italiano che ti verrà mostrato di volta in volta!');
  
  const handlePlayAsGuest = async (data, passwordClean) => {
    console.log("i m in Home: "+data.salt);
    const nickname = data.guestName;
    const password = passwordClean;
    console.log(password);
    const salt = data.salt;
    console.log(salt);
    const logIn_button = 'logIn_button';
    const provinces = data.provinces;

    // Funzione per generare un hash con salt
    function generateHash(password, salt) {
      const hashedPassword = CryptoJS.PBKDF2(password, salt, { keySize: 128/32 }).toString(CryptoJS.enc.Hex);
      return hashedPassword;
    }

    const hashedPassword = await generateHash(password, salt);

    const response = await axios.post('http://localhost:3000/login', {
            nickname: nickname,
            password: hashedPassword,
            provinces: provinces,
            logIn_button: logIn_button,
          });





    props.onPlayAsGuest(response.data);
    
  };

  const createAccountPage = () =>{
    props.createAccountPage();
  }

  const handleWrongLogin = () => {
    setMessage('Wrong Nickname or password! Did you already registered?')
  }

  return (
    <div className="container">
      <div className="benvenuto-h1">
        <h1>{message}</h1>
      </div>
      <form action="/login" method="POST" id="form" className="form benvenuto">
          <SelectProv />
          <LoggedButton onPlayAsGuest={handlePlayAsGuest} handleWrongLogin={handleWrongLogin} />
          <div className="oppure">
            <h3>Oppure </h3>
          </div>
          {/* Passiamo la funzione handlePlayAsGuest come prop al componente GuestPlayButton */}
          <GuestPlayButton onPlayAsGuest={handlePlayAsGuest} />
      </form>
        <CreateButton createAccountPage={createAccountPage}/>
  </div>
  )
}

export default Home;
