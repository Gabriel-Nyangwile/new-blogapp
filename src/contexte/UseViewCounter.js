import { useEffect } from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from '../config/firebase' // Importez votre configuration Firebase

const useViewCounter = (blogId) => {
  useEffect(() => {
    if (!blogId) return;

    const incrementViews = async () => {
      try {
        const blogRef = doc(db, "blogs", blogId);
        await updateDoc(blogRef, {
          views: increment(1), // Incrémente le compteur de vues
        });
      } catch (error) {
        console.error("Erreur lors de l'incrémentation des vues :", error);
      }
    };

    incrementViews();
  }, [blogId]);
};

export default useViewCounter;
