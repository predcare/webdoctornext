type IconProps = {
  size?: number;
};

const LoginIcon = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 4h5a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 19 20h-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 16.5 14.5 12 10 7.5M14.5 12H3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LoginIcon;
