import { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = ({ roomId}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    useEffect(()=> {
        socket.emit('joinRoom', { roomId });

        socket.on('message', (message) =>{
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.off('message');
    },[roomId]);

    const sendMessage = () => {
        socket.emit('chatMessage', { roomId, senderId: 'user-id', message: newMessage});
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map(msg =>(
                    <div key={msg._id}>{msg.message}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress= {(e)=> e.key === 'Enter' && sendMessage()}
            />
        </div>
    );
};

export default Chat;