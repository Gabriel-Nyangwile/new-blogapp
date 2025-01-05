import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../contexte/BlogContext";
import parse from "html-react-parser";
import Button from "../components/Button";
import { Timestamp } from "firebase/firestore";

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
  }

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
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="object-cover h-full w-full justify-center items-center"
              />
            )}
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
      <div className="flex flex-row items-stretch mt-4 gap-40">
        <h2 className="text-lg font-bold">Commentaires:  💬  </h2>
        <h2 className="text-lg font-bold">likes : ❤ ({blog.likes ? blog.likes.length : 0})</h2>
      </div>
      <section className="w-auto items-center border-none p-4">
        {Array.isArray(blog.comments) ? (
          blog.comments
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((comment, index) => (
              <div
                key={index}
                className="w-fit border-solid border-2 border-gray-300 p-2 mb-4 rounded-2xl"
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
      </section>

      <div>
        <Button
          className="w-60 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-10 rounded"
          onClick={() => navigate(`/blogs`)}
        >
          Retour à la liste
        </Button>
      </div>
    </>
  );
};

export default BlogShow;
