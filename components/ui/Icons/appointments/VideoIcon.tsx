type IconProps = {
  size?: number;
};

const VideoIcon = ({ size = 16 }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M15 11.2 20.2 8.4v7.2L15 12.8v-1.6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VideoIcon;
