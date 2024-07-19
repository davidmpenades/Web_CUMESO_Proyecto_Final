import React, { useEffect, useState } from "react";
import useMachine from "../../../hooks/useMachine";
import "./MachineList.css";
import ConfirmationModal from "../Modals/ConfirmationModal";

const MachinesList = ({ machine, onShowUpdateForm }) => {
  const [machineImageUrl, setMachineImageUrl] = useState("");
  const { getMachineImage, updateMachineVisibility, deleteMachine } =
    useMachine();
  const [modalOpen, setModalOpen] = useState(false);
  const pdf = machine.pdf_machine
    ? machine.pdf_machine.split("/").pop()
    : "aun no hay pdf";

  useEffect(() => {
    if (machine && machine.slug) {
      getMachineImage(machine.slug).then((data) => {
        setMachineImageUrl(data);
      });
    }
  }, [machine, machine?.slug, getMachineImage]);
  const handleVisibilityClick = () => {
    const newVisibility = { visibility: !machine.visibility };
    updateMachineVisibility(machine.slug, newVisibility);
  };

  const handleDeleteClick = () => {
    deleteMachine(machine.slug);
    setModalOpen(false);
  };

  const handleUpdateClick = () => {
    onShowUpdateForm(machine);
  };

  return (
    // <div className="flex flex-col md:flex-row w-3/4 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800 mt-20 py-6 px-4">
    //   {/* Columna de Imagen */}
    //   {machineImageUrl && (
    //     <div
    //       className="m-6 w-full bg-cover bg-center md:w-1/2 h-48 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-t-none"
    //       style={{
    //         backgroundImage: `url(${machineImageUrl})`,
    //         backgroundSize: "contain",
    //         backgroundRepeat: "no-repeat",
    //       }}
    //     />
    //   )}

    //   {/* Columna de Información */}
    //   <div className="w-full md:w-1/2 p-6 flex flex-col justify-between relative">
    //     {/* Indicador de visibilidad */}
    //     <div
    //       className="absolute top-0 right-0 m-2 h-4 w-4 rounded-full z-10"
    //       style={{ backgroundColor: machine.visibility ? "green" : "red" }}
    //     ></div>
    //     <div>
    //       <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
    //         {machine.name}
    //       </h2>
    //       <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
    //         {machine.description}
    //       </p>

    //       <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
    //         Características:
    //       </h3>
    //       <ul className="text-gray-600 dark:text-gray-400 space-y-4">
    //         {machine.characteristics &&
    //           machine.characteristics.map((characteristic, index) => (
    //             <li key={index} className="flex flex-col align-baseline">
    //               <span className="font-medium text-gray-800 dark:text-white mb-2">
    //                 {characteristic}
    //               </span>
    //               {index < machine.characteristics.length - 1 && (
    //                 <hr className="border-t border-gray-300 dark:border-gray-600 my-2" />
    //               )}
    //             </li>
    //           ))}
    //       </ul>
    //     </div>

    //     {/* PDF */}
    //     <h3 className="mt-4 mb-2 text-lg text-gray-600 dark:text-gray-300">
    //       Pdf: {pdf}
    //     </h3>

    //     {/* Botones de acción */}
    //     <div className="flex justify-end mt-3 z-40 flex-wrap">
    //       <button
    //         onClick={handleUpdateClick}
    //         className="px-4 py-2 m-1 text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:bg-blue-700 dark:focus:bg-blue-600"
    //       >
    //         Modificar
    //       </button>
    //       <button
    //         onClick={() => setModalOpen(true)}
    //         className="px-4 py-2 m-1 text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-red-600 rounded dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:bg-red-700 dark:focus:bg-red-600"
    //       >
    //         Borrar
    //       </button>
    //       <button
    //         onClick={handleVisibilityClick}
    //         className="px-4 py-2 m-1 text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-green-600 rounded dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:bg-green-700 dark:focus:bg-green-600"
    //       >
    //         Visibilidad
    //       </button>
    //     </div>

    //     {/* Modal de confirmación */}
    //     <ConfirmationModal
    //       isOpen={modalOpen}
    //       onClose={() => setModalOpen(false)}
    //       onConfirm={handleDeleteClick}
    //       title="Confirmar Borrado"
    //       description={`¿Estás seguro que quieres eliminar la máquina ${machine.name}?`}
    //     />
    //   </div>
    // </div>
    <div className="relative w-3/4 mx-auto mt-20">
      {/* Indicador de visibilidad */}
      <div
        className="absolute top-0 right-0 m-2 h-4 w-4 rounded-full z-10"
        style={{ backgroundColor: machine.visibility ? "green" : "red" }}
      ></div>

      <div className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800 py-6 px-4">
        {/* Columna de Imagen */}
        {machineImageUrl && (
          <div
            className="w-full md:w-1/2 h-48 md:h-auto bg-cover bg-center rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            style={{
              backgroundImage: `url(${machineImageUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}

        {/* Columna de Información */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {machine.name}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {machine.description}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Características:
            </h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-4">
              {machine.characteristics &&
                machine.characteristics.map((characteristic, index) => (
                  <li key={index} className="flex flex-col align-baseline">
                    <span className="font-medium text-gray-800 dark:text-white mb-2">
                      {characteristic}
                    </span>
                    {index < machine.characteristics.length - 1 && (
                      <hr className="border-t border-red-300 dark:border-gray-600 my-2" />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end mt-3 z-40 flex-wrap">
        {/* PDF */}
        <h3 className="mt-4 mb-2 px-4 text-lg text-white dark:text-gray-300 bg-gray-400 rounded-xl">
          Pdf: {pdf}
        </h3>
        <button
          onClick={handleUpdateClick}
          className="px-4 py-2 m-1 text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:bg-blue-700 dark:focus:bg-blue-600 shadow-2xl"
        >
          Modificar
        </button>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 m-1 text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-red-600 rounded dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:bg-red-700 dark:focus:bg-red-600 shadow-2xl"
        >
          Borrar
        </button>
        <button
          onClick={handleVisibilityClick}
          className="px-4 py-2 m-1 text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-green-600 rounded dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:bg-green-700 dark:focus:bg-green-600 shadow-2xl"
        >
          Visibilidad
        </button>
      </div>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteClick}
        title="Confirmar Borrado"
        description={`¿Estás seguro que quieres eliminar la máquina ${machine.name}?`}
      />
    </div>
  );
};

export default MachinesList;
