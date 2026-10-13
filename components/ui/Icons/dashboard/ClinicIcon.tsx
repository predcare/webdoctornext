type IconProps = {
  size?: number;
};

const ClinicIcon = ({ size = 18 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.2" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.5 18.8c.7-2.8 2.8-4.3 5.5-4.3s4.8 1.5 5.5 4.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ClinicIcon;
