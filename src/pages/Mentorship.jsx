import React, { useState } from "react";
import MentorshipTable from "../components/MentorshipPrograme";
import { Box, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../components/Layout/Header";

const initialData = [
    {
        id: "1",
        title: "Leadership Training",
        mentorId: "101",
        mentor: { facultyId: "101", name: "John Doe" },
        description: "A comprehensive leadership training program.",
        category: "Leadership",
        duration: "3 Months",
        prerequisites: "Basic leadership skills",
        schedule: "Every Saturday 10 AM - 12 PM",
        status: "ACTIVE",
        applications: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Software Development Bootcamp",
        mentorId: "102",
        mentor: { facultyId: "102", name: "Jane Smith" },
        description: "An intensive bootcamp for aspiring developers.",
        category: "Technology",
        duration: "6 Months",
        prerequisites: "Basic programming knowledge",
        schedule: "Weekdays 6 PM - 8 PM",
        status: "INACTIVE",
        applications: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const Mentorship = () => {
    const [mentorships, setMentorships] = useState(initialData);

    const handleDelete = (id) => {
        setMentorships(mentorships.filter((program) => program.id !== id));
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
            <Typography
                variant="h4"
                sx={{
                    mb: 2,
                    transition: "margin 0.3s ease-in-out",
                }}
            >
                Mentorship Programs
            </Typography>

            {/* Updated MentorshipTable */}
            <MentorshipTable data={mentorships} onDelete={handleDelete} />
        </Box>
    );
};

export default Mentorship;
