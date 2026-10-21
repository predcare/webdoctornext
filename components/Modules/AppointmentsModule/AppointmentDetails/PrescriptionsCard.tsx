'use client';

import CustomTable from '@/components/ui/CustomTable/CustomTable';
import InfoTooltip from '@/components/ui/InfoTooltip/InfoTooltip';
import { useGetPrescriptionByApptID } from '@/hooks/react-query/prescriptions/prescriptions.hooks';
import { _toTitleCase, formatDate, openInNewTab } from '@/lib/commons/common.utils';
import type { AppointmentPrescription } from '@/resources/mock';
import { projectRoutes } from '@/routes';
import type { IPatientPrescriptionDoc } from '@/typescripts/interfaces/prescriptions.interfaces';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import UnsubscribeOutlinedIcon from '@mui/icons-material/UnsubscribeOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { memo, useCallback } from 'react';

const headList = [
  'Prescription ID',
  'Doctor',
  'Clinic',
  'Diagnosis',
  'Email Status',
  'Date',
  'Actions',
];

type PrescriptionsCardProps = {
  appointmentId: string;
  prescriptions?: AppointmentPrescription[];
  prescribedBy?: string;
};

function PrescriptionsCard({
  appointmentId,
}: PrescriptionsCardProps) {
  const router = useRouter();

  const {
    data: prescriptionsData,
    isPending: isPrescriptionsPending,
  } = useGetPrescriptionByApptID({ appointmentId });

  const handleEdit = useCallback(
    (item: IPatientPrescriptionDoc) => {
      if (!item.patient_id) return;
      router.push(
        projectRoutes.managePrescription({
          patientId: String(item.patient_id),
          prescriptionId: item.prescription_id,
        }),
      );
    },
    [router],
  );

  return (
    <Box className="detail-card">
      <Box className="card-head">
        <Box className="card-head-title">
          <Box component="span" className="card-icon">
            <ReceiptLongIcon />
          </Box>
          <Box className="card-title-copy">
            <Typography component="h3" className="card-title">
              Prescriptions
            </Typography>
          </Box>
        </Box>
      </Box>

      <CustomTable
        className="prescription-table"
        headList={headList}
        zebraStriping={false}
        isLoading={isPrescriptionsPending}
        isEmpty={!isPrescriptionsPending && (!prescriptionsData || prescriptionsData.length === 0)}
        emptyText="No prescriptions yet"
        emptyDescription="No prescription has been sent to the patient for this appointment yet."
      >
        {prescriptionsData?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="col-prescription-id">
              <Typography component="p" className="cell-title">
                {item.prescription_id ? `#${item.prescription_id}` : '-'}
              </Typography>
              {item.type && (
                <Typography component="p" className="cell-note">
                  {_toTitleCase(item.type)}
                </Typography>
              )}
            </TableCell>

            <TableCell className="col-doctor">
              <Typography component="p" className="cell-title">
                {item.doctor_name || '-'}
              </Typography>
              {item.doctor_specialization && (
                <Typography component="p" className="cell-note">
                  {item.doctor_specialization}
                </Typography>
              )}
            </TableCell>

            <TableCell className="col-clinic">
              <Typography component="p" className="cell-title">
                {item.clinic_name || '-'}
              </Typography>
              {item.clinic_phone && (
                <Typography component="p" className="cell-note">
                  {item.clinic_phone}
                </Typography>
              )}
            </TableCell>

            <TableCell className="col-diagnosis">
              <Typography
                component="p"
                className="cell-title ellipsis"
                title={item.diagnosis || undefined}
              >
                {item.diagnosis || '-'}
              </Typography>
              {(item.symptoms || item.chief_complaints) && (
                <Typography
                  component="p"
                  className="cell-note ellipsis"
                  title={item.symptoms || item.chief_complaints || undefined}
                >
                  {item.symptoms || item.chief_complaints}
                </Typography>
              )}
            </TableCell>

            <TableCell className="col-email-status">
              {item.email_sent_at ? (
                <Box>
                  <Box component="span" className="email-status-pill sent">
                    <MarkEmailReadOutlinedIcon />
                    Sent
                  </Box>
                  <Typography component="p" className="cell-note">
                    {formatDate(item.email_sent_at, 'DD MMM, hh:mm A')}
                  </Typography>
                </Box>
              ) : (
                <Box component="span" className="email-status-pill not-sent">
                  <UnsubscribeOutlinedIcon />
                  Not Sent
                </Box>
              )}
            </TableCell>

            <TableCell className="col-date">
              <Typography component="p" className="cell-title">
                {item.consultation_date || item.created_at
                  ? formatDate(item.consultation_date || item.created_at)
                  : '-'}
              </Typography>
              {item.created_at && (
                <Typography component="p" className="cell-note">
                  {formatDate(item.created_at, 'hh:mm A')}
                </Typography>
              )}
            </TableCell>

            <TableCell className="col-actions">
              <Box className="table-actions">
                {item.pdf_url ? (
                  <InfoTooltip
                    content="View Prescription"
                    ariaLabel={`View prescription ${item.prescription_id || ''}`}
                    onClick={() => openInNewTab(item.pdf_url)}
                    icon={<VisibilityOutlinedIcon fontSize="small" />}
                  />
                ) : null}
                {item.patient_id ? (
                  <InfoTooltip
                    content="Edit Prescription"
                    ariaLabel={`Edit prescription ${item.prescription_id || ''}`}
                    onClick={() => handleEdit(item)}
                    icon={<EditOutlinedIcon fontSize="small" />}
                  />
                ) : null}
                {!item.pdf_url && !item.patient_id ? '-' : null}
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
    </Box>
  );
}

export default memo(PrescriptionsCard);
