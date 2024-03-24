import React, { useState } from "react";
import { Button, TextField, Paper, Typography, Box, MenuItem } from "@mui/material";
import usePart from "../../../hooks/usePart";

const PartCreate = () => {
  const { createPart } = usePart();
  const [partData, setPartData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    status: "",
    img: null,
    cad_file: null,
    pdf_file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "img" && name !== "cad_file" && name !== "pdf_file") {
      setPartData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setPartData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
  const statusOptions = [
    "Sin especificar",
    "Presupuesto enviado",
    "Presupuesto recibido",
    "Fabricando",
    "Fabricado",
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Presupuesto enviado":
        return { backgroundColor: "#FFEB3B", color: "#000"}; 
      case "Presupuesto recibido":
        return { backgroundColor: "#FF9800", color: "#000" }; 
      case "Fabricando":
        return { backgroundColor: "#4299E1", color:  "#000" }; 
      case "Fabricado":
        return { backgroundColor: "#48BB78", color: "#000" }; 
      default:
        return {}; 
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.entries(partData).forEach(([key, value]) => {
      // Solo añadir campos de archivo si se ha seleccionado un archivo
      if (value !== null || (key !== "img" && key !== "cad_file" && key !== "pdf_file")) {
        formData.append(key, value);
      }
    });
  
    try {
      await createPart(formData);
      console.log("Pieza creada con éxito.");
    } catch (error) {
      console.error("Error al crear la pieza:", error);
    }
  };
  

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Añadir una Nueva Pieza
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre de la pieza"
          name="name"
          autoComplete="name"
          autoFocus
          value={partData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Descripcion"
          name="description"
          autoComplete="description"
          autoFocus
          value={partData.description}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="quantity"
          label="Cantidad"
          name="quantity"
          autoComplete="quantity"
          autoFocus
          value={partData.quantity}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Precio"
          name="price"
          autoComplete="price"
          autoFocus
          value={partData.price}
          onChange={handleChange}
        />
        <TextField
          select
          margin="normal"
          required
          fullWidth
          id="status"
          label="Estado"
          name="status"
          value={partData.status}
          onChange={handleChange}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option} style={getStatusStyle(option)}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          margin="normal"
          fullWidth
          type="file"
          name="img"
          label="Imagen"
          InputLabelProps={{
            shrink: true, 
          }}
          InputProps={{
            inputProps: {
              accept: "image/*", 
            },
          }}
          onChange={handleFileChange}
        />
        <TextField
          margin="normal"
          fullWidth
          type="file"
          name="cad_file"
          label="Archivo CAD"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              accept: ".cad", 
            },
          }}
          onChange={handleFileChange}
        />
        <TextField
          margin="normal"
          fullWidth
          type="file"
          name="pdf_file"
          label="Archivo PDF"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              accept: "application/pdf",
            },
          }}
          onChange={handleFileChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear Pieza
        </Button>
      </Box>
    </Paper>
  );
};

export default PartCreate;
