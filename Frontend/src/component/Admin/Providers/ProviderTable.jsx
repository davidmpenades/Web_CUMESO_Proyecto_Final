import React, { useState } from "react";
import useProvider from "../../../hooks/useProvider";
import ProviderList from "./ProviderList";
import { TextField } from "@mui/material";

const ProviderTable = ({ showProviderUpdateForm }) => {
  const { providers } = useProvider();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProviders = providers.filter((provider) => {
    const providerValues = Object.values(provider).map((value) =>
      String(value).toLowerCase()
    );

    return providerValues.some((value) =>
      value.includes(searchTerm.toLowerCase())
    );
  });
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const providersPerPage = 3;
  const totalPages = Math.ceil(filteredProviders.length / providersPerPage);

  const currentProviders = filteredProviders.slice(
    (currentPage - 1) * providersPerPage,
    currentPage * providersPerPage
  );


  return (
    <div>
      <TextField
        label="Buscar proveedor"
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
      <section className="sm:-mx-1 lg:-mx-2">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 sm:-mx-1 lg:-mx-2">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg shadow-xl">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-300 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-7700"
                      >
                        <div className="flex items-center justify-center gap-x-3">
                          <span>Nombre de Proveedor</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Encargado
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Dirección
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Teléfono
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Ciudad
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        CIF
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Piezas suministradas
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        Editar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {currentProviders.map((provider) => (
                      <ProviderList
                        key={provider.id}
                        provider={provider}
                        onShowUpdateForm={showProviderUpdateForm}
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
        <div className="flex justify-center mt-4">
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
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200'
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

export default ProviderTable;
