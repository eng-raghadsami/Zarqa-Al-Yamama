export type FormatStatValueOptions = {
  decimals?: number;
  prefix?: string;
  suffix?: string;
  grouping?: boolean;
};

export function formatStatValue(
  value: number,
  {
    decimals = 0,
    prefix = "",
    suffix = "",
    grouping = false,
  }: FormatStatValueOptions = {},
): string {
  const formatted = grouping
    ? value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : decimals > 0
      ? value.toFixed(decimals)
      : String(Math.round(value));

  return `${prefix}${formatted}${suffix}`;
}
