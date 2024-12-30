import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Assurez-vous que vous avez configuré Firebase
import { useBlog } from '../contexte/BlogContext';

// Obtenir les détails d'un blog
export const GetBlogDetails = async (id) => {
    
    const {blogs} = useBlog();
    blogs.find(blog => blog.id === id);
    

    try {
        if(!db) {
            throw new Error('Firebase non initialisé');
        }
        if(!id) {
            throw new Error('ID du blog manquant');
        }
        const blogRef = doc(db, 'blogs', id);
        const blogDoc = await getDoc(blogRef);

        if (!blogDoc.exists()) {
            throw new Error('Blog non trouvé');
        }

        const data = blogDoc.data();
        console.log('Détails du blog :', data);

        return data;

    } catch (error) {
        console.error('Erreur :', error);
        throw error;
    }
};
