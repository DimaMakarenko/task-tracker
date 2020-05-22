import { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = firebase.auth().currentUser;
  const [auth, setAuth] = useState({ user });

  const checkUser = async () => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      const result = await setAuth({ user });
      console.log('make false', result);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  const logout = useCallback(() => {
    return firebase.auth().signOut();
  }, []);

  return { auth, isLoading, logout };
};
