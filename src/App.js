import './App.css';
import Chatbot from './chatbot.js';
import AppIntro from './appIntro.js';
import { useState } from 'react';

function App() {

  //state variables
  let [chatbot,setchatbot] = useState(false);
  let [home,sethome] = useState(true);

  //functions to change the state variable - START
  function ChangeToChatBot() {
    if(!chatbot)
    {
      setchatbot(true);
      sethome(false);
    }
  }

  function ChangeToHome() {
    if(!home)
    {
      setchatbot(false);
      sethome(true);
    }
  }
  //functions to change the state variable - END

  return (
    <div className="AppBody">

      <nav>
        <h1><img src="./icon.png" id="icon"/>H-BOT</h1>
        <ul>
          <li onClick={ChangeToHome} id="Home" >Home</li>
          <li onClick={ChangeToChatBot} id="ChatBot">Chat Bot</li>
        </ul>
      </nav>

      {chatbot && (<div className="ChatBotMother">
        <Chatbot />
      </div>)}

      {home && (<div className="AppIntroduction">
        <AppIntro change={ChangeToChatBot}/>
      </div>)}
      
    </div>

  );
}

export default App;
