'use client';

import { queryClient } from '@/components/Providers/ReactQueryProvider';
import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';
import {
  usePolicies,
  usePostPolicyAcceptance,
} from '@/hooks/react-query/policies/policies.hooks';
import { getProfile } from '@/hooks/react-query/profile/profile.funcs';
import { ProfileQueryKeys } from '@/hooks/react-query/query.keys';
import { navigateTo } from '@/lib/commons/common.utils';
import { showSuccessToast } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { PolicyAcceptanceWrapper } from '@/styles/CustomStyled/PolicyAcceptanceWrapper';
import { IPolicyAcceptancePayload } from '@/typescripts/interfaces/policies.interfaces';
import { useAuthStore } from '@/zustand/stores/useAuthStore';
import { useLoadingStore } from '@/zustand/stores/useLoadingStore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PolicyViewerModal, {
  PolicyItemType,
} from './Modals/PolicyViewerModal';
import PolicyAcceptanceSkeleton from './Skeletons/PolicyAcceptanceSkeleton';

const PolicyAcceptancePage = () => {
  const router = useRouter();
  const { data: allPolicies, isPending: isLoadingPolicies } = usePolicies();
  const { logout, setUserData } = useAuthStore((state) => state);
  const { hideLoader, showLoader } = useLoadingStore((state) => state);
  const { mutate: postPolicyAcceptanceMutation, isPending: isPosting } =
    usePostPolicyAcceptance();

  const [selectedPolicyItem, setSelectedPolicyItem] =
    useState<PolicyItemType | null>(null);
  const [formStates, setFormStates] = useState<IPolicyAcceptancePayload>({
    audience: 'doctor',
    source: 'web_portal',
    documents: [],
  });

  const termsData = allPolicies?.terms;
  const privacyData = allPolicies?.privacy_policy;
  const consentData = allPolicies?.informed_consent;

  const isAgreedTermsAndPrivacy =
    Boolean(formStates.documents?.some((d) => d.document_kind === 'terms')) &&
    Boolean(formStates.documents?.some((d) => d.document_kind === 'privacy'));

  const isAgreedConsent = Boolean(
    formStates.documents?.some((d) => d.document_kind === 'informed_consent'),
  );
  const isFormValid = isAgreedTermsAndPrivacy && isAgreedConsent;

  const toggleTermsAndPrivacy = () => {
    setFormStates((prev) => {
      const existingDocs = prev.documents || [];
      if (isAgreedTermsAndPrivacy) {
        return {
          ...prev,
          documents: existingDocs.filter(
            (d) =>
              d.document_kind !== 'terms' && d.document_kind !== 'privacy',
          ),
        };
      }
      const newDocs = existingDocs.filter(
        (d) => d.document_kind !== 'terms' && d.document_kind !== 'privacy',
      );
      if (termsData) {
        newDocs.push({
          document_kind: 'terms',
          document_id: Number(termsData.id),
          document_version: termsData.version,
        });
      }
      if (privacyData) {
        newDocs.push({
          document_kind: 'privacy',
          document_id: Number(privacyData.id),
          document_version: privacyData.version,
        });
      }
      return { ...prev, documents: newDocs };
    });
  };

  const toggleConsent = () => {
    setFormStates((prev) => {
      const existingDocs = prev.documents || [];
      if (isAgreedConsent) {
        return {
          ...prev,
          documents: existingDocs.filter(
            (d) => d.document_kind !== 'informed_consent',
          ),
        };
      }
      const newDocs = existingDocs.filter(
        (d) => d.document_kind !== 'informed_consent',
      );
      if (consentData) {
        newDocs.push({
          document_kind: 'informed_consent',
          document_id: Number(consentData.id),
          document_version: consentData.version,
        });
      }
      return { ...prev, documents: newDocs };
    });
  };

  const handleAccept = () => {
    if (!isFormValid) return;
    showLoader('Submitting your response...');
    postPolicyAcceptanceMutation(formStates, {
      onSuccess: async (res) => {
        if (res?.success) {
          const profileRes = await getProfile();
          if (profileRes?.data) {
            queryClient.setQueryData([ProfileQueryKeys.Profile], profileRes);
            setUserData(profileRes.data);
          }
          hideLoader();
          router.replace(projectRoutes.dashboard);
        } else {
          hideLoader();
        }
      },
      onError: () => {
        hideLoader();
      },
    });
  };

  const handleSignOut = async () => {
    await logout();
    showSuccessToast("Signed out successfully");
    navigateTo(projectRoutes.doctorLogin, true);
  };

  const openPolicyModal = (policy?: PolicyItemType) => {
    if (policy) setSelectedPolicyItem(policy);
  };

  return (
    <>
      <PolicyAcceptanceWrapper elevation={0}>
        <Box className="policy-header">
          <Typography className="policy-title">
            Review & Accept Policies
          </Typography>
          <Typography className="policy-subtitle">
            Please review and accept the latest Doctor policies to continue.
          </Typography>
        </Box>

        {isLoadingPolicies ? (
          <PolicyAcceptanceSkeleton />
        ) : (
          <>
            <Box className="doc-list">
              <Box
                component="button"
                type="button"
                className="doc-tile"
                onClick={() => openPolicyModal(termsData)}
              >
                <Box className="doc-tile-left">
                  <Box className="doc-icon-box">
                    <DescriptionOutlinedIcon fontSize="small" />
                  </Box>
                  <Box className="doc-meta">
                    <Box className="doc-title-row">
                      <Typography className="doc-title" noWrap>
                        {termsData?.title || 'Terms of Use'}
                      </Typography>
                      <Typography className="doc-version" component="span">
                        v{termsData?.version || 1}
                      </Typography>
                    </Box>
                    <Typography className="doc-subtext">
                      Doctor Terms & Service Guidelines
                    </Typography>
                  </Box>
                </Box>
                <Box className="doc-action">
                  View
                  <ChevronRightIcon fontSize="small" />
                </Box>
              </Box>

              <Box
                component="button"
                type="button"
                className="doc-tile"
                onClick={() => openPolicyModal(privacyData)}
              >
                <Box className="doc-tile-left">
                  <Box className="doc-icon-box">
                    <ShieldOutlinedIcon fontSize="small" />
                  </Box>
                  <Box className="doc-meta">
                    <Box className="doc-title-row">
                      <Typography className="doc-title" noWrap>
                        {privacyData?.title || 'Privacy Policy'}
                      </Typography>
                      <Typography className="doc-version" component="span">
                        v{privacyData?.version || 1}
                      </Typography>
                    </Box>
                    <Typography className="doc-subtext">
                      Data Protection & Privacy Policy
                    </Typography>
                  </Box>
                </Box>
                <Box className="doc-action">
                  View
                  <ChevronRightIcon fontSize="small" />
                </Box>
              </Box>

              <Box
                component="button"
                type="button"
                className="doc-tile"
                onClick={() => openPolicyModal(consentData)}
              >
                <Box className="doc-tile-left">
                  <Box className="doc-icon-box">
                    <CheckCircleOutlineIcon fontSize="small" />
                  </Box>
                  <Box className="doc-meta">
                    <Box className="doc-title-row">
                      <Typography className="doc-title" noWrap>
                        {consentData?.title || 'Informed Consent'}
                      </Typography>
                      <Typography className="doc-version" component="span">
                        v{consentData?.version || 1}
                      </Typography>
                    </Box>
                    <Typography className="doc-subtext">
                      Doctor Informed Consent Policy
                    </Typography>
                  </Box>
                </Box>
                <Box className="doc-action">
                  View
                  <ChevronRightIcon fontSize="small" />
                </Box>
              </Box>
            </Box>

            <Box className="notice-box">
              <InfoOutlinedIcon fontSize="small" sx={{ mt: '2px' }} />
              <Typography className="notice-text">
                These are the current published versions for doctors. If
                policies are updated, you will be notified to accept before
                accessing portal features.
              </Typography>
            </Box>
          </>
        )}

        <Box className="policy-divider" />

        <Box className="checkbox-list">
          <CustomCheckbox
            name="agreeTermsAndPrivacy"
            checked={isAgreedTermsAndPrivacy}
            onChange={() => toggleTermsAndPrivacy()}
            size="small"
            variant="card"
            label={
              <>
                I have read and agree to the{' '}
                <Box
                  component="span"
                  className="policy-link"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openPolicyModal(termsData);
                  }}
                >
                  Terms of Use
                </Box>{' '}
                and{' '}
                <Box
                  component="span"
                  className="policy-link"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openPolicyModal(privacyData);
                  }}
                >
                  Privacy Policy
                </Box>
              </>
            }
          />

          <CustomCheckbox
            name="agreeConsent"
            checked={isAgreedConsent}
            onChange={() => toggleConsent()}
            size="small"
            variant="card"
            label={
              <>
                I have read and agree to the{' '}
                <Box
                  component="span"
                  className="policy-link"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openPolicyModal(consentData);
                  }}
                >
                  Informed Consent Policy
                </Box>
              </>
            }
          />
        </Box>

        <Box className="button-group">
          <Button
            variant="contained"
            className="accept-btn"
            disabled={!isFormValid || isPosting}
            onClick={handleAccept}
          >
            {isPosting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              'Accept & Continue'
            )}
          </Button>
          <Button
            variant="text"
            className="signout-btn"
            startIcon={<LogoutIcon />}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </Box>
      </PolicyAcceptanceWrapper>

      <PolicyViewerModal
        open={Boolean(selectedPolicyItem)}
        policy={selectedPolicyItem}
        onClose={() => setSelectedPolicyItem(null)}
      />
    </>
  );
};


export default PolicyAcceptancePage;
