type IconProps = {
  size?: number;
};

const SettingsIcon = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.2 3.8h3.6l.4 1.9c.5.2 1 .5 1.4.8l1.8-.9 1.8 3.1-1.4 1.4c.1.6.1 1.2 0 1.8l1.4 1.4-1.8 3.1-1.8-.9c-.4.3-.9.6-1.4.8l-.4 1.9h-3.6l-.4-1.9a6 6 0 0 1-1.4-.8l-1.8.9-1.8-3.1 1.4-1.4a6 6 0 0 1 0-1.8L5 8.7l1.8-3.1 1.8.9c.4-.3.9-.6 1.4-.8l.4-1.9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
};

export default SettingsIcon;
