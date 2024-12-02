import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3500');

const App = () => {
    const [roomId, setRoomId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let location=useLocation();
    console.log(location.state)
    // setRoomId(location.state.par.roomid);

    // if(location.state?.par?.roomid)
   
    

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on('roomClosed', () => {
            alert('The room has been closed!');
            setMessages([]);
        });
        joinRoom();

        return () => socket.off();
    }, []);

    const joinRoom = () => {
      console.log("in join room")
        if (location.state.par.roomid) {

            socket.emit('joinRoom', location.state);
            console.log("u joined the room")
        }
    };

    const sendMessage = () => {
        if (message) {
            socket.emit('message', {obj:location.state, message} );
            setMessage('');
        }
    };

    return (
        <div id='msgdiv'>
            <h1>Chat Room</h1>
            
            
            <div>
              <div>
              <h2>Messages</h2>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <b>{msg.username}:</b> {msg.message}
                    </p>
                ))}




              
                
            </div>

            <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>

              </div>
            <div>
                
            </div>
        </div>
    );
};

export default App;
