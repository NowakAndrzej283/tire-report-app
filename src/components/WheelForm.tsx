import React, { useState } from "react";
import { type WheelData } from "../types";
import { clampDOT } from "../utils/validation";
import {
  getTreadStatus,
  formatTireSize,
  clampTireSize,
  validateTireSize,
} from "../utils/validation";

interface Props {
  label: string;
  data: WheelData;
  onChange: (field: keyof WheelData, value: string | number) => void;
  errors?: Record<string, string>;
  submitted: boolean;
}

const WheelForm: React.FC<Props> = ({ label, data, onChange, errors }) => {
  const [treadTouched, setTreadTouched] = useState(false);
  const status = getTreadStatus(data.treadDepth);
 

  const rawDOT = data.dot;
  const dotValid = rawDOT.length === 12;

  const sizeValid = validateTireSize(data.size);

  return (
    <div className="wheel-form">
      <p className="wheel-label">{label}</p>

      {/* BRAND */}
      <input
        className="input"
        placeholder="Marka opony"
        value={data.tireBrand}
        onChange={(e) => onChange("tireBrand", e.target.value)}
        required
      />
      <p className="error-text">{errors?.tireBrand}</p>

      {/* SIZE */}
      <input
        className={`input ${
          data.size.length > 0 && !sizeValid ? "input-error" : ""
        }`}
        placeholder="205/55 R16"
        value={data.size}
        onChange={(e) =>
          onChange("size", formatTireSize(clampTireSize(e.target.value)))
        }
        required
      />
      {data.size.length > 0 && !sizeValid && (
        <p className="error-text">Podaj poprawny rozmiar, np. 205/55 R16</p>
      )}

      {/* TREAD */}
      <input
        className="input"
        type="number"
        placeholder="Bieżnik (mm)"
        value={data.treadDepth === null ? "" : data.treadDepth}
        inputMode="decimal"
        min={0}
        max={10}
        step={0.1}
        onChange={(e) => {
          onChange("treadDepth", Number(e.target.value));
          setTreadTouched(true);
        }}
        required
      />

      {treadTouched && status === "critical" && (
        <p className="warning-critical">
          Krytyczne zużycie opony — wymagana wymiana
        </p>
      )}

      {treadTouched && status === "warning" && (
        <p className="warning-normal">Uwaga: opona jest zużyta</p>
      )}

      {/* DOT */}
      <input
        className={`input ${
          !dotValid && rawDOT.length > 0 ? "input-error" : ""
        }`}
        value={`DOT - ${rawDOT}`}
        onChange={(e) => {
          const value = e.target.value;
          const cleaned = clampDOT(value.replace(/^DOT\s*-\s*/i, ""));
          onChange("dot", cleaned);
        }}
        placeholder="DOT - XXXXXXXX - YYYY"
      />

      {rawDOT.length > 0 && !dotValid && (
        <p className="error-text">DOT musi zawierać dokładnie 12 znaków</p>
      )}

      {/* RATING */}
      <div className="rating-wrapper">
        <p className="rating-label">Ocena</p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => onChange("rating", star)}
              className={`star ${star <= data.rating ? "star-active" : ""}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* NOTES */}
      <textarea
        className="textarea"
        placeholder="Uwagi*"
        value={data.notes}
        onChange={(e) => onChange("notes", e.target.value)}
        rows={6}
      />

      <em className="hint-text">* - pole opcjonalne</em>
    </div>
  );
};

export default WheelForm;
