import React, {useState} from "react";
import usePart from "../../../hooks/usePart";
import useProvider from "../../../hooks/useProvider";
import ConfirmationModal from "../Modals/ConfirmationModal";

const ProviderList = ({ provider }) => {
  const { parts } = usePart();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const { deleteProvider } = useProvider();
  const providerParts = parts.filter((part) =>
    provider.parts.some((p) => p === part.id)
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = () => {    
      deleteProvider(provider.slug);
      setModalOpen(false);
  }

  // Función para obtener el color basado en el estado de la pieza
  const getColorForStatus = (status) => {
    switch (status) {
      case "pendiente":
        return "text-orange-500";
      case "terminada":
        return "text-green-500";
      default:
        return "text-black";
    }
  };

  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center gap-x-3">
          <h2 className="font-normal text-gray-800 dark:text-white">
            {provider.name}
          </h2>
        </div>
      </td>
      <td className="px-12 py-4 text-sm text-center font-normal text-gray-700 whitespace-nowrap">
        {provider.responsible}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 text-center dark:text-gray-300">
        {provider.direction}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 text-center dark:text-gray-300">
        {provider.email}
      </td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300">
        {provider.phone}
      </td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300">
        {provider.city}
      </td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300">
        {provider.CIF}
      </td>
      <td>
        <div className="w-72">
          <select
            id="parts"
            name="parts"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
            defaultValue=""
          >
            <option disabled value="">
              Listado de Piezas
            </option>
            {providerParts.map((part, index) => (
              <option
                key={index}
                value={part.id}
                className={getColorForStatus(part.status)}
              >
                {part.name} - {part.status ? part.status : "Sin determinar"}
              </option>
            ))}
            {providerParts.length === 0 && (
              <option disabled>No hay partes asociadas</option>
            )}
          </select>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
      <button
          onClick={toggleDropdown}
          className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
        {showDropdown && (
          <div className="relative right-1 z-10 mt-2 w-36 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="none">
              {/* Opción Editar */}
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                Editar
              </a>
              {/* Opción Enviar */}
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                Enviar
              </a>
              {/* Opción Borrar */}
              <button
                onClick={() => setModalOpen(true)}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                Borrar
              </button>
              <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteClick}
                title="Confirmar Borrado"
                description={`Estas seguro que quieres eliminar al proveedor ${provider.name}?`}
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProviderList;
