type IconProps = {
  size?: number;
};

const HelpIcon = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.4 9.6a2.6 2.6 0 1 1 3.7 2.3c-.8.4-1.2 1-1.2 1.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.2" r="0.9" fill="currentColor" />
    </svg>
  );
};

export default HelpIcon;
