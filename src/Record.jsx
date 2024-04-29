import { useState } from 'react';
import './App.css';





function Record(props) {
  const [count, setCount] = useState(0)

  return (
    <div >
      <h2>Player: {props.nickName}</h2>
      <h2> Score: {props.score}</h2>
      <h2>Record:{props.record}</h2>
    </div>
    
    
  )
  console.log(nickName);
}

export default Record;
