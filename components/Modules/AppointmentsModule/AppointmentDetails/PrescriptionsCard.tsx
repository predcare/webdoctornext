'use client';

import CustomTable from '@/components/ui/CustomTable/CustomTable';
import type { AppointmentPrescription } from '@/resources/mock';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Box, Button, TableCell, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

const headList = ['Medicine', 'Dosage', 'Frequency', 'Duration', 'Instructions', 'Sent On'];

type PrescriptionsCardProps = {
  prescriptions: AppointmentPrescription[];
  prescribedBy: string;
};

function PrescriptionsCard({ prescriptions, prescribedBy }: PrescriptionsCardProps) {
  const count = prescriptions.length;
  const sentOn = prescriptions[0]?.sentOn;

  return (
    <Box className="detail-card">
      <Box className="card-head">
        <Box className="card-head-title">
          <Box component="span" className="card-icon">
            <ReceiptLongIcon />
          </Box>
          <Box className="card-title-copy">
            <Typography component="h3" className="card-title">
              Prescriptions sent to patient
            </Typography>
            <Typography component="p" className="card-subtitle">
              {count} {count === 1 ? 'medicine' : 'medicines'} · Prescribed by {prescribedBy}
            </Typography>
          </Box>
        </Box>
        <Button
          className="head-action"
          variant="outlined"
          size="small"
          startIcon={<MedicalServicesOutlinedIcon fontSize="inherit" />}
        >
          Open Consultation
        </Button>
      </Box>

      <CustomTable
        className="prescription-table"
        headList={headList}
        page={1}
        totalPages={1}
        zebraStriping={false}
        isEmpty={count === 0}
        emptyText="No prescriptions yet"
        emptyDescription="No prescription has been sent to the patient for this appointment yet."
      >
        {prescriptions.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Box className="medicine-cell">
                <Box component="span" className="medicine-icon">
                  <MedicationOutlinedIcon />
                </Box>
                <Box>
                  <Typography component="p" className="cell-title">
                    {item.medicine}
                  </Typography>
                  <Typography component="p" className="cell-note">
                    {item.form}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography component="p" className="cell-title">
                {item.dosage}
              </Typography>
              <Typography component="p" className="cell-note">
                {item.timing}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="span" className="frequency-pill">
                {item.frequency}
              </Typography>
            </TableCell>
            <TableCell>{item.duration}</TableCell>
            <TableCell className="cell-muted">{item.instructions}</TableCell>
            <TableCell>{item.sentOn}</TableCell>
          </TableRow>
        ))}
      </CustomTable>

      {sentOn ? <Box className="card-foot">Sent to patient on {sentOn}</Box> : null}
    </Box>
  );
}

export default memo(PrescriptionsCard);
