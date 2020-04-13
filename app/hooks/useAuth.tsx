import { useState, useEffect, useMemo, useCallback } from 'react';
import firebase from 'firebase';

export const useAuth = () => {
  const user = firebase.auth().currentUser;
  const [auth, setAuth] = useState({ identified: false, user });
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setAuth({ identified: true, user }) : setAuth({ identified: false, user });
    });
  }, []);
  const currentUser = useMemo(() => {
    return firebase.auth().currentUser;
  }, []);

  const logout = useCallback(() => {
    return firebase.auth().signOut();
  }, []);

  return auth;
};
