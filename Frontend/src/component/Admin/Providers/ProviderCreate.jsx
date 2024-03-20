import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import useProvider from "../../../hooks/useProvider";

const MachineCreate = () => {
  const { createProvider } = useProvider();
  const [providerData, setProviderData] = useState({
    name: "",
    direction: "",
    CIF: "",
    email: "",
    city: "",
    phone: "",
    responsible: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProviderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProvider(providerData);
  
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom component="div">
        Añadir un Nuevo Proveedor
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre del proveedor"
          name="name"
          autoComplete="name"
          autoFocus
          value={providerData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="direction"
          label="Dirección"
          id="direction"
          multiline
          rows={4}
          value={providerData.direction}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="CIF"
          label="CIF"
          id="CIF"
          multiline
          rows={4}
          value={providerData.CIF}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Correo Electrónico"
          id="email"
          multiline
          rows={4}
          value={providerData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="city"
          label="Ciudad"
          id="city"
          multiline
          rows={4}
          value={providerData.city}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Telefono"
          id="phone"
          multiline
          rows={4}
          value={providerData.phone}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="responsible"
          label="Responsable"
          id="responsible"
          multiline
          rows={4}
          value={providerData.responsible}
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crear Proveedor
        </Button>
      </Box>
    </Paper>
  );
};

export default MachineCreate;
