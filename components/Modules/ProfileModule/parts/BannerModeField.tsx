'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import CustomRadioGroup from '@/components/ui/CustomRadio/CustomRadio';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type BannerModeFieldProps = {
  name: string;
  title: string;
  defaultNote: string;
  modeValue?: string;
  onModeChange?: (mode: string) => void;
  textValue?: string;
  onTextChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onFileChange?: (file: File | null) => void;
  file?: File | null;
  existingImageUrl?: string | null;
  error?: string;
};

export default function BannerModeField({
  name,
  title,
  defaultNote,
  modeValue,
  onModeChange,
  textValue,
  onTextChange,
  onFileChange,
  file,
  existingImageUrl,
  error,
}: BannerModeFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

  return (
    <Box className="mode-block">
      <Typography component="h3" className="block-title">
        {title}
      </Typography>
      <CustomRadioGroup
        name={name}
        ariaLabel={title}
        variant="segmented"
        value={modeValue}
        defaultValue="default"
        onChange={onModeChange}
        options={[
          {
            value: 'default',
            label: 'Default',
            icon: <ViewAgendaOutlinedIcon />,
          },
          {
            value: 'html',
            label: 'Custom Editor',
            icon: <EditOutlinedIcon />,
          },
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
          value={textValue ?? ''}
          onChange={onTextChange}
          placeholder="Write the custom content that should appear in this area..."
          error={!!error}
          helperText={error}
        />
      </Box>
      <Box className="mode-panel mode-image">
        <input
          className="native-file"
          type="file"
          name={`${name}-image`}
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => onFileChange?.(e.target.files?.[0] || null)}
        />
        <Typography component="p" className="field-hint">
          PNG, JPG, or WEBP. This image replaces the default banner.
        </Typography>

        {(previewUrl || existingImageUrl) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 1,
              p: 1,
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              bgcolor: 'background.paper',
            }}
          >
            <Box
              component="img"
              src={previewUrl || existingImageUrl!}
              alt={`${title} Preview`}
              sx={{
                maxHeight: 70,
                maxWidth: 240,
                objectFit: 'contain',
                borderRadius: '4px',
              }}
            />
            {previewUrl && (
              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => onFileChange?.(null)}
              >
                Remove
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
