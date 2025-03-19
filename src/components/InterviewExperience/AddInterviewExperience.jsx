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
  title: Yup.string().required("Title is required"),
  company: Yup.string().required("Company name is required"),
  description: Yup.string().required("Description is required"),
  interviewBody: Yup.string().required("Interview details are required"),
  interviewDate: Yup.string().required("Interview Date is required"),
  onCampus: Yup.boolean(),
  referral: Yup.boolean(),
  anyTips: Yup.string(),
});

export default function AddInterviewExperience() {
  const navigate = useNavigate();
  const [addSuccess, setAddSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      description: "",
      interviewBody: "",
      interviewDate: "2025-10-10",
      onCampus: false,
      referral: false,
      anyTips: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("New Interview Experience Added:", values);
      setAddSuccess(true);
      setTimeout(() => navigate("/interview-experience"), 500);
    },
  });

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Add Interview Experience
      </Typography>
      {addSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Interview Experience Added Successfully!
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <TextField fullWidth label="Title" name="title" {...formik.getFieldProps("title")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Company" name="company" {...formik.getFieldProps("company")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Description" name="description" multiline rows={3} {...formik.getFieldProps("description")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Interview Body" name="interviewBody" multiline rows={5} {...formik.getFieldProps("interviewBody")} sx={{ mb: 2 }} />
        <TextField fullWidth label="Interview Date" name="interviewDate" type="date" value={formik.values.interviewDate} onChange={formik.handleChange} sx={{ mb: 2 }} />
        <FormControlLabel control={<Switch checked={formik.values.onCampus} onChange={(e) => formik.setFieldValue("onCampus", e.target.checked)} name="onCampus" color="primary" />} label={formik.values.onCampus ? "On Campus" : "Off Campus"} sx={{ mb: 2 }} />
        <FormControlLabel control={<Switch checked={formik.values.referral} onChange={(e) => formik.setFieldValue("referral", e.target.checked)} name="referral" color="primary" />} label={formik.values.referral ? "Referral" : "No Referral"} sx={{ mb: 2 }} />
        <TextField fullWidth label="Any Tips" name="anyTips" multiline rows={2} {...formik.getFieldProps("anyTips")} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/interview-experience")} sx={{ flex: 1, mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting} sx={{ flex: 1 }}>
            Add Experience
          </Button>
        </Box>
      </form>
    </Paper>
  );
}