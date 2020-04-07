import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

export const useAuth = () => {
  const user = firebase.auth().currentUser;
  const [auth, setAuth] = useState({ identified: false, user });
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setAuth({ identified: true, user }) : setAuth({ identified: false, user });
    });
  }, []);

  return auth;
};
