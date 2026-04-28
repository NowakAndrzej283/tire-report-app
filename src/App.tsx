import { useState } from "react";
import WheelForm from "./components/WheelForm";
import { type ReportFormData } from "./types";

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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { key: "brand", placeholder: "Marka" },
    { key: "model", placeholder: "Model" },
    { key: "vin", placeholder: "VIN" },
    { key: "email", placeholder: "Email" },
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

  const submitForm = async () => {
    setLoading(true);
    setMessage("");

    // Simulating the backend request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Zapisany raport:", form);

    setMessage("Raport zapisany pomyślnie (test lokalny)");
    setForm(initialState);
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Raport opon</h1>

      <div className="form-section">
        {fields.map(({ key, placeholder }) => (
          <input
            key={key}
            placeholder={placeholder}
            value={form[key as keyof typeof form] as string}
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value,
              })
            }
          />
        ))}
      </div>

      <div className="wheels-grid">
        {wheelConfigs.map(({ key, label }) => (
          <div className="wheel-card" key={key}>
            <WheelForm
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

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
