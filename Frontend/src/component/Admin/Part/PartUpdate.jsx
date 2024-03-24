import React, { useEffect, useState } from "react";
import { Button, TextField, Paper, Typography, MenuItem } from "@mui/material";
import usePart from "../../../hooks/usePart";

const PartUpdate = ({ part, onUpdateSuccess }) => {
  const { updatePart, getPartImage } = usePart();
  const [partData, setPartData] = useState({
    name: "",
    description: "",
    quantity: "",
    status: "",
  });
  const [imgPreview, setImgPreview] = useState("");
  const [currentImgName, setCurrentImgName] = useState("");
  const [currentCadName, setCurrentCadName] = useState("");
  const [currentPdfName, setCurrentPdfName] = useState("");

  useEffect(() => {
    setPartData({
      name: part.name || "",
      description: part.description || "",
      quantity: part.quantity || "",
      status: part.status || "",
    });

    if (part && part.slug) {
      getPartImage(part.slug).then((imageUrl) => {
        setImgPreview(imageUrl);
        setCurrentImgName(
          imageUrl?.split("/").pop() || "Ninguna imagen seleccionada"
        );
      });
    }
    setCurrentImgName(
      part.img?.split("/").pop() || "Ninguna imagen seleccionada"
    );
    setCurrentCadName(
      part.cad_file?.split("/").pop() || "Ningún archivo CAD seleccionado"
    );
    setCurrentPdfName(
      part.pdf_file?.split("/").pop() || "Ningún archivo PDF seleccionado"
    );
  }, [part]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setPartData((prev) => ({ ...prev, [name]: files[0] }));
      if (name === "img") {
        const reader = new FileReader();
        reader.onload = (e) => setImgPreview(e.target.result);
        reader.readAsDataURL(files[0]);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "img" && name !== "cad_file" && name !== "pdf_file") {
      setPartData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updatePart(part.slug, partData);
    if (res) {
      onUpdateSuccess();
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
        return { backgroundColor: "#FFEB3B", color: "#000" };
      case "Presupuesto recibido":
        return { backgroundColor: "#FF9800", color: "#000" };
      case "Fabricando":
        return { backgroundColor: "#4299E1", color: "#000" };
      case "Fabricado":
        return { backgroundColor: "#48BB78", color: "#000" };
      default:
        return {};
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Editar pieza
      </Typography>
      {imgPreview && (
        <img
          src={imgPreview}
          alt="Imagen de la pieza"
          style={{ width: "100%", height: "auto", marginBottom: 16 }}
        />
      )}
      <TextField
        label="Nombre"
        name="name"
        value={partData.name}
        onChange={(e) =>
          setPartData({ ...partData, [e.target.name]: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={partData.description}
        onChange={(e) =>
          setPartData({ ...partData, [e.target.name]: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Cantidad"
        name="quantity"
        value={partData.quantity}
        onChange={(e) =>
          setPartData({ ...partData, [e.target.name]: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option} style={getStatusStyle(option)}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="file"
        name="img"
        onChange={handleFileChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <div>Imagen actual: {currentImgName}</div>
      <TextField
        type="file"
        name="cad_file"
        onChange={handleFileChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <div>Archivo CAD actual: {currentCadName}</div>
      <TextField
        type="file"
        name="pdf_file"
        onChange={handleFileChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <div>Archivo PDF actual: {currentPdfName}</div>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Actualizar
      </Button>
    </Paper>
  );
};

export default PartUpdate;
