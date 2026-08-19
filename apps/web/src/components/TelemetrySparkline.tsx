export function TelemetrySparkline() {
  return (
    <svg
      className="absolute right-0 bottom-0 left-0 h-6 w-full translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 20 L 10 15 L 20 18 L 30 10 L 40 12 L 50 5 L 60 8 L 70 2 L 80 15 L 90 8 L 100 20"
        fill="none"
        stroke="var(--theme-primary)"
        strokeWidth="1"
        strokeOpacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 20 L 10 15 L 20 18 L 30 10 L 40 12 L 50 5 L 60 8 L 70 2 L 80 15 L 90 8 L 100 20 L 100 20 L 0 20 Z"
        fill="var(--theme-primary)"
        fillOpacity="0.05"
      />
    </svg>
  );
}
