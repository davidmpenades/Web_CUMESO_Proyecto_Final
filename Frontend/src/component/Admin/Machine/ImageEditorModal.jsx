import React, { useState, useCallback } from "react";
import { Modal, Box, Button, Slider, Typography } from "@mui/material";
import AvatarEditor from "react-avatar-editor";

const ImageEditorModal = ({ open, onClose, onSave, image }) => {
  const [editor, setEditor] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleZoomChange = useCallback((event, newValue) => {
    setZoom(newValue);
  }, []);

  const handleSave = useCallback(() => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const editedImg = URL.createObjectURL(blob);
        onSave(editedImg);
        onClose();
      }, "image/png");
    }
  }, [editor, onSave, onClose]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Editar Imagen
        </Typography>
        <AvatarEditor
          ref={setEditor}
          image={image}
          width={320} 
          height={180} 
          border={10}
          borderRadius={0}
          color={[255, 255, 255, 0.6]}
          scale={zoom}
          rotate={0}
        />
        <Slider
          value={zoom}
          min={1}
          max={2}
          step={0.01}
          onChange={handleZoomChange}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained">
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageEditorModal;
