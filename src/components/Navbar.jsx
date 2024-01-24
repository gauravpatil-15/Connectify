import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext';
import smiley from "../images/smiley.png"

const Navbar = () => {

    const { currentUser } = useContext(AuthContext);

    // console.log(currentUser.photoURL);

    return (
        <div className='navbar'>
            <span className="logo">Connectify</span>
            <div className="user">
                <img src={currentUser.photoURL ? currentUser.photoURL : smiley} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default Navbar
