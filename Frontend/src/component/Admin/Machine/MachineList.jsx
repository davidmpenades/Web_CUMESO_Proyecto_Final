import React, { useEffect, useState } from "react";
import useMachine from "../../../hooks/useMachine";
import "./MachineList.css";
import ConfirmationModal from "../Modals/ConfirmationModal";

const MachinesList = ({ machine }) => {
  const [machineImageUrl, setMachineImageUrl] = useState("");
  const { getMachineImage, updateMachineVisibility, deleteMachine } =
    useMachine();
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="flex flex-col md:flex-row w-3/4 mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800 m-4">
      {machineImageUrl && (
        <div
          className="m-6 w-full bg-cover bg-center md:w-1/2 h-48 md:h-auto"
          style={{
            backgroundImage: `url(${machineImageUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      <div className="w-full md:w-1/2 p-4 md:p-4 relative">
        <div
          className="absolute top-0 right-0 m-2 h-4 w-4 rounded-full"
          style={{ backgroundColor: machine.visibility ? "green" : "red" }}
        ></div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {machine.name}
        </h1>
        <h3 className="mt-1">Características:</h3>
        <div className="list-machine m-3 text-sm text-gray-600 dark:text-gray-400">
          <ul>
            {machine.characteristics &&
              machine.characteristics.map((characteristic, index) => (
                <li key={index}>{characteristic}</li>
              ))}
          </ul>
        </div>
        <div className="flex justify-end mt-3">
          <button className="px-2 py-1 m-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
            Modificar
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="px-2 py-1 m-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-red-400 rounded dark:bg-red-700 hover:bg-red-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
          >
            Borrar
          </button>
          <button
            onClick={handleVisibilityClick}
            className="px-2 py-1 m-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-green-400 rounded dark:bg-green-700 hover:bg-green-700 focus:bg-green-700 active:bg-green-700"
          >
            Visibilidad
          </button>
          <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleDeleteClick}
            title="Confirmar Borrado"
            description={`Estas seguro que quieres eliminar la máquina ${machine.name}?`}
          />
        </div>
      </div>
    </div>
  );
};

export default MachinesList;
