'use client';

import CustomModal from '@/components/ui/CustomModal/CustomModal';
import { PolicyContentModalWrapper } from '@/styles/CustomStyled/PolicyAcceptanceWrapper';
import {
  IInformedConsent,
  IPrivacy,
  ITerms,
} from '@/typescripts/interfaces/policies.interfaces';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Box, Typography } from '@mui/material';

export type PolicyItemType = ITerms | IPrivacy | IInformedConsent;

export interface PolicyViewerModalProps {
  open: boolean;
  policy: PolicyItemType | null;
  onClose: () => void;
}



const renderFormattedContent = (rawContent: string) => {
  if (!rawContent) {
    return (
      <Typography className="policy-empty">
        No policy content available.
      </Typography>
    );
  }

  const lines = rawContent.split(/\r?\n/);

  return lines.map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <Box key={index} className="policy-spacer" />;
    }

    const isHeading = /^\d+\.\s+/.test(trimmed);
    const isBullet = trimmed.startsWith('-');

    if (isHeading) {
      return (
        <Typography key={index} className="policy-heading">
          {trimmed}
        </Typography>
      );
    }

    if (isBullet) {
      return (
        <Box key={index} className="policy-bullet">
          <Box className="policy-bullet-mark" />
          <Typography className="policy-bullet-text">
            {trimmed.replace(/^-\s*/, '')}
          </Typography>
        </Box>
      );
    }

    return (
      <Typography key={index} className="policy-paragraph">
        {trimmed}
      </Typography>
    );
  });
};

const PolicyViewerModal = ({
  open,
  policy,
  onClose,
}: PolicyViewerModalProps) => {
  return (
    <CustomModal
      open={open && Boolean(policy)}
      onClose={onClose}
      scroll="paper"
      className="policyViewerModal"
      isWhiteBg
      heading={policy?.title || 'Policy'}
      subheading="Please read this document carefully before accepting"
      headerIcon={<DescriptionOutlinedIcon />}
    >
      <PolicyContentModalWrapper>
        {policy ? (
          <>
            <Box className="policy-meta">
              <Typography className="policy-version-chip" component="span">
                Version {policy.version}
              </Typography>
            </Box>
            <Box className="policy-body">
              {renderFormattedContent(policy.content || '')}
            </Box>
          </>
        ) : (
          <Typography className="policy-empty">
            No policy content available.
          </Typography>
        )}
      </PolicyContentModalWrapper>
    </CustomModal>
  );
};

export default PolicyViewerModal;
