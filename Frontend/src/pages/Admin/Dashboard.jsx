import React, { useState, useEffect, useContext } from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/Logo.webp";
import "./Dashboard.css";
import MachinsList from "../../component/Admin/Machine/MachineList";
import useMachine from "../../hooks/useMachine";
import useProvider from "../../hooks/useProvider";
import usePart from "../../hooks/usePart";
import PartTable from "../../component/Admin/Part/PartTable";
import ProvidersTable from "../../component/Admin/Providers/ProviderTable";
import UserTable from "../../component/Admin/Users/UserTable";
import MachineCreate from "../../component/Admin/Machine/MachineCreate";
import MachineUpdate from "../../component/Admin/Machine/machineUpdate";
import ProviderCreate from "../../component/Admin/Providers/ProviderCreate";
import PartCreate from "../../component/Admin/Part/PartCreate";
import ProviderUpdate from "../../component/Admin/Providers/ProviderUpdate";
import PartUpdate from "../../component/Admin/Part/PartUpdate";
import AuthContext from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { machines, fetchMachines } = useMachine();
  const { providers } = useProvider();
  const { parts } = usePart();
  const [selectedItem, setSelectedItem] = useState("machines");
  const [currentView, setCurrentView] = useState(null);
  const [updateMachine, setUpdateMachine] = useState(null);
  const [updateProvider, setUpdateProvider] = useState(null);
  const [updatePart, setUpdatePart] = useState(null);
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    fetchMachines();
  }, []);
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setCurrentView(null);
  };

  const handlerClickShop = () => {
    event.preventDefault();
    setUser({});
    navigate("/machine");
  };

  const handleUpdateSuccess = () => {
    setCurrentView("someDefaultView");
    setUpdateProvider(null);
  };

  const handerClickCreate = (item) => {
    console.log("handerClickCreate", item);
    switch (item) {
      case "machines":
        console.log("machineCreate");
        setCurrentView("machineCreate");
        break;
      case "providers":
        console.log("providerCreate");
        setCurrentView("providerCreate");
        break;
      case "parts":
        console.log("partCreate");
        setCurrentView("partCreate");
        break;
      default:
        console.log("default");
        setCurrentView(null);
    }
  };

  const buttonText = {
    machines: "una Máquina",
    parts: "una Pieza",
    providers: "un Proveedor",
    users: "un Usuario",
  };
  const showUpdateForm = (machine) => {
    setUpdateMachine(machine);
    setCurrentView("updateMachine");
  };
  const showProviderUpdateForm = (provider) => {
    setUpdateProvider(provider);
    setCurrentView("updateProvider");
  };

  const showPartUpdateForm = (part) => {
    setUpdatePart(part);
    setCurrentView("updatePart");
  };

  const renderContent = () => {
    if (currentView === "machineCreate") {
      return (
        <MachineCreate onCreationSuccess={() => handleSelectItem("machines")} />
      );
    }
    if (currentView === "providerCreate") {
      return (
        <ProviderCreate
          onCreationSuccess={() => handleSelectItem("providers")}
        />
      );
    }

    if (currentView === "partCreate") {
      return <PartCreate onCreationSuccess={() => handleSelectItem("parts")} />;
    }
    if (currentView === "updateMachine" && updateMachine) {
      return (
        <MachineUpdate
          machine={updateMachine}
          onUpdateSuccess={handleUpdateSuccess}
        />
      );
    }
    if (currentView === "updateProvider" && updateProvider) {
      return (
        <ProviderUpdate
          provider={updateProvider}
          onUpdateSuccess={handleUpdateSuccess}
        />
      );
    }
    if (currentView === "updatePart" && updatePart) {
      return (
        <PartUpdate part={updatePart} onUpdateSuccess={handleUpdateSuccess} />
      );
    }
    switch (selectedItem) {
      case "machines":
        if (!machines) {
          return <div>Cargando máquinas...</div>;
        }
        const sortedMachines = machines.sort(
          (a, b) => b.visibility - a.visibility
        );

        return sortedMachines.map((machine) => (
          <MachinsList
            key={machine.id}
            machine={machine}
            onShowUpdateForm={showUpdateForm}
          />
        ));
      case "parts":
        return <PartTable showPartUpdateForm={showPartUpdateForm} />;
      case "providers":
        return (
          <ProvidersTable showProviderUpdateForm={showProviderUpdateForm} />
        );
      case "users":
        return <UserTable />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container flex h-screen bg-gray-100 p-1 overflow-hidden">
      {/* Sidebar - Inicio */}
      <div className="dashboard-sidebar flex flex-col justify-between bg-gray-700">
        {/* Logo e Iconos - Inicio */}
        <div>
          {/* Logo */}
          <div className="inline-flex items-center justify-center p-2">
            <span className="grid place-content-center rounded-lg bg-white p-3">
              <img src={Logo} alt="Logo" className="h-4 w-7" />
            </span>
          </div>
          <div className="border-t border-gray-100">
            <div className="px-2 py-2">
              <div className="py-2">
                <a
                  onClick={() => handleSelectItem("machines")}
                  className={`group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-gray-50 hover:text-gray-700 ${selectedItem === "machines" || selectedItem === "parts"
                      ? "active"
                      : ""
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Máquinas
                    {/* Máquinas y piezas */}
                  </span>
                </a>
              </div>
              <ul className="space-y-1 border-t border-gray-100 pt-4">
                {!isAdmin && <li>
                  <a
                    onClick={() => handleSelectItem("providers")}
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-gray-50 hover:text-gray-700 ${selectedItem === "providers" ? "active" : ""
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Proveedores
                    </span>
                  </a>
                </li>}
                <li>
                  <a
                    onClick={() => handleSelectItem("users")}
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-gray-50 hover:text-gray-700 ${selectedItem === "users" ? "active" : ""
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Usuarios
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-green-700 p-2 z-10">
          <form action="#">
            <button
              onClick={handlerClickShop}
              type="submit"
              className="group relative flex w-full justify-center roundedLg px-2 py-1.5 text-sm text-white hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Ir a Máquinaria
              </span>
            </button>
          </form>
        </div>
      </div>
      {/* Sidebar - Fin */}
      {/* Contenido */}
      <div className="dashboard-content relative flex-1 overflow-auto">
        {/* Encabezado del Panel de Administrador */}
        <div className="m-0">
          <h1 className="text-3xl flex justify-center font-semibold text-white bg-gray-700 p-3 z-100">
            Panel de Administrador
          </h1>
          {/* Botones - Se muestran solo si selectedItem no es "providers" ni "users" */}
          <div className="w-full flex items-center justify-center">
            {!isAdmin && <div className="flex justify-center items-center space-x-4 m-4 shadow-xl">
              {selectedItem !== "providers" && selectedItem !== "users" && (
                <Button.Group>
                  <Button
                    color={selectedItem === "machines" ? "blue" : "gray"}
                    onClick={() => handleSelectItem("machines")}
                  >
                    Máquinas
                  </Button>
                  <Button
                    color={selectedItem === "parts" ? "blue" : "gray"}
                    onClick={() => handleSelectItem("parts")}
                  >
                    Piezas
                  </Button>
                </Button.Group>
              )}
            </div>}
            {selectedItem !== "users" && (
              <div className="absolute top-20 right-0 p-4 z-10">
                <button
                  onClick={() => handerClickCreate(selectedItem)}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-3xl shadow-lg hover:shadow-xl z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Añadir {buttonText[selectedItem]}
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Contenido basado en la selección */}
        <div className="content flex flex-wrap justify-center mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
