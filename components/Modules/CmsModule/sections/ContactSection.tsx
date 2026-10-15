'use client';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';

const CONTACT_INFO = [
  {
    id: 'email',
    title: 'Email Us',
    description: 'Our friendly team is here to help.',
    actionText: 'info@predcare.in',
    actionHref: 'mailto:info@predcare.in',
    icon: <EmailOutlinedIcon />,
  },
  {
    id: 'phone',
    title: 'Call Us / WhatsApp',
    description: 'Mon-Sat from 9:30 am to 6:30 pm.',
    actionText: '+91 9880210103',
    actionHref: 'tel:+919880210103',
    icon: <PhoneOutlinedIcon />,
  },
  {
    id: 'office',
    title: 'Office',
    description: 'Koramangala, Bangalore, India',
    actionText: null,
    actionHref: null,
    icon: <LocationOnOutlinedIcon />,
  },
];

const ContactSection = () => {
  return (
    <Box id="contact" className="cms-contact" component="section">
      <Container maxWidth="lg">
        <Box className="section-heading section-heading-compact">
          <Typography className="section-title contact-title-main" variant="h2">
            Get in Touch
          </Typography>
          <Typography className="section-lead" variant="body1">
            Have questions about our software? Our team is ready to help.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {CONTACT_INFO.map((item) => (
            <Grid key={item.id} size={{ xs: 12, md: 4 }}>
              <Card className="contact-card" elevation={0}>
                <CardContent>
                  <Box className="contact-icon">{item.icon}</Box>

                  <Typography className="contact-title" variant="h3">
                    {item.title}
                  </Typography>

                  <Typography
                    className={
                      item.actionText
                        ? 'contact-text'
                        : 'contact-text contact-text-last'
                    }
                    variant="body2"
                  >
                    {item.description}
                  </Typography>

                  {item.actionText && item.actionHref && (
                    <Link
                      className="contact-link"
                      href={item.actionHref}
                      underline="hover"
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
