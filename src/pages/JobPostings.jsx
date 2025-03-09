import React, { useState } from "react";
import { Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import JobTable from "../components/JobTable";
import { drawerWidth } from "../components/Layout/Header";

const initialJobs = [
    {
        jobsPostingId: 1,
        jobTitle: "Software Engineer",
        companyName: "Tech Corp",
        companyLocation: "New York",
        jobMode: "Remote",
        jobType: "Full-time",
        jobCategory: "Technical",
        expectedSalary: "$80,000 - $100,000",
        applyLink: "https://apply.example.com",
        requiredSkills: "JavaScript, React, Node.js",
        qualifications: "Bachelor's in Computer Science",
        responsibilities: "Develop and maintain web applications",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        jobsPostingId: 2,
        jobTitle: "Marketing Analyst",
        companyName: "Biz Group",
        companyLocation: "San Francisco",
        jobMode: "Hybrid",
        jobType: "Internship",
        jobCategory: "Non-Technical",
        expectedSalary: "$40,000 - $50,000",
        applyLink: "https://apply.example.com",
        requiredSkills: "SEO, Google Analytics, Content Marketing",
        qualifications: "Marketing degree preferred",
        responsibilities: "Analyze market trends and campaign performance",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const JobPostings = () => {
    const [jobs, setJobs] = useState(initialJobs);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setJobs(jobs.filter((job) => job.jobsPostingId !== id));
    };

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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Job Postings</Typography>
            </Box>

            <JobTable data={jobs} onDelete={handleDelete} />
        </Box>
    );
};

export default JobPostings;
