type IconProps = {
  size?: number;
};

const NoShowIcon = ({ size = 14 }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.2 18.2c.9-2.5 2.4-3.7 4.8-3.7 1.1 0 2.1.3 2.9.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M5 5.5 18.5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
};

export default NoShowIcon;
