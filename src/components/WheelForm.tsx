import React from "react";
import { type WheelData } from "../types";
import {
  validateDOT,
  getRawDOT,
  getTreadStatus,
  formatDOT,
  formatTireSize,
  validateTireSize,
  clampTireSize,
} from "../utils/validation";

interface Props {
  label: string;
  data: WheelData;
  onChange: (field: keyof WheelData, value: string | number) => void;
  errors?: Record<string, string>;
  submitted: boolean
}

const WheelForm: React.FC<Props> = ({ label, data, onChange, errors, submitted }) => {
  const dotValid = validateDOT(data.dot);
  const treadStatus = getTreadStatus(data.treadDepth);
  const status = getTreadStatus(data.treadDepth);
  return (
    <div style={{ marginBottom: "20px" }}>
      <p style={{ margin: 5 }}>{label}</p>

      <input
        placeholder="Marka opony"
        value={data.tireBrand}
        onChange={(e) => onChange("tireBrand", e.target.value)}
        required
      />
      <p>{errors?.tireBrand}</p>

      <input
        placeholder="205/55 R16"
        value={data.size}
        onChange={(e) =>
          onChange("size", formatTireSize(clampTireSize(e.target.value)))
        }
        required
      />

      <input
        type="number"
        placeholder="Bieżnik (mm)"
        value={data.treadDepth === null ? '' : data.treadDepth}
        min={0}
        step={0.1}
        inputMode="decimal"
        onChange={(e) =>{
          const val = e.target.value.replace(",", ".");
          onChange("treadDepth", val === '' ? null : Number(val))
        }}
        required
      />
      {submitted && status === "critical" && (
        <p style={{ color: "#ef4444", fontSize: "12px", marginBottom: '10px' }}>
          Krytyczne zużycie opony — wymagana wymiana
        </p>
      )}

      {submitted && status === "warning" && (
        <p style={{ color: "#f59e0b", fontSize: "12px" }}>
          Uwaga: opona jest zużyta
        </p>
      )}

      <input
        value={formatDOT(data.dot)}
        placeholder={data.dot ? "" : "DOT - XXXXXXXX - YYYY"}
        onChange={(e) => {
          const raw = getRawDOT(e.target.value);
          onChange("dot", raw);
        }}
        required
      />

      <div style={{ margin: "12px 0" }}>
        <p style={{ marginBottom: "6px" }}>Ocena</p>

        <div
          style={{
            display: "flex",
            gap: "6px",
            fontSize: "28px",
            cursor: "pointer",
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => onChange("rating", star)}
              style={{
                userSelect: "none",
                opacity: star <= data.rating ? 1 : 0.35,
                transform: star <= data.rating ? "scale(1.1)" : "scale(1)",
                transition: "0.2s",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {!data.rating && (
          <em style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
            Wybierz ocenę od 1 do 5
          </em>
        )}
      </div>

      <textarea
        placeholder="Uwagi*"
        value={data.notes}
        onChange={(e) => onChange("notes", e.target.value)}
        rows={6}
      />
      <em style={{ fontSize: "12px" }}>* - pole opcjonalne</em>
    </div>
  );
};

export default WheelForm;
