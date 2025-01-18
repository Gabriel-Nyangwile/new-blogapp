import { useEffect } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

const useViewCounter = (blogId) => {
  useEffect(() => {
    const incrementViews = async () => {
      if (!blogId) return;
      const blogRef = doc(db, 'blogs', blogId);
      try {
        await updateDoc(blogRef, {
          views: increment(1),
        });
      } catch (error) {
        console.error('Erreur d\'incrémentation des vues:', error);
      }
    };

    incrementViews();
  }, [blogId]);
};

export default useViewCounter;