import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Paper, MenuItem, FormControlLabel, Switch } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// Mock data for demonstration purposes
const mockData = [
    {
        id: "1",
        title: "Leadership Training",
        mentor: { facultyId: "101", name: "John Doe" },
        description: "A comprehensive leadership training program.",
        category: "Leadership",
        duration: "3 Months",
        prerequisites: "Basic leadership skills",
        schedule: "Every Saturday 10 AM - 12 PM",
        status: "ACTIVE",
        startDate: "2024-09-10",
    },
    {
        id: "2",
        title: "Software Development Bootcamp",
        mentor: { facultyId: "102", name: "Jane Smith" },
        description: "An intensive bootcamp for aspiring developers.",
        category: "Technology",
        duration: "6 Months",
        prerequisites: "Basic programming knowledge",
        schedule: "Weekdays 6 PM - 8 PM",
        status: "INACTIVE",
        startDate: "2024-10-15",
    },
];

const EditMentorship = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [isEditable,setIsEditable] = useState(false);

    useEffect(() => {
        const selectedMentorship = mockData.find((item) => item.id === id);
        if (selectedMentorship) setFormData(selectedMentorship);
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: formData?.title || "",
            mentorName: formData?.mentor?.name || "",
            description: formData?.description || "",
            category: formData?.category || "",
            duration: formData?.duration || "",
            prerequisites: formData?.prerequisites || "",
            schedule: formData?.schedule || "",
            startDate: formData?.startDate || "",
            status: formData?.status === "ACTIVE",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            mentorName: Yup.string().required("Mentor is required"),
            description: Yup.string().required("Description is required"),
            category: Yup.string().required("Category is required"),
            duration: Yup.string().required("Duration is required"),
            prerequisites: Yup.string().required("Prerequisites are required"),
            schedule: Yup.string().required("Schedule is required"),
            startDate: Yup.date().required("Start Date is required"),
            status: Yup.boolean(),
        }),
        onSubmit: (values) => {
            console.log("Updated Data:", {
                ...values,
                status: values.status ? "ACTIVE" : "INACTIVE",
            });
            navigate("/mentorship"); // Redirect after update
        },
    });

    if (!formData) return <p>Loading...</p>;

    return (
        <Paper sx={{ padding: 2, maxWidth: 500, margin: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Edit Mentorship Program</h2>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isEditable}
                            onChange={() => setIsEditable(!isEditable)}
                            color="primary"
                        />
                    }
                    label="Editable"
                />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    margin="normal"
                    disabled={!isEditable}
                />
                <TextField
                    fullWidth
                    label="Mentor"
                    name="mentorName"
                    value={formik.values.mentorName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mentorName && Boolean(formik.errors.mentorName)}
                    helperText={formik.touched.mentorName && formik.errors.mentorName}
                    margin="normal"
                    disabled={!isEditable}
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    margin="normal"
                    multiline
                    rows={3}
                    disabled={!isEditable}
                />
                <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                    margin="normal"
                    select
                    disabled={!isEditable}
                >
                    <MenuItem value="Leadership">Leadership</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                    margin="normal"
                    disabled={!isEditable}
                />
                <TextField
                    fullWidth
                    label="Prerequisites"
                    name="prerequisites"
                    value={formik.values.prerequisites}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.prerequisites && Boolean(formik.errors.prerequisites)}
                    helperText={formik.touched.prerequisites && formik.errors.prerequisites}
                    margin="normal"
                    disabled={!isEditable}
                />
                <TextField
                    fullWidth
                    label="Schedule"
                    name="schedule"
                    value={formik.values.schedule}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.schedule && Boolean(formik.errors.schedule)}
                    helperText={formik.touched.schedule && formik.errors.schedule}
                    margin="normal"
                    disabled={!isEditable}
                />
                <TextField
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    helperText={formik.touched.startDate && formik.errors.startDate}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    disabled={!isEditable}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={formik.values.status}
                            onChange={formik.handleChange}
                            name="status"
                            disabled={!isEditable}
                        />
                    }
                    label={formik.values.status ? "Active" : "Inactive"}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth  disabled={!isEditable || formik.isSubmitting}>
                    Save Changes
                </Button>
            </form>
        </Paper>
    );
};

export default EditMentorship;
