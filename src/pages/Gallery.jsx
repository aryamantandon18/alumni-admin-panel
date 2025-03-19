
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GalleryTable from "../components/Gallery/GalleryTable";
import { drawerWidth } from "../components/Layout/Header";
import { Box, Typography, Button } from "@mui/material";

// Sample data for gallery albums
const initialData = [
  {
    gallaryId: 1,
    albumName: "Sunset Views",
    albumDescription: "A beautiful sunset over the mountains.",
    dateAdded: "2024-08-01",
    societyId: 101,
    isActive: true,
  },
  {
    gallaryId: 2,
    albumName: "City Lights",
    albumDescription: "Night view of the city skyline.",
    dateAdded: "2024-08-05",
    societyId: 102,
    isActive: false,
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [galleryData, setGalleryData] = useState(initialData);

  const handleDelete = (id) => {
    setGalleryData(galleryData.filter((album) => album.gallaryId !== id));
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        paddingTop: 0,
        ml: { sm: `${drawerWidth}px` },
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        transition: "margin 0.3s ease-in-out",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Gallery
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate("/addAlbum")}
      >
        Add New Album
      </Button>
      <GalleryTable data={galleryData} onDelete={handleDelete} />
    </Box>
  );
};

export default Gallery;
