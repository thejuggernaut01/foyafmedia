import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [logInError, setLogInError] = useState(false);

  const signUp = async (email, password) => {
    // return createUserWithEmailAndPassword(auth, email, password);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Send email verification
    await sendEmailVerification(result.user);
  };

  const login = async (email, password) => {
    // return signInWithEmailAndPassword(auth, email, password);

    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);

    if (!result.user.emailVerified) {
      console.log("Please verify your email before accessing the dashboard.");
      setLogInError(true);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  });

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    logInError,
    setLogInError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
