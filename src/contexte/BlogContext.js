// Gestion des données du blog
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [liked, setLiked] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };
    fetchBlogs();
  }, []);

  const CreateBlog = async (title, content, imageFile) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }
      const blogRef = await addDoc(collection(db, "blogs"), {
        title,
        content,
        createdAt: Timestamp.fromDate(new Date()),
        authorName: user.displayName || user.email, // Utilisez le nom de l'utilisateur authentifié ou l'email si le nom n'est pas disponible
        authorUid: user.uid, // Utilisez l'UID de l'utilisateur authentifié
        likes: 0, // initialisation des likes
        comments: [], // initialisation des commentaires à un tableau vide
      });

      let imageUrl = null;

      if (imageFile) {
        const storageRef = ref(
          storage,
          `blogs/${blogRef.id}/${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        await updateDoc(blogRef, { image: imageUrl });
      }

      setBlogs((prevBlogs) => [
        ...prevBlogs,
        {
          id: blogRef.id,
          title,
          content,
          image: imageUrl,
          createdAt: Timestamp.fromDate(new Date()),
          authorName: user.displayName || user.email,
          authorUid: user.uid,
          likes: 0,
          comments: [],
        },
      ]);
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  };

  const ReadBlog = async () => {
    try {
      const blogCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    } catch (error) {
      console.error("Erreur à la lecture du blog:", error);
      throw error;
    }
  };

  const UpdateBlog = async (id, title, content, imageFile) => {
    try {
      const blogRef = doc(db, "blogs", id);
      const updateData = {
        title,
        content,
      };

      if (imageFile) {
        const storageRef = ref(storage, `blogs/${id}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        updateData.image = imageUrl;
      }

      await updateDoc(blogRef, updateData);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? { ...blog, ...updateData } : blog
        )
      );
    } catch (error) {
      console.error("Erreur à la modification du blog:", error);
      throw error;
    }
  };

  const DeleteBlog = async (blogId) => {
    const blogRef = doc(db, "blogs", blogId);
    await deleteDoc(blogRef);
  };

  const addLike = async (blogId, userId) => {
    try {
      const blogRef = doc(db, "blogs", blogId);
      const blogDoc = await getDoc(blogRef);
      const blogData = blogDoc.data();

      if (!Array.isArray(blogData.likes)) {
        blogData.likes = [];
      }

      if (blogData.likes && blogData.likes.includes(userId)) {
        //Si l'utilisateur a déjà aimé, supprimez le like
        await updateDoc(blogRef, {
          likes: arrayRemove(userId)
        });
      } else {
        //Sinon, incrémentez le like
        await updateDoc(blogRef, {
          likes: arrayUnion(userId),
        });
      }
    } catch (error) {
      console.error("Erreur d'ajoût de like:", error);
      throw error;
    }
  };

  const addComment = async (blogId, comment) => {
    try {
      if (!comment.text || !comment.author || !comment.createdAt) {
        throw new Error("Les données du commentaire sont incomplètes");
      }
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, {
        comments: arrayUnion(comment),
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, comments: [...(blog.comments || []), comment] }
            : blog
        )
      );
    } catch (error) {
      console.error("Erreur en ajoutant les commentaires:", error);
      throw error;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        setBlogs,
        CreateBlog,
        ReadBlog,
        UpdateBlog,
        DeleteBlog,
        addLike,
        addComment,
        liked,
        setLiked,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
export const useBlog = () => useContext(BlogContext);
