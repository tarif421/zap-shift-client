import React from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { register } from "swiper/element";

const AuthProvider = ({ children }) => {
  // register
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign in
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };




  
  const authInfo = {
    registerUser,
    signInUser
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
