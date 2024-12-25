import { Link } from "react-router";
import { useAuth } from "../contexte/AuthContext";
import { FaHome, FaUser, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();


  return (
    <section className="relative overflow-hidden py-20 bg-gray-400 border-none">
      <div
        className=" py*5 h-auto shadow px-10 align-middle bg-gray-400 border-none"
      >
          <nav className="flex-row m-5">
            <ul className="flex items-center justify-evenly gap-20">
              <li className="flex flex-col items-center text-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3">
                  <Link to="/">
                    <FaHome className="flex-col text-2xl items-center mr-2" />
                    <span>Home</span>
                  </Link>
              </li>
              <Link
                to="/blogs"
                className="text-2xl items-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3"
              >
                Voir les Blogs
              </Link>
              {user && (
              <li>
                <Link
                  to="/create"
                  className="flex items-center text-2xl hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3"
                >
                  {user ? "Créer un blog" : "Se connecter pour créer un blog"}
                </Link>
              </li>
              )}    
              {user && (
                <li className="flex items-center text-2xl hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3">
                  <Link
                    to="/profile"
                    className="text-3xl items-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3"
                  >
                    Profile
                  </Link>
                </li>
              )}
              <li className=" flex text-2xl items-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3">
                <Link to="/register">
                  <FaUserPlus className="ml-12" />
                    <span className="font-sm flex font-light text-lg">Créer un compte</span>
                </Link>
              </li>
              <li className="flex text-2xl items-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3">
                <Link to="/login" title="Se connecter ici">
                  <FaUser className="ml-8" />
                  {user ? (
                <div className="text-lg text-gray-700">
                  {user.displayName || user.email} <span className="font-sm flex font-light">Connecté</span>
                </div>
              ) : (
                <div className="text-2xl text-gray-700"> 
                <span className="text-sm font-light flex
               items-center justify-center">Non Connecté</span>
                </div>
              )}
                </Link>
              </li>
            </ul>
          </nav>
      </div>
    </section>
  );
};

export default Navbar;
