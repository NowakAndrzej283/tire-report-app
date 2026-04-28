import React from "react";
import { type WheelData } from "../types";

interface Props {
  label: string;
  data: WheelData;
  onChange: (field: keyof WheelData, value: string | number) => void;
  errors?: Record<string, string>;
}

// formatting and validating the DOT
const formatDOT = (raw: string) => {
  const cleaned = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  const part1 = cleaned.slice(0, 8);
  const part2 = cleaned.slice(8, 12);

  if (cleaned.length <= 8) return `DOT - ${part1}`;
  return `DOT - ${part1} - ${part2}`;
};

const getRawDOT = (formatted: string) => {
  return formatted.replace(/^DOT\s*-\s*/i, "").replace(/\s/g, "");
};

const validateDOT = (raw: string) => {
  return /^[A-Z0-9]{8}[0-9]{4}$/.test(raw);
};

const getTreadStatus = (value: number) => {
  if (value <= 1.6) return "critical";
  if (value <= 3) return "warning";
  return "ok";
};
const WheelForm: React.FC<Props> = ({ label, data, onChange, errors }) => {
  const dotValid = validateDOT(data.dot);
  const treadStatus = getTreadStatus(data.treadDepth);
  return (
    <form style={{ marginBottom: "20px" }}>
      <p style={{ margin: 5 }}>{label}</p>

      <input
        placeholder="Marka opony"
        value={data.tireBrand}
        onChange={(e) => onChange("tireBrand", e.target.value)}
        required
      />
      <p>{errors?.tireBrand}</p>

      <input
        placeholder="Rozmiar (np. 205/55 R16)"
        value={data.size}
        onChange={(e) => onChange("size", e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Bieżnik (mm)"
        value={data.treadDepth}
        onChange={(e) => onChange("treadDepth", Number(e.target.value))}
        style={{
          border:
            treadStatus === "critical"
              ? "2px solid #ef4444"
              : treadStatus === "warning"
              ? "2px solid #f59e0b"
              : "1px solid #d1d5db",
        }}
      />
      <input
        value={formatDOT(data.dot)}
        placeholder={data.dot ? "" : "DOT - XXXXXXXX - YYYY"}
        onChange={(e) => {
          const raw = getRawDOT(e.target.value);
          onChange("dot", raw);
        }}
      />

      <input
        type="number"
        min={1}
        max={5}
        placeholder="Ocena 1-5"
        value={data.rating}
        onChange={(e) => onChange("rating", Number(e.target.value))}
        required
      />

      <textarea
        placeholder="Uwagi"
        value={data.notes}
        onChange={(e) => onChange("notes", e.target.value)}
        rows={5}
      />
    </form>
  );
};

export default WheelForm;
