import React, { useState, useEffect, useContext } from "react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/imgs/Logo.webp";
import profile from "../../assets/imgs/profile.webp";
import AuthContext from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); 
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      fluid
      rounded
      className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } h-16`} 
    >
      {/* Primera columna: Logo */}
      <div className="flex items-center">
        <Navbar.Brand href="/">
          <img
            src={logo}
            style={{ width: "150px" }}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
      </div>

      {/* Segunda columna: Menú de navegación */}
      <div className="flex flex-grow justify-center">
        <Navbar.Collapse>
          <NavLink
            to="/"
            exact
            className="relative nav-link px-2 link-danger"
            activeClassName="active" 
          >
            Inicio
            <span className="absolute bottom-0 left-0 w-full h-0 bg-danger transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/maquinaria"
            className="relative nav-link px-2 link-danger"
            activeClassName="active" 
          >
            Maquinaria
            <span className="absolute bottom-0 left-0 w-full h-0 bg-danger transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to="/contact"
            className="relative nav-link px-2 link-danger"
            activeClassName="active" 
          >
            Contacto
            <span className="absolute bottom-0 left-0 w-full h-0 bg-danger transition-all duration-300"></span>
          </NavLink>
        </Navbar.Collapse>
      </div>

      {/* Tercera columna: Dropdown */}
      {!isAuth ? (
        <div className="flex md:order-2 items-center">
          <Button
            color="dark"
            pill
            href="/login"
            active={location.pathname === "/login"}
          >
            Entrar/Registro
          </Button>
        </div>
      ) : (
        <div className="flex items-center">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={profile} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.username}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            {isAdmin && <Dropdown.Item>Dashboard</Dropdown.Item>}
            <Dropdown.Item>Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
          </Dropdown>
         
        </div>
      )}
       <Navbar.Toggle />
    </Navbar>
  );
}
