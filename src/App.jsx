import { useState } from 'react';

import './App.css';

//import GuestPlayButton from './guestButton.jsx'; // Importa il componente GuestPlayButton
//import LoggedButton from './loggedButton.jsx';
//import SelectProv from './select.jsx';
//import CreateButton from './createButton.jsx';
import Home from './Home.jsx'
import CreateAccount from './CreateAccount.jsx'
import Game from './game.jsx'



function App() {
  const [gameData, setGameData] = useState({guestName: '', town_to_guess:'', message:'',provinces:[], record:null, score:0, logged: false}); // Stato per i dati del gioco
  const [page, setPage] = useState('home');
  

  const handleLoggedPlay = (data) => {
    setGameData(prevGameData => ({
      ...prevGameData,
      guestName: data.guestName,
      message: data.message,
      provinces: data.provinces,
      record:data.record,
      town_to_guess:data.town_to_guess,
      score: data.score,
      logged: true,

    })); // Imposta i dati del gioco
    setPage('game'); // Cambia lo stato a 'game'
    
    console.log('Io sono in APP: '+gameData.guestName);
  };


const handlePlayAsGuest = (data) => {
    setGameData(prevGameData => ({
      ...prevGameData,
      guestName: data.guestName,
      message: data.message,
      provinces: data.provinces,
      record:data.record,
      town_to_guess:data.town_to_guess,
      score: data.score,
      logged: false

    })); // Imposta i dati del gioco
    setPage('game'); // Cambia lo stato a 'game'
    
    console.log('Io sono in APP: '+gameData.guestName);
  };




  const logoutGame = () =>{
    setPage('home'); // Cambia lo stato a 'home'
  }

  const createAccountPage = () => {
    setPage('create');
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home handleLoggedPlay={handleLoggedPlay} handlePlayAsGuest={handlePlayAsGuest} createAccountPage={createAccountPage}/>;
      case 'create':
        return <CreateAccount logoutGame={logoutGame}/>;
      case 'game':
        return <Game gameData={gameData} logoutGame={logoutGame} handleLoggedPlay={handleLoggedPlay} handlePlayAsGuest={handlePlayAsGuest}/>;
        
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      
      {renderPage()}
    </div>
  );
}

export default App;