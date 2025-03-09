import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const demoNews = [
  {
    newsId: 1,
    newsTitle: "Tech Innovations 2024",
    newsDescription: "Latest trends in tech.",
    newsImage: "https://via.placeholder.com/50",
    newsDate: "2024-08-10",
    isActive: true,
    author: "John Doe",
    category: "Technology",
    createdAt: "2024-08-01",
    updatedAt: "2024-08-05",
  },
];

const validationSchema = Yup.object({
  newsTitle: Yup.string().required("Title is required"),
  newsDescription: Yup.string().required("Description is required"),
  newsImage: Yup.string()
    .url("Enter a valid image URL")
    .required("Image URL is required"),
  newsDate: Yup.string().required("Date is required"),
  isActive: Yup.boolean(),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
});

export default function EditNewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);
  const [newsItem, setNewsItem] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const foundNews = demoNews.find((n) => n.newsId === numericId);
    setNewsItem(foundNews || null);
  }, [numericId]);

  const formik = useFormik({
    initialValues: {
      newsTitle: newsItem?.newsTitle || "",
      newsDescription: newsItem?.newsDescription || "",
      newsImage: newsItem?.newsImage || "",
      newsDate: newsItem?.newsDate || new Date().toISOString().split("T")[0],
      isActive: newsItem?.isActive || false,
      author: newsItem?.author || "",
      category: newsItem?.category || "",
      createdAt: newsItem?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: newsItem?.updatedAt || new Date().toISOString().split("T")[0],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log("Updated News:", values);
      setUpdateSuccess(true);
      setTimeout(() => navigate("/news"), 500);
    },
  });

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Edit News
      </Typography>
      {updateSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Updated Successfully!
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="newsTitle"
          {...formik.getFieldProps("newsTitle")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="newsDescription"
          multiline
          rows={3}
          {...formik.getFieldProps("newsDescription")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="newsImage"
          {...formik.getFieldProps("newsImage")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Date"
          name="newsDate"
          type="date"
          value={formik.values.newsDate}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Author"
          name="author"
          {...formik.getFieldProps("author")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Category"
          name="category"
          {...formik.getFieldProps("category")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Created At"
          name="createdAt"
          type="date"
          value={formik.values.createdAt}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Updated At"
          name="updatedAt"
          type="date"
          value={formik.values.updatedAt}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.isActive}
              onChange={(e) =>
                formik.setFieldValue("isActive", e.target.checked)
              }
            />
          }
          label="Published"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={() => navigate("/news")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
