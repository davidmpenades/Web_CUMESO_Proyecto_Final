import React, { useState, useCallback } from "react";
import {
  Button,
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  Stack,
  Avatar
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import useMachine from "../../../hooks/useMachine";
import { toast } from "sonner";
import ImageEditorModal from "./ImageEditorModal";

const MachineCreate = ({ onCreationSuccess }) => {
  const { createMachine } = useMachine();
  const [machineData, setMachineData] = useState({
    name: "",
    description: "",
    characteristics: [""],
    img: null,
  });
  const [imgPreview, setImgPreview] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setMachineData((prev) => ({ ...prev, img: file }));
      setImgPreview(URL.createObjectURL(file));
      setEditedImage(null);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachineData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCharacteristicChange = (index, value) => {
    const newCharacteristics = [...machineData.characteristics];
    newCharacteristics[index] = value;
    setMachineData((prev) => ({
      ...prev,
      characteristics: newCharacteristics,
    }));
  };

  const addCharacteristic = () => {
    setMachineData((prev) => ({
      ...prev,
      characteristics: [...prev.characteristics, ""],
    }));
  };

  const removeCharacteristic = (index) => {
    const newCharacteristics = [...machineData.characteristics];
    newCharacteristics.splice(index, 1);
    setMachineData((prev) => ({
      ...prev,
      characteristics: newCharacteristics,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!machineData.img && !editedImage) {
      toast.error("Selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("name", machineData.name);
    formData.append("description", machineData.description);
    formData.append("characteristics", JSON.stringify(machineData.characteristics));

    if (editedImage) {
      const editedBlob = await fetch(editedImage).then((res) => res.blob());
      formData.append("img", editedBlob);
    } else {
      formData.append("img", machineData.img);
    }

    const success = await createMachine(formData);
    if (success && onCreationSuccess) {
      onCreationSuccess();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom component="div">
        Añadir Nueva Máquina
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre de la Máquina"
          name="name"
          autoComplete="name"
          autoFocus
          value={machineData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Descripción"
          id="description"
          multiline
          rows={4}
          value={machineData.description}
          onChange={handleChange}
        />

        {machineData.characteristics.map((char, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            alignItems="center"
            marginY={1}
          >
            <TextField
              fullWidth
              label={`Característica #${index + 1}`}
              value={char}
              onChange={(e) => handleCharacteristicChange(index, e.target.value)}
            />
            <IconButton aria-label="delete" onClick={() => removeCharacteristic(index)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={addCharacteristic}
          sx={{ my: 2 }}
        >
          Añadir Característica
        </Button>

        <div className="max-w-lg mx-auto shadow-xl bg-white rounded-lg">
          <div
            {...getRootProps()}
            className="border-2 border-gray-300 border-dashed p-8 rounded-lg"
          >
            <input {...getInputProps()} />
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2 text-gray-500" />
              <p className="text-center text-gray-500">
                Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
              </p>
            </div>
          </div>

          {machineData.img && (
            <div className="mt-4">
              <Button onClick={() => setIsEditorOpen(true)} variant="outlined">
                Editar Imagen
              </Button>
              <ImageEditorModal
                open={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onSave={(img) => {
                  setEditedImage(img);
                  setImgPreview(img);
                  setIsEditorOpen(false);
                }}
                image={imgPreview}
              />
            </div>
          )}

          {imgPreview && (
            <div className="m-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Vista Previa:</h3>
              <Avatar src={imgPreview} variant="rounded" sx={{ width: 480, height: 270 }} />
            </div>
          )}
        </div>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Crear Máquina
        </Button>
      </Box>
    </Paper>
  );
};

export default MachineCreate;
