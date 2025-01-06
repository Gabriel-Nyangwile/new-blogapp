import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom"; // Pour gérer les liens dynamiques avec React Router
import image_fond from "../assets/image_fond.webp";
import LogoutBtn from "../components/LogoutBtn";
import { useAuth } from "../contexte/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Fonction pour basculer la visibilité du sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex h-screen">
      {/* image de fonds */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image_fond}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Volet gauche (sidebar) */}
      <div
        className={`relative z-10 ${
          isSidebarOpen ? "w-auto" : "w-0"
        } bg-gray-400 text-black text-2xl transition-all duration-300 overflow-hidden`}
      >
        {isSidebarOpen && (
          <nav className="p-4 my-5">
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `block p-2 rounded ${
                      isActive ? "bg-blue-500" : "hover:bg-gray-100"
                    }`
                  }
                >
                  Blogs publiés
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create"
                  className={({ isActive }) =>
                    `block p-2 rounded ${
                      isActive ? "bg-blue-500" : "hover:bg-gray-100"
                    }`
                  }
                >
                  Créer son propre blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block p-2 rounded ${
                      isActive ? "bg-blue-500" : "hover:bg-gray-100"
                    }`
                  }
                >
                  Profil
                </NavLink>
              </li>
            </ul>
            <div className="p-4">
              <button
                className="text-black font-bold hover:bg-gray-100 p-2 rounded shadow"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? "Fermer" : "☰"} {/* Icône Hamburger */}
              </button>
            </div>
            <div className="mt-10">{user ? <LogoutBtn /> : null}</div>
          </nav>
        )}
      </div>

      {/* Volet central (contenu principal) */}
      <div className="flex-1 p-4 flex flex-col items-center bg-gray-100">
        <div className="fixed top-4 left-4 z-20">
          {/* Bouton pour afficher/cacher la sidebar si fermée */}
          {!isSidebarOpen && (
            <button
              className="text-gray-800 font-bold bg-gray-200 p-2 rounded shadow"
              onClick={toggleSidebar}
            >
              ☰
            </button>
          )}
        </div>
        <div className="flex justify-center absolute top-1/4 transform -translate-y-1/2 w-full z-20">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg">
            <h1 className="text-4xl font-bold text-white mb-4">
              Bienvenue sur l'application BlogApp!
            </h1>
          </div>
        </div>
        <Outlet /> {/* Affiche le composant enfant en fonction du lien */}
      </div>
    </div>
  );
};

export default Dashboard;
