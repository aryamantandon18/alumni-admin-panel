import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

// Sample data for interview experiences
const interviewData = [
  {
    interviewExperienceId: 1,
    title: "Software Engineer Interview at Google",
    company: "Google",
    description: "My experience interviewing for a Software Engineer role at Google.",
    interviewBody: "It was a technical interview with 3 rounds.",
    interviewDate: "2024-06-15T10:00:00Z",
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
    interviewBody: "Had to complete a take-home assignment and 2 technical rounds.",
    interviewDate: "2024-07-10T14:00:00Z",
    onCampus: false,
    referral: true,
    anyTips: "Referrals help a lot! Practice ML algorithms.",
    isApproved: false,
  },
];

const ViewInterviewExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const foundExperience = interviewData.find(
      (exp) => exp.interviewExperienceId === numericId
    );
    setExperience(foundExperience || null);
  }, [numericId]);

  if (!experience) {
    return <Typography variant="h6">Interview Experience not found</Typography>;
  }

  return (
    <Paper sx={{ padding: 4, maxWidth: 800, margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        {experience.title}
      </Typography>
      <Typography variant="h6">Company:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{experience.company}</Typography>
      <Typography variant="h6">Description:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{experience.description}</Typography>
      <Typography variant="h6">Interview Details:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{experience.interviewBody}</Typography>
      <Typography variant="h6">Interview Date:</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {new Date(experience.interviewDate).toLocaleDateString()}
      </Typography>
      <FormControlLabel
        control={<Switch checked={experience.onCampus} disabled />}
        label={experience.onCampus ? "On Campus" : "Off Campus"}
        sx={{ mb: 2, display: "block" }}
      />
      <FormControlLabel
        control={<Switch checked={experience.referral} disabled />}
        label={experience.referral ? "Referral Used" : "No Referral"}
        sx={{ mb: 2, display: "block" }}
      />
      {experience.anyTips && (
        <>
          <Typography variant="h6">Tips:</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{experience.anyTips}</Typography>
        </>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" onClick={() => navigate("/interview-experience")}>
          Back to Experiences
        </Button>
      </Box>
    </Paper>
  );
};

export default ViewInterviewExperience;