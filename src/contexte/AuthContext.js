import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
/* import { useNavigate } from 'react-router-dom'; */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);
  const [userData, setUserData] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [blogUser, setBlogUser] = useState(null);
  const [user, setUser] = useState(null);
  /* const navigate = useNavigate() */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUser({ ...user, ...userDoc.data()});
      } else {
        setUser(null);
      }
      setIsLogged(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLogged, setIsLogged, setUser, userData, setUserData, blogData, setBlogData, blogUser, setBlogUser }}>
      {!isLogged && children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);