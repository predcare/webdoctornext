"use client";
/* eslint-disable @next/next/no-img-element -- landing images stay native img tags inside figure */

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
    description: "Store, Manage, and Access patient medical information",
    iconSrc:
      "https://stage.predcare.in/images/icons/electronic-medical-records-emr-1.png",
  },
  {
    id: 4,
    title: "Queue Management System",
    description: "Digital Queue System for superior customer experience",
    iconSrc: "https://stage.predcare.in/images/icons/queue-management-2-1.png",
  },
  {
    id: 5,
    title: "Digital Prescription",
    description: "Now Prescription made easy! Go Digital with E-Prescription",
    iconSrc: "https://stage.predcare.in/images/icons/e-prescription-4.png",
  },
  {
    id: 6,
    title: "Multi Centre - Multi Doctor",
    description: "Manage multiple doctors and centres at your fingertips",
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
    <Box id="about" className="cms-features" component="section">
      <Container maxWidth="lg">
        <Box className="section-heading">
          <Typography
            className="section-eyebrow section-eyebrow-accent"
            variant="overline"
          >
            PRED Care
          </Typography>

          <Typography className="section-title" variant="h2">
            Clinic Management App
          </Typography>

          <Typography className="section-lead" variant="body1">
            Streamline your practice with our comprehensive suite of tools
            designed for modern healthcare providers.
          </Typography>
        </Box>

        <Grid
          id="features"
          className="feature-grid"
          container
          spacing={{ xs: 3, md: 4 }}
        >
          {FEATURES.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card className="feature-card" elevation={0}>
                <CardContent>
                  <figure className="media feature-icon">
                    <img src={item.iconSrc} alt={item.title} />
                  </figure>

                  <Typography className="feature-title" variant="h3">
                    {item.title}
                  </Typography>

                  <Typography className="feature-text" variant="body2">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className="features-cta">
          <Button
            className="register-cta"
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
          >
            Register Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
