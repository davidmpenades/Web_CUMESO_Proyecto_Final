import React, { useContext, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import MachineContext from "../../context/MachineContext";
import PictureUploadModal from "../../component/Client/Modals/PictureUploadModal";

const Profile = () => {
  const { profile, setProfile, getProfile } = useContext(ProfileContext);
  const { machines } = useContext(MachineContext);
  const baseURL = "http://localhost:8001";
  const defaultProfileSVG = (
    <svg
      className="w-48 h-48 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 10a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleUploadComplete = (responseData) => {
    getProfile();
    setModalOpen(false);
  };

  return (
    <div className="p-4 md:p-16">
      <div className="bg-gray-100 shadow mt-8 md:mt-12 rounded-lg overflow-hidden">
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <div className="md:col-span-1">
            <div className="relative flex flex-col items-center md:items-start p-4">
              {profile.image ? (
                <img
                  src={`${baseURL}${profile.image}?${new Date().getTime()}`}
                  alt="Profile"
                  className="w-48 h-48 object-contain mx-auto rounded-full shadow-2xl"
                />
              ) : (
                <div className="w-48 h-48 mx-auto">{defaultProfileSVG}</div>
              )}
            </div>

            <div className="profile">
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
              >
                Cambiar foto de perfil
              </button>
              <PictureUploadModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onUploadComplete={handleUploadComplete}
              />
            </div>
          </div>
          <div className="md:col-span-2 p-4">
            <div className="mt-20 text-center border-b pb-12">
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <li className="bg-gray-200 p-4 rounded-md">
                  <strong>Usuario:</strong>{" "}
                  <span className="text-gray-800">{profile.username}</span>
                </li>
                <li className="bg-gray-200 p-4 rounded-md">
                  <strong>Empresa:</strong>{" "}
                  <span className="text-gray-800">{profile.company}</span>
                </li>
                <li className="bg-gray-200 p-4 rounded-md">
                  <strong>Email:</strong>{" "}
                  <span className="text-gray-800">{profile.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-xl mb-4">Descarga el manual de instrucciones</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {machines
            .filter(
              (machine) =>
                machine.users.includes(profile.id) && machine.pdf_machine
            )
            .map((machine) => (
              <div
                key={machine.id}
                className="max-w-sm rounded overflow-hidden shadow-lg p-4"
              >
                <img
                  className="w-full object-contain h-48 mx-auto"
                  src={`${baseURL}${machine.img}`}
                  alt={`Imagen de ${machine.name}`}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{machine.name}</div>
                  <a
                    target="_blank"
                    href={`${baseURL}${machine.pdf_machine}`}
                    download={`${machine.name.replace(/\s+/g, "_")}.pdf`}
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    Descargar PDF
                  </a>
                </div>
              </div>
            ))}
          {machines.every((machine) => !machine.users.includes(profile.id)) && (
            <div className="text-center text-2xl">
              <p className="text-red-500">
                No tienes asignada ninguna máquina. Por favor, ponte en
                contacto con el administrador para obtener los manuales de
                instrucciones que deseas descargar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
