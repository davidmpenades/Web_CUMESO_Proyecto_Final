import React, {useState,useEffect} from "react";
import {
    Button,
    TextField,
    Paper,
    Typography,

  } from "@mui/material";
import useProvider from "../../../hooks/useProvider";

const ProviderUpdate = ({ onUpdateSuccess, provider }) => {
    const { updateProvider } = useProvider();
    const [providerData, setProviderData] = useState({
        name: "",
        direction: "",
        CIF: "",
        email: "",
        city: "",
        phone: "",
        responsible: "",
    });

    useEffect(() => {
        setProviderData({
            name: provider.name || "",
            direction: provider.direction || "",
            CIF: provider.CIF || "",
            email: provider.email || "",
            city: provider.city || "",
            phone: provider.phone || "",
            responsible: provider.responsible || "",
        });
    }, [provider]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProviderData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateProvider(provider.slug, providerData);
        if (res) {
            onUpdateSuccess(); 
        }
    };
    
    return (
        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Editar proveedor
            </Typography>
            <TextField
                label="Nombre"
                name="name"
                value={providerData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Dirección"
                name="direction"
                value={providerData.direction}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="CIF de la empresa"
                name="CIF"
                value={providerData.CIF}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                name="email"
                value={providerData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Ciudas"
                name="city"
                value={providerData.city}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Teléfono"
                name="phone"
                value={providerData.phone}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Responsable"
                name="responsible"
                value={providerData.responsible}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained">
                Guardar
            </Button>
        </Paper>
    );
}

export default ProviderUpdate;