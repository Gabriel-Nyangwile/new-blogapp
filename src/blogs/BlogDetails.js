import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../contexte/AuthContext";
import { useBlog } from "../contexte/BlogContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { Timestamp } from "firebase/firestore";
import parse from "html-react-parser";

function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addComment, addLike, blogs } = useBlog();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  const blog = blogs.find((blog) => blog.id === id);
  
  useEffect(() => {
    if (blog.comments) {
      setComments(blog.comments);
    }
  }, [blog.comments]);
 
  

  const handleLikes = async (e) => {
    e.preventDefault();
    setLikes(likes + 1);
    await addLike(blog.id);
  };

  const handleComments = async (e) => {
    e.preventDefault();
    /* if (!commentText || !user) {
      console.error("Comment text or author missing");
      return;
    } */
    const comment = {
      text: commentText,
      author: user.authorName,
      createdAt: Timestamp.fromDate(new Date()),
    };
    await addComment(blog.id, comment);
    setCommentText("");
  };

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="w-full relative overflow-hidden  bg-gray-400 border-none">
      <h1 className="text-left place-content-left text-4xl mt-0 ml-5 mb-10 underline">
        {blog.title}
      </h1>
      <ul className="w-full max-w-3xl mx-auto justify-start">
        <li className="text-left place-items-left text-4xl mb-4">
          Titre : {blog.title}
        </li>
        <li className="text-2xl">
          Auteur :{" "}
          {typeof blog.authorName === "string"
            ? parse(blog.authorName)
            : "Invalid name"}{" "}
          Créé le:{" "}
          {blog.createdAt instanceof Timestamp
            ? blog.createdAt.toDate().toLocaleDateString()
            : "Invalid date"}
        </li>
        <li className="flex items-center justify-center h-24 w-24 rounded-full overflow-hidden border border-gray-300 ml-20 mb-5">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover h-full w-full justify-center items-center"
            />
          )}
        </li>
      </ul>
      <div className="w-full max-w-3xl mx-auto">
        <span className="text-2xl underline mb-4">Contenu :</span>{" "}
        {typeof blog.content === "string"
          ? parse(blog.content)
          : "Invalid content"}
      </div>
      <div className="flex w-auto items-center text-4xl m-5 gap-4">
        <Button onClick={handleLikes}>Like ({likes})</Button>
        <form className="flex items-center gap-2">
          <Input
            label=""
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ajouter un commentaire"
          />
          <Button
            type="submit"
            onClick={handleComments}
            className="grid items-center size-18 hover:bg-blue-400 text-color-white bg-color-primary mb-3"
          >
            Publier
          </Button>
        </form>
      </div>
      <ul>
        {Array.isArray(comments) ? (
          comments.map((comment, index) => <li key={index}>{comment.text}</li>)
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
      {user && (
        <div>
          <Button onClick={() => navigate(`/update-blog/${id}`)}>
            Modifier
          </Button>
          <Button onClick={() => navigate(`/delete/${id}`)}>Supprimer</Button>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../contexte/AuthContext";
import { useBlog } from "../contexte/BlogContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { Timestamp } from "firebase/firestore";
import parse from "html-react-parser";

function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addComment, addLike, blogs } = useBlog();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  const blog = blogs.find((blog) => blog.id === id);
  
  useEffect(() => {
    if (blog.comments) {
      setComments(blog.comments);
    }
  }, [blog.comments]);
 
  

  const handleLikes = async (e) => {
    e.preventDefault();
    setLikes(likes + 1);
    await addLike(blog.id);
  };

  const handleComments = async (e) => {
    e.preventDefault();
    /* if (!commentText || !user) {
      console.error("Comment text or author missing");
      return;
    } */
    const comment = {
      text: commentText,
      author: user.authorName,
      createdAt: Timestamp.fromDate(new Date()),
    };
    await addComment(blog.id, comment);
    setCommentText("");
  };

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="w-full relative overflow-hidden  bg-gray-400 border-none">
      <h1 className="text-left place-content-left text-4xl mt-0 ml-5 mb-10 underline">
        {blog.title}
      </h1>
      <ul className="w-full max-w-3xl mx-auto justify-start">
        <li className="text-left place-items-left text-4xl mb-4">
          Titre : {blog.title}
        </li>
        <li className="text-2xl">
          Auteur :{" "}
          {typeof blog.authorName === "string"
            ? parse(blog.authorName)
            : "Invalid name"}{" "}
          Créé le:{" "}
          {blog.createdAt instanceof Timestamp
            ? blog.createdAt.toDate().toLocaleDateString()
            : "Invalid date"}
        </li>
        <li className="flex items-center justify-center h-24 w-24 rounded-full overflow-hidden border border-gray-300 ml-20 mb-5">
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover h-full w-full justify-center items-center"
            />
          )}
        </li>
      </ul>
      <div className="w-full max-w-3xl mx-auto">
        <span className="text-2xl underline mb-4">Contenu :</span>{" "}
        {typeof blog.content === "string"
          ? parse(blog.content)
          : "Invalid content"}
      </div>
      <div className="flex w-auto items-center text-4xl m-5 gap-4">
        <Button onClick={handleLikes}>Like ({likes})</Button>
        <form className="flex items-center gap-2">
          <Input
            label=""
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Ajouter un commentaire"
          />
          <Button
            type="submit"
            onClick={handleComments}
            className="grid items-center size-18 hover:bg-blue-400 text-color-white bg-color-primary mb-3"
          >
            Publier
          </Button>
        </form>
      </div>
      <ul>
        {Array.isArray(comments) ? (
          comments.map((comment, index) => <li key={index}>{comment.text}</li>)
        ) : (
          <p>No comments yet</p>
        )}
      </ul>
      {user && (
        <div>
          <Button onClick={() => navigate(`/update-blog/${id}`)}>
            Modifier
          </Button>
          <Button onClick={() => navigate(`/delete/${id}`)}>Supprimer</Button>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
