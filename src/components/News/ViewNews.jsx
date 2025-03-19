import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";


const ViewNews = ({news}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const foundNews = news.find((n) => n.newsId === numericId);
    setNewsItem(foundNews || null);
  }, [numericId]);

  if (!newsItem) {
    return <Typography variant="h6">News not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 800, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        {newsItem.newsTitle}
      </Typography>
      <Typography variant="h6">Description:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{newsItem.newsDescription}</Typography>
      <Typography variant="h6">Author:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{newsItem.author}</Typography>
      <Typography variant="h6">Category:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{newsItem.category}</Typography>
      <Typography variant="h6">News Date:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{newsItem.newsDate}</Typography>
      <FormControlLabel
        control={<Switch checked={newsItem.isActive} disabled />}
        label={newsItem.isActive ? "Active" : "Inactive"}
        sx={{ mb: 2, display: "block" }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" onClick={() => navigate("/news")}>Back to News</Button>
      </Box>
    </Paper>
  );
};

export default ViewNews;