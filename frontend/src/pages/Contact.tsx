import { useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  vehicleBrand: string;
  vehicleModel: string;
  agreePrivacy: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  agreePrivacy?: string;
}

const subjects = [
  "Intrebare despre servicii",
  "Intrebare despre programare",
  "Reclamatie",
  "Sugestie",
  "Colaborare",
  "Altele",
];

const contactInfo = [
  {
    icon: "📍",
    title: "Adresa",
    lines: ["Str. Calea Iesilor 12", "Chisinau, Republica Moldova"],
    link: null,
  },
  {
    icon: "📞",
    title: "Telefon",
    lines: ["+373 22 123 456", "+373 69 999 888"],
    link: "tel:+37322123456",
  },
  {
    icon: "📧",
    title: "Email",
    lines: ["contact@carfix.md", "programari@carfix.md"],
    link: "mailto:contact@carfix.md",
  },
  {
    icon: "🕐",
    title: "Program",
    lines: ["Luni – Vineri: 08:00 – 18:00", "Sambata: 08:00 – 14:00"],
    link: null,
  },
];

function validate(form: FormData): FormErrors {
  const errs: FormErrors = {};
  if (!form.firstName.trim()) errs.firstName = "Prenumele este obligatoriu.";
  if (!form.lastName.trim()) errs.lastName = "Numele este obligatoriu.";
  if (!form.email.trim()) {
    errs.email = "Email-ul este obligatoriu.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = "Introduceti un email valid.";
  }
  if (!form.phone.trim()) {
    errs.phone = "Telefonul este obligatoriu.";
  } else if (!/^[\d\s+\-()]{7,15}$/.test(form.phone)) {
    errs.phone = "Introduceti un numar de telefon valid.";
  }
  if (!form.subject) errs.subject = "Selectati subiectul mesajului.";
  if (!form.message.trim()) {
    errs.message = "Mesajul este obligatoriu.";
  } else if (form.message.trim().length < 20) {
    errs.message = "Mesajul trebuie sa contina cel putin 20 de caractere.";
  }
  if (!form.agreePrivacy)
    errs.agreePrivacy = "Trebuie sa acceptati politica de confidentialitate.";
  return errs;
}

