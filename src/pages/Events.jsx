import React from "react";
import EventsTable from "../components/EventsTable";
import { drawerWidth } from "../components/Layout/Header";
import { Box, Typography } from "@mui/material";

// Sample data for events
const eventData = [
  {
    eventId: 1,
    eventName: "Tech Conference 2024",
    eventDescription: "A global tech conference with top industry leaders.",
    eventDate: "2024-10-15T10:00:00Z",
    eventType: "Technology",
    eventLocation: "New York",
    eventImage: "https://via.placeholder.com/50",
    eventMode: "Offline",
    category: "Tech",
    subcategory: "AI & ML",
    linkToRegister: "https://example.com/register",
    status: true,
  },
  {
    eventId: 2,
    eventName: "Startup Meetup",
    eventDescription: "Networking event for startup founders and investors.",
    eventDate: "2024-11-20T14:00:00Z",
    eventType: "Business",
    eventLocation: "San Francisco",
    eventImage: "https://via.placeholder.com/50",
    eventMode: "Online",
    category: "Entrepreneurship",
    subcategory: "Startup Funding",
    linkToRegister: "https://example.com/register",
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
        paddingTop: 0,
        ml: { sm: `${drawerWidth}px` },
        width: { sm: `calc(100% - ${drawerWidth}px)` },
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
