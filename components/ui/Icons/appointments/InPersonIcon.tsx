type IconProps = {
  size?: number;
};

const InPersonIcon = ({ size = 16 }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.5 19c1-2.8 2.8-4.2 5.5-4.2s4.5 1.4 5.5 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default InPersonIcon;
