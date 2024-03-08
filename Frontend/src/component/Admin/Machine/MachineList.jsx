import React, { useEffect, useState } from "react";
import "./MachineList.css";
// import useDataImage from "../../../hooks/useDataImage";

const MachinesList = ({ machine }) => {
  // const { fetchImage } = useDataImage();
  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   fetchImage(machine.img) 
  //     .then((data) => {
  //       console.log(data);
  //       setImageUrl(data); 
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [fetchImage, machine.img]);

  return (
    <div className="flex w-2/4 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 m-4">
      <div
        className="w-2/3 bg-cover"
        // style={{
        //   backgroundImage:
        //     // `url(${imageUrl})`,
        // }}
      ></div>

      <div className="w-2/3 p-4 md:p-4">
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
          <button className="px-2 py-1 m-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-red-400 rounded dark:bg-red-700 hover:bg-red-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
            Borrar
          </button>
          <button className="px-2 py-1 m-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-green-400 rounded dark:bg-green-700 hover:bg-green-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
            Visibilidad
          </button>
        </div>
      </div>
    </div>
  );
};

export default MachinesList;
