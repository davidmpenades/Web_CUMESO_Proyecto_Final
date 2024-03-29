import React, { useState, useEffect } from "react";
import Select from "react-select";
import useUser from "../../../hooks/useUser";
import useMachine from "../../../hooks/useMachine";
import ConfirmationModal from "../Modals/ConfirmationModal";
import UserService from "../../../services/UserService";
import { toast } from "sonner";

const UserTable = () => {
  const { users, deleteUser, fetchUsers } = useUser();
  const { machines } = useMachine();
  const [modalOpen, setModalOpen] = useState(false);
  const [userMachineSelections, setUserMachineSelections] = useState({});
  const [selectedUserUuid, setSelectedUserUuid] = useState(null);
  const machineOptions = machines.map((machine) => ({
    value: machine.id,
    label: machine.name,
  }));

  useEffect(() => {
    const selections = {};
    users.forEach((user) => {
      selections[user.id] = machines
        .filter((machine) => machine.users.includes(user.id))
        .map((machine) => machine.id); 
    });
    setUserMachineSelections(selections);
  }, [users, machines]);
  

  const handleDeleteClick = async () => {
    if (selectedUserUuid) {
      await deleteUser(selectedUserUuid);
      setModalOpen(false);
      fetchUsers();
    }
  };

  const handleMachineChange = async (userId, selectedOptions) => {
    const selectedMachineIds = selectedOptions.map(option => option.value);
    try {
      await UserService.updateMachineUsers(userId, selectedMachineIds);
      // fetch('/thing/stuck/in/cache', {cache: 'reload', credentials: 'include'});
      fetchUsers('/thing/stuck/in/cache', {cache: 'reload', credentials: 'include'});
      toast.success("Usuarios actualizados.");
    } catch (error) {
      console.error("Error al asignar máquinas al usuario:", error);
      toast.error("Error al asignar máquinas al usuario.");
    }
  };
  
  const handleOpenModal = (uuid) => {
    setSelectedUserUuid(uuid);
    setModalOpen(true);
  }

  return (
    <div>
      <div className="text-center text-4xl font-bold text-gray-600 decoration-double">
        <h2 className="[text-shadow:_2px_3px_8px_rgb(0_0_0_/_40%)]">Usuarios</h2>
      </div>
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
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Editar
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
                            <div style={{ position: "relative" }}>
                              <Select
                                isMulti
                                name={`machine-select-${user.id}`}
                                options={machineOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={machineOptions.filter((option) =>
                                  userMachineSelections[user.id]?.includes(option.value)
                                )}
                                onChange={(selectedOptions) =>
                                  handleMachineChange(user.id, selectedOptions)
                                }
                                menuPortalTarget={document.body} // Renderiza el menú fuera del flujo normal del documento
                                styles={{
                                  // Aplica estilos personalizados
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }), // Asegura que el menú esté por encima de otros elementos
                                }}
                              />
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
                          <td>
                            <button
                              onClick={() => handleOpenModal(user.uuid)}
                              className="px-4 py-2 m-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-xl"
                            >
                              Eliminar
                            </button>
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
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteClick}
        title="Confirmar Borrado"
        description={`¿Estás seguro de que quieres eliminar al usuario seleccionado?`}
      />
    </div>
  );
};

export default UserTable;
