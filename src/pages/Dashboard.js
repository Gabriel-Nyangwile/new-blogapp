import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom"; // Pour gérer les liens dynamiques avec React Router

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Fonction pour basculer la visibilité du sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Volet gauche (sidebar) */}
      <div
        className={`${
          isSidebarOpen ? "w-auto" : "w-0"
        } bg-gray-400 text-white transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4">
          <button
            className="text-white font-bold hover:bg-gray-600 p-2 rounded shadow"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Fermer" : "☰"} {/* Icône Hamburger */}
          </button>
        </div>
        {isSidebarOpen && (
          <nav className="p-4">
            <ul>
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `block p-2 rounded ${
                      isActive ? "bg-blue-500" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Vue d'ensemble
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `block p-2 rounded ${
                      isActive ? "bg-blue-500" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Profil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `block p-2 rounded ${
                      isActive ? "bg-blue-500" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Paramètres
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Volet central (contenu principal) */}
      <div className="flex-1 bg-gray-100 p-4">
        <div className="fixed top-4 left-4">
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
        <Outlet /> {/* Affiche le composant enfant en fonction du lien */}
      </div>
    </div>
  );
};

export default Dashboard;
