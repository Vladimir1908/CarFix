import { useState } from "react";
import { Link } from "react-router-dom";

type Step = 1 | 2 | 3 | 4;

const SERVICES = [
  { id: "diagnoza", label: "Diagnosticare Computerizata", duration: "~1 ora", price: "200 MDL", icon: "D" },
  { id: "electrica", label: "Reparatie Electrica / Motoare", duration: "2-4 ore", price: "400 MDL", icon: "E" },
  { id: "generatoare", label: "Reparatie Generatoare", duration: "2-3 ore", price: "400 MDL", icon: "G" },
  { id: "mecanica", label: "Reparatie Mecanica Generala", duration: "1-3 ore", price: "300 MDL", icon: "M" },
  { id: "frane", label: "Sistem de Franare", duration: "1-2 ore", price: "250 MDL", icon: "F" },
  { id: "ulei", label: "Schimb Ulei & Filtre", duration: "~30 min", price: "150 MDL", icon: "U" },
  { id: "ac", label: "Climatizare & AC", duration: "1-2 ore", price: "200 MDL", icon: "A" },
  { id: "revizie", label: "Revizie Completa", duration: "1-2 ore", price: "350 MDL", icon: "R" },
];

const TIME_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
const MONTHS = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
const DAYS_SHORT = ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"];

