import * as React from "react";
import { useState, useContext, useCallback, useEffect } from "react";
import { Alert } from "react-native";
import Toast, { BaseToast } from "react-native-toast-message";
import { auth } from "./firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("registered:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in", user.email);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        setEmail,
        username,
        setUsername,
        setPassword,
        loading,
        handleSignup,
        handleLogin,
        error,
        setError,
        // success,
        // setSuccess,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
