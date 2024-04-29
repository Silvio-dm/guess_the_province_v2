import React from 'react';
import axios from 'axios';

function GuestPlayButton({ onPlayAsGuest }) {
  const handleGuestPlay = async (event) => {
    
    console.log('clicked');
    event.preventDefault(); // Evita il comportamento predefinito del form
    const guestName = document.getElementById('guestName').value;
    const provincesSelect = document.getElementById('provinces'); // ID dell'elemento select
    const guest_button = document.getElementById('provinces').name;
    const selectedProvince = provincesSelect.value;
    console.log(guestName);
   
  try {
    // Esegui la tua logica per l'invio dei dati qui
    const response = await axios.post('http://localhost:3000/loginGuest', {
      guestName: guestName, 
      provinces: selectedProvince,
      guest_button: guest_button,
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
      <input type="text" id="guestName" name="guestName" placeholder="Your name"></input>
      <input type="submit" value="Submit" onClick={handleGuestPlay} id="guest_button" name="guest_button"></input>
    </div>
  );
}

export default GuestPlayButton;