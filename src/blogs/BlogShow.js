import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../contexte/BlogContext";
import parse from "html-react-parser";
import Button from "../components/Button";

const BlogShow = () => {
  const { id } = useParams();
  const { blogs } = useBlog();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const foundBlog = blogs.find((blog) => blog.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    }
  }, [id, blogs]);

  if (!blog) {
    return <p>Blog not found!</p>;
  };

  return (
    <>
      <div className="w-full relative overflow-hidden  bg-gray-400 border-none">
        <h1 className="text-left place-content-left text-4xl mt-0 ml-5 mb-10 underline">
          Titre: {blog.title}
        </h1>
        <ul>
          <li className="text-left place-items-left text-2xl mb-4 ml-5">
            Auteur: {blog.authorName}
          </li>
          <li className="flex items-center justify-center h-24 w-24 rounded-full overflow-hidden border border-gray-300 ml-20 mb-5">
            {blog.image && <img
              src={blog.image}
              alt={blog.title}
              className="object-cover h-full w-full justify-center items-center"
            />}
          </li>
          <li className="text-left place-items-left text-2xl mb-4 ml-5">
            Date de création: {blog.createdAt.toDate().toLocaleDateString()}
          </li>
        </ul>
        <ul>
          <li className="text-left place-items-left text-2xl mb-4 ml-5">
            Contenu:{" "}
          </li>
          <li className="text-left place-items-left text-2xl mb-4 ml-5">
            {typeof blog.content === "string"
              ? parse(blog.content)
              : "Invalid content"}{" "}
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Commentaires :</h2>
        {blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index} className="border-b py-2">
                <strong>Par: {comment.author}</strong>
                <strong>{comment.content}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun commentaire pour ce blog</p>
        )}
      </div>
      <div>
        <h2>Likes: {blog.likes}</h2>
        <button>Aimer</button>
      </div>
      <div>
        <h2>Commenter</h2>
        <form>
          <textarea></textarea>
          <button>Commenter</button>
        </form>
      </div>
      <div>
        <Button
          className="w-60 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-10 rounded" 
          onClick={() => navigate(`/blogs`)}>Retour à la liste</Button>
      </div>
    </>
  );
};

export default BlogShow;
