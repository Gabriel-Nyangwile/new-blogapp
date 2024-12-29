import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../contexte/AuthContext";
import { useBlog } from "../contexte/BlogContext";
import Button from "../components/Button";
import { Timestamp } from "firebase/firestore";
import parse from "html-react-parser";
import { getBlogDetails } from "../api/getBlogDetails";


function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addComment, addLike, blogs, setBlogs } = useBlog();
  const navigate = useNavigate();
  /* const [blog, setBlog] = useState(null); */
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(null);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await getBlogDetails(id);
        console.log('Réponse de l\'API:', response);
        const data = await response.json();
        setBlogs(data);
        setLikes(data.likes ? data.likes.length : 0); //Initialisez les likes à 0 à partir des données du blog
        setComments(data.comments || []);
        console.log('Paramètres ID:', id);
      } catch (error) {
        setError('Impossible de récupérer les détails du blog');
        console.error(
          "Erreur lors de la récupération des détails du blog :",
          error
        );
      }
    };
    fetchBlogDetails();
  }, [id, setBlogs]);

  if(error) {
    return <p>{error}</p>;
  }


  const handleLikes = async (e, blogId) => {
    e.preventDefault();

    if (!user) {
      console.error("User not authenticated");
      return;
    }
    try {
      addLike(blogId, user.uid);
      const updatedLikes = blogs.likes.includes(user.uid)
        ? likes - 1
        : likes + 1;
      setLikes(updatedLikes);
      //Mettre à jour l'état du blog pour refléter les changements de likes
      setBlogs({
        ...blogs,
        likes: blogs.likes.includes(user.uid)
          ? blogs.likes.filter(uid => uid !== user.uid)
          : [...blogs.likes || [], user.uid],
      });
    } catch (error) {
      console.error("Erreur d'ajoût de like:", error);
    }
  };

  const handleComments = async (e, blogId) => {
    e.preventDefault();

    if (!commentText || !user) {
      console.error("Comment text or author missing");
      return;
    }
    const comment = {
      text: commentText,
      author: user.displayName || user.email,
      createdAt: Timestamp.fromDate(new Date()),
    };
    await addComment(blogId, comment);
    setCommentText("");
    setComments([...comments, comment]);
  };

  const toggleCommentInput = (blogId) => {
    setShowCommentInput(showCommentInput === blogId ? null : blogId);
  };

  /* if (!blogs) {
    return <p>Chargement ...</p>;
  } */

  return (
    <div className="w-full relative overflow-hidden  bg-gray-400 border-none">
      <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-left place-content-left text-4xl mt-0 ml-5 mb-10 underline">
          Détails des Blogs publiés
        </h1>
      </div>
      <ul className="w-full max-w-3xl mx-auto justify-start ">
        {blogs.map((item) => (
          <li key={item.id} className="mb-4 border-b border-gray-300 pb-4">
            <h2 className="text-3xl bold mb-4">Titre : {item.title}</h2>
            <div>
              <p>
                Auteur :{item.authorName || item.authorEmail} Créé le:{" "}
                {item.createdAt instanceof Timestamp
                  ? item.createdAt.toDate().toLocaleDateString()
                  : "Invalid date"}
              </p>
            </div>
            <div className="flex items-left justify-left mt-10 mb-10">
              <div className="flex items-center justify-center h-24 w-24 rounded-full overflow-hidden border border-gray-300 ml-20 mb-5">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover h-full w-full justify-center items-center"
                  />
                )}
              </div>
            </div>
            <div>
              <div className="w-full max-w-3xl mx-auto">
                <span className="text-2xl underline mb-4">Contenu :</span>{" "}
                {typeof item.content === "string"
                  ? parse(item.content)
                  : "Invalid content"}
              </div>
            </div>
            <div className="flex w-auto items-center text-4xl m-5 gap-4">
              <Button
                type="button"
                className="bg-gray-400 hover:bg-gray-600 text-white text-lg bg-primary m-3 gap-5"
                onClick={handleLikes}
              >
                ❤️ ({likes})
              </Button>
              <Button
                type="button"
                className="flex flex-col bg-gray-400 hover:bg-blue-300 text-white text-lg bg-primary m-3 gap-5"
                onClick={() => toggleCommentInput(item.id)}
              >
                Vos commentaires
                <br />
                💬
              </Button>
              {showCommentInput === item.id && (
                <form
                  onSubmit={(e) => handleComments(e, item.id)}
                  className="flex items-center text-lg gap-2"
                >
                  <textarea
                    label=""
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Commentaires ici"
                  />
                  <Button
                    type="button"
                    className="grid items-center bg-gray-400 hover:bg-gray-600 text-color-white bg-color-primary mb-3"
                  >
                    Publier <br />
                    💬
                  </Button>
                </form>
              )}
            </div>
            <div>
              {Array.isArray(comments) ? (
                comments.map((comment, index) => (
                  <li key={index}>{comment.text}</li>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {user && (
        <div className="flex justify-end w-full max-w-3xl mx-auto mt-5">
          <Button onClick={() => navigate(`/`)}>Retour à l'accueil</Button>
          {/* <Button onClick={() => navigate(`/delete/${id}`)}>Supprimer</Button> */}
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