export default function Contact() {
  const [darkMode] = useState(() => document.body.classList.contains("dark-mode"));
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    vehicleBrand: "",
    vehicleModel: "",
    agreePrivacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const c = {
    page: {
      minHeight: "100vh",
      background: darkMode ? "#0f172a" : "#f8fafc",
      fontFamily: "Arial, sans-serif",
      color: darkMode ? "#e2e8f0" : "#1a202c",
    } as React.CSSProperties,
    hero: {
      background: "linear-gradient(135deg, #1a1a2e 0%, #d32f2f 100%)",
      padding: "80px 20px 60px",
      textAlign: "center",
      color: "#fff",
    } as React.CSSProperties,
    heroTitle: { fontSize: "2.4rem", fontWeight: "bold", marginBottom: "14px" },
    heroSub: { fontSize: "1rem", opacity: 0.85 },
    container: { maxWidth: "1100px", margin: "0 auto", padding: "50px 20px" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "40px" } as React.CSSProperties,
    infoCard: {
      background: darkMode ? "#1e293b" : "#fff",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    },
    infoItem: { display: "flex", gap: "16px", marginBottom: "28px" } as React.CSSProperties,
    infoIcon: { fontSize: "1.6rem", flexShrink: 0 },
    infoTitle: { fontWeight: "bold", marginBottom: "4px", fontSize: "0.95rem" },
    infoLine: { color: darkMode ? "#94a3b8" : "#4a5568", fontSize: "0.9rem" },
    formCard: {
      background: darkMode ? "#1e293b" : "#fff",
      borderRadius: "16px",
      padding: "36px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    },
    formTitle: { fontSize: "1.4rem", fontWeight: "bold", marginBottom: "24px" },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" } as React.CSSProperties,
    fieldGroup: { marginBottom: "18px" },
    label: { display: "block", fontWeight: "600", fontSize: "0.85rem", marginBottom: "6px" },
    input: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
      background: darkMode ? "#0f172a" : "#f8fafc",
      color: darkMode ? "#e2e8f0" : "#1a202c",
      fontSize: "0.9rem",
      boxSizing: "border-box",
      outline: "none",
    } as React.CSSProperties,
    inputError: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: "1px solid #ef4444",
      background: darkMode ? "#0f172a" : "#fff5f5",
      color: darkMode ? "#e2e8f0" : "#1a202c",
      fontSize: "0.9rem",
      boxSizing: "border-box",
      outline: "none",
    } as React.CSSProperties,
    errorMsg: { color: "#ef4444", fontSize: "0.78rem", marginTop: "4px" },
    textarea: {
      width: "100%",
      padding: "11px 14px",
      borderRadius: "10px",
      border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
      background: darkMode ? "#0f172a" : "#f8fafc",
      color: darkMode ? "#e2e8f0" : "#1a202c",
      fontSize: "0.9rem",
      boxSizing: "border-box",
      outline: "none",
      resize: "vertical",
      minHeight: "120px",
    } as React.CSSProperties,
    checkRow: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "20px" },
    submitBtn: {
      width: "100%",
      padding: "14px",
      background: "#d32f2f",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
      transition: "0.2s",
    } as React.CSSProperties,
    successBox: {
      textAlign: "center",
      padding: "60px 20px",
    } as React.CSSProperties,
    sectionSubtitle: {
      fontSize: "0.8rem",
      fontWeight: "normal",
      color: darkMode ? "#64748b" : "#a0aec0",
      marginBottom: "14px",
      fontStyle: "italic",
    },
  };

  return (
    <div style={c.page}>
      <div style={c.hero}>
        <div style={c.heroTitle}>📬 Contactati-ne</div>
        <div style={c.heroSub}>
          Suntem aici sa va ajutam. Trimiteti-ne un mesaj si va vom raspunde in cel mai scurt timp.
        </div>
      </div>

      <div style={c.container}>
        <div style={{ marginBottom: "24px" }}>
          <Link to="/" style={{ color: darkMode ? "#94a3b8" : "#4a5568", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Inapoi la pagina principala
          </Link>
        </div>

        {submitted ? (
          <div style={c.successBox}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>✅</div>
            <div style={{ fontSize: "1.6rem", fontWeight: "bold", marginBottom: "12px" }}>
              Mesaj trimis cu succes!
            </div>
            <div style={{ color: darkMode ? "#94a3b8" : "#4a5568", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 28px" }}>
              Va multumim pentru mesaj, <strong>{form.firstName}</strong>! Echipa CarFix va va contacta la adresa{" "}
              <strong>{form.email}</strong> in cel mai scurt timp.
            </div>
            <Link
              to="/"
              style={{
                background: "#d32f2f",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "25px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Inapoi acasa
            </Link>
          </div>
        ) : (
          <div style={c.grid}>
            {/* LEFT: Info */}
            <div>
              <div style={c.infoCard}>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", marginBottom: "24px" }}>
                  📌 Informatii de contact
                </div>
                {contactInfo.map((info) => (
                  <div key={info.title} style={c.infoItem}>
                    <div style={c.infoIcon}>{info.icon}</div>
                    <div>
                      <div style={c.infoTitle}>{info.title}</div>
                      {info.lines.map((line) => (
                        <div key={line} style={c.infoLine}>
                          {info.link ? (
                            <a href={info.link} style={{ color: "#d32f2f", textDecoration: "none" }}>
                              {line}
                            </a>
                          ) : (
                            line
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ ...c.infoCard, marginTop: "20px", background: darkMode ? "#1e293b" : "#fff3f3", border: "1px solid #fecdd3" }}>
                <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "12px", color: "#d32f2f" }}>
                  ⚡ Programare rapida
                </div>
                <div style={{ color: darkMode ? "#94a3b8" : "#4a5568", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "16px" }}>
                  Puteti face o programare online direct din platforma noastra in mai putin de 3 minute, fara apel telefonic.
                </div>
                <Link
                  to="/programari"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#d32f2f",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  Programeaza-te acum →
                </Link>
              </div>

              <div style={{ ...c.infoCard, marginTop: "20px" }}>
                <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "12px" }}>🗺️ Localizare</div>
                <div
                  style={{
                    background: darkMode ? "#0f172a" : "#f1f5f9",
                    borderRadius: "10px",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: darkMode ? "#64748b" : "#a0aec0",
                    fontSize: "0.85rem",
                  }}
                >
                  📍 Harta interactiva — Chisinau, str. Calea Iesilor 12
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div style={c.formCard}>
              <div style={c.formTitle}>✉️ Trimite un mesaj</div>

              <form onSubmit={handleSubmit}>
                <div style={c.row}>
                  <div style={c.fieldGroup}>
                    <label style={c.label}>Prenume *</label>
                    <input
                      style={errors.firstName ? c.inputError : c.input}
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Ion"
                    />
                    {errors.firstName && <div style={c.errorMsg}>{errors.firstName}</div>}
                  </div>
                  <div style={c.fieldGroup}>
                    <label style={c.label}>Nume *</label>
                    <input
                      style={errors.lastName ? c.inputError : c.input}
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Popescu"
                    />
                    {errors.lastName && <div style={c.errorMsg}>{errors.lastName}</div>}
                  </div>
                </div>

                <div style={c.row}>
                  <div style={c.fieldGroup}>
                    <label style={c.label}>Email *</label>
                    <input
                      style={errors.email ? c.inputError : c.input}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ion@email.md"
                    />
                    {errors.email && <div style={c.errorMsg}>{errors.email}</div>}
                  </div>
                  <div style={c.fieldGroup}>
                    <label style={c.label}>Telefon *</label>
                    <input
                      style={errors.phone ? c.inputError : c.input}
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+373 69 xxx xxx"
                    />
                    {errors.phone && <div style={c.errorMsg}>{errors.phone}</div>}
                  </div>
                </div>

                <div style={c.fieldGroup}>
                  <label style={c.label}>Subiect *</label>
                  <select
                    style={errors.subject ? c.inputError : c.input}
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="">-- Selectati subiectul --</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.subject && <div style={c.errorMsg}>{errors.subject}</div>}
                </div>

                <div style={c.row}>
                  <div style={c.fieldGroup}>
                    <label style={c.label}>Marca vehicul (optional)</label>
                    <input
                      style={c.input}
                      name="vehicleBrand"
                      value={form.vehicleBrand}
                      onChange={handleChange}
                      placeholder="ex: BMW, Dacia..."
                    />
                  </div>
                  <div style={c.fieldGroup}>
                    <label style={c.label}>Model vehicul (optional)</label>
                    <input
                      style={c.input}
                      name="vehicleModel"
                      value={form.vehicleModel}
                      onChange={handleChange}
                      placeholder="ex: E46, Logan..."
                    />
                  </div>
                </div>

                <div style={c.fieldGroup}>
                  <label style={c.label}>Mesaj *</label>
                  <div style={c.sectionSubtitle}>Minimum 20 de caractere ({form.message.length}/20)</div>
                  <textarea
                    style={errors.message ? { ...c.textarea, border: "1px solid #ef4444" } : c.textarea}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Descrieti in detaliu intrebarea sau problema dumneavoastra..."
                  />
                  {errors.message && <div style={c.errorMsg}>{errors.message}</div>}
                </div>

                <div style={c.checkRow}>
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={form.agreePrivacy}
                    onChange={handleChange}
                    id="privacy"
                    style={{ marginTop: "2px", accentColor: "#d32f2f", width: "16px", height: "16px" }}
                  />
                  <label htmlFor="privacy" style={{ fontSize: "0.85rem", color: darkMode ? "#94a3b8" : "#4a5568", cursor: "pointer" }}>
                    Sunt de acord cu{" "}
                    <span style={{ color: "#d32f2f", textDecoration: "underline", cursor: "pointer" }}>
                      Politica de Confidentialitate
                    </span>{" "}
                    si cu prelucrarea datelor personale in scopul procesarii cererii mele.
                  </label>
                </div>
                {errors.agreePrivacy && <div style={{ ...c.errorMsg, marginBottom: "12px" }}>{errors.agreePrivacy}</div>}

                <button type="submit" style={c.submitBtn} disabled={loading}>
                  {loading ? "⏳ Se trimite..." : "📨 Trimite mesajul"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}