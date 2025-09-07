import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const HeaderComponent: React.FC = () => {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    const path = location.pathname;
    if (path === "/" || path === "/characters") {
      e.preventDefault();
    }
  };
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 text-white flex items-center px-4 shadow z-10">
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 transition-colors duration-200 ${
                isActive
                  ? "font-semibold underline underline-offset-4 text-white"
                  : "text-white/80 hover:text-white"
              }`
            }
            onClick={handleClick}
          >
            Characters
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `px-2 py-1 transition-colors duration-200 ${
                isActive
                  ? "font-semibold underline underline-offset-4 text-white"
                  : "text-white/80 hover:text-white"
              }`
            }
            to="/favorites"
          >
            Favorites
          </NavLink>
        </nav>
      </header>
    </>
  );
};

const Header = React.memo(HeaderComponent);
export default Header;
