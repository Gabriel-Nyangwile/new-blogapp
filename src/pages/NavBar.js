import { Link } from "react-router";
import { useAuth } from "../contexte/AuthContext";
import { FaHome, FaUser, FaUserPlus } from "react-icons/fa";
import LogoutBtn from "../components/LogoutBtn";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden py-20 bg-gray-400 border-none">
      <div className="fixed top-0 left-0 w-full py-5 h-auto shadow px-10 align-middle bg-gray-400 border-none z-10">
        <nav className="flex-row m-5">
          <ul className="flex items-center justify-evenly gap-20">
            <li className="flex flex-col items-center text-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3">
              <Link to="/">
                <FaHome className="flex-col text-2xl items-center mr-2" />
                <span>Home</span>
              </Link>
            </li>
            {!user ? (
              <li className=" flex text-2xl items-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3">
                <Link to="/register">
                  <FaUserPlus className="ml-12" />
                  <span className="font-sm flex font-light text-lg">
                    Créer un compte
                  </span>
                </Link>
              </li>
            ) : null}
            {user ? (
              <>
                <li className="flex text-2xl items-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3">
                  <Link to="/login" title="Se connecter ici">
                    <FaUser className="ml-8" />
                    <div className="text-lg text-gray-700">
                      {user.displayName || user.email}{" "}
                      <span className="font-sm flex font-light">Connecté</span>
                    </div>
                  </Link>
                </li>
                <li>
                    {user ?
                    <LogoutBtn className="flex text-lg items-center hover:text-pink-700 hover:underline text-gray-700 bold bg-color-primary mb-3" />
                     : null}
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
