'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomRadioGroup from '@/components/ui/CustomRadio/CustomRadio';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import { Box, Typography } from '@mui/material';

type BannerModeFieldProps = {
  name: string;
  title: string;
  defaultNote: string;
};

export default function BannerModeField({
  name,
  title,
  defaultNote,
}: BannerModeFieldProps) {
  return (
    <Box className="mode-block">
      <Typography component="h3" className="block-title">
        {title}
      </Typography>
      <CustomRadioGroup
        name={name}
        ariaLabel={title}
        variant="segmented"
        defaultValue="default"
        options={[
          { value: 'default', label: 'Default', icon: <ViewAgendaOutlinedIcon /> },
          { value: 'editor', label: 'Custom Editor', icon: <EditOutlinedIcon /> },
          { value: 'image', label: 'Image', icon: <ImageOutlinedIcon /> },
        ]}
      />
      <Box className="mode-panel mode-default">
        <InfoOutlinedIcon />
        <Typography component="p">{defaultNote}</Typography>
      </Box>
      <Box className="mode-panel mode-editor">
        <CustomInput
          multiline
          minRows={4}
          name={`${name}-editor`}
          placeholder="Write the custom content that should appear in this area..."
        />
      </Box>
      <Box className="mode-panel mode-image">
        <input
          className="native-file"
          type="file"
          name={`${name}-image`}
          accept="image/png,image/jpeg,image/gif"
        />
        <Typography component="p" className="field-hint">
          PNG, JPG, or GIF. This image replaces the default banner.
        </Typography>
      </Box>
    </Box>
  );
}
