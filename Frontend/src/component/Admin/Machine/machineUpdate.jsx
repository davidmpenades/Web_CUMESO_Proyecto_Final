import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  IconButton,
  Paper,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useMachine from "../../../hooks/useMachine";
import usePart from "../../../hooks/usePart";

const MachineUpdate = ({ onUpdateSuccess, machine }) => {
  const { updateMachine, getMachineImage } = useMachine();
  const { parts } = usePart();
  const [machineData, setMachineData] = useState({
    name: machine.name || "",
    description: machine.description || "",
    characteristics: machine.characteristics || [""],
    img: null,
    associatedParts: machine.parts || [],
    pdf: null,
  });
  const [imgPreview, setImgPreview] = useState(machine.img || "");
  const [pdfPreview, setPdfPreview] = useState(machine.pdf_machine || "");

  useEffect(() => {
    if (!machineData.img) {
      getMachineImage(machine.slug)
        .then((data) => {
          setImgPreview(data);
        })
        .catch((error) => {
          console.error("Error al obtener la imagen de la máquina:", error);
        });
    }
  }, [machine.slug, machineData.img, getMachineImage]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setMachineData((prev) => ({ ...prev, img: files[0] }));
      setImgPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else if (name === "pdf") {
      setMachineData((prev) => ({ ...prev, pdf: files[0] }));
      setPdfPreview(files[0] ? files[0].name : "");
    } else {
      setMachineData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", machineData.name);
    formData.append("description", machineData.description);
  
    machineData.characteristics.forEach((characteristic) => {
      formData.append("characteristics", characteristic);
    });
  
    if (machineData.associatedParts.length > 0) {
      machineData.associatedParts.forEach((partId) => {
        formData.append("parts", String(partId));
      });
    } 
  
    if (machineData.img) {
      formData.append("img", machineData.img);
    }
  
    if (machineData.pdf) {
      formData.append("pdf", machineData.pdf);
    }
  
    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      await updateMachine(machine.slug, formData);
      onUpdateSuccess();
    } catch (error) {
      console.error("Error al actualizar la máquina:", error);
    }
  };
  

  const addCharacteristic = () => {
    setMachineData((prevData) => ({
      ...prevData,
      characteristics: [...prevData.characteristics, ""],
    }));
  };

  const handleCharacteristicChange = (index, value) => {
    const updatedCharacteristics = [...machineData.characteristics];
    updatedCharacteristics[index] = value;
    setMachineData((prevData) => ({
      ...prevData,
      characteristics: updatedCharacteristics,
    }));
  };

  const removeCharacteristic = (index) => {
    const filteredCharacteristics = machineData.characteristics.filter(
      (_, i) => i !== index
    );
    setMachineData((prevData) => ({
      ...prevData,
      characteristics: filteredCharacteristics,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setMachineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRemoveAssociatedPart = (partId) => {
    setMachineData((prevData) => ({
      ...prevData,
      associatedParts: prevData.associatedParts.filter((id) => id !== partId),
    }));
  };
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom component="div">
        Actualizar Máquina
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

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Partes Asociadas</InputLabel>
          <Select
            multiple
            name="associatedParts"
            value={machineData.associatedParts}
            onChange={handleSelectChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((id) => (
                  <Chip
                    key={id}
                    label={parts.find((part) => part.id === id)?.name || id}
                    onDelete={() => handleRemoveAssociatedPart(id)}
                  />
                ))}
              </Box>
            )}
          >
            {parts.map((part) => (
              <MenuItem key={part.id} value={part.id}>
                {part.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
        {pdfPreview && (
          <Typography variant="body1" gutterBottom>
            PDF Actual: {pdfPreview}
          </Typography>
        )}
        <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
          Subir PDF
          <input
            type="file"
            name="pdf"
            hidden
            onChange={handleChange}
            accept="application/pdf"
          />
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Actualizar Máquina
        </Button>
      </Box>
    </Paper>
  );
};

export default MachineUpdate;
