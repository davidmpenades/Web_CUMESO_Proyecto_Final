import React, { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  Stack,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useMachine from "../../../hooks/useMachine";

const MachineCreate = (props) => {
  const { createMachine } = useMachine();
  const [machineData, setMachineData] = useState({
    name: "",
    description: "",
    characteristics: [""],
    img: null,
  });

  const [imgPreview, setImgPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setMachineData((prev) => ({ ...prev, [name]: files[0] }));
      setImgPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setMachineData((prev) => ({ ...prev, [name]: value }));
    }
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

    const formData = new FormData();
    formData.append("name", machineData.name);
    formData.append("description", machineData.description);
    formData.append("characteristics", JSON.stringify(machineData.characteristics));
    if (machineData.img) {
      formData.append("img", machineData.img);
    }
    const success = await createMachine(formData);
    if (success && props.onCreationSuccess) {
      props.onCreationSuccess(); 
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
              onChange={(e) =>
                handleCharacteristicChange(index, e.target.value)
              }
            />
            <IconButton
              aria-label="delete"
              onClick={() => removeCharacteristic(index)}
            >
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

        {imgPreview && (
          <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
            <Avatar
              src={imgPreview}
              variant="rounded"
              sx={{ width: 100, height: 100 }}
            />
          </Box>
        )}
        <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
          Subir imagen
          <input type="file" name="img" hidden onChange={handleChange} />
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear Máquina
        </Button>
      </Box>
    </Paper>
  );
};

export default MachineCreate;
