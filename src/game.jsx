import { useState } from 'react';

import './App.css';
import axios from 'axios';
import SelectProv from './select.jsx';
import Record from './Record.jsx';



function Game(props) {
  const [count, setCount] = useState(0)

  const { guestName, message, provinces, town_to_guess, score, record } = props.gameData || {};


  async function checkAnswer (prov){
    event.preventDefault(); // Evita il comportamento predefinito del form
    console.log(prov);
    try {
      // Esegui la tua logica per l'invio dei dati qui
      const response = await axios.post('http://localhost:3000/submit', {
        province: prov.province,
      });
    
      console.log('Io sono in checkAnswer: ' + response.data);
      // Chiamiamo la funzione passata come prop con i dati ottenuti dalla risposta axios
      console.log(response.data);
      props.onPlayAsGuest(response.data);
          
    } catch (error) {
      console.error('Errore durante la richiesta POST:', error);
    }
  };

  async function logoutGame (){
    event.preventDefault(); // Evita il comportamento predefinito del form
    try {
      // Esegui la tua logica per l'invio dei dati qui
      const response = await axios.get('http://localhost:3000/logout');
      props.logoutGame(response);
    
      
    } catch (error) {
      console.error('Errore durante la richiesta GET:', error);
    }
  };


 
  if (town_to_guess){
    return (
      <div className="container">
        
        <form action="/login" method="POST" id="form" className="form benvenuto">
            <SelectProv />
            <button type="submit" className="form-submit button-go">Go</button>
        </form>
        <form action="/logout" method="GET" className="form_game">
            <button  type="submit" className="form-submit button-go" onClick={logoutGame}>Logout</button>
        </form>
  
        <div className="center">
        <h2 >{message}</h2>
    
        <section id="cards" className="cards">
          
            <article className="card-item">
              <span>
                  <h1>{town_to_guess}</h1>
                  
                </span>
              
            </article>
    
        </section>
        
      </div>

      <div className="container_buttons">
      <form action="/submit" method="POST">
        {provinces.map((province, index) => (
            <button key={index} className="province_button button-go submit-prov" name="button" value=
            {province} onClick={() => checkAnswer({province})}
              ><h3>
              {province}
            </h3>
            </button>

        ))}
                            
      </form>

      <Record nickName={guestName} score={score} record={record}/>
    </div>



  </div>
    )

  }else{
    return(
      <div id="tag-error" className="tag-error">
        <h2>errore nella richiesta Api</h2>
      </div>)
  }
  
}

export default Game;
