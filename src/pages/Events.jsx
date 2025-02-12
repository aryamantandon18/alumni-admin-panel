import React from "react";
import EventsTable from '../components/EventsTable'
import { drawerWidth } from "../components/Layout/Header";
import { Box, Typography } from "@mui/material";

// Sample data for events
const eventData = [
    {
        id: 1,
        title: "Tech Conference 2024",
        imageUrl: "https://via.placeholder.com/50",
        location: "New York",
        date: "2024-10-15",
        time: "10:00 AM",
        status: true,
    },
    {
        id: 2,
        title: "Startup Meetup",
        imageUrl: "https://via.placeholder.com/50",
        location: "San Francisco",
        date: "2024-11-20",
        time: "2:00 PM",
        status: false,
    },
];

const Events = () => {
    return (
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          paddingTop:0,
          ml: { sm: `${drawerWidth}px` }, // Shifts content right in desktop mode
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Prevents overlap
          transition: "margin 0.3s ease-in-out",
        }}
      >
  
        <Typography variant="h4" sx={{ mb: 2 }}>
          Events
        </Typography>
  
        <EventsTable data={eventData} />
      </Box>
  
    );
};

export default Events;
