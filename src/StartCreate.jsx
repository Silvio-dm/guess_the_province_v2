import './App.css';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

function StartCreate({handleCreate}) {

    
    
    const handleClickCreate = async (event) => {
    
    event.preventDefault(); // Evita il comportamento predefinito del form
    if(document.getElementById('password').value!=''){
        const nickname = document.getElementById('nickname').value;
        const passwordClean = document.getElementById('password').value;

        // Funzione per generare un salt casuale
        function generateSalt() {
            return uuidv4().substring(0, 32);
        }

        // Funzione per generare un hash con salt
        function generateHash(password, salt) {
          const hashedPassword = CryptoJS.PBKDF2(password, salt, { keySize: 128/32 }).toString(CryptoJS.enc.Hex);
          return hashedPassword;
          
        }

        // Funzione per creare un hash a partire dalla password dell'utente
        async function hashPassword(password) {
          try {
            // Genera un salt casuale
            const salt = generateSalt();
            // Genera l'hash utilizzando il salt
            const hash = await generateHash(password, salt);
            // Restituisce l'hash e il salt
            return { hash, salt };
          } catch (error) {
            console.error('Errore durante la creazione dell\'hash:', error);
            throw error;
          }
      }

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

          
          async function hashParent() {
            const password = passwordClean;
            try {
              const { hash, salt } = await hashPassword(password);
              console.log('Hash della password:', hash);
              console.log('Salt utilizzato:', salt);
              const hashedPasswordNSH = await hashPasswordNS(password);
              handleCreate(nickname, hash, salt, passwordClean, hashedPasswordNSH);
            } catch (error) {
              console.error('Errore durante l\'esecuzione dell\'esempio:', error);
            }
          }

      // Esegui l'hashing
      hashParent();   
      console.log(nickname);
    }
  
};



  return (
    <div className="container">
      <div className="benvenuto" >
      <h1 >Hai quasi finito! Scegli un nickname e una password:</h1>
    </div>
    <form action="/inserted_newAcc" id="form" className="form benvenuto" method="POST">
      <div className="logged_player">
        <label htmlFor="nickname"><h2>Nickname:</h2></label>
        <input type="text" id="nickname" name="nickname" className="field"></input >
        <label htmlFor="password"><h2>Password:</h2></label>
        <input type="text" id="password" name="password" className="field" ></input >
        <input type="submit" value="Submit" className="province_button" name="logIn_button" onClick={handleClickCreate}></input >
      </div>
    </form>
      
  </div>
  )
}

export default StartCreate;
