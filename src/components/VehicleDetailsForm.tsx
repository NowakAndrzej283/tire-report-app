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

        const vinInvalid =
          isVIN && value && !validateVIN(getRawVIN(value));

        return (
          <div key={key} className="field-wrapper">
            <input
              className={`input ${vinInvalid ? "input-error" : ""}`}
              type={key === "email" ? "email" : "text"}
              placeholder={placeholder}
              value={value}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  [key]: isVIN
                    ? formatVIN(e.target.value.toUpperCase())
                    : e.target.value,
                }))
              }
              required={key !== "email"}
            />

            {isVIN && vinInvalid && (
              <p className="error-text">
                VIN musi zawierać dokładnie 17 znaków (bez I, O, Q)
              </p>
            )}
          </div>
        );
      })}

      <em className="hint-text">
        * - pole opcjonalne
      </em>
    </div>
  );
};

export default VehicleDetailsForm;