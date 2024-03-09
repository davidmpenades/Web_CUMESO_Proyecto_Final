import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/Logo.webp";
import "./Dashboard.css";
import MachinsList from "../../component/Admin/Machine/MachineList";
import useMachine  from "../../hooks/useMachine";
import PartTable from "../../component/Admin/Part/PartTable";
import ProvidersTable from "../../component/Admin/Providers/ProviderTable";
import UserTable from "../../component/Admin/Users/UserTable";


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const {machines} = useMachine();

  const [selectedItem, setSelectedItem] = useState("machines");
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handlerClickShop = () => {
    setUser({});
    navigate("/machine");
  };

  const renderContent = () => {
    switch (selectedItem) {
      
      case "machines":
        if (!machines) {
          // Muestra algún indicador de carga o mensaje mientras los datos se cargan
          return <div>Cargando máquinas...</div>;
        }
        const sortedMachines = machines.sort((a, b) => b.visibility - a.visibility);

        return sortedMachines.map((machine) => <MachinsList key={machine.id} machine={machine} />);
      case "parts":        
        return  <PartTable />;
      case "providers":
        return <ProvidersTable />;
      case "users":
        
        return <UserTable />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-1">
      {/* Sidebar - Inicio */}
      <div className="flex flex-col w-16 justify-between bg-gray-700">
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
                  className={`group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-gray-50 hover:text-gray-700 ${selectedItem === 'machines' || selectedItem === 'parts' ? 'active' : ''}`}
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
                    Máquinas y piezas
                  </span>
                </a>
              </div>
              <ul className="space-y-1 border-t border-gray-100 pt-4">
                <li>
                  <a
                    onClick={() => handleSelectItem("providers")}
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-gray-50 hover:text-gray-700 ${selectedItem === 'providers' ? 'active' : ''}`}
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
                </li>
                <li>
                  <a
                    onClick={() => handleSelectItem("users")}
                    className={`group relative flex justify-center rounded px-2 py-1.5 text-white hover:bg-gray-50 hover:text-gray-700 ${selectedItem === 'users' ? 'active' : ''}`}
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
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-green-700 p-2">
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
      <div className="flex-1 overflow-y-auto">
        {/* Encabezado del Panel de Administrador */}
        <div className="m-0">
          <h1 className="text-3xl flex justify-center font-semibold text-white bg-gray-700 p-3">Panel de Administrador</h1>
          {/* Botones - Se muestran solo si selectedItem no es "providers" ni "users" */}
          {selectedItem !== "providers" && selectedItem !== "users" && (
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => handleSelectItem("machines")}
                className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded-3xl mr-2">
                Máquinas
              </button>
              <button 
                onClick={() => handleSelectItem("parts")}
                className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-3xl">
                Piezas
              </button>
            </div>
          )}
        </div>
        {/* Contenido basado en la selección */}
        <div className="content flex flex-wrap justify-center mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;