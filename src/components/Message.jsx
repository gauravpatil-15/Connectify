import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Smiley from "../images/smiley.png"

const Message = (message) => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"});
    }, [message])

    
    return (
        <div ref={ref} className={`message ${message.message.senderID === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.message.senderID === currentUser.uid ? currentUser.photoURL ? currentUser.photoURL : Smiley : data.user.photoURL ? data.user.photoURL : Smiley} alt="" />
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
