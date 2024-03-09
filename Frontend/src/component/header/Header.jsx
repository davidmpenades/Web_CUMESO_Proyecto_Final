import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/imgs/Logo.webp";
import profile from "../../assets/imgs/profile.webp";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = () => {
    navigate('/login'); 
  };

  return (
    <div
      className={`header-fixed mx-auto max-w-full px-4 sm:px-6 lg:px-8 ${
        isScrolled ? "bg-white" : "bg-transparent"
      } transition-colors duration-300`}
    >
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="block text-teal-600">
          <img
            src={logo}
            alt="Logo"
            className="h-8 md:h-16"
            style={{ width: "200px", height: "50px" }}
          />
        </NavLink>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className="header-link text-gray-500 transition hover:text-gray-500/75"
          >
            Inicio
          </NavLink>

          <NavLink
            to="/machine"
            className="header-link text-gray-500 transition hover:text-gray-500/75"
          >
            Catálogo
          </NavLink>

          <NavLink
            to="/contact"
            className="header-link text-gray-500 transition hover:text-gray-500/75"
          >
            Contacto
          </NavLink>
        </div>

        {/* Right Section */}
        {!isAuth ? (
          <button
          onClick={handleNavigation}
          className="w-[150px] bg-black h-[40px] my-3 flex items-center justify-center rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#7c7979] before:to-[rgb(0, 0, 0, 0.1)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff] mx-2 py-2 font-medium text-sm"
        >
          Entrar
        </button>
        ) : (         
          <div className="relative flex items-center">
      <div onClick={toggleDropdown} className="cursor-pointer z-10"> 
        <img alt="User settings" src={profile} style={{width:"42px", height:"42px"}} className="rounded-full" />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-1 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                  {user.username}
                </div>
                <div className="block px-4 py-2 text-sm text-gray-700 truncate">
                  {user.email}
                </div>
                <div className="px-4 py-2 border-t border-gray-100"></div>
                {isAdmin && (
                  <NavLink
                    to="/dashboard"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                )}
                <NavLink
                  to="/profile"
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </NavLink>
                <div className="px-4 py-2 border-t border-gray-100"></div>
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden btn-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Icono de menú */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="25"
            height="25"
          >
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`${
              isMobileMenuOpen ? "flex" : "hidden"
            } flex-col absolute top-full left-0 right-0 bg-white shadow-md z-20 md:hidden`}
          >
            {/* Los mismos NavLink que en tu menú principal */}
            <NavLink
              to="/"
              className="p-2 hover:bg-gray-100"
              onClick={closeMobileMenu}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/machine"
              className="p-2 hover:bg-gray-100"
              onClick={closeMobileMenu}
            >
              Maquinaria
            </NavLink>
            <NavLink
              to="/contact"
              className="p-2 hover:bg-gray-100"
              onClick={closeMobileMenu}
            >
              Contacto
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
