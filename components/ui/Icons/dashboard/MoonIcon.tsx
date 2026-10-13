type IconProps = {
  size?: number;
};

const MoonIcon = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16.2 14.8A6.6 6.6 0 0 1 9.2 5.2 6.8 6.8 0 1 0 16.2 14.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoonIcon;
