// formatting and validating the DOT
export const formatDOT = (raw: string) => {
  const cleaned = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  const part1 = cleaned.slice(0, 8);
  const part2 = cleaned.slice(8, 12);

  if (cleaned.length <= 8) return `DOT - ${part1}`;
  return `DOT - ${part1} - ${part2}`;
};

export const getRawDOT = (formatted: string) => {
  return formatted.replace(/^DOT\s*-\s*/i, "").replace(/\s/g, "");
};

export const validateDOT = (raw: string) => {
  return /^[A-Z0-9]{8}[0-9]{4}$/.test(raw);
};

export const getTreadStatus = (depth: number) => {
    if (depth < 0) return "invalid";
    if (depth <= 1.6) return "critical";
    if (depth <= 3) return "warning";
    return "ok";
  };

export const validateVIN = (vin: string) => {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
};
export const clampVIN = (value: string): string => {
  return value
    .toUpperCase()
    .replace(/[^A-HJ-NPR-Z0-9]/g, "")
    .slice(0, 17);
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const validateTireSize = (size: string): boolean => {
  return /^\d{3}\/\d{2}\s?R\d{2}$/.test(size.trim().toUpperCase());
};
export const formatTireSize = (value: string): string => {
  const cleaned = value.toUpperCase().replace(/[^0-9]/g, "");

  const width = cleaned.slice(0, 3);
  const profile = cleaned.slice(3, 5);
  const rim = cleaned.slice(5, 7);

  let result = width;

  if (profile) result += "/" + profile;
  if (rim) result += " R" + rim;

  return result;
};
export const clampTireSize = (value: string): string => {
  return value.replace(/[^0-9]/g, "").slice(0, 7);
};
