'use client';

import AppointmentRow from '@/components/Modules/AppointmentsModule/AppointmentRow';
import {
    todayAppointmentsHeadList,
    todayAppointmentsQueryParams,
} from '@/components/Modules/DahsboardModule/constants/dashboard.constants';
import TodayAppointmentsHeader from '@/components/Modules/DahsboardModule/TodayAppointments/TodayAppointmentsHeader';
import CustomActionMenu from '@/components/ui/CustomActionMenu/CustomActionMenu';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { useActionMenu } from '@/hooks/commons/useActionMenu';
import { useHomeUpcomingAppts } from '@/hooks/react-query/home/home.hooks';
import {
    _toTitleCase,
    formatDate,
    formatTimeSlot,
    getAge,
} from '@/lib/commons/common.utils';
import { showInDevelopment } from '@/lib/commons/toast';
import { projectRoutes } from '@/routes';
import { AppointmentListWrapper } from '@/styles/CustomStyled/AppointmentListWrapper';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { memo } from 'react';

function TodayAppointmentsTable() {
    const actionMenu = useActionMenu();
    const { data: upcomingAppts, isPending: upcomingApptsPending } =
        useHomeUpcomingAppts(todayAppointmentsQueryParams);

    return (
        <AppointmentListWrapper>
            <CustomTable
                className="appointment-table"
                headList={todayAppointmentsHeadList}
                customHeader={<TodayAppointmentsHeader />}
                isLoading={upcomingApptsPending}
                skeletonRows={2}
                isEmpty={!upcomingApptsPending && upcomingAppts?.data?.length === 0}
                emptyText="No appointments for today"
            >
                {upcomingAppts?.data?.map((apptInfo) => (
                    <AppointmentRow
                        key={apptInfo.id}
                        onOpenMenu={(anchor) =>
                            actionMenu.open(anchor, String(apptInfo.id))
                        }
                        patientName={apptInfo.patientInfo?.name || ''}
                        patientImage={apptInfo.patientInfo?.profileImage || ''}
                        patientCode={apptInfo.patientInfo?.displayPatientId || ''}
                        gender={_toTitleCase(apptInfo.patientInfo?.gender || '')}
                        age={getAge(apptInfo.patientInfo?.dateOfBirth || '')}
                        appointmentId={apptInfo.appointment_id}
                        appointmentDate={formatDate(apptInfo.appointment_date)}
                        appointmentTime={formatTimeSlot(
                            apptInfo.start_time,
                            apptInfo.end_time,
                        )}
                        appointmentStatus={apptInfo.appointment_status}
                        appointmentType={apptInfo.consultation_type}
                        onJoinCall={() => showInDevelopment()}
                    />
                ))}
            </CustomTable>

            <CustomActionMenu
                anchorEl={actionMenu.anchorEl}
                onClose={actionMenu.close}
                items={[
                    {
                        key: 'view',
                        label: 'View Details',
                        icon: <VisibilityOutlinedIcon />,
                        href: actionMenu.activeId
                            ? projectRoutes.appointmentDetails(actionMenu.activeId)
                            : undefined,
                        hidden: !actionMenu.activeId,
                        showChevron: true,
                    },
                ]}
            />
        </AppointmentListWrapper>
    );
}

export default memo(TodayAppointmentsTable);
