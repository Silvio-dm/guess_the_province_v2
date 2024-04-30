import React from 'react';
import './App.css';
//import axios from 'axios';



function CreateButton(props) {

  const handleClickCreate = () =>{
    event.preventDefault(); // Evita il comportamento predefinito del form
    props.createAccountPage();
  }
  

  return (
        <form action="/create_account" id="form" className="form" method="GET">
          <div className="create_account">
            <h2>Non sei registrato?</h2>
            <button type="submit" className="province_button" name="createAccount_button" onClick={handleClickCreate}>Registrati!</button>  
          </div>
        </form>

  
  )
}

export default CreateButton;
