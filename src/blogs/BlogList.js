import React, { useState } from "react";
import parse from "html-react-parser";
import { useBlog } from "../contexte/BlogContext";
import { useNavigate } from "react-router";
import { Timestamp } from "firebase/firestore";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexte/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";


const BlogList = () => {
  const { addComment, addLike, blogs } =
    useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(null);
  /* const [likes, setLikes] = useState(0) */

  const handleComments = async (e, blogId) => {
    e.preventDefault();
    if (!commentText || !user) {
      console.error("Comment text or author missing");
      return;
    }
    const comment = {
      text: commentText,
      author: user.authorName || user.email,
      createdAt: Timestamp.fromDate(new Date()),
    };
    await addComment(blogId, comment);
    setCommentText("");
    setShowCommentInput(null); // Pour cacher le champ de commentaire après avoir ajouté un commentaire
  };

  const handleLikes = async (e, blogId) => {
    e.preventDefault();
    await addLike(blogId)
  };

  const handleEdit = async (e, blogId) => {
    e.preventDefault();
    navigate(`/update-blog/${blogId}`);
  };

  const showDetails = async (e, blogId) => {
    e.preventDefault();
    navigate(`/blogs/${blogId}`);
  }

  const toggleCommentInput = (blogId) => {
    setShowCommentInput(showCommentInput === blogId ? null : blogId);
  };

  return (
    <div className="w-auto relative overflow-hidden  bg-gray-100 border-none py-10">
      <h1 className="text-center items-center text-4xl mb-10">
        Liste des blogs
      </h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="mb-4">
            <h2 className="text-3xl bold mb-4">{blog.title}</h2>
            <div>
              {typeof blog.content === "string"
                ? parse(blog.content)
                : "Invalid content"}
            </div>
            {/* Pour vérifier que le contenu est une chaîne */}
            <p className="text-2xl bold mb-5">
              Auteur : {blog.authorName || blog.authorName} Créé le: 
              {blog.createdAt instanceof Timestamp
                ? blog.createdAt.toDate().toLocaleDateString()
                : "Invalid date"}
            </p>
            <div className="flex justify-left items-left mt-10 mb-10">
              <div className="flex items-center justify-center h-24 w-24 rounded-full overflow-hidden border border-gray-300">
                {blog.image && 
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover h-full w-full"
                  />
                }
              </div>
            </div>
            <div className="flex w-full items-center text-3xl m-5 gap-4">
              <Button
                type="button"
                className="bg-gray-400 hover:bg-blue-300 text-white bg-primary m-3 gap-5"
                onClick={(e) => handleLikes(e, blog.id)}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
              <Button
                type="button"
                className="hover:bg-blue-300 text-white bg-primary m-3 gap-5"
                onClick={(e) => handleEdit(e, blog.id)}
              >
                Edit
              </Button>
              <Button
                type="submit"
                className="bg-gray-400 hover:bg-blue-300 text-white bg-primary m-3 gap-5"
                onClick={() => toggleCommentInput(blog.id)}
              >
                <FontAwesomeIcon icon={faComment} />
              </Button>
              {showCommentInput === blog.id && (
                <form
                  onSubmit={(e) => handleComments(e, blog.id)}
                  className="flex items-center gap-2"
                >
                  <Input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment"
                    className="mb-4 p-2 border-gray-300 rounded"
                  />
                  <Button type="submit" className="bg-gray-700 hover:bg-blue-800 text-white bg-primary m-3 gap-5">
                    Submit
                  </Button>
                </form>
              )}
              <Button 
                type="button"
                className="bg-blue-500 hover:bg-blue-300 text-white bg-primary m-3 gap-5"
                onClick={(e) => showDetails(e, blog.id)}>
                  Voir le blog
                </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
