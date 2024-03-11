import React, { useContext, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import MachineContext from "../../context/MachineContext";
import PictureUploadModal from "../../component/Client/Modals/PictureUploadModal";

const Profile = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { machines } = useContext(MachineContext);
  console.log(machines);
  const baseURL = "http://localhost:8001";
  const defaultProfileSVG = (
    <svg
      className="w-48 h-48 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24"
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
    console.log("Carga completada", responseData);
    const updatedImagePath = responseData.image;
    setProfile((prevProfile) => ({
      ...prevProfile,
      image: updatedImagePath,
    }));
    setModalOpen(false);
  };

  return (
    <div className="p-4 md:p-16">
      <div className="bg-gray-100 shadow mt-8 md:mt-12 rounded-lg overflow-hidden">
        <div className="md:grid md:grid-cols-3 md:gap-4">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start p-4">
              {profile.image ? (
                <img
                  src={`${baseURL}${profile.image}?${new Date().getTime()}`}
                  alt="Profile"
                  className="w-48 h-48 object-contain mx-auto rounded-full shadow-2xl" 
                />
              ) : (
                defaultProfileSVG
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
        <h1 className="text-xl mb-4">Descarga de PDF's de nuestras máquinas</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {machines
            .filter((machine) => machine.pdf_machine)
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
                    href={`${baseURL}${machine.pdf_machine}`} // Asegúrate de que esta es la URL correcta del PDF
                    download={`${machine.name.replace(/\s+/g, "_")}.pdf`} // Usa el nombre de la máquina, reemplazando espacios con guiones bajos, y añade la extensión .pdf
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    Descargar PDF
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
