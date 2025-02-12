import React, { useState } from "react";
import MentorshipTable from "../components/MentorshipPrograme";
import { Box, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../components/Layout/Header";

const initialData = [
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
          paddingTop:0,
          ml: { sm: `${drawerWidth}px` }, // Ensures content shifts right in desktop mode
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Prevents content from being behind the drawer
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
      
        {/* Your MentorshipTable */}
        <MentorshipTable data={mentorships} onDelete={handleDelete} />
      </Box>
      
    );
};

export default Mentorship;
