import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useBlog } from "../contexte/BlogContext";
import { useNavigate } from "react-router";
import { Timestamp } from "firebase/firestore";
import Button from "../components/Button";
import { useAuth } from "../contexte/AuthContext";

const BlogList = () => {
  const { addComment, addLike, blogs } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(null);
  const [updatedBlogs, setUpdatedBlogs] = useState(blogs);

  useEffect(() => {
    setUpdatedBlogs(blogs);
  }, [blogs]);

  const handleComments = async (e, blogId) => {
    e.preventDefault();
    if (!commentText || !user) {
      console.error("Les commentaires manque ou vous n'êtes pas connecté!");
      return;
    }
    const comment = {
      text: commentText,
      author: user.displayName || user.email,
      createdAt: Timestamp.fromDate(new Date()),
    };
    try {
      await addComment(blogId, comment);
      setCommentText("");
      //Mettez à jour les commentaires du blog spécifié
      const updatedBlogsList = updatedBlogs.map((blog) => {
        if (blog.id === blogId) {
          const updatedComments = [...(blog.comments || []), comment];
          return {
            ...blog,
            comments: updatedComments,
          };
        }
        return blog;
      });
      setUpdatedBlogs(updatedBlogsList);
    } catch (error) {
      console.error("Erreur d'ajoût de commentaires:", error);
    }
  };

  const handleLikes = async (e, blogId) => {
    e.preventDefault();

    if (!user) {
      alert("Vous n'êtes pas authentifié. Connectez-vous !");
      navigate("/blogs");
      return;
    }
    try {
      const blog = updatedBlogs.find((blog) => blog.id === blogId);
      const userLiked = blog.likes ? blog.likes.includes(user.uid) : false;

      // Mettre à jour l'état du blog pour refléter les changements de likes
      const updatedBlogsList = updatedBlogs.map((blog) => {
        if (blog.id === blogId) {
          return {
            ...blog,
            likes: userLiked
              ? blog.likes.filter((uid) => uid !== user.uid)
              : [...(blog.likes || []), user.uid],
          };
        }
        return blog;
      });
      setUpdatedBlogs(updatedBlogsList);
      await addLike(blogId, user.uid);
    } catch (error) {
      console.error("Erreur d'ajout de like :", error);
    }
  };


  const handleEdit = async (e, blogId) => {
    e.preventDefault();
    navigate(`/update-blog/${blogId}`);
  };

  const showDetails = async (e, blogId) => {
    e.preventDefault();
    navigate(`/blogs/${blogId}`);
  };

  const toggleCommentInput = (blogId) => {
    setShowCommentInput(showCommentInput === blogId ? null : blogId);
  };

  return (
    <div className="w-full relative flex flex-col items-stretch justify-start overflow-hidden  bg-gray-200 border-none p-10">
      <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-4xl font-semibold text-white text-center items-center mb-10">
          Blogs publiés
        </h1>
      </div>
      <ul>
        {updatedBlogs.map((blog) => (
          <li
            key={blog.id}
            className="mb-4 border-solid border-2 justify-stretch border-gray-300 p-4"
          >
            <h2 className="text-3xl bold mb-4">Titre : {blog.title}</h2>
            <div>
              {/* Pour vérifier que le contenu est une chaîne */}
              <p className="text-2xl bold mb-5">
                Auteur : {blog.authorName || blog.authorEmail} Créé le:
                {blog.createdAt instanceof Timestamp
                  ? blog.createdAt.toDate().toLocaleDateString()
                  : "Invalid date"}
              </p>
            </div>
            <div className="flex justify-left items-left mt-10 mb-10">
              <div className="flex items-center justify-center h-24 w-24 rounded-full overflow-hidden border border-gray-300">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover h-full w-full"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-10 mb-10 px-6">
              <div className="w-full max-w-3xl mx-auto">
                <span className="text-2xl underline mb-4">Contenu :</span>{" "}
                {typeof blog.content === "string"
                  ? parse(blog.content)
                  : "Invalid content"}
              </div>
            </div>
            <div className="flex w-full items-center text-3xl m-5 gap-4">
              <Button
                type="button"
                className="bg-gray-100 hover:bg-gray-300 text-gray-500 text-lg bg-primary m-3 gap-5"
                onClick={(e) => handleLikes(e, blog.id)}
              >
                ❤️ ({blog.likes ? blog.likes.length : 0})
              </Button>
              <Button
                type="submit"
                className="bg-gray-100 hover:bg-gray-300 text-gray-500 bg-primary m-3 gap-5"
                onClick={() => toggleCommentInput(blog.id)}
              >
                Vos commentaires
                <br />
                💬
              </Button>
              {showCommentInput === blog.id && (
                <form
                  onSubmit={(e) => handleComments(e, blog.id)}
                  className="flex items-center text-lg gap-2"
                >
                  <textarea
                    label=""
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Commenter ici"
                    className="mb-4 p-2 border-gray-300 text-gray-500 rounded"
                  />
                  <Button
                    type="submit"
                    className="bg-gray-700 hover:bg-blue-800 text-white bg-primary m-3 gap-5"
                  >
                    Publier <br />
                    💬
                  </Button>
                </form>
              )}
            </div>
            <div className="flex flex-col items-left justify-left mt-10 mb-10 px-6">
              {Array.isArray(blog.comments) ? (
                blog.comments
                .sort((a,b) => b.createdAt - a.createdAt)
                .map((comment, index) => (
                  <div
                    key={index}
                    className="border-solid border-2 border-gray-300 p-2 mb-4"
                  >
                    <br />
                    {comment.text} - Par {comment.author} - le{" "}
                    {comment.createdAt instanceof Timestamp
                      ? comment.createdAt.toDate().toLocaleDateString()
                      : "Invalid date"}
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
            <div>
              <Button
                type="button"
                className="hover:bg-blue-300 text-white bg-primary m-3 gap-5"
                onClick={(e) => handleEdit(e, blog.id)}
              >
                Edit
              </Button>
              <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-300 text-white bg-primary m-3 gap-5"
                onClick={(e) => showDetails(e, blog.id)}
              >
                Voir le blog
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {user && (
        <div className="flex justify-end w-full max-w-3xl mx-auto mt-5">
          <Button onClick={() => navigate(`/`)}>Retour à l'accueil</Button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
