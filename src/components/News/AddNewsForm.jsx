import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddNewsForm() {
  const navigate = useNavigate();
  const [addSuccess, setAddSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      newsTitle: "",
      newsDescription: "",
      newsImage: "",
      newsDate: new Date().toISOString().split("T")[0],
      isActive: false,
      author: "",
      category: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("New News Added:", values);
      setAddSuccess(true);
      setTimeout(() => navigate("/news"), 500);
    },
  });

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Add News
      </Typography>
      {addSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          News Added Successfully!
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <TextField fullWidth label="Title" name="newsTitle" {...formik.getFieldProps("newsTitle")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Description" name="newsDescription" multiline rows={3} {...formik.getFieldProps("newsDescription")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Image URL" name="newsImage" {...formik.getFieldProps("newsImage")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Date" name="newsDate" type="date" value={formik.values.newsDate} onChange={formik.handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Author" name="author" {...formik.getFieldProps("author")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Category" name="category" {...formik.getFieldProps("category")} sx={{ mb: 2 }} />
        <FormControlLabel
          control={<Switch checked={formik.values.isActive} onChange={(e) => formik.setFieldValue("isActive", e.target.checked)} name="isActive" color="primary" />}
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
