import { useState } from 'react';
import './App.css';
import axios from 'axios';

function TryAgainCreate(props) {

    
  const handleAgainClick = (event) => {
    event.preventDefault(); // Evita il comportamento predefinito del form
    //passatogli dal genitore CreateAccount
    
    props.handleAgainInTry();
  }

  return (
    <div className="container">
    <form action="/create_account" id="form" className="form benvenuto" method="GET">
      <div className="create_account">
        <h1>{props.message}</h1>
        <button type="submit" className="province_button" name="createAccount_button" onClick={handleAgainClick}>Riprova</button>  
      </div>

    </form>
  </div>
  )
}

export default TryAgainCreate;
