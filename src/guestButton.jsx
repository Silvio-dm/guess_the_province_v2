import React from 'react';
import axios from 'axios';
import './App.css';

function GuestPlayButton({ onPlayAsGuest }) {
  const handleGuestPlay = async (event) => {
    
    console.log('clicked');
    event.preventDefault(); // Evita il comportamento predefinito del form
    const guestName = document.getElementById('guestName').value;
    const provincesSelect = document.getElementById('provinces'); // ID dell'elemento select
    
    const selectedProvince = provincesSelect.value;
    console.log(guestName);
   
  try {
    // Esegui la tua logica per l'invio dei dati qui
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://guess-the-province-v2-f9b590dd1051.herokuapp.com/' : 'http://localhost:3000';
    const response = await axios.post(`${apiUrl}/loginGuest`, {
      guestName: guestName, 
      provinces: selectedProvince,
      
    });
  
    console.log('Guest login success! ' + response.data.town_to_guess);
    // Chiamiamo la funzione passata come prop con i dati ottenuti dalla risposta axios
    console.log(response.data);
    onPlayAsGuest(response.data);
    
        
  } catch (error) {
    console.error('Errore durante la richiesta POST:', error);
  }
};

  return (
    <div className="guest_player">
      <label htmlFor="guestName"><h2>Play as a Guest:</h2></label>
      <input type="text" id="guestName" name="guestName" placeholder="Your name" className='field'></input>      
      <button type="submit"  value="Submit" className="province_button" id="guest_button" name="guest_button" onClick={handleGuestPlay}>Play as a Guest:</button>
    </div>
  );
}

export default GuestPlayButton;