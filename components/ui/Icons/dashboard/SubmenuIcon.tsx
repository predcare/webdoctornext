type IconProps = {
  size?: number;
};

const SubmenuIcon = ({ size = 16 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2.25" fill="currentColor" />
    </svg>
  );
};

export default SubmenuIcon;
