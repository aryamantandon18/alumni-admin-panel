import React, { useState } from "react";
import NewsTable from "../components/NewsTable";
import { Box, Typography } from "@mui/material";
import { drawerWidth } from "../components/Layout/Header";

// Initial News Data
const initialNews = [
  {
    newsId: 1,
    newsTitle: "Tech Innovations 2024",
    newsDescription: "Latest trends in tech.",
    newsImage: "https://via.placeholder.com/50",
    category: "Technology",
    author: "John Doe",
    newsDate: "2024-08-10T00:00:00Z",
    isActive: true,
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-08-05T15:00:00Z",
  },
  {
    newsId: 2,
    newsTitle: "Finance Market Crash",
    newsDescription: "Impact of economic slowdown.",
    newsImage: "https://via.placeholder.com/50",
    category: "Finance",
    author: "Jane Smith",
    newsDate: "2024-08-12T00:00:00Z",
    isActive: false,
    createdAt: "2024-08-02T11:00:00Z",
    updatedAt: "2024-08-06T16:00:00Z",
  },
];

const News = () => {
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
      <NewsTable data={news} onDelete={handleDelete} />
    </Box>
  );
};

export default News;
