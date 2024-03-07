import React from "react";
import usePart from "../../../hooks/usePart";
import { Select, Option } from "@material-tailwind/react";

const ProviderList = ({ provider }) => {
  const { parts } = usePart();

  const providerParts = parts.filter((part) =>
    provider.parts.some((p) => p === part.id)
  );

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
          <Select label="Piezas suministradas" size="lg">
            {providerParts.length > 0 ? (
              providerParts.map((part, index) => (
                <Option key={index} value={part.id}>
                  {part.name} - {part.status ? part.status : "Sin estado"}
                </Option>
              ))
            ) : (
              <Option disabled>No hay partes asociadas</Option>
            )}
          </Select>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
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
      </td>
    </tr>
  );
};

export default ProviderList;
