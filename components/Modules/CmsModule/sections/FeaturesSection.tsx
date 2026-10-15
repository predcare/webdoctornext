"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  iconSrc: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Online Consulting",
    description:
      "Enable patients to securely connect with doctors from home via video or audio calls.",
    iconSrc: "https://stage.predcare.in/images/icons/11.png",
  },
  {
    id: 2,
    title: "Appointment Booking System",
    description:
      "Schedule appointments effortlessly using our advanced booking system",
    iconSrc: "https://stage.predcare.in/images/icons/appointment-booking-1.png",
  },
  {
    id: 3,
    title: "Electronic Medical Records",
    description:
      "Store, Manage, and Access patient medical information",
    iconSrc:
      "https://stage.predcare.in/images/icons/electronic-medical-records-emr-1.png",
  },
  {
    id: 4,
    title: "Queue Management System",
    description: "Digital Queue System for superior customer experience",
    iconSrc:
      "https://stage.predcare.in/images/icons/queue-management-2-1.png",
  },
  {
    id: 5,
    title: "Digital Prescription",
    description:
      "Now Prescription made easy! Go Digital with E-Prescription",
    iconSrc: "https://stage.predcare.in/images/icons/e-prescription-4.png",
  },
  {
    id: 6,
    title: "Multi Centre - Multi Doctor",
    description:
      "Manage multiple doctors and centres at your fingertips",
    iconSrc: "https://stage.predcare.in/images/icons/doctor-centres-1.png",
  },
  {
    id: 7,
    title: "Clinic Staff Manager",
    description:
      "Enable staff to manage doctor schedules, patient queues, and workflows efficiently.",
    iconSrc: "https://stage.predcare.in/images/icons/14.png",
  },
  {
    id: 8,
    title: "Multi Language Support",
    description:
      "Inclusive interface supporting multiple languages for diverse patient needs.",
    iconSrc: "https://stage.predcare.in/images/icons/multi-language-1.png",
  },
  {
    id: 9,
    title: "WhatsApp Business Integration",
    description:
      "Seamlessly communicate and send updates to patients via WhatsApp.",
    iconSrc: "https://stage.predcare.in/images/icons/WhatsApp-Chatbot.png",
  },
];

interface FeaturesSectionProps {
  onRegisterClick?: () => void;
}

const FeaturesSection = ({ onRegisterClick }: FeaturesSectionProps) => {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: "#F8FAFC", // slate-50
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 7, md: 9 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "#2563EB",
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              display: "block",
              mb: 1,
            }}
          >
            PRED Care
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              color: "#0F172A", // slate-900
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            Clinic Management App
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748B", // slate-500
              fontSize: { xs: "1rem", md: "1.125rem" },
              maxWidth: 640,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Streamline your practice with our comprehensive suite of tools
            designed for modern healthcare providers.
          </Typography>
        </Box>

        {/* Features 3-Column Grid */}
        <Grid
          id="features"
          container
          spacing={{ xs: 3, md: 4 }}
          sx={{ mb: { xs: 7, md: 9 } }}
        >
          {FEATURES.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  bgcolor: "#FFFFFF",
                  p: { xs: 3, sm: 4 },
                  borderRadius: "20px",
                  border: "1px solid rgba(59, 130, 246, 0.09)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 14px 28px -4px rgba(37, 99, 235, 0.09)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 0,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "&:last-child": { pb: 0 },
                  }}
                >
                  {/* Icon Container */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.iconSrc}
                      alt={item.title}
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#0F172A",
                      mb: 1.5,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.95rem",
                      color: "#64748B",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            component="a"
            href="https://stage.predcare.in/doctor/register"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (onRegisterClick) {
                e.preventDefault();
                onRegisterClick();
              }
            }}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "#2563EB",
              color: "#FFFFFF",
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              fontWeight: 600,
              py: { xs: 1.75, md: 2 },
              px: { xs: 4, md: 6 },
              borderRadius: "50px",
              textTransform: "none",
              boxShadow: "0 10px 25px -3px rgba(37, 99, 235, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#1D4ED8",
                boxShadow: "0 15px 30px -3px rgba(37, 99, 235, 0.5)",
                transform: "translateY(-3px)",
              },
            }}
          >
            Register Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
