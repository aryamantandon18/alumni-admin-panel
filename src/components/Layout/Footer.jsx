import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="body2">© {new Date().getFullYear()} Admin Panel</Typography>
    </Box>
  );
}
