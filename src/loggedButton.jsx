import React from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';


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

    if(nickname!='' && passwordClean!=''){

        try {

          // Funzione per creare un hash NO SALT a partire dalla password dell'utente
        async function hashPasswordNS(password) {
          try {
            // Genera l'hash utilizzando il salt
            const hashedPasswordNS = await CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

            const hashedPasswordNSH = await hashPasswordNSH(hashedPasswordNS);

            return hashedPasswordNSH;
            
          } catch (error) {
            console.error('Errore durante la creazione dell\'hash:', error);
            throw error;
          }
      }

        // Funzione per creare un hash NO SALT a partire dalla password già hashata dell'utente
        async function hashPasswordNSH(password) {
          try {
            // Genera l'hash utilizzando il salt
            const hashedPasswordNSH = await CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex).substring(0, 32);

            // Restituisce l'hash e il salt
            return hashedPasswordNSH;
          } catch (error) {
            console.error('Errore durante la creazione dell\'hash:', error);
            throw error;
          }
      }

      const password = await hashPasswordNS(passwordClean);
      console.log(password);


          // Esegui la tua logica per l'invio dei dati qui
          const response = await axios.post('http://localhost:3000/loginHashed', {
            nickname: nickname,
            password: password,
            provinces: selectedProvince,// Esempio di dati da inviare
            logIn_button: logIn_button,
          });

          console.log('Account login success!');
          // Puoi fare qualcosa con la risposta se necessario
          console.log(response.data);
          if(response.data.loggedIn){
            props.handleLoggedPlay(response.data, passwordClean);
            }else{
              props.handleWrongLogin();
            }
          
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
      <button type="submit" className="province_button" name="logIn_button" onClick={handleLoggedPlay}>Gioca</button>
    </div>
  );
}

export default LoggedButton;