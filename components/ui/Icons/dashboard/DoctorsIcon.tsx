type IconProps = {
  size?: number;
};

const DoctorsIcon = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.2 19c.7-2.8 2.7-4.2 5.8-4.2 1.3 0 2.4.3 3.3.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17 13.5v6M14 16.5h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DoctorsIcon;
