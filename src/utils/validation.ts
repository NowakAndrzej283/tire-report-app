import { type ReportFormData } from "../types";

// DOT Section
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
return /^[A-Z0-9]{8}[A-Z0-9]{4}$/.test(raw);
};

export const clampDOT = (value: string) => {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

// Tread Section
export const getTreadStatus = (depth: number) => {
  if (depth < 0) return "invalid";
  if (depth <= 1.6) return "critical";
  if (depth <= 3) return "warning";
  return "ok";
};

// VIN Section
export const validateVIN = (vin: string) => {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
};
export const clampVIN = (value: string): string => {
  return value
    .toUpperCase()
    .replace(/[^A-HJ-NPR-Z0-9]/g, "")
    .slice(0, 17);
};

export const formatVIN = (value: string): string => {
  const cleaned = value
    .toUpperCase()
    .replace(/[^A-HJ-NPR-Z0-9]/g, "")
    .slice(0, 17);

  return (
    cleaned.slice(0, 3) +
    (cleaned.length > 3 ? " " + cleaned.slice(3, 6) : "") +
    (cleaned.length > 6 ? " " + cleaned.slice(6, 9) : "") +
    (cleaned.length > 9 ? " " + cleaned.slice(9, 17) : "")
  ).trim();
};

export const getRawVIN = (value: string): string => value.replace(/\s/g, "");


// Email Section
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};


// TireSize Section
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


// Form validation Section
export const validateForm = (form: ReportFormData) => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!form.brand.trim()) errors.push("Brak marki");
  if (!form.model.trim()) errors.push("Brak modelu");
  if (!form.vin.trim()) errors.push("Brak VIN");

  for (const [key, wheel] of Object.entries(form.wheels)) {
    // required fields
    if (!wheel.tireBrand?.trim()) {
      errors.push(`Brak marki opony (${key})`);
    }

    if (!wheel.size?.trim()) {
      errors.push(`Brak rozmiaru opony (${key})`);
    }

    if (!wheel.dot?.trim()) {
      errors.push(`Brak DOT (${key})`);
    }

    if (wheel.treadDepth === null || wheel.treadDepth === undefined) {
      errors.push(`Brak bieżnika (${key})`);
    }

    // invalid value
    if (wheel.treadDepth < 0) {
      errors.push(`Bieżnik nie może być ujemny (${key})`);
    }

    // non-blocking warnings
    if (wheel.treadDepth !== null && wheel.treadDepth <= 1.6) {
      warnings.push(`KRYTYCZNA GRUBOŚĆ BIEŻNIKA (${key}): ${wheel.treadDepth}mm`);
    } else if (wheel.treadDepth <= 3) {
      warnings.push(`ZUŻYTA OPONA (${key}): ${wheel.treadDepth}mm`);
    }
  }

  return { errors, warnings };
};
