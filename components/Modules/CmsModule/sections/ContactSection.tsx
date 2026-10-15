"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";

const CONTACT_INFO = [
  {
    id: "email",
    title: "Email Us",
    description: "Our friendly team is here to help.",
    actionText: "info@predcare.in",
    actionHref: "mailto:info@predcare.in",
    icon: <EmailOutlinedIcon sx={{ fontSize: 28, color: "#2563EB" }} />,
  },
  {
    id: "phone",
    title: "Call Us / WhatsApp",
    description: "Mon-Sat from 9:30 am to 6:30 pm.",
    actionText: "+91 9880210103",
    actionHref: "tel:+919880210103",
    icon: <PhoneOutlinedIcon sx={{ fontSize: 28, color: "#2563EB" }} />,
  },
  {
    id: "office",
    title: "Office",
    description: "Koramangala, Bangalore, India",
    actionText: null,
    actionHref: null,
    icon: <LocationOnOutlinedIcon sx={{ fontSize: 28, color: "#2563EB" }} />,
  },
];

const ContactSection = () => {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 8, md: 12 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "2.75rem" },
              fontWeight: 700,
              color: "#0F172A",
              mb: 1.5,
              letterSpacing: "-0.02em",
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#64748B",
              fontSize: { xs: "1rem", md: "1.125rem" },
            }}
          >
            Have questions about our software? Our team is ready to help.
          </Typography>
        </Box>

        {/* 3 Contact Cards */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {CONTACT_INFO.map((item) => (
            <Grid key={item.id} size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: "#F8FAFC",
                  p: { xs: 3.5, sm: 4.5 },
                  borderRadius: "20px",
                  border: "1px solid rgba(59, 130, 246, 0.09)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 25px -4px rgba(37, 99, 235, 0.08)",
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
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "16px",
                      bgcolor: "#EFF6FF", // blue-50
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#0F172A",
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.95rem",
                      color: "#64748B",
                      mb: item.actionText ? 1.5 : 0,
                    }}
                  >
                    {item.description}
                  </Typography>

                  {item.actionText && item.actionHref && (
                    <Link
                      href={item.actionHref}
                      underline="hover"
                      sx={{
                        color: "#2563EB",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#1D4ED8",
                        },
                      }}
                    >
                      {item.actionText}
                    </Link>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
