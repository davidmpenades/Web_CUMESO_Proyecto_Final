import React from "react";

const PartList = ({ part }) => {
    const imageName = part.img.split('/').pop();
    const cad = part.cad_file.split('/').pop();
    const pdf = part.pdf_file.split('/').pop();
  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center gap-x-3">
          <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
          <h2 className="font-normal text-gray-800 dark:text-white ">{part.name}</h2>
        </div>
      </td>
      <td className="px-12 py-4 text-sm text-center font-normal text-gray-700 whitespace-nowrap">{part.description}</td>
      <td className="px-4 py-4 text-sm text-gray-500 text-center dark:text-gray-300">{part.quantity}</td>
      <td className="px-4 py-4 text-sm text-gray-500 text-center dark:text-gray-300">{part.status}</td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {new Date(part.updated_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        {new Date(part.created_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300">{imageName}</td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300">{cad}</td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300">{pdf}</td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default PartList;
