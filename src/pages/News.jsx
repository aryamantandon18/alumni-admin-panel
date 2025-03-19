import React, { useState } from "react";
import NewsTable from "../components/News/NewsTable";
import { Box, Typography, Button } from "@mui/material";
import { drawerWidth } from "../components/Layout/Header";
import { useNavigate } from "react-router-dom";
// Initial News Data
const initialNews = [
  {
    newsId: 1,
    newsTitle: "Tech Innovations 2024",
    newsDescription: "Latest trends in tech.",
    newsImage: "https://via.placeholder.com/50",
    category: "Technology",
    author: "John Doe",
    newsDate: "2024-08-10",
    isActive: true,
    createdAt: "2024-08-01",
    updatedAt: "2024-08-05",
  },
  {
    newsId: 2,
    newsTitle: "Finance Market Crash",
    newsDescription: "Impact of economic slowdown.",
    newsImage: "https://via.placeholder.com/50",
    category: "Finance",
    author: "Jane Smith",
    newsDate: "2024-08-12",
    isActive: false,
    createdAt: "2024-08-02",
    updatedAt: "2024-08-06",
  },
];

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState(initialNews);

  const handleDelete = (newsId) => {
    setNews(news.filter((article) => article.newsId !== newsId));
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
        News Articles
      </Typography>
       <Button
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
              onClick={() => navigate("/addNews")}
            >
              Add News
            </Button>
      <NewsTable data={news} onDelete={handleDelete} />
    </Box>
  );
};

export default News;
