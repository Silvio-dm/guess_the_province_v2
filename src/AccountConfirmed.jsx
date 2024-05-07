import './App.css';
import axios from 'axios';

function AccountConfirmed(props) {


  async function logoutGame (){
    event.preventDefault(); // Evita il comportamento predefinito del form
    try {
      // Esegui la tua logica per l'invio dei dati qui
      
      
      const apiUrl = process.env.NODE_ENV === 'production' ? 'https://guess-the-province-v2-f9b590dd1051.herokuapp.com' : 'http://localhost:3000';
            
      const response = await axios.get(`${apiUrl}/logout`);
      props.logoutGame(response);
    
      
    } catch (error) {
      console.error('Errore durante la richiesta GET:', error);
    }
  };


  return (
    <div className="container">
    <div className="benvenuto">
      <h1 >Well Done! Ora puoi tornare alla pagina di Login!</h1>
      <form action="/logout" method="GET" className="form_game">
            <button  type="submit" className="form-submit button-go" onClick={logoutGame}>Torna alla pagina di LogIn</button>
        </form>
      
    </div>
  </div>
  )
}

export default AccountConfirmed;
