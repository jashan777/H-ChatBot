import './App.css';
import Chatbot from './chatbot.js';
import AppIntro from './appIntro.js';
import { useState } from 'react';

function App() {

  let [chatbot,setchatbot] = useState(false);
  let [home,sethome] = useState(true);

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

  return (
    <div className="AppBody">

      <nav>
        <h1>H-BOT</h1>
        <ul>
          <li onClick={ChangeToHome} >Home</li>
          <li onClick={ChangeToChatBot} >Chat Bot</li>
        </ul>
      </nav>

      {chatbot && (<div className="ChatBotMother">
        <Chatbot />
      </div>)}

      {home && (<div className="AppIntroduction">
        <AppIntro />
      </div>)}
      
    </div>

  );
}

export default App;
