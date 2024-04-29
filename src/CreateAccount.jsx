import { useState } from 'react';
import './App.css';
import axios from 'axios';
import StartCreate from './StartCreate';
import TryAgainCreate from './TryAgainCreate';
import AccountConfirmed from './AccountConfirmed';

function CreateAccount({logoutGame}) {

  const [message,setMessage] = useState('Nickname già in uso!');
  const [page, setPage] = useState('start');
    const handleCreate = async (nickname, hash, salt, passwordClean, hashedPasswordNSH) => {

      //verifichiamo che siano stati compilati sia il campo nickname che il campo password
      if(nickname && passwordClean){
        try {
          // Esegui la tua logica per l'invio dei dati qui
          const response = await axios.post('http://localhost:3000/inserted_newAcc', {
            nickname: nickname, 
            password: hash,
            salt: salt,
            hashedPasswordNSH: hashedPasswordNSH,
          });
        
          //console.log('Account created!' + response.data.town_to_guess);
          
          console.log(response.data);
          //verifichiamo che il nick non sia già in uso
          if(response.data.erroreNicK){
            setMessage ('Nickname già in uso!');
            setPage('tryAgain');
          //rendering della pagina AccountConfirmed
          }else{
            setPage('confirmed');
          }
      
              
        } catch (error) {
          console.error('Errore durante la richiesta POST:', error);
        }

      }else{
        setMessage ('Per favore, inserisci un nickname e una password');
        setPage('tryAgain');
      }
           
  
};

const handleAgain = async () => {
  setPage('start');
}
  
const renderPage = () => {
  switch (page) {
    case 'start':
      return <StartCreate handleCreate={handleCreate} />;
    case 'tryAgain':
      return <TryAgainCreate handleAgainInTry={handleAgain} message={message}/>;
    case 'confirmed':
      return <AccountConfirmed logoutGame={logoutGame}/>;
      
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

export default CreateAccount;
