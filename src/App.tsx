import { useState } from "react";
import WheelForm from "./components/WheelForm";
import { type ReportFormData } from "./types";
import { type VehicleFieldKey } from "./components/VehicleDetailsForm";
import { getRawVIN, validateForm } from "./utils/validation";
import "./App.css";
import "./components/PopupModal";
import PopupModal from "./components/PopupModal";
import LoadingOverlay from "./components/LoadingOverlay";
import VehicleDetailsForm from "./components/VehicleDetailsForm";
import { validateTireSize } from "./utils/validation";
import { supabase } from "./lib/supabase";

const emptyWheel = {
  tireBrand: "",
  size: "",
  treadDepth: null,
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
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldResetForm, setShouldResetForm] = useState(false);

  const fields: { key: VehicleFieldKey; placeholder: string }[] = [
    { key: "brand", placeholder: "Marka" },
    { key: "model", placeholder: "Model" },
    { key: "vin", placeholder: "VIN" },
    { key: "email", placeholder: "Email*" },
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
    if (loading) return;
    const { errors, warnings } = validateForm(form);
    const rawVIN = getRawVIN(form.vin);

    // check if all the values are of length 12
    const allDotsValid = Object.values(form.wheels).every(
      (wheel) => wheel.dot.length === 12
    );
    // check if the tire Size is valid
    const allSizesValid = Object.values(form.wheels).every(
      (wheel) => validateTireSize(wheel.size)
    );

    // check if the VIN is correct
    if (rawVIN.length !== 17) {
      setPopupMessage(
        `VIN musi zawierać dokładnie 17 znaków (${rawVIN.length}/17)`
      );
      return;
    }
    // check if all DOT are validd
    if (!allDotsValid) {
      setPopupMessage("Błąd: DOT jest niepoprawny");
      return;
    }

    // check the errors
    if (errors.length > 0) {
      setPopupMessage(errors.join("\n"));
      return;
    }

    // check the input sizes
    if (!allSizesValid) {
      setPopupMessage(
        "Nie wszystkie rozmiary opon są poprawne"
      );
      return;
    }

    setLoading(true);
    try {
      const test = async () => {
        const { data, error } = await supabase
          .from('tire_reports')
          .select('*')
      
        console.log(data)
        console.log(error)
      }
      test();
      const { error } = await supabase
        .from("tire_reports")
        .insert({
          brand: form.brand,
          model: form.model,
          vin: rawVIN,
          email: form.email || null,
          wheels: form.wheels,
        });
    
      if (error) {
        throw new Error(error.message);
      }
    
      let message = "Raport zapisany pomyślnie";
    
      if (warnings.length > 0) {
        message += "\n\nOstrzeżenia dotyczące stanu opon:\n";
        message += warnings.join("\n");
      }
    
      setPopupMessage(message);
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas zapisu formularza"
      );
    } finally {
        setLoading(false);
        setShouldResetForm(true);
        setIsSubmitted(false);
    }
  };

  console.log("is submited", isSubmitted);
  return (
    <>
      <form className="app-container" onSubmit={(e) => e.preventDefault()}>
        <h1>Raport stanu opon</h1>
        <VehicleDetailsForm fields={fields} form={form} setForm={setForm} />

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

        <button
          onClick={submitForm}
          disabled={loading || getRawVIN(form.vin).length !== 17}
        >
          {loading ? "Zapisywanie..." : "Zapisz raport"}
        </button>
      </form>

      {loading && <LoadingOverlay />}
      <PopupModal
        message={popupMessage}
        onClose={() => {
          setPopupMessage("");

          if (shouldResetForm) {
            setForm(initialState);
            window.location.reload();
            setShouldResetForm(false);
          }
        }}
      />
    </>
  );
}

export default App;
