import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Card, CardMedia, CardContent, Button, FormControlLabel, Switch, Stack } from "@mui/material";

// Sample data for gallery albums
const galleryData = [
  {
    gallaryId: 1,
    albumName: "Sunset Views",
    isActive: true,
    images: [
      {
        imageUrl: "https://via.placeholder.com/200",
        title: "Sunset Over Hills",
        dateUploaded: "2024-08-01",
      },
      {
        imageUrl: "https://via.placeholder.com/200",
        title: "Beach Sunset",
        dateUploaded: "2024-08-02",
      },
    ],
  },
  {
    gallaryId: 2,
    albumName: "City Lights",
    isActive: false,
    images: [
      {
        imageUrl: "https://via.placeholder.com/200",
        title: "Skyline at Night",
        dateUploaded: "2024-08-05",
      },
      {
        imageUrl: "https://via.placeholder.com/200",
        title: "Downtown Lights",
        dateUploaded: "2024-08-06",
      },
    ],
  },
];

const ViewGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const foundAlbum = galleryData.find((album) => album.gallaryId === numericId);
    setAlbum(foundAlbum || null);
  }, [numericId]);

  if (!album) {
    return <Typography variant="h6">Album not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 900, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        {album.albumName}
      </Typography>
      <FormControlLabel
        control={<Switch checked={album.isActive} color="primary" disabled />}
        label={album.isActive ? "Active" : "Inactive"}
        sx={{ mb: 2, display: "block", textAlign: "center" }}
      />
      <Stack spacing={3} direction="row" flexWrap="wrap" justifyContent="center">
        {album.images.map((image, index) => (
          <Card key={index} sx={{ width: 250 }}>
            <CardMedia component="img" height="200" image={image.imageUrl} alt={image.title} />
            <CardContent>
              <Typography variant="h6">{image.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Uploaded on: {new Date(image.dateUploaded).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" onClick={() => navigate("/gallery")}>Back to Gallery</Button>
      </Box>
    </Paper>
  );
};

export default ViewGallery;