import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { db } from '../config/firebase';
import { doc, setDoc} from 'firebase/firestore';

const auth = getAuth();

export const signIn = async(email, password) => {

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
    
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
    
  }
}

export const signUp = async(email, password, firstName, lastName) => {
  try {
    if (!firstName || !lastName) {
      throw new Error('First name and last name are required');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      firstName,
      lastName,
      email: user.email,
      
    });
    console.log('Utilisateur inscrit et profil enregistré.');
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    throw error;
  }
}

export const loggout = async() => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

