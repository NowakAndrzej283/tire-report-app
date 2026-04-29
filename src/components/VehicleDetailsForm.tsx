import React from "react";
import {
  formatVIN,
  getRawVIN,
  validateVIN,
} from "../utils/validation";
import { type ReportFormData } from "../types";

export type VehicleFieldKey = "brand" | "model" | "vin" | "email";

type VehicleFields = Pick<ReportFormData, VehicleFieldKey>;

export interface FieldConfig {
  key: VehicleFieldKey;
  placeholder: string;
}

interface Props {
  fields: FieldConfig[];
  form: VehicleFields;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

const VehicleDetailsForm: React.FC<Props> = ({
  fields,
  form,
  setForm,
}) => {
  return (
    <div className="form-section">
      {fields.map(({ key, placeholder }) => {
        const isVIN = key === "vin";
        const value = form[key] ?? "";

        return (
          <div key={key}>
            <input
              type={key === "email" ? "email" : "text"}
              placeholder={placeholder}
              value={value}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  [key]: isVIN
                    ? formatVIN(
                        e.target.value.toUpperCase()
                      )
                    : e.target.value,
                }))
              }
              style={{
                border:
                  isVIN && value
                    ? validateVIN(getRawVIN(value))
                      ? "2px solid #d1d5db"
                      : "2px solid #ef4444"
                    : undefined,
              }}
              required={key !== "email"}
            />

            {isVIN &&
              value &&
              !validateVIN(getRawVIN(value)) && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginBottom: "8px",
                  }}
                >
                  VIN musi zawierać dokładnie 17 znaków
                  (bez I, O, Q)
                </p>
              )}
          </div>
        );
      })}

      <em style={{ fontSize: "12px" }}>
        * - pole opcjonalne
      </em>
    </div>
  );
};

export default VehicleDetailsForm;