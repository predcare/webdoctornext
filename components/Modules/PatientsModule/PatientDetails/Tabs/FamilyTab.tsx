'use client';

import TabSectionCard from '@/components/Modules/PatientsModule/PatientDetails/CardForms/TabSectionCard';
import AddFamilyMemberModal from '@/components/Modules/PatientsModule/PatientDetails/Modal/AddFamilyMemberModal';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { PatientTabContentWrapper } from '@/styles/CustomStyled/PatientTabContentWrapper';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { memo, useState } from 'react';

const headList = ['Name', 'Email', 'Phone'];

function FamilyTab() {
  const [addFamilyMemberModalOpen, setAddFamilyMemberModalOpen] = useState(false);
  return (
    <PatientTabContentWrapper>
      <TabSectionCard
        title="Family Members"
        icon={<FamilyRestroomOutlinedIcon />}
        actionLabel="Add Family Member"
        actionOnClick={() => setAddFamilyMemberModalOpen(true)}
      >
        <CustomTable
          className="tab-table narrow"
          headList={headList}
          zebraStriping={false}
        >
          <TableRow>
            <TableCell>
              <Box className="member-cell">
                <Box component="span" className="member-avatar">
                  S
                </Box>
                <Typography component="p" className="cell-title">
                  Sudha Roy Chowdhury
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Typography component="p" className="cell-title">
                sudha.roy@gmail.com
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="p" className="cell-title">
                9876543210
              </Typography>
            </TableCell>
          </TableRow>
        </CustomTable>
      </TabSectionCard>

      <AddFamilyMemberModal open={addFamilyMemberModalOpen} onClose={() => setAddFamilyMemberModalOpen(false)} />
    </PatientTabContentWrapper>
  );
}

export default memo(FamilyTab);
