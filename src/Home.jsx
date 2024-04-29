import './App.css';
import React from 'react';
import { useState } from 'react';

import GuestPlayButton from './guestButton.jsx'; // Importa il componente GuestPlayButton
import LoggedButton from './loggedButton.jsx';
import SelectProv from './select.jsx';
import CreateButton from './createButton.jsx';


function Home(props)  {
  const [message, setMessage] = useState('Benvenuto! In questo gioco dovrai indovinare a quale provincia appartiene il Comune italiano che ti verrà mostrato di volta in volta!');
  
  const handlePlayAsGuest = (data) => {
    console.log("i m in Home: "+data.town_to_guess);
    props.onPlayAsGuest(data);
    
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
