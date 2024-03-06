import React from "react";
import usePart from "../../../hooks/usePart";
import PartList from "./PartList";

const PartTable = () => {
  const { parts } = usePart();
  return (
    <div>
      <section className="sm:-mx-1 lg:-mx-2">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 sm:-mx-1 lg:-mx-2">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <div className="flex items-center justify-center gap-x-3">
                          <span>Nombre de Pieza</span>
                        </div>
                      </th>
                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        Descripción
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        Cantidad
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        Estado
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        Fecha Actualización
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        Creada
                      </th>
                      <th scope="col" className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        imagen
                      </th>
                      <th scope="col" className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        CAD
                      </th>
                      <th scope="col" className="hidden sm:table-cell px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                        PDF
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {parts.map((part) => (
                      <PartList key={part.id} part={part} />
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
