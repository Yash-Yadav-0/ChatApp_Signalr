import { useState, useEffect } from 'react';
import './App.css';
import WaitingRoom from './components/waitingroom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      // Initialize connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7158/Chat") // Update to backend URL
        .configureLogging(LogLevel.Information)
        .build();

      // Setup handlers
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: ", msg);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, { username, msg }]);
      });

      await conn.start();
      console.log("Connection started");

      await conn.invoke("JoinSpecificChatRoom", {username,chatroom});
      console.log("JoinSpecificChatRoom invoked");

      setConnection(conn);
    } catch (e) {
      console.log("Connection error: ", e);
    }
  };

  const sendMessage = async(message) =>{
    try{
      await conn.invoke("SendMessage",message);
    }catch(e){
      console.log(e);
    }
  }

  // Cleanup connection when the component unmounts
  useEffect(() => {
    return () => {
      if (conn) {
        conn.stop().catch(e => console.log('Connection close failed: ', e));
      }
    };
  }, [conn]);

  return (
    <>
      <div className='heading'>
        <h1 className='heading_text'>Chat App Testing Room</h1>
      </div>
      {!conn
        ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
        : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
      }
    </>
  );
}

export default App;
