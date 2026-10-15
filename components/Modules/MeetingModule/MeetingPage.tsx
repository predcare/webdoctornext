'use client';

import { MeetingWrapper } from '@/styles/CustomStyled/MeetingWrapper';
import MeetingSidePanel from './MeetingSidePanel';
import MeetingStage from './MeetingStage';

export default function MeetingPage() {
  return (
    <MeetingWrapper>
      <MeetingStage />
      <MeetingSidePanel />
    </MeetingWrapper>
  );
}
