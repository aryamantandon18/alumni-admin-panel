import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddAlbum = () => {
  const navigate = useNavigate();
  const [album, setAlbum] = useState({
    albumName: "",
    albumDescription: "",
    dateAdded: new Date().toISOString().split("T")[0],
    isActive: false,
    societyId: "",
    images: [],
  });

  const handleAlbumChange = (event) => {
    setAlbum({ ...album, [event.target.name]: event.target.value });
  };

  const handleSwitchChange = () => {
    setAlbum({ ...album, isActive: !album.isActive });
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...album.images];
    updatedImages[index][field] = value;
    setAlbum({ ...album, images: updatedImages });
  };

  const addImage = () => {
    setAlbum({
      ...album,
      images: [...album.images, { imageUrl: "", title: "" }],
    });
  };

  const removeImage = (index) => {
    const updatedImages = album.images.filter((_, i) => i !== index);
    setAlbum({ ...album, images: updatedImages });
  };

  const handleSubmit = () => {
    console.log("New Album:", album);
    navigate("/gallery");
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Add Album
      </Typography>
      <TextField
        fullWidth
        label="Album Name"
        name="albumName"
        value={album.albumName}
        onChange={handleAlbumChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        name="albumDescription"
        value={album.albumDescription}
        onChange={handleAlbumChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Society ID"
        name="societyId"
        value={album.societyId}
        onChange={handleAlbumChange}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Switch checked={album.isActive} onChange={handleSwitchChange} />
        }
        label={album.isActive ? "Active" : "Inactive"}
        sx={{ mb: 2, display: "block" }}
      />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Images
      </Typography>
      {album.images.map((image, index) => (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
        >
          <TextField
            fullWidth
            label="Image URL"
            value={image.imageUrl}
            onChange={(e) =>
              handleImageChange(index, "imageUrl", e.target.value)
            }
          />
          <TextField
            fullWidth
            label="Title"
            value={image.title}
            onChange={(e) => handleImageChange(index, "title", e.target.value)}
          />
          <IconButton color="error" onClick={() => removeImage(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<AddIcon />} onClick={addImage} sx={{ mb: 2 }}>
        Add Image
      </Button>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={() => navigate("/gallery")}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default AddAlbum;
