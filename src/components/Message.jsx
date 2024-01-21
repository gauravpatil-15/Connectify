import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = (message) => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"});
    }, [message])

    
    console.log(message.message.senderID);
    console.log(message.message);
    
    return (
        <div ref={ref} className={`message ${message.message.senderID === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.message.senderID === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                <p>{message.message.text}</p>
                {message.message.img && <img src={message.message.img} alt="" />}
            </div>
        </div>
    )   
}

export default Message
