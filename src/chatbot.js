import React, { Component } from 'react';
import axios from "axios";
import './chatbot.css'

class Chatbot extends Component {

  constructor(props) {
    super(props);
    this.chatWindowRef = React.createRef();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    // Adding some initial messages to the chat window
    this.setState({
      messages: [...this.state.messages, {
        sender: "bot",
        message: "Welcome to HealthBot! I provide information and answer questions related to various health topics. Whether you have concerns about symptoms, medical conditions, or general wellness, I'm here to assist you. Here are a few things you can ask me:"
      }, {
        sender: "bot",
        message: "->  Symptoms: Describe any symptoms you're experiencing, and I can provide information on possible causes and recommendations for next steps."
      }, {
        sender: "bot",
        message: "->  Conditions: Ask about specific medical conditions, such as diabetes, asthma, or high blood pressure. I can provide an overview, treatment options, and tips for managing the condition."
      }
      ]
    });
  }

  handleSubmit = (event) => 
  {

    event.preventDefault();
    const userMessage = event.target.elements.userInput.value

    //Set messages state
    this.setState({ messages: [...this.state.messages, { type: 'user', message: userMessage }] });
    event.target.elements.userInput.value = ''
    this.sendMessage(userMessage)
  }


  //FUNCTIONALITY TO SCROOL TO THE BOTTOM - START
  scrollToBottom = () => {

    // Scroll to the bottom of the chat window
    if (this.chatWindowRef && this.chatWindowRef.current) 
    {
      this.chatWindowRef.current.scrollTop = this.chatWindowRef.current.scrollHeight;
    }

  }

  //on component update scroll to the bottom 
  componentDidUpdate() {
    this.scrollToBottom();
  }
  //FUNCTIONALITY TO SCROOL TO THE BOTTOM - END


  sendMessage = async (userMessage) => {
    const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const model = 'gpt-3.5-turbo';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`,
    };

    const data = {
      'model': model,
      'messages': [{ "role": "user", "content": userMessage }]
    };

    axios.post(openaiEndpoint, data, { headers })
      .then(response => {
        const chatResponse = response.data.choices[0].message.content;
        this.setState({
          messages: [...this.state.messages, {
            sender: "bot",
            message: chatResponse
          }]
        });
        console.log(chatResponse);
        // Do something with the chat response
      })
      .catch(error => {
        console.error(error);
        // Handle the error
      });
  };


  render() {
    return (
      <div className="chatbot">
        <div className="chat-window" ref={this.chatWindowRef}>
         
          {this.state.messages.map((message, index) => (
            <div key={index} className={message.sender === "bot" ? "bot" : "user"}>
               
               {message.sender === "bot" && (<img src="./icon2.png" className="icons"/>) }
               
               <pre>{message.message}</pre>
              
            </div>
          ))}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="userInput" placeholder="Type your message here" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }

}

export default Chatbot;
