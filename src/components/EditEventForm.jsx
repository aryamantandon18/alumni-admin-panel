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

const data = [
  {
    eventId: 1,
    eventName: "Tech Conference 2024",
    eventDescription: "A global tech conference with top industry leaders.",
    eventDate: "2024-10-15",
    eventType: "Technology",
    eventLocation: "New York",
    eventImage: "https://via.placeholder.com/50",
    eventMode: "Offline",
    category: "Tech",
    subcategory: "AI & ML",
    linkToRegister: "https://example.com/register",
    status: true,
  },
];

const validationSchema = Yup.object({
  eventName: Yup.string().required("Event Name is required"),
  eventDescription: Yup.string().required("Description is required"),
  eventDate: Yup.string().required("Date is required"),
  eventType: Yup.string().required("Event Type is required"),
  eventLocation: Yup.string().required("Location is required"),
  eventImage: Yup.string()
    .url("Enter a valid image URL")
    .required("Image URL is required"),
  eventMode: Yup.string().required("Event Mode is required"),
  category: Yup.string().required("Category is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  linkToRegister: Yup.string()
    .url("Enter a valid registration link")
    .required("Registration Link is required"),
  status: Yup.boolean(),
});

export default function EditEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);

  const [event, setEvent] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const foundEvent = data.find((e) => e.eventId === numericId);
    setEvent(foundEvent || null);
  }, [numericId]);

  const formik = useFormik({
    initialValues: {
      eventName: event?.eventName || "",
      eventDescription: event?.eventDescription || "",
      eventDate: event?.eventDate || "",
      eventType: event?.eventType || "",
      eventLocation: event?.eventLocation || "",
      eventImage: event?.eventImage || "",
      eventMode: event?.eventMode || "",
      category: event?.category || "",
      subcategory: event?.subcategory || "",
      linkToRegister: event?.linkToRegister || "",
      status: event?.status || false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log("Updated Event:", values);
      setUpdateSuccess(true);
      setTimeout(() => navigate("/events"), 500);
    },
  });

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Edit Event
      </Typography>
      {updateSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Updated Successfully!
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Event Name"
          name="eventName"
          {...formik.getFieldProps("eventName")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="eventDescription"
          multiline
          rows={3}
          {...formik.getFieldProps("eventDescription")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Date"
          name="eventDate"
          type="date"
          value={formik.values.eventDate}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Event Type"
          name="eventType"
          {...formik.getFieldProps("eventType")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Location"
          name="eventLocation"
          {...formik.getFieldProps("eventLocation")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="eventImage"
          {...formik.getFieldProps("eventImage")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Event Mode"
          name="eventMode"
          {...formik.getFieldProps("eventMode")}
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
          label="Subcategory"
          name="subcategory"
          {...formik.getFieldProps("subcategory")}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Registration Link"
          name="linkToRegister"
          {...formik.getFieldProps("linkToRegister")}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.status}
              onChange={(e) => formik.setFieldValue("status", e.target.checked)}
              name="status"
              color="primary"
            />
          }
          label={formik.values.status ? "Active" : "Inactive"}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/events")}
            sx={{ flex: 1, mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ flex: 1 }}
          >
            Update
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
