import React from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { register } from "swiper/element";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const googlePRovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // register
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const signInGoogle = () => {
    return signInWithPopup(auth, googlePRovider);
  };

  const authInfo = {
    registerUser,
    signInUser,
    signInGoogle,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
