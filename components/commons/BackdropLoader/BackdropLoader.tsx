import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

type TBackdropLoaderProps = {
  open: boolean;
  text?: string;
  blur?: number; // optional blur strength
};

const BackdropLoader: React.FC<TBackdropLoaderProps> = ({ open, text = 'Loading...', blur }) => {
  if (!open) return null;
  return (
    <Backdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: 1301,
        flexDirection: 'column',
        backdropFilter: blur ? `blur(${blur}px)` : 'none',
      }}
    >
      <CircularProgress color='inherit' />
      <Box sx={{ mt: 2 }}>
        <Typography variant='h6' component='div' color='inherit'>
          {text}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default BackdropLoader;
