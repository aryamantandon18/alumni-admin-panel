import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

// Sample data for albums
const galleryData = [
  {
    gallaryId: 1,
    albumName: "Sunset Views",
    isActive: true,
    images: [
      { imageUrl: "https://via.placeholder.com/200", title: "Sunset Over Hills" },
      { imageUrl: "https://via.placeholder.com/200", title: "Beach Sunset" },
    ],
  },
  {
    gallaryId: 2,
    albumName: "City Lights",
    isActive: false,
    images: [
      { imageUrl: "https://via.placeholder.com/200", title: "Skyline at Night" },
      { imageUrl: "https://via.placeholder.com/200", title: "Downtown Lights" },
    ],
  },
];

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const foundAlbum = galleryData.find((album) => album.gallaryId === numericId);
    setAlbum(foundAlbum || { albumName: "", isActive: false, images: [] });
  }, [numericId]);

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
    console.log("Updated Album:", album);
    navigate("/gallery");
  };

  if (!album) {
    return <Typography variant="h6">Album not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>Edit Album</Typography>
      <TextField
        fullWidth
        label="Album Name"
        name="albumName"
        value={album.albumName}
        onChange={handleAlbumChange}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={<Switch checked={album.isActive} onChange={handleSwitchChange} />}
        label={album.isActive ? "Active" : "Inactive"}
        sx={{ mb: 2, display: "block" }}
      />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Images</Typography>
      {album.images.map((image, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Image URL"
            value={image.imageUrl}
            onChange={(e) => handleImageChange(index, "imageUrl", e.target.value)}
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
      <Button startIcon={<AddIcon />} onClick={addImage} sx={{ mb: 2 }}>Add Image</Button>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={() => navigate("/gallery")}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </Box>
    </Paper>
  );
};

export default EditGallery;
