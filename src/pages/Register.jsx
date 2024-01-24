import React, { useState } from "react";
import Add from "../images/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [err, setErr] = useState(false);
    const [img, setImg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        const date = new Date().getTime();

        console.log(file);

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const storageRef = ref(storage, `${displayName + date}`);
            if(file){
                await uploadBytesResumable(storageRef, file).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        setImg(downloadURL);
                    });
                });
            }
            try {
                //Update profile
                await updateProfile(res.user, {
                    displayName,
                    photoURL: img,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: img,
                });

                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
                
            } catch (err) {
                console.log(err);
                setErr(true);
            }
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Connectify</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="user name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" autoComplete="on" />
                    <input style={{ display: "none" }} type="file" id="file" alt="" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something went wrong..</span>}
                </form>
                <p>You do have an account? <Link to="/login"> Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
