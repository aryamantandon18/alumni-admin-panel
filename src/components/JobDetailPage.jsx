import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Button, Box, IconButton } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import DescriptionIcon from "@mui/icons-material/Description"; // Resume Icon
import { drawerWidth } from "./Layout/Header";

const applicantsData = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "123-456-7890",
        experience: "3 years",
        education: "B.Sc in Computer Science",
        status: "pending",
        resume: "https://example.com/resume1.pdf",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phoneNumber: "987-654-3210",
        experience: "5 years",
        education: "M.Sc in Software Engineering",
        status: "shortlisted",
        resume: "https://example.com/resume2.pdf",
    },
    {
        id: 3,
        name: "Mark Taylor",
        email: "mark@example.com",
        phoneNumber: "555-666-7777",
        experience: "2 years",
        education: "B.Tech in Information Technology",
        status: "rejected",
        resume: "https://example.com/resume3.pdf",
    },
];

export default function JobDetailsPage() {
    const { id } = useParams();
    const [applicants, setApplicants] = useState(applicantsData);

    const handleStatusChange = (applicantId, newStatus) => {
        setApplicants((prev) =>
            prev.map((app) =>
                app.id === applicantId ? { ...app, status: newStatus } : app
            )
        );
    };

    const handleExportCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [
                "ID,Name,Email,Phone,Experience,Education,Status,Resume",
                ...applicants.map(
                    (a) =>
                        `${a.id},${a.name},${a.email},${a.phoneNumber},${a.experience},${a.education},${a.status},${a.resume}`
                ),
            ].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "applicants.csv");
        document.body.appendChild(link);
        link.click();
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                filterVariant: "text",
            },
            {
                accessorKey: "email",
                header: "Email",
                filterVariant: "text",
            },
            {
                accessorKey: "phoneNumber",
                header: "Phone",
            },
            {
                accessorKey: "experience",
                header: "Experience",
                filterVariant: "text",
            },
            {
                accessorKey: "education",
                header: "Education",
                filterVariant: "text",
            },
            {
                accessorKey: "status",
                header: "Status",
                filterVariant: "select",
                filterSelectOptions: ["pending", "shortlisted", "rejected", "hired"],
                Cell: ({ row }) => (
                    <select
                        value={row.original.status}
                        onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                    </select>
                ),
            },
            {
                accessorKey: "resume",
                header: "Resume",
                Cell: ({ row }) => (
                    <IconButton
                        component="a"
                        href={row.original.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <DescriptionIcon color="primary" />
                    </IconButton>
                ),
            },
        ],
        []
    );

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
            <Paper sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Applicants for job - {id}
                </Typography>

                <MaterialReactTable
                    columns={columns}
                    data={applicants}
                    enableFilters
                    enableColumnFilters
                    enableGlobalFilter
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExportCSV}
                    sx={{ marginTop: 2 }}
                >
                    Export CSV
                </Button>
            </Paper>
        </Box>
    );
}
