import React from 'react'
import { useParams } from 'react-router-dom'
import { useBlog } from '../contexte/BlogContext';
import { useAuth } from '../contexte/AuthContext';

const BlogDelete = () => {
    const { id } = useParams()
    const { isLogged } = useAuth();
    const { blogs, DeleteBlog} = useBlog();

    if(!isLogged) {
        return <p>Vous devez être connecté pour accéder à cette page</p>
    } else {

  return (
    <div>
        <h2>Suppression de l'article</h2>
        <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
        <button onClick={() => DeleteBlog(id, blogs)}>Oui</button>
        <button>Non</button>
    </div>
    )}
};

export default BlogDelete