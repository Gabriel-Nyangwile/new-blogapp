import React from 'react'
import { useAuth } from '../contexte/AuthContext';
import { useParams } from 'react-router-dom';
import { useBlog } from '../contexte/BlogContext';

const UpdateBlog = () => {
    const { isLogged } = useAuth();
    const { id } = useParams();
    const { blogs, UpdateBlog } = useBlog();
    if (!isLogged) {
        return <p>Vous devez être connecté pour accéder à cette page</p>
    } else {
        return UpdateBlog(id, blogs);
    }
}

export default UpdateBlog;

import React from 'react'
import { useAuth } from '../contexte/AuthContext';
import { useParams } from 'react-router-dom';
import { useBlog } from '../contexte/BlogContext';

const UpdateBlog = () => {
    const { isLogged } = useAuth();
    const { id } = useParams();
    const { blogs, UpdateBlog } = useBlog();
    if (!isLogged) {
        return <p>Vous devez être connecté pour accéder à cette page</p>
    } else {
        return UpdateBlog(id, blogs);
    }
}

export default UpdateBlog;
