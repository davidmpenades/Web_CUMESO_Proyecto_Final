import React, { useContext } from "react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/Logo.png";
import AuthContext from "../../context/AuthContext";

export default function Header() {
  // const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuth, isAdmin, logout } = useContext(AuthContext);

  // const redirect = {
  //   dashboard: () => {
  //     navigate("/dashboard");
  //     // setActiveLink("/dashboard");
  //   },
  //   profile: () => {
  //     navigate("/profile");
  //   },
  // };
  return (
    <Navbar fluid rounded>
      {/* Primera columna: Logo */}
      <div className="flex items-center">
        <Navbar.Brand href="/">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
      </div>

      {/* Segunda columna: Menú de navegación */}
      <div className="flex flex-grow justify-center">
        <Navbar.Collapse>
          <Navbar.Link href="/" active={location.pathname === "/"}>
            Inicio
          </Navbar.Link>
          <Navbar.Link href="/rent" active={location.pathname === "/"}>
            Alquiler
          </Navbar.Link>
          <Navbar.Link href="/plan" active={location.pathname === "/"}>
            Planes
          </Navbar.Link>
          <Navbar.Link
            href="/contact"
            active={location.pathname === "/"}
          >
            Contacto
          </Navbar.Link>

          {!isAuth && (
            <div className="flex md:order-2 items-center">
            <Button color="dark" pill href="/login" active={location.pathname === "/login"}>
              Entrar/Registro
            </Button>        
          </div>
          )}
          
        </Navbar.Collapse>
      </div>

      {/* Tercera columna: Dropdown */}
      <div className="flex items-center">
        {isAuth && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.username}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            {isAdmin && (
              <Dropdown.Item >
                Dashboard
              </Dropdown.Item>
            )}
            <Dropdown.Item >Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
