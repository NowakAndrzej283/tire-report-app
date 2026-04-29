import { useState } from "react";
import WheelForm from "./components/WheelForm";
import { type ReportFormData } from "./types";
import { validateDOT, validateVIN, validateEmail, clampVIN } from "./utils/validation";
import "./App.css";

const emptyWheel = {
  tireBrand: "",
  size: "",
  treadDepth: 0,
  dot: "",
  rating: 1,
  notes: "",
};

const initialState: ReportFormData = {
  brand: "",
  model: "",
  vin: "",
  email: "",
  wheels: {
    frontLeft: { ...emptyWheel },
    frontRight: { ...emptyWheel },
    rearLeft: { ...emptyWheel },
    rearRight: { ...emptyWheel },
  },
};

function App() {
  const [form, setForm] = useState(initialState);
  //const [message, setMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fields = [
    { key: "brand", placeholder: "Marka" },
    { key: "model", placeholder: "Model" },
    { key: "vin", placeholder: "VIN" },
    { key: "email", placeholder: "Email *" },
  ];

  const wheelConfigs = [
    { key: "frontLeft", label: "Przód-L" },
    { key: "frontRight", label: "Przód-P" },
    { key: "rearLeft", label: "Tył-L" },
    { key: "rearRight", label: "Tył-P" },
  ] as const;

  const updateWheel = (
    wheelKey: keyof typeof form.wheels,
    field: string,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      wheels: {
        ...prev.wheels,
        [wheelKey]: {
          ...prev.wheels[wheelKey],
          [field]: value,
        },
      },
    }));
  };

  // Submiting the form
  const submitForm = async () => {
    // if (!validateVIN(form.vin)) {
    //   setPopupMessage("Nieprawidłowy numer VIN");
    //   return;
    // }
    // setLoading(true);
    // setPopupMessage("");
    // // Simulating the backend request
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log("Zapisany raport:", form);
    // setPopupMessage("Raport zapisany pomyślnie (test lokalny)");
    // setForm(initialState);
    // setLoading(false);
    setIsSubmitted(true);
  };

  return (
    <form className="app-container">
      <h1>Raport opon</h1>

      <div className="form-section">
        {fields.map(({ key, placeholder }) => {
          const isVIN = key === "vin";
          const value = form[key as keyof typeof form] as string;

          return (
            <div key={key}>
              <input
                type={key === "email" ? "email" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]: isVIN
                      ? clampVIN(e.target.value.toUpperCase())
                      : e.target.value,
                  })
                }
                style={{
                  border:
                    isVIN && value
                      ? validateVIN(value)
                        ? "2px solid #d1d5db"
                        : "2px solid #ef4444"
                      : undefined,
                }}
                required={key !== "email"}
              />

              {isVIN && value && !validateVIN(value) && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "12px",
                    marginBottom: "8px",
                  }}
                >
                  VIN musi zawierać dokładnie 17 znaków (bez I, O, Q)
                </p>
              )}
            </div>
          );
        })}
        <em style={{ fontSize: "12px" }}>* - pole opcjonalne</em>
      </div>

      <div className="wheels-grid">
        {wheelConfigs.map(({ key, label }) => (
          <div className="wheel-card" key={key}>
            <WheelForm
              submitted={isSubmitted}
              label={label}
              data={form.wheels[key]}
              onChange={(f, v) => updateWheel(key, f, v)}
            />
          </div>
        ))}
      </div>

      <button onClick={submitForm} disabled={loading}>
        {loading ? "Zapisywanie..." : "Zapisz raport"}
      </button>

      {popupMessage && (
        <div className="popup-overlay" onClick={() => setPopupMessage("")}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Informacja</h3>
            <p>{popupMessage}</p>
            <button type="submit" onClick={() => setPopupMessage("")}>
              Zamknij
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default App;
