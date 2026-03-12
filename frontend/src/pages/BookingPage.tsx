import { useState } from "react";

type BookingStep = 1 | 2 | 3 | 4;

const SERVICES = [
  { id: "diagnoza", label: "Diagnosticare Computerizată", duration: "1h", price: "200 MDL", icon: "🔍" },
  { id: "motoare", label: "Reparație Motoare Electrice", duration: "2-4h", price: "400 MDL", icon: "⚡" },
  { id: "generatoare", label: "Reparație Generatoare", duration: "2-3h", price: "400 MDL", icon: "🔋" },
  { id: "mecanica", label: "Reparație Mecanică Generală", duration: "1-3h", price: "300 MDL", icon: "🔧" },
  { id: "frane", label: "Sistem de Frânare", duration: "1-2h", price: "250 MDL", icon: "🛞" },
  { id: "ulei", label: "Schimb Ulei & Filtre", duration: "30min", price: "150 MDL", icon: "🛢️" },
];

const TIME_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
const DAYS = ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"];

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", carModel: "", licensePlate: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const handleDayClick = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    if (d.getDay() === 0) return; // Duminica inchis
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const isPastDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const isSunday = (day: number) => new Date(viewYear, viewMonth, day).getDay() === 0;

  const selectedServiceObj = SERVICES.find(s => s.id === selectedService);

  const handleSubmit = () => {
    // Salvam in localStorage ca simulare
    const bookings = JSON.parse(localStorage.getItem("carfix_bookings") || "[]");
    bookings.push({
      id: Date.now(),
      service: selectedServiceObj?.label,
      date: selectedDate,
      time: selectedTime,
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("carfix_bookings", JSON.stringify(bookings));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5%" }}>
        <div style={{ textAlign: "center", maxWidth: 500 }}>
          <div style={{ fontSize: "5rem", marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: "2rem", color: "#222", marginBottom: 12 }}>Programare confirmată!</h1>
          <p style={{ color: "#666", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 8 }}>
            <strong>{form.name}</strong>, programarea ta a fost înregistrată cu succes.
          </p>
          <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 16, padding: "20px 24px", marginBottom: 28, textAlign: "left" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.95rem", color: "#444" }}>
              <div><span style={{ color: "#888" }}>Serviciu:</span> <strong>{selectedServiceObj?.label}</strong></div>
              <div><span style={{ color: "#888" }}>Data:</span> <strong>{selectedDate}</strong></div>
              <div><span style={{ color: "#888" }}>Ora:</span> <strong>{selectedTime}</strong></div>
              <div><span style={{ color: "#888" }}>Mașina:</span> <strong>{form.carModel} — {form.licensePlate}</strong></div>
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 28 }}>
            Te vom contacta la <strong>{form.phone}</strong> pentru confirmare.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); setForm({ name: "", phone: "", email: "", carModel: "", licensePlate: "", notes: "" }); }}
            style={{ background: "#ff4d29", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 30, fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
          >
            Fă altă programare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "60px 5%", maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: "2.4rem", color: "#222", margin: 0 }}>Programare online</h1>
        <p style={{ color: "#888", marginTop: 8 }}>Rezervă-ți locul în doar câteva secunde</p>
      </div>

      {/* Steps indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 48, position: "relative" }}>
        {[
          { num: 1, label: "Serviciu" },
          { num: 2, label: "Data & Ora" },
          { num: 3, label: "Date personale" },
          { num: 4, label: "Confirmare" },
        ].map((s, i) => (
          <div key={s.num} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: step >= s.num ? "#ff4d29" : "#eee",
                color: step >= s.num ? "#fff" : "#aaa",
                fontWeight: "bold", fontSize: "0.95rem", transition: "0.3s"
              }}>{s.num}</div>
              <span style={{ fontSize: "0.75rem", marginTop: 6, color: step >= s.num ? "#ff4d29" : "#aaa", fontWeight: step === s.num ? "bold" : "normal" }}>{s.label}</span>
            </div>
            {i < 3 && <div style={{ height: 2, flex: 1, background: step > s.num ? "#ff4d29" : "#eee", margin: "0 4px", marginBottom: 24, transition: "0.3s" }} />}
          </div>
        ))}
      </div>

      {/* STEP 1 — Alege serviciul */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: 20 }}>Alege serviciul dorit</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {SERVICES.map(service => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                style={{
                  border: selectedService === service.id ? "2px solid #ff4d29" : "2px solid #eee",
                  borderRadius: 16, padding: "20px 18px", cursor: "pointer",
                  background: selectedService === service.id ? "#fff8f7" : "#fff",
                  transition: "0.2s", boxShadow: selectedService === service.id ? "0 4px 20px rgba(255,77,41,0.15)" : "none"
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: 10 }}>{service.icon}</div>
                <div style={{ fontWeight: "bold", color: "#222", marginBottom: 6, lineHeight: 1.3 }}>{service.label}</div>
                <div style={{ color: "#888", fontSize: "0.85rem", marginBottom: 10 }}>Durata: {service.duration}</div>
                <div style={{ color: "#ff4d29", fontWeight: "bold", fontSize: "1.1rem" }}>{service.price}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => selectedService && setStep(2)}
              disabled={!selectedService}
              style={{ background: selectedService ? "#ff4d29" : "#ddd", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 30, fontWeight: "bold", cursor: selectedService ? "pointer" : "not-allowed", fontSize: "1rem" }}
            >
              Continuă →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — Alege data si ora */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: 20 }}>Alege data și ora</h2>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {/* Calendar */}
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }} style={{ background: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>‹</button>
                <strong style={{ color: "#333" }}>{MONTHS[viewMonth]} {viewYear}</strong>
                <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }} style={{ background: "none", border: "1px solid #ddd", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>›</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontSize: "0.75rem", color: "#888", padding: "4px 0", fontWeight: "bold" }}>{d}</div>)}
                {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isSelected = selectedDate === dateStr;
                  const past = isPastDay(day);
                  const sunday = isSunday(day);
                  return (
                    <div
                      key={day}
                      onClick={() => !past && !sunday && handleDayClick(day)}
                      style={{
                        textAlign: "center", padding: "8px 4px", borderRadius: 8, fontSize: "0.9rem",
                        cursor: past || sunday ? "not-allowed" : "pointer",
                        background: isSelected ? "#ff4d29" : "transparent",
                        color: isSelected ? "#fff" : past || sunday ? "#ddd" : "#333",
                        fontWeight: isSelected ? "bold" : "normal",
                        transition: "0.15s"
                      }}
                    >{day}</div>
                  );
                })}
              </div>
              <div style={{ marginTop: 12, fontSize: "0.8rem", color: "#aaa" }}>* Duminica suntem închiși</div>
            </div>

            {/* Ore */}
            {selectedDate && (
              <div style={{ flex: "1 1 240px" }}>
                <div style={{ fontWeight: "bold", color: "#333", marginBottom: 14 }}>Ore disponibile — {selectedDate}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {TIME_SLOTS.map(slot => (
                    <div
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        padding: "10px 0", textAlign: "center", borderRadius: 10, cursor: "pointer",
                        border: selectedTime === slot ? "2px solid #ff4d29" : "1px solid #eee",
                        background: selectedTime === slot ? "#ff4d29" : "#fff",
                        color: selectedTime === slot ? "#fff" : "#333",
                        fontWeight: selectedTime === slot ? "bold" : "normal",
                        fontSize: "0.9rem", transition: "0.15s"
                      }}
                    >{slot}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(1)} style={{ background: "#fff", color: "#555", border: "1px solid #ddd", padding: "14px 28px", borderRadius: 30, fontWeight: "bold", cursor: "pointer" }}>← Înapoi</button>
            <button
              onClick={() => selectedDate && selectedTime && setStep(3)}
              disabled={!selectedDate || !selectedTime}
              style={{ background: selectedDate && selectedTime ? "#ff4d29" : "#ddd", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 30, fontWeight: "bold", cursor: selectedDate && selectedTime ? "pointer" : "not-allowed", fontSize: "1rem" }}
            >Continuă →</button>
          </div>
        </div>
      )}

      {/* STEP 3 — Date personale */}
      {step === 3 && (
        <div>
          <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: 20 }}>Datele tale de contact</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { field: "name", label: "Nume complet *", placeholder: "Ion Popescu" },
              { field: "phone", label: "Telefon *", placeholder: "+373 69 XXX XXX" },
              { field: "email", label: "Email", placeholder: "email@exemplu.md" },
              { field: "carModel", label: "Marca & Model mașină *", placeholder: "BMW E46, Toyota Corolla..." },
              { field: "licensePlate", label: "Număr de înmatriculare *", placeholder: "CBA 001" },
            ].map(({ field, label, placeholder }) => (
              <div key={field}>
                <label style={{ display: "block", fontWeight: "bold", color: "#444", marginBottom: 8, fontSize: "0.9rem" }}>{label}</label>
                <input
                  value={form[field as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #ddd", fontSize: "0.95rem", outline: "none" }}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontWeight: "bold", color: "#444", marginBottom: 8, fontSize: "0.9rem" }}>Note suplimentare</label>
              <textarea
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Descrie problema sau orice detaliu relevant..."
                rows={4}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #ddd", fontSize: "0.95rem", outline: "none", resize: "vertical" }}
              />
            </div>
          </div>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(2)} style={{ background: "#fff", color: "#555", border: "1px solid #ddd", padding: "14px 28px", borderRadius: 30, fontWeight: "bold", cursor: "pointer" }}>← Înapoi</button>
            <button
              onClick={() => form.name && form.phone && form.carModel && form.licensePlate && setStep(4)}
              disabled={!form.name || !form.phone || !form.carModel || !form.licensePlate}
              style={{ background: form.name && form.phone && form.carModel && form.licensePlate ? "#ff4d29" : "#ddd", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 30, fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
            >Continuă →</button>
          </div>
        </div>
      )}

      {/* STEP 4 — Confirmare */}
      {step === 4 && (
        <div>
          <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: 20 }}>Confirmă programarea</h2>
          <div style={{ background: "#fafafa", border: "1px solid #eee", borderRadius: 20, padding: "28px 32px", marginBottom: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px" }}>
              {[
                { label: "Serviciu", value: selectedServiceObj?.label },
                { label: "Preț estimat", value: selectedServiceObj?.price },
                { label: "Data", value: selectedDate },
                { label: "Ora", value: selectedTime },
                { label: "Durata estimată", value: selectedServiceObj?.duration },
                { label: "Mașina", value: `${form.carModel} — ${form.licensePlate}` },
                { label: "Numele tău", value: form.name },
                { label: "Telefon", value: form.phone },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: "0.8rem", color: "#999", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontWeight: "bold", color: "#222" }}>{value}</div>
                </div>
              ))}
              {form.notes && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: "0.8rem", color: "#999", marginBottom: 3 }}>Note</div>
                  <div style={{ color: "#444" }}>{form.notes}</div>
                </div>
              )}
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 28 }}>
            Te vom contacta telefonic la <strong>{form.phone}</strong> pentru a confirma programarea.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(3)} style={{ background: "#fff", color: "#555", border: "1px solid #ddd", padding: "14px 28px", borderRadius: 30, fontWeight: "bold", cursor: "pointer" }}>← Înapoi</button>
            <button
              onClick={handleSubmit}
              style={{ background: "#ff4d29", color: "#fff", border: "none", padding: "14px 40px", borderRadius: 30, fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
            >✓ Confirmă programarea</button>
          </div>
        </div>
      )}
    </div>
  );
}