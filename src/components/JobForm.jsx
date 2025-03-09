import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectComponent from "react-select";

const degrees = [
  {
    value: "Bachelors in Computer Science",
    label: "Bachelors in Computer Science",
  },
  {
    value: "Masters in Computer Science",
    label: "Masters in Computer Science",
  },
  {
    value: "Bachelors in Information Technology",
    label: "Bachelors in Information Technology",
  },
  { value: "MBA", label: "MBA" },
  { value: "PhD", label: "PhD" },
];

const jobValidationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job Title is required"),
  companyName: Yup.string().required("Company Name is required"),
  companyLocation: Yup.string().required("Company Location is required"),
  jobMode: Yup.string().required("Job Mode is required"),
  jobType: Yup.string().required("Job Type is required"),
  jobCategory: Yup.string().required("Job Category is required"),
  expectedSalary: Yup.string().required("Expected Salary is required"),
  applyLink: Yup.string()
    .url("Invalid URL format")
    .required("Apply Link is required"),
  requiredSkills: Yup.string().required("Required Skills are required"),
  qualifications: Yup.array().min(1, "At least one qualification is required"),
  responsibilities: Yup.string().required("Responsibilities are required"),
  status: Yup.string().required("Status is required"),
});

const JobForm = ({ open, handleClose, jobData, onSave }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{jobData ? "Edit Job" : "Add Job"}</DialogTitle>
      <Formik
        initialValues={{
          jobTitle: jobData?.jobTitle || "",
          companyName: jobData?.companyName || "",
          companyLocation: jobData?.companyLocation || "",
          jobMode: jobData?.jobMode || "Remote",
          jobType: jobData?.jobType || "Full-time",
          jobCategory: jobData?.jobCategory || "Technical",
          expectedSalary: jobData?.expectedSalary || "",
          applyLink: jobData?.applyLink || "",
          requiredSkills: jobData?.requiredSkills || "",
          qualifications: jobData?.qualifications
            ? jobData.qualifications.split(", ")
            : [],
          responsibilities: jobData?.responsibilities || "",
          status: jobData?.status || "Active",
        }}
        validationSchema={jobValidationSchema}
        onSubmit={(values) => {
          onSave({
            ...values,
            qualifications: values.qualifications.join(", "),
          });
          handleClose();
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                label="Job Title"
                name="jobTitle"
                fullWidth
                margin="dense"
                error={touched.jobTitle && Boolean(errors.jobTitle)}
                helperText={touched.jobTitle && errors.jobTitle}
              />
              <Field
                as={TextField}
                label="Company Name"
                name="companyName"
                fullWidth
                margin="dense"
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={touched.companyName && errors.companyName}
              />
              <Field
                as={TextField}
                label="Company Location"
                name="companyLocation"
                fullWidth
                margin="dense"
                error={
                  touched.companyLocation && Boolean(errors.companyLocation)
                }
                helperText={touched.companyLocation && errors.companyLocation}
              />

              <Field
                as={TextField}
                select
                label="Job Mode"
                name="jobMode"
                fullWidth
                margin="dense"
                onChange={handleChange}
              >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Onsite">Onsite</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Field>

              <Field
                as={TextField}
                select
                label="Job Type"
                name="jobType"
                fullWidth
                margin="dense"
                onChange={handleChange}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Field>

              <Field
                as={TextField}
                label="Expected Salary"
                name="expectedSalary"
                fullWidth
                margin="dense"
                error={touched.expectedSalary && Boolean(errors.expectedSalary)}
                helperText={touched.expectedSalary && errors.expectedSalary}
              />

              <Field
                as={TextField}
                label="Apply Link"
                name="applyLink"
                fullWidth
                margin="dense"
                error={touched.applyLink && Boolean(errors.applyLink)}
                helperText={touched.applyLink && errors.applyLink}
              />

              <Field
                as={TextField}
                label="Required Skills"
                name="requiredSkills"
                fullWidth
                margin="dense"
                error={touched.requiredSkills && Boolean(errors.requiredSkills)}
                helperText={touched.requiredSkills && errors.requiredSkills}
              />

              {/* Multi-Select Field for Qualifications */}
              <FormControl fullWidth margin="dense">
                <InputLabel>Qualifications</InputLabel>
                <Select
                  multiple
                  value={values.qualifications}
                  onChange={(e) =>
                    setFieldValue("qualifications", e.target.value)
                  }
                  input={<OutlinedInput label="Qualifications" />}
                  renderValue={(selected) => (
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                >
                  {degrees.map((degree) => (
                    <MenuItem key={degree.value} value={degree.value}>
                      {degree.label}
                    </MenuItem>
                  ))}
                </Select>
                {touched.qualifications && errors.qualifications && (
                  <div style={{ color: "red", fontSize: "0.8rem" }}>
                    {errors.qualifications}
                  </div>
                )}
              </FormControl>

              <Field
                as={TextField}
                label="Responsibilities"
                name="responsibilities"
                fullWidth
                margin="dense"
                error={
                  touched.responsibilities && Boolean(errors.responsibilities)
                }
                helperText={touched.responsibilities && errors.responsibilities}
              />

              {/* Status Field */}
              <Field
                as={TextField}
                select
                label="Status"
                name="status"
                fullWidth
                margin="dense"
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </Field>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default JobForm;
