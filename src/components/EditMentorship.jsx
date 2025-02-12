import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

// Mock data for demonstration purposes
const mockData = [
    {
        id: 1,
        title: "Leadership Training",
        mentor: "John Doe",
        duration: "3 Months",
        startDate: "2024-09-10",
        status: true,
    },
    {
        id: 2,
        title: "Software Development Bootcamp",
        mentor: "Jane Smith",
        duration: "6 Months",
        startDate: "2024-10-15",
        status: false,
    },
];

const EditMentorship = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const selectedMentorship = mockData.find((item) => item.id === parseInt(id));
        if (selectedMentorship) setFormData(selectedMentorship);
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: formData?.title || "",
            mentor: formData?.mentor || "",
            duration: formData?.duration || "",
            startDate: formData?.startDate || "",
            status: formData?.status || false,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            mentor: Yup.string().required("Mentor is required"),
            duration: Yup.string().required("Duration is required"),
            startDate: Yup.date().required("Start Date is required"),
            status: Yup.boolean().required("Status is required"),
        }),
        onSubmit: (values) => {
            console.log("Updated Data:", values);
            navigate("/mentorship"); // Redirect after update
        },
    });

    if (!formData) return <p>Loading...</p>;

    return (
        <Paper sx={{ padding: 2, maxWidth: 400, margin: "auto" }}>
            <h2>Edit Mentorship Program</h2>
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
                />
                <TextField
                    fullWidth
                    label="Mentor"
                    name="mentor"
                    value={formik.values.mentor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mentor && Boolean(formik.errors.mentor)}
                    helperText={formik.touched.mentor && formik.errors.mentor}
                    margin="normal"
                />
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
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={formik.isSubmitting}
                >
                    Save Changes
                </Button>
            </form>
        </Paper>
    );
};

export default EditMentorship;