export default function Programari() {
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", carModel: "", licensePlate: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const getDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const isPast = (day: number) => new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSunday = (day: number) => new Date(viewYear, viewMonth, day).getDay() === 0;

  const selectedServiceObj = SERVICES.find(s => s.id === selectedService);

  const handleSubmit = () => {
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

  const STEP_LABEL: Record<number, string> = { 1: "Serviciu", 2: "Data & Ora", 3: "Date personale", 4: "Confirmare" };

  if (submitted) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 5%", textAlign: "center" }}>
        <div style={{ maxWidth: 520 }}>
          <div style={{ fontSize: "5rem", marginBottom: "20px" }}>OK</div>
          <h1 style={{ fontSize: "2rem", color: "#222", marginBottom: "12px" }}>Programare inregistrata!</h1>
          <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "16px", padding: "20px 24px", margin: "24px 0", textAlign: "left" }}>
            {[
              ["Serviciu", selectedServiceObj?.label],
              ["Data", selectedDate],
              ["Ora", selectedTime],
            ].map(([label, value]) => (
              <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ color: "#888", fontSize: "0.9rem" }}>{label}</span>
                <span style={{ fontWeight: "bold", color: "#222", fontSize: "0.9rem" }}>{value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); setForm({ name: "", phone: "", email: "", carModel: "", licensePlate: "", notes: "" }); }}
            style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
          >
            Alta programare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "20px 5%", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASA</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span>
        <strong style={{ color: "#333" }}>PROGRAMARE ONLINE</strong>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 5% 40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "20px" }}>
          PROGRAMARE ONLINE
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.8" }}>
          Rezerva-ti locul in atelier in cateva secunde.
        </p>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 5% 40px", display: "flex", alignItems: "center" }}>
        {[1, 2, 3, 4].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: step >= s ? "#ff4d29" : "#eee", color: step >= s ? "#fff" : "#aaa", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", transition: "0.3s" }}>{s}</div>
              <span style={{ fontSize: "0.72rem", marginTop: "6px", color: step >= s ? "#ff4d29" : "#aaa", fontWeight: step === s ? "bold" : "normal", whiteSpace: "nowrap" }}>{STEP_LABEL[s]}</span>
            </div>
            {i < 3 && <div style={{ flex: 1, height: "2px", background: step > s ? "#ff4d29" : "#eee", margin: "0 6px", marginBottom: "20px", transition: "0.3s" }} />}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 5% 80px" }}>
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: "24px" }}>Alege serviciul dorit</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px", marginBottom: "32px" }}>
              {SERVICES.map(s => (
                <div key={s.id} onClick={() => setSelectedService(s.id)} style={{ border: selectedService === s.id ? "2px solid #ff4d29" : "2px solid #eee", borderRadius: "16px", padding: "20px", cursor: "pointer", background: selectedService === s.id ? "#fff5f2" : "#fff", transition: "0.2s" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{s.icon}</div>
                  <div style={{ fontWeight: "bold", color: "#222", marginBottom: "6px", fontSize: "0.95rem", lineHeight: "1.3" }}>{s.label}</div>
                  <div style={{ color: "#aaa", fontSize: "0.8rem", marginBottom: "6px" }}>{s.duration}</div>
                  <div style={{ color: "#ff4d29", fontWeight: "bold" }}>{s.price}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => selectedService && setStep(2)} disabled={!selectedService} style={{ background: selectedService ? "#ff4d29" : "#ddd", color: "#fff", border: "none", padding: "13px 36px", borderRadius: "30px", fontWeight: "bold", cursor: selectedService ? "pointer" : "not-allowed", fontSize: "1rem" }}>
                Continua
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: "28px" }}>Alege data si ora</h2>
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 280px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }} style={{ background: "none", border: "1px solid #ddd", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "1rem" }}>prev</button>
                  <strong style={{ color: "#333" }}>{MONTHS[viewMonth]} {viewYear}</strong>
                  <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }} style={{ background: "none", border: "1px solid #ddd", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "1rem" }}>next</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                  {DAYS_SHORT.map(d => <div key={d} style={{ textAlign: "center", fontSize: "0.72rem", color: "#aaa", padding: "4px 0", fontWeight: "bold" }}>{d}</div>)}
                  {Array.from({ length: firstDay }, (_, i) => <div key={"e" + i} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const dateStr = getDateStr(day);
                    const isSelected = selectedDate === dateStr;
                    const past = isPast(day);
                    const sun = isSunday(day);
                    return (
                      <div key={day} onClick={() => { if (!past && !sun) { setSelectedDate(dateStr); setSelectedTime(null); } }} style={{ textAlign: "center", padding: "8px 4px", borderRadius: "8px", fontSize: "0.9rem", cursor: past || sun ? "not-allowed" : "pointer", background: isSelected ? "#ff4d29" : "transparent", color: isSelected ? "#fff" : past || sun ? "#ddd" : "#333" }}>
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
              {selectedDate && (
                <div style={{ flex: "1 1 220px" }}>
                  <div style={{ fontWeight: "bold", color: "#333", marginBottom: "16px" }}>Ore disponibile</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {TIME_SLOTS.map(slot => (
                      <div key={slot} onClick={() => setSelectedTime(slot)} style={{ padding: "10px 0", textAlign: "center", borderRadius: "10px", cursor: "pointer", border: selectedTime === slot ? "2px solid #ff4d29" : "1px solid #eee", background: selectedTime === slot ? "#ff4d29" : "#fff", color: selectedTime === slot ? "#fff" : "#333" }}>
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "36px" }}>
              <button onClick={() => setStep(1)} style={{ background: "#fff", color: "#555", border: "1px solid #ddd", padding: "13px 28px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" }}>Inapoi</button>
              <button onClick={() => { if (selectedDate && selectedTime) setStep(3); }} disabled={!selectedDate || !selectedTime} style={{ background: selectedDate && selectedTime ? "#ff4d29" : "#ddd", color: "#fff", border: "none", padding: "13px 36px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" }}>Continua</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: "28px" }}>Completeaza datele tale</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {[
                { field: "name", label: "Nume complet *", placeholder: "Ion Popescu" },
                { field: "phone", label: "Telefon *", placeholder: "+373 69 XXX XXX" },
                { field: "email", label: "Email (optional)", placeholder: "email@exemplu.md" },
                { field: "carModel", label: "Marca & Model masina *", placeholder: "BMW E46, Toyota Corolla..." },
                { field: "licensePlate", label: "Numar de inmatriculare *", placeholder: "CBA 001" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label style={{ display: "block", fontWeight: "bold", color: "#444", marginBottom: "8px", fontSize: "0.9rem" }}>{label}</label>
                  <input value={form[field as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder} style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #ddd", boxSizing: "border-box" }} />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontWeight: "bold", color: "#444", marginBottom: "8px", fontSize: "0.9rem" }}>Note suplimentare</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Descrie problema pe scurt..." rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #ddd", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "36px" }}>
              <button onClick={() => setStep(2)} style={{ background: "#fff", color: "#555", border: "1px solid #ddd", padding: "13px 28px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" }}>Inapoi</button>
              <button onClick={() => { if (form.name && form.phone && form.carModel && form.licensePlate) setStep(4); }} disabled={!form.name || !form.phone || !form.carModel || !form.licensePlate} style={{ background: "#ff4d29", color: "#fff", border: "none", padding: "13px 36px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" }}>Continua</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ fontSize: "1.4rem", color: "#333", marginBottom: "24px" }}>Confirma programarea</h2>
            <div style={{ background: "#f9f9f9", borderRadius: "20px", padding: "28px 32px", marginBottom: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 40px" }}>
                {[
                  { label: "Serviciu", value: selectedServiceObj?.label },
                  { label: "Pret estimat", value: selectedServiceObj?.price },
                  { label: "Data", value: selectedDate },
                  { label: "Ora", value: selectedTime },
                  { label: "Masina", value: `${form.carModel} - ${form.licensePlate}` },
                  { label: "Telefon", value: form.phone },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.78rem", color: "#aaa" }}>{label}</div>
                    <div style={{ fontWeight: "bold", color: "#222" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(3)} style={{ background: "#fff", color: "#555", border: "1px solid #ddd", padding: "13px 28px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" }}>Inapoi</button>
              <button onClick={handleSubmit} style={{ background: "#ff4d29", color: "#fff", border: "none", padding: "13px 40px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" }}>Confirma</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}