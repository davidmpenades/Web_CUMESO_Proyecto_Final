import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import ProfileService from "../../../services/ProfileService"; // Asumiendo que tienes este archivo en este path

// Registra los plugins de FilePond
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PictureUploadModal = ({ isOpen, onClose, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const handleFileUpload = () => {
    // Asegúrate de que haya un archivo seleccionado
    if (files.length > 0) {
      // Procesa el archivo como antes
      handleProcessFile(files[0]);
    } else {
      alert("Por favor, selecciona un archivo para cargar.");
    }
  };

  const handleProcessFile = (fileItem) => {
    const formData = new FormData();
    formData.append('image', fileItem.file); 

    // Llama al servicio de actualización de imagen
    ProfileService.updateImage(formData)
      .then(response => {
        onUploadComplete(response.data);
      })
      .catch(error => {
        console.error('Error al actualizar la imagen', error);
      });
  };

  return (
    <div className="modal rounded shadow-2xl p-6" style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-content">
        <button className="close-button bg-red-300 hover:bg-red-500 rounded p-2 m-3" onClick={onClose}>
          cerrar
        </button>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={false}
          maxFiles={1}
          name="image"
          labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action">Busca</span>'
        />
        <button
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
          onClick={handleFileUpload}
        >
          Subir Foto
        </button>
      </div>
    </div>
  );
};

export default PictureUploadModal;
