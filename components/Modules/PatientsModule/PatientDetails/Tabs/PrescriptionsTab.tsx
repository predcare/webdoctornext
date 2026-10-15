'use client';

import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

const headList = ['Date', 'Diagnosis', 'Medications', 'Follow-up', 'Status', 'Actions'];

function PrescriptionsTab() {
  return (
    <PatientTabContentWrapper>
      <TabSectionCard title="Prescriptions" icon={<MedicationOutlinedIcon />} actionLabel="New Prescription">
        <CustomTable className="tab-table" headList={headList} zebraStriping={false}>
          <TableRow>
            <TableCell>
              <Box className="stack-cell">
                <Typography component="p" className="cell-title">
                  13 Oct 2026
                </Typography>
                <Typography component="p" className="cell-note">
                  10:51 AM
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box className="stack-cell">
                <Typography component="p" className="cell-title">
                  Viral Fever
                </Typography>
                <Typography component="p" className="cell-note">
                  Fever, body ache and mild headache
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box component="span" className="tag info">
                2 meds
              </Box>
            </TableCell>
            <TableCell>
              <Typography component="p" className="cell-title">
                18 Nov 2026
              </Typography>
            </TableCell>
            <TableCell>
              <Box component="span" className="tag success">
                Completed
              </Box>
            </TableCell>
            <TableCell>
              <Box className="row-icons">
                <IconButton className="icon-action" aria-label="View prescription">
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton className="icon-action" aria-label="Edit prescription">
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        </CustomTable>
      </TabSectionCard>
    </PatientTabContentWrapper>
  );
}

export default memo(PrescriptionsTab);
