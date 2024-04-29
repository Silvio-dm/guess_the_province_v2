import React from 'react';
import axios from 'axios';


function LoggedButton(props) {

  
  const handleLoggedPlay = async (event) => {
    
    console.log('clicked');
    event.preventDefault(); // Evita il comportamento predefinito del form
    const nickname = document.getElementById('nickname').value;
    const passwordClean = document.getElementById('password').value;
    const provincesSelect = document.getElementById('provinces'); // ID dell'elemento select
    const selectedProvince = provincesSelect.value;
    const logIn_button = 'logIn_button';
    console.log(guestName);

    if(nickname!='' && password!=''){

        try {
          // Esegui la tua logica per l'invio dei dati qui
          const response = await axios.post('http://localhost:3000/login', {
            nickname: nickname,
            password: password,
            provinces: selectedProvince,// Esempio di dati da inviare
            logIn_button: logIn_button,
          });

          console.log('Account login success!');
          // Puoi fare qualcosa con la risposta se necessario
          console.log(response.data);
          props.onPlayAsGuest(response.data);
        } catch (error) {
          console.error('Errore durante la richiesta POST:', error);
        }
    }else if(nickname=='' || password=='' ){
      props.handleWrongLogin();
      //inserisci qui la call back per campiare il mesasage in home page
    }
  };

  return (
    <div className="logged_player">
      <label htmlFor="nickname"><h2>Nickname:</h2></label>
      <input type="text" id="nickname" name="nickname" className="field"></input><br></br>
      <label htmlFor="password"><h2>Password:</h2></label>
      <input type="text" id="password" name="password" className="field"></input><br></br>
      <input type="submit" value="Submit" name="logIn_button" className="province_button" onClick={handleLoggedPlay}></input>
    </div>
  );
}

export default LoggedButton;