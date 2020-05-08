import { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = firebase.auth().currentUser;
  const [auth, setAuth] = useState({ user });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAuth({ user });
    });

    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    return firebase.auth().signOut();
  }, []);

  return { auth, isLoading };
};
