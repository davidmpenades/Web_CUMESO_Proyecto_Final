import React, { useState } from "react";
import usePart from "../../../hooks/usePart";
import PartList from "./PartList";
import { TextField } from "@mui/material";

const PartTable = ({ showPartUpdateForm }) => {
  const { parts } = usePart();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleSearchChange = (e) => {
    if (e.target.name === "searchTerm") {
      setSearchTerm(e.target.value);
    } else if (e.target.name === "searchStatus") {
      setSearchStatus(e.target.value);
    }
  };
  //search
  const filteredParts = parts.filter((part) => {
    return (
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      part.status.toLowerCase().includes(searchStatus.toLowerCase())
    );
  });
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const partPerPage = 7;
  const totalPages = Math.ceil(filteredParts.length / partPerPage);

  const currentPart = filteredParts.slice(
    (currentPage - 1) * partPerPage,
    currentPage * partPerPage
  );

  return (
    <div className="">
      <div className="flex justify-end">
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          name="searchTerm"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            margin: 2,
            borderRadius: 1,
            boxShadow: 5,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "green",
              },
              "&:hover fieldset": {
                borderColor: "green",
              },
              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            },
            "& .MuiInputLabel-root": {
              color: "grey",
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
        <TextField
          label="Buscar por estado"
          variant="outlined"
          name="searchStatus"
          value={searchStatus}
          onChange={handleSearchChange}
          sx={{
            margin: 2,
            borderRadius: 1,
            boxShadow: 5,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "green",
              },
              "&:hover fieldset": {
                borderColor: "green",
              },
              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            },
            "& .MuiInputLabel-root": {
              color: "grey",
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
      </div>      
        <section className="sm:-mx-1 lg:-mx-2">
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 sm:-mx-1 lg:-mx-2">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg shadow-2xl">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-300 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="w-64 py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-black dark:text-gray-7700"
                        >
                          <div className="flex items-center justify-center gap-x-3">
                            <span>Nombre de Pieza</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="w-64 px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          Descripción
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-1/12 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          Cantidad
                        </th>
                        <th
                          scope="col"
                          className="w-32 ppx-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          Estado
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-32 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          Máquina
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-32 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          Proveedor
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-32 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          Fecha Actualización
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-32 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          Creada
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-1/12 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          imagen
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-1/12 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          CAD
                        </th>
                        <th
                          scope="col"
                          className="hidden sm:table-cell w-1/12 px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-black dark:text-gray-400"
                        >
                          PDF
                        </th>
                        <th scope="col" className="w-1/12 prelative py-3.5 px-4">
                          Editar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {currentPart.map((part) => (
                        <PartList
                          key={part.id}
                          part={part}
                          onShowUpdateForm={showPartUpdateForm}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {totalPages > 1 && (
          <div className="flex justify-center m-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 shadow-lg"
            >
              anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md transition-colors duration-300 transform ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                }`}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 shadow-lg"
            >
              siguiente
            </button>
          </div>
        )}
      </div>
  );
};

export default PartTable;
