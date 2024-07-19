import React, { useContext, useEffect, useState } from "react";
import MachineContext from "../../context/MachineContext";
import useMachine from "../../hooks/useMachine";
import { useNavigate } from "react-router-dom";

const Machine = () => {
  const { machines } = useContext(MachineContext);
  const navigate = useNavigate();
  const { getMachineImage } = useMachine();
  const [machineImages, setMachineImages] = useState({});

  useEffect(() => {
    const fetchMachineImages = async () => {
      const visibleMachines = machines.filter((m) => m.visibility);
      const images = {};

      for (const machine of visibleMachines) {
        const imageData = await getMachineImage(machine.slug);
        if (imageData) {
          images[machine.slug] = imageData;
        }
      }

      setMachineImages(images);
    };

    fetchMachineImages();
  }, [machines]);

  return (
    <div className="container mx-auto my-8">
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h1 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-500 xl:text-3xl dark:text-white">
            Nuestro Catálogo{" "}
            <span className="text-black">se puede personalizar</span>
          </h1>

          <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
            Somos especialistas en la fabricación de maquinaria industrial, todas nuestras máquinas son personalizables según las necesidades de nuestros clientes. Pónganse en contacto con nosotros para obtener más información.

          </p>

          <div className="inline-flex w-full mt-6 sm:w-auto">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-gray-500 rounded-lg hover:bg-gray-300 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Pedir información
            </button>
          </div>
        </div>
      </section>
      {machines
        .filter((m) => m.visibility)
        .map((machine) => (
          <div
            key={machine.id}
            className="flex flex-col md:flex-row w-full text-start mx-auto bg-white rounded-lg shadow-2xl dark:bg-gray-800 mb-6"
            style={{ minHeight: '400px' }} 
          >
            {/* Columna de Imagen */}
            <div
              className="w-full md:w-1/2 h-48 md:h-auto bg-cover bg-center rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              style={{ backgroundImage: `url(${machineImages[machine.slug]})` }}
            ></div>

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
                  {machine.characteristics.map((characteristic, index) => (
                    <li key={index} className="flex flex-col align-baseline">
                      <span className="font-medium text-gray-800 dark:text-white mb-2">
                        {characteristic}
                      </span>
                      {index < machine.characteristics.length - 1 && <hr className="border-t border-red-300 dark:border-gray-600 my-2" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Machine;
