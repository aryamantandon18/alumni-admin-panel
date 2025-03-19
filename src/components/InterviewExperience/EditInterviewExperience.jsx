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

export default function EditInterviewExperience({ experiences }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);

  const [experience, setExperience] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const foundExperience = experiences.find((exp) => exp.interviewExperienceId === numericId);
    setExperience(foundExperience || null);
  }, [numericId, experiences]);

  const formik = useFormik({
    initialValues: {
      title: experience?.title || "",
      company: experience?.company || "",
      description: experience?.description || "",
      interviewBody: experience?.interviewBody || "",
      interviewDate: experience?.interviewDate || "",
      onCampus: experience?.onCampus || false,
      referral: experience?.referral || false,
      anyTips: experience?.anyTips || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log("Updated Interview Experience:", values);
      setUpdateSuccess(true);
      setTimeout(() => navigate("/interview-experiences"), 500);
    },
  });

  if (!experience) {
    return <Typography variant="h6">Interview Experience not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Edit Interview Experience
      </Typography>
      {updateSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Updated Successfully!
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
          <Button variant="outlined" color="secondary" onClick={() => navigate("/interview-experiences")} sx={{ flex: 1, mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting} sx={{ flex: 1 }}>
            Update Experience
          </Button>
        </Box>
      </form>
    </Paper>
  );
}