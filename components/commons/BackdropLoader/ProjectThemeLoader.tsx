'use client';

import { ProjectThemeLoaderWrapper } from '@/styles/CustomStyled/ProjectThemeLoaderWrapper';
import { Box, CircularProgress, Fade, Typography } from '@mui/material';
import Image from 'next/image';

type ProjectThemeLoaderProps = {
  isOpen?: boolean;
  message?: string;
};

const ProjectThemeLoader = ({
  isOpen = true,
  message = 'Preparing your workspace...',
}: ProjectThemeLoaderProps) => {
  return (
    <Fade in={isOpen} timeout={200} unmountOnExit>
      <ProjectThemeLoaderWrapper role="status" aria-live="polite" aria-busy={isOpen}>
        <Box className="loader-content">
          <Box className="loader-brand">
            <Box className="loader-glow" />
            <Box className="loader-logo-tile">
              <Image
                src="/assets/images/PRED_CARE_Logo_blue.png"
                alt="PredCare"
                width={120}
                height={120}
                priority
                className="loader-logo"
              />
            </Box>
          </Box>

          <Box className="loader-progress">
            <CircularProgress
              variant="determinate"
              value={100}
              size={30}
              thickness={3}
              className="loader-progress-track"
            />
            <CircularProgress
              size={30}
              thickness={3}
              className="loader-progress-spinner"
              aria-label="Loading"
            />
          </Box>

          <Typography component="p" className="loader-message">
            {message || 'Preparing your workspace...'}
          </Typography>
        </Box>
      </ProjectThemeLoaderWrapper>
    </Fade>
  );
};

export default ProjectThemeLoader;
