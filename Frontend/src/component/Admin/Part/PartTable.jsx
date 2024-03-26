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

  const filteredParts = parts.filter((part) => {
    return (
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      part.status.toLowerCase().includes(searchStatus.toLowerCase())
    );
  });

  return (
    <div>
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
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'green',
            },
            '&:hover fieldset': {
              borderColor: 'green', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green', 
            },
          },
          '& .MuiInputLabel-root': { 
            color: 'grey', 
          },
          '& .MuiInputBase-input': { 
            color: 'black', 
          }
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
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'green',
            },
            '&:hover fieldset': {
              borderColor: 'green', 
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green', 
            },
          },
          '& .MuiInputLabel-root': { 
            color: 'grey', 
          },
          '& .MuiInputBase-input': { 
            color: 'black', 
          }
        }}
      />
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
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-7700"
                      >
                        <div className="flex items-center justify-center gap-x-3">
                          <span>Nombre de Pieza</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Máquina
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Proveedor
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Fecha Actualización
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Creada
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        imagen
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        CAD
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        PDF
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        Editar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {filteredParts.map((part) => (
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
    </div>
  );
};

export default PartTable;
