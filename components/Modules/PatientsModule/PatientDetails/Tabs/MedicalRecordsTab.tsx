'use client';

import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import UploadMedicalRecordModal from '@/components/Modules/PatientsModule/PatientDetails/Modal/UploadMedicalRecordModal';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import DeleteIcon from '@/components/ui/Icons/DeleteIcon';
import type { PatientDetails } from '@/resources/mock';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';

const headList = ['Document Title', 'Type', 'Uploaded By', 'Upload Date', 'Visibility', 'Actions'];

type MedicalRecordsTabProps = {
  details: PatientDetails;
};

function MedicalRecordsTab({ details }: MedicalRecordsTabProps) {
  const [uploadMedicalRecordModalOpen, setUploadMedicalRecordModalOpen] = useState(false);
  return (
    <PatientTabContentWrapper>
      <TabSectionCard title="Medical Records" icon={<FolderOutlinedIcon />} actionLabel="Add Record" actionOnClick={() => setUploadMedicalRecordModalOpen(true)}>
        <Box className="record-filters">
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              Search by Title
            </Typography>
            <TextField className="filter-input" placeholder="Search document title..." />
          </Box>
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              Filter by Category
            </Typography>
            <Select className="filter-select" defaultValue="all">
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="ecg">ECG Report</MenuItem>
              <MenuItem value="mri">MRI Scan</MenuItem>
              <MenuItem value="ct">CT Scan</MenuItem>
              <MenuItem value="lab">Lab Report</MenuItem>
            </Select>
          </Box>
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              From Date
            </Typography>
            <TextField className="filter-input" type="date" />
          </Box>
          <Box className="filter-field">
            <Typography component="p" className="filter-label">
              To Date
            </Typography>
            <TextField className="filter-input" type="date" />
          </Box>
          <Button className="reset-btn" variant="contained" disableElevation aria-label="Reset filters">
            <RefreshIcon fontSize="small" />
          </Button>
        </Box>

        <CustomTable className="tab-table wide" headList={headList} zebraStriping={false}>
          <TableRow>
            <TableCell>
              <Box className="doc-cell">
                <Box component="span" className="doc-icon">
                  <ImageOutlinedIcon />
                </Box>
                <Box className="stack-cell">
                  <Typography component="p" className="cell-title">
                    ECG Report
                  </Typography>
                  <Typography component="p" className="cell-note">
                    ecg-report-13-oct-2026.jpg
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box component="span" className="tag info">
                ECG Report
              </Box>
            </TableCell>
            <TableCell>
              <Box className="stack-cell">
                <Typography component="p" className="cell-title">
                  {details.name}
                </Typography>
                <Typography component="p" className="cell-note">
                  Patient
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box className="stack-cell">
                <Typography component="p" className="cell-title">
                  13 Oct 2026
                </Typography>
                <Typography component="p" className="cell-note">
                  10:48 AM
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box component="span" className="tag teal">
                <ShareOutlinedIcon />
                Shared with 1 doctor
              </Box>
            </TableCell>
            <TableCell>
              <Box className="row-icons">
                <IconButton className="icon-action" aria-label="View record">
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton className="icon-action" aria-label="Download record">
                  <FileDownloadOutlinedIcon />
                </IconButton>
                <IconButton className="icon-action danger" aria-label="Delete record">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        </CustomTable>
      </TabSectionCard>

      <UploadMedicalRecordModal open={uploadMedicalRecordModalOpen} onClose={() => setUploadMedicalRecordModalOpen(false)} />
    </PatientTabContentWrapper>
  );
}

export default memo(MedicalRecordsTab);
