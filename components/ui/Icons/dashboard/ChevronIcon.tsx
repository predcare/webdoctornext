type ChevronDirection = 'left' | 'right' | 'up' | 'down';

type ChevronIconProps = {
  size?: number;
  direction?: ChevronDirection;
};

const rotation: Record<ChevronDirection, number> = {
  right: 0,
  down: 90,
  left: 180,
  up: -90,
};

const ChevronIcon = ({ size = 16, direction = 'right' }: ChevronIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronIcon;
