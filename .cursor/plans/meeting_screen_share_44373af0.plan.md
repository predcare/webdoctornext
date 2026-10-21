---
name: Meeting screen share
overview: Add VideoSDK screen share, and stop the end-call handoff from flashing the no-session screen before the consultation summary.
todos:
  - id: media-hook
    content: Add toggleScreenShare and isScreenShareOn to useMeetingMedia from VideoSDK localScreenShareOn
    status: completed
  - id: control-bar
    content: Add share/stop button and participant screen indicator in MeetingControlBar
    status: completed
  - id: stage
    content: Render VideoPlayer type=share from presenterId on MeetingStage and RemoteStage
    status: completed
  - id: mini-player
    content: Show the active share and share toggle in MeetingMiniPlayer
    status: completed
  - id: styles
    content: Add is-sharing control styles and a stage share label in MeetingWrapper
    status: completed
  - id: end-call-handoff
    content: Keep callState ENDED while the token is cleared so MeetingPage shows the skeleton until the summary route is ready
    status: completed
isProject: false
---

# Screen share with VideoSDK

Screen share is already available on `@videosdk.live/react-sdk` (`^1.1.1`). `useMeeting()` returns `toggleScreenShare`, `localScreenShareOn`, and `presenterId`. `useParticipant()` returns `screenShareOn`, `screenShareStream`, and `setScreenShareQuality`. `VideoPlayer` with `type="share"` attaches that track.

Mic and camera stay as they are. Sharing starts only from the button click, because the browser display picker must come from a user gesture. The button follows `localScreenShareOn` after the promise settles, so cancelling the picker does not leave the control stuck on.

```mermaid
flowchart LR
  button[ControlBar button] --> toggle[toggleScreenShare]
  toggle --> sdk[VideoSDK presenterId]
  sdk --> stage[Main stage VideoPlayer type share]
  sdk --> mini[Mini player]
```

## Layout

When `presenterId` is set, the main stage shows that share. The doctor's camera stays in the existing local tile. When nobody is sharing, the stage stays the patient camera. The mini player uses the same rule so the share stays visible after leaving the meeting route.

## 1. Toggle in the media hook

In [hooks/commons/meeting/useMeetingMedia.ts](hooks/commons/meeting/useMeetingMedia.ts), read `localScreenShareOn` and `toggleScreenShare` from `useMeeting()`. Do not store this in Zustand. Mic and camera are stored because they seed the next join; share always starts off.

```ts
const { localScreenShareOn, toggleScreenShare } = useMeeting();

const handleToggleScreenShare = useCallback(async () => {
  try {
    await toggleScreenShare();
  } catch (error) {
    console.warn('Screen share failed:', error);
  }
}, [toggleScreenShare]);

return {
  // existing mic/camera fields
  isScreenShareOn: Boolean(localScreenShareOn),
  toggleScreenShare: handleToggleScreenShare,
};
```

Leaving the meeting already calls `leave()`, which stops the published share.

## 2. Control bar button

In [components/Modules/MeetingModule/MeetingControlBar.tsx](components/Modules/MeetingModule/MeetingControlBar.tsx), add the button after the camera controls, using MUI `ScreenShare` and `StopScreenShare` like the other call icons.

```tsx
const { isScreenShareOn, toggleScreenShare } = useMeetingMedia();

<Tooltip title={isScreenShareOn ? 'Stop sharing' : 'Share screen'}>
  <IconButton
    className={`control-btn${isScreenShareOn ? ' is-sharing' : ''}`}
    onClick={toggleScreenShare}
    aria-label={isScreenShareOn ? 'Stop sharing' : 'Share screen'}
  >
    {isScreenShareOn ? <StopScreenShareIcon /> : <ScreenShareIcon />}
  </IconButton>
</Tooltip>;
```

In the participants popover, show a small screen icon when `participant.screenShareOn` is true, next to the existing mic and camera icons.

## 3. Show the share on the stage

In [components/Modules/MeetingModule/MeetingStage.tsx](components/Modules/MeetingModule/MeetingStage.tsx), read `presenterId` and `localParticipant` from `useMeeting()` and pass them into the remote stage.

In [components/Modules/MeetingModule/RemoteStage.tsx](components/Modules/MeetingModule/RemoteStage.tsx), when `presenterId` is set, render the share instead of the webcam. Request high share quality the same way the webcam already calls `setQuality('high')`.

```tsx
const shareParticipant = useParticipant(presenterId || '');
const { screenShareOn, setScreenShareQuality } = shareParticipant || {};

useEffect(() => {
  if (!presenterId || !screenShareOn || typeof setScreenShareQuality !== 'function') return;
  setScreenShareQuality('high').catch((error) => {
    console.warn('Unable to request high screen-share quality:', error);
  });
}, [presenterId, screenShareOn, setScreenShareQuality]);

// inside the video area, ahead of the webcam branch
{presenterId && screenShareOn ? (
  <VideoPlayer
    participantId={presenterId}
    type="share"
    className="remote-player"
    classNameVideo="remote-player-video"
  />
) : /* existing waiting / camera-off / webcam branches */}
```

