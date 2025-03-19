import React from "react";
import InterviewExperiencesTable from "../components/InterviewExperience/InterviewExperienceTable";
import { drawerWidth } from "../components/Layout/Header";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Sample data for interview experiences
const interviewData = [
  {
    interviewExperienceId: 1,
    title: "Software Engineer Interview at Google",
    company: "Google",
    description: "My experience interviewing for a Software Engineer role at Google.",
    interviewDate: "2024-06-15",
    onCampus: true,
    referral: false,
    anyTips: "Focus on DSA and system design.",
    isApproved: true,
  },
  {
    interviewExperienceId: 2,
    title: "Data Scientist Interview at Facebook",
    company: "Facebook",
    description: "Process of getting a Data Scientist role at Facebook.",
    interviewDate: "2024-07-10",
    onCampus: false,
    referral: true,
    anyTips: "Referrals help a lot! Practice ML algorithms.",
    isApproved: false,
  },
];

const InterviewExp = () => {
  const navigate = useNavigate();

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
        Interview Experiences
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate("/addInterviewExperience")}
      >
        Add New Experience
      </Button>
      <InterviewExperiencesTable data={interviewData} />
    </Box>
  );
};

export default InterviewExp;
