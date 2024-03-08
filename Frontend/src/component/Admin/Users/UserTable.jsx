import React from "react";
import useUser from "../../../hooks/useUser";
import useMachine from "../../../hooks/useMachine";

const UserTable = () => {
  const { users } = useUser();
  const { machines } = useMachine();

  return (
    <div>
      <section className="sm:-mx-1 lg:-mx-2">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 sm:-mx-1 lg:-mx-2">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-300 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center justify-center gap-x-3">
                          <span>Nombre de Usuario</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Compañía
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Máquinas
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Última vez Logeado
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Cuenta Creada
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {users.map((user, index) => {
                      // Filtra las máquinas asignadas al usuario actual
                      const userMachines = machines.filter((machine) =>
                        machine.users.includes(user.id)
                      );

                      return (
                        <tr key={index}>
                          <td className="px-4 py-4 text-sm text-gray-500 text-center items-center dark:text-gray-300">
                            {user.username}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 items-center dark:text-gray-300">
                            {user.email}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 items-center dark:text-gray-300">
                            {user.company}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 items-center dark:text-gray-300">
                            <div>
                              <select
                                name={`machine-select-${index}`}
                                id={`machine-select-${index}`}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                                defaultValue="Listado de Máquinas"
                              >
                                <option disabled value="">
                                  Listado de Máquinas
                                </option>
                                {userMachines.map((machine) => (
                                  <option key={machine.id} value={machine.id}>
                                    {machine.name}
                                  </option>
                                ))}
                                {userMachines.length === 0 && (
                                  <option value="">
                                    No hay máquinas asignadas
                                  </option>
                                )}
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 text-center dark:text-gray-300">
                            {new Date(user.last_login).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 text-center dark:text-gray-300">
                            {new Date(user.created_at).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </td>
                        </tr>
                      );
                    })}
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

export default UserTable;
