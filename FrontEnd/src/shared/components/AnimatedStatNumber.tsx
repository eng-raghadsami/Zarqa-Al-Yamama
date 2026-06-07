import { useCountUp, type UseCountUpOptions } from "@core/hooks/useCountUp";
import { formatStatValue, type FormatStatValueOptions } from "@shared/helpers/formatStatValue";

type AnimatedStatNumberProps = FormatStatValueOptions &
  UseCountUpOptions & {
    target: number;
    className?: string;
  };

export default function AnimatedStatNumber({
  target,
  className = "",
  decimals = 0,
  prefix,
  suffix,
  grouping,
  duration,
  enabled,
  threshold,
}: AnimatedStatNumberProps) {
  const { value, ref } = useCountUp(target, {
    decimals,
    duration,
    enabled,
    threshold,
  });

  return (
    <div ref={ref} className={className}>
      {formatStatValue(value, { decimals, prefix, suffix, grouping })}
    </div>
  );
}

type AnimatedStatProgressProps = FormatStatValueOptions &
  UseCountUpOptions & {
    target: number;
    valueClassName?: string;
    barClassName?: string;
    trackClassName?: string;
  };

export function AnimatedStatProgress({
  target,
  decimals = 1,
  prefix,
  suffix = "%",
  grouping,
  duration,
  enabled,
  threshold,
  valueClassName = "font-stats-number text-stats-number text-primary",
  barClassName = "h-full bg-gold-metallic-start",
  trackClassName = "flex-1 h-2 bg-mist-grey rounded-full overflow-hidden",
}: AnimatedStatProgressProps) {
  const { value, ref } = useCountUp(target, {
    decimals,
    duration,
    enabled,
    threshold,
  });

  return (
    <div ref={ref} className="flex items-center gap-3 w-full">
      <p className={valueClassName}>
        {formatStatValue(value, { decimals, prefix, suffix, grouping })}
      </p>
      <div className={trackClassName}>
        <div
          className={barClassName}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

type AnimatedCircularProgressProps = UseCountUpOptions & {
  target: number;
  radius?: number;
  strokeWidth?: number;
  valueClassName?: string;
  trackClassName?: string;
  progressClassName?: string;
  suffix?: string;
  decimals?: number;
};

export function AnimatedCircularProgress({
  target,
  radius = 44,
  strokeWidth = 6,
  duration,
  enabled,
  threshold,
  valueClassName = "absolute font-stats-number text-xl text-primary",
  trackClassName = "text-mist-grey",
  progressClassName = "text-gold-metallic-start",
  suffix = "%",
  decimals = 0,
}: AnimatedCircularProgressProps) {
  const circumference = 2 * Math.PI * radius;
  const { value, ref } = useCountUp(target, {
    decimals,
    duration,
    enabled,
    threshold,
  });
  const offset = circumference * (1 - Math.min(value, 100) / 100);
  const size = 96;
  const center = size / 2;

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center w-24 h-24"
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        aria-hidden
      >
        <circle
          className={trackClassName}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <circle
          className={progressClassName}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>
      <span className={valueClassName}>
        {formatStatValue(value, { decimals, suffix })}
      </span>
    </div>
  );
}

type AnimatedLinearProgressProps = UseCountUpOptions & {
  target: number;
  title: string;
  barClassName?: string;
  trackClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
  suffix?: string;
  decimals?: number;
};

export function AnimatedLinearProgress({
  target,
  title,
  duration,
  enabled,
  threshold,
  barClassName = "absolute top-0 right-0 h-full bg-primary",
  trackClassName = "w-full h-1.5 bg-mist-grey rounded-full overflow-hidden relative",
  titleClassName = "text-on-surface-variant",
  valueClassName = "text-primary",
  suffix = "%",
  decimals = 0,
}: AnimatedLinearProgressProps) {
  const { value, ref } = useCountUp(target, {
    decimals,
    duration,
    enabled,
    threshold,
  });

  return (
    <div ref={ref} className="space-y-3 pt-4 border-t border-mist-grey/50">
      <div className="flex justify-between text-xs font-label-bold">
        <span className={titleClassName}>{title}</span>
        <span className={valueClassName}>
          {formatStatValue(value, { decimals, suffix })}
        </span>
      </div>
      <div className={trackClassName} dir="rtl">
        <div className={barClassName} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}
