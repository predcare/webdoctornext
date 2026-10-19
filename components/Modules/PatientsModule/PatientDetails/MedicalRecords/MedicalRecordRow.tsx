'use client';

import CustomSwitch from '@/components/ui/CustomSwitch/CustomSwitch';
import InfoTooltip from '@/components/ui/InfoTooltip/InfoTooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'heic'];

const getDocTypeTone = (type: string) => {
  const value = type.toLowerCase();
  if (value.includes('ecg')) return 'danger';
  if (value.includes('mri')) return 'info';
  if (value.includes('ct')) return 'warning';
  if (value.includes('lab')) return 'success';
  return 'teal';
};

type MedicalRecordRowProps = {
  title: string;
  fileName: string;
  fileSize: string;
  description: string;
  documentType: string;
  uploadedBy: string;
  uploadedFrom: string;
  uploadDate: string;
  uploadTime: string;
  isVisible: boolean;
  isVisibilityUpdating?: boolean;
  onToggleVisibility: (visible: boolean) => void;
  onView: () => void;
  onDownload: () => void;
  onDelete: () => void;
};

function MedicalRecordRow({
  title,
  fileName,
  fileSize,
  description,
  documentType,
  uploadedBy,
  uploadedFrom,
  uploadDate,
  uploadTime,
  isVisible,
  isVisibilityUpdating,
  onToggleVisibility,
  onView,
  onDownload,
  onDelete,
}: MedicalRecordRowProps) {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
  const FileIcon = IMAGE_EXTENSIONS.includes(extension)
    ? ImageOutlinedIcon
    : extension === 'pdf'
      ? PictureAsPdfOutlinedIcon
      : DescriptionOutlinedIcon;
  const fileMeta = [extension.toUpperCase(), fileSize]
    .filter(Boolean)
    .join(' · ');

  return (
    <TableRow>
      <TableCell>
        <Box className="doc-cell">
          <Box component="span" className="doc-icon">
            <FileIcon />
          </Box>
          <Box className="stack-cell">
            <Typography
              component="p"
              className="cell-title ellipsis"
              title={title}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              className="cell-note ellipsis"
              title={description || fileMeta}
            >
              {description || fileMeta}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        {documentType ? (
          <Box
            component="span"
            className={`tag ${getDocTypeTone(documentType)}`}
          >
            {documentType}
          </Box>
        ) : (
          '—'
        )}
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {uploadedBy}
          </Typography>
          {uploadedFrom ? (
            <Typography component="p" className="cell-note">
              via {uploadedFrom}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell>
        <Box className="stack-cell">
          <Typography component="p" className="cell-title">
            {uploadDate}
          </Typography>
          <Typography component="p" className="cell-note">
            {uploadTime}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="visibility-cell">
          <CustomSwitch
            size="medium"
            checked={isVisible}
            disabled={isVisibilityUpdating}
            onChange={onToggleVisibility}
            ariaLabel={`Toggle patient visibility for ${title}`}
          />
          <Box
            component="span"
            className={`tag ${isVisible ? 'success' : 'neutral'}`}
          >
            {isVisible ? 'Visible' : 'Hidden'}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box className="row-icons">
          <InfoTooltip
            content="View Document"
            ariaLabel={`View ${title}`}
            className="icon-action"
            onClick={onView}
            icon={<VisibilityOutlinedIcon />}
          />
          <InfoTooltip
            content="Download"
            ariaLabel={`Download ${title}`}
            className="icon-action"
            onClick={onDownload}
            icon={<FileDownloadOutlinedIcon />}
          />
          <InfoTooltip
            content="Delete"
            ariaLabel={`Delete ${title}`}
            className="icon-action danger"
            onClick={onDelete}
            icon={<DeleteOutlineIcon />}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default memo(MedicalRecordRow);
