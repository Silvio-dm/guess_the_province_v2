import { useState } from 'react';

import './App.css';
import axios from 'axios';
import SelectProv from './select.jsx';
import Record from './Record.jsx';



function Game(props) {
  const [count, setCount] = useState(0)

  const { guestName, message, provinces, town_to_guess, score, record, logged } = props.gameData || {};

  const [play_again, setPlayAgain] = useState("play_again_h");
  const [town, setTown] = useState('town_to_guess_v');
  const [logoutButton, setLogoutBUtton] = useState('logoutGameButton_v');


  async function checkAnswer (prov){
    event.preventDefault(); // Evita il comportamento predefinito del form
    console.log(prov);
    try {
      // Esegui la tua logica per l'invio dei dati qui
      const apiUrl = process.env.NODE_ENV === 'production' ? 'https://guess-the-province-v2-f9b590dd1051.herokuapp.com' : 'http://localhost:3000';
      const response = await axios.post(`${apiUrl}/submit`, {
        province: prov.province,
      });

      console.log(response.data.correct);

      if (!response.data.correct){
        setPlayAgain("play_again_v");
        setTown('town_to_guess_h');
        setLogoutBUtton('logoutGameButton_h');
      }else if(response.data.correct){
        setPlayAgain("play_again_h")
        setTown('town_to_guess_v');
        setLogoutBUtton('logoutGameButton_v');
      }
    
      console.log('Io sono in checkAnswer: ' + response.data);
      // Chiamiamo la funzione passata come prop con i dati ottenuti dalla risposta axios
      console.log(response.data);
      if(logged){
        props.handleLoggedPlay(response.data);
      }else{
        props.handlePlayAsGuest(response.data);
      }
      
          
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

  async function playAgain (){
    event.preventDefault(); // Evita il comportamento predefinito del form
    
    
    
    const provincesSelect = document.getElementById('provinces'); // ID dell'elemento select
    const selectedProvince = provincesSelect.value;

    const response = await axios.post('http://localhost:3000/play_again', {provinces: selectedProvince});

      setLogoutBUtton('logoutGameButton_v');
      setPlayAgain("play_again_h");
      setTown('town_to_guess_v');

    try {

      if(logged){
        props.handleLoggedPlay(response.data);
      }else if (!logged){
        props.handlePlayAsGuest(response.data);
      }

    } catch (error) {
      console.error('Errore durante la richiesta GET:', error);
    }
  };

  if (town_to_guess){
    return (
      <div >
        
        
        <form action="/logout" method="GET">
            <button  type="submit" className= {logoutButton}  onClick={logoutGame}>Logout</button>
        </form>       

          <h2 className="tiny_h2">{message}</h2>

          <form action="/play_again" method="POST" className={play_again} >
              <SelectProv /><br />
              <button  type="submit" onClick={playAgain}>Yes</button>
            </form>
            <form action="/logout" method="GET" className={play_again}>
              <button  type="submit" onClick={logoutGame} >Logout</button>
            </form>

          <h1 className={town}>{town_to_guess}</h1>

      <div >
      <form action="/submit" method="POST">
        {provinces.map((province, index) => (
            <button className="button_prov" key={index}  name="button" value={province} onClick={() => checkAnswer({province})}
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