Add a short overlay label on the stage: "You are sharing your screen" when `presenterId === localParticipant.id`, otherwise "Patient is sharing their screen".

## 4. Mini player

In [components/Modules/MeetingModule/MeetingMiniPlayer.tsx](components/Modules/MeetingModule/MeetingMiniPlayer.tsx), if `presenterId` is set, render `VideoPlayer` with `type="share"` for that participant. Otherwise keep the current webcam or avatar. Add the same share toggle beside mic and camera, reusing `useMeetingMedia`.

## 5. Styles

In [styles/CustomStyled/MeetingWrapper.tsx](styles/CustomStyled/MeetingWrapper.tsx), add `.control-btn.is-sharing` and `.mini-btn.is-sharing` with `brandTeal` so an active share is distinct from the red muted state. Add a small `.share-label` on the stage (top-left, same pill family as the timer). `object-fit: contain` is already set on `.remote-player-video`, which is the right fit for a screen.

## 6. End call goes straight to the summary

Ending the call clears the VideoSDK token in the same tick as navigation. [MeetingPage.tsx](components/Modules/MeetingModule/MeetingPage.tsx) is still mounted on the meeting route for that moment, sees `!token || !meetingId`, and renders **No Active Video Call Session**. The summary route then replaces it.

```mermaid
flowchart TD
  confirm[Confirm end call] --> ended[Set callState ENDED]
  ended --> leave[leave]
  leave --> reset["Clear token, keep ENDED"]
  reset --> skeleton[MeetingPage keeps the call skeleton]
  skeleton --> summary[Summary route]
  summary --> idle[Reset store to IDLE]
```

`ENDED` already exists on `TCallState`. Use it as the in-between state. Do not add a new store field.

In [hooks/commons/meeting/meetingSessionLeave.ts](hooks/commons/meeting/meetingSessionLeave.ts), clear the session and keep `ENDED` in one `set`, so a render cannot land on an empty token with `IDLE`:

```ts
export const resetMeetingAndGetSummaryPath = () => {
  const appointmentId = useMeetingStore.getState().appointmentId;
  useMeetingStore.setState({
    ...initialState,
    callState: 'ENDED',
  });
  return meetingSummaryPath(appointmentId);
};
```

Export `initialState` from [zustand/stores/useMeetingStore.ts](zustand/stores/useMeetingStore.ts), or set `callState: 'ENDED'` inside `resetMeetingStore` through a `keepEnded` argument. The prescription path in [MeetingSessionHost.tsx](components/Modules/MeetingModule/MeetingSessionHost.tsx) still does a full reset to `IDLE`, because that screen is already off the meeting route.

In [MeetingControlBar.tsx](components/Modules/MeetingModule/MeetingControlBar.tsx), set `ENDED` before `leave()` and ignore a second click while it is set. The stage unmounts to the skeleton, and `MeetingProvider` stays mounted until `onMeetingLeft` clears the token, so `leave()` can finish. The existing `leave()` catch uses the same helper, so a failed leave takes the same path.

In [MeetingPage.tsx](components/Modules/MeetingModule/MeetingPage.tsx), treat `ENDED` like loading and keep [MeetingCallSkeleton.tsx](components/Modules/MeetingModule/MeetingCallSkeleton.tsx) on screen:

```tsx
const callState = useMeetingStore((state) => state.callState);

if (callState === 'ENDED' || isCallDataLoading) {
  return (
    <MeetingWrapper>
      <MeetingCallSkeleton />
    </MeetingWrapper>
  );
}
```

The empty session block stays for a real visit with no token, such as opening the meeting URL directly.

In [MeetingCallSummary.tsx](components/Modules/MeetingModule/MeetingCallSummary.tsx), reset the store to `IDLE` once on mount. The summary reads `appointmentId` from the query string, so it does not need the meeting token. A later direct open of a meeting URL can show the empty session again. Rejoin still goes through `joinVideoCall`, which sets a new session.

[MeetingMiniPlayer.tsx](components/Modules/MeetingModule/MeetingMiniPlayer.tsx) and the time-up handler in [SocketListeners.tsx](components/commons/Sockets/SocketListeners.tsx) already call `resetMeetingAndGetSummaryPath()`, so they pick up the same handoff. On the mini player the meeting page is not mounted, so there is no empty-session flash there. The skeleton only covers the frame while the meeting route is still visible.

## Verification

- Click Share screen, pick a display, confirm the stage shows it and the button switches to Stop sharing.
- Cancel the browser picker and confirm the button stays off.
- Stop from the button and from the browser's own "Stop sharing" control.
- With a second participant, confirm their share replaces the main camera and the local camera tile stays.
- Leave the meeting route and confirm the mini player shows the share and can stop it.
- End the call from the stage and confirm the screen goes from the call, through the skeleton, to the consultation summary, with no "No Active Video Call Session" card.
- End the call from the mini player and from a slot timeout, and confirm both land on the summary.
- Open the meeting URL again with no active session and confirm the empty session card still appears.
