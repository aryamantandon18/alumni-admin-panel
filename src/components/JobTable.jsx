import React, { useState, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JobForm from "./JobForm";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";

const initialJobs = [
    {
        jobsPostingId: 1,
        jobTitle: "Frontend Developer",
        companyName: "Tech Corp",
        companyLocation: "New York, NY",
        jobMode: "Remote",
        jobType: "Full-time",
        jobCategory: "Technical",
        expectedSalary: "$80,000 - $100,000",
        applyLink: "https://apply.techcorp.com",
        requiredSkills: "React, JavaScript, CSS",
        qualifications: "Bachelor's in Computer Science",
        responsibilities: "Develop UI components",
        status: "Active",
    },
    {
        jobsPostingId: 2,
        jobTitle: "Backend Developer",
        companyName: "Soft Solutions",
        companyLocation: "San Francisco, CA",
        jobMode: "Onsite",
        jobType: "Part-time",
        jobCategory: "Technical",
        expectedSalary: "$60,000 - $80,000",
        applyLink: "https://apply.softsolutions.com",
        requiredSkills: "Node.js, MongoDB, Express",
        qualifications: "Bachelor's in Software Engineering",
        responsibilities: "Build and maintain APIs",
        status: "Active",
    },
];

export default function JobTable() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState(initialJobs);
    const [openForm, setOpenForm] = useState(false);
    const [editJob, setEditJob] = useState(null);

    const handleUpdate = (row) => {
        setEditJob(row);
        setOpenForm(true);
    };

    const handleDelete = (id) => {
        setJobs(jobs.filter((job) => job.jobsPostingId !== id));
    };

    const handleSave = (jobData) => {
        if (editJob) {
            setJobs(jobs.map((job) => (job.jobsPostingId === editJob.jobsPostingId ? jobData : job)));
        } else {
            setJobs([...jobs, { ...jobData, jobsPostingId: jobs.length + 1 }]);
        }
        setEditJob(null);
        setOpenForm(false);
    };

    const columns = useMemo(
        () => [
            { accessorKey: "jobTitle", header: "Job Title" },
            { accessorKey: "companyName", header: "Company" },
            { accessorKey: "companyLocation", header: "Location" },
            { accessorKey: "jobMode", header: "Mode" },
            { accessorKey: "jobType", header: "Type" },
            { accessorKey: "status", header: "Status" },
            {
                accessorKey: "applyLink",
                header:"Apply",
                Cell:({row})=>(
                    <IconButton
                        color="primary"
                        component="a"
                        href={row.original.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <OpenInNewIcon/>
                    </IconButton>
                )
            },
            {
                accessorKey: "actions",
                header: "Actions",
                Cell: ({ row }) => (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <IconButton color="primary" onClick={() => handleUpdate(row.original)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(row.original.jobsPostingId)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                ),
            },
            {
                accessorKey: "applicants",
                header: "Applicants",
                Cell: ({ row }) => (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/job-details/${row.original.jobsPostingId}`)}
                    >
                        Applicants
                    </Button>
                ),
            },
        ],
        [jobs]
    );

    const table = useMaterialReactTable({
        data: jobs,
        columns,
        enableSorting: true,
        enablePagination: true,
        initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
    });

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
            {openForm && <JobForm open={openForm} handleClose={() => setOpenForm(false)} jobData={editJob} onSave={handleSave} />}
        </Paper>
    );
}
