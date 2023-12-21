import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "./firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [looding, setLooding] = useState(true);
    
    const singInWithGoogle = () =>{
        return signInWithPopup(auth, GoogleProvider);
    }

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const singIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log(currentUser);
            const userEmail = currentUser?.email;
            console.log(userEmail)
            setLooding(false);

            axios.post(`http://localhost:5000/createtaskschema?email=${userEmail}`)
            .then(res =>{
                console.log(res.data)
            })
        })
        return () =>{
            unSubscribe();
        }
    }, []);

    const authInfo = {singInWithGoogle, createUser, singIn, logOut , user, looding}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;