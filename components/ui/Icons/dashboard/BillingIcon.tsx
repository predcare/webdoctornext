type IconProps = {
  size?: number;
};

const BillingIcon = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="3.5"
        width="14"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.5 8h7M8.5 11h7M8.5 8.2c2.4.2 4.2 1.3 4.2 3.1 0 1.7-1.6 2.6-3.6 3.2L13.8 17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BillingIcon;
