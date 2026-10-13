'use client';

import { Box, Paper, Typography } from '@mui/material';

const PatientLoginPage = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">
          Patient Login
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to PredCare Patient Portal. Page structure ready for UI design.
        </Typography>
      </Box>
    </Paper>
  );
};

export default PatientLoginPage;
