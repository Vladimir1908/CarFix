import { Link } from "react-router-dom";
import { useState } from "react";

interface FooterLink {
  label: string;
  to: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Servicii",
    links: [
      { label: "Diagnosticare Computerizata", to: "/servicii" },
      { label: "Reparatii Electrice", to: "/servicii" },
      { label: "Reparatii Mecanice", to: "/servicii" },
      { label: "Sistem de Franare", to: "/servicii" },
      { label: "Schimb Ulei & Filtre", to: "/servicii" },
      { label: "Climatizare & AC", to: "/servicii" },
      { label: "Revizie Completa", to: "/servicii" },
    ],
  },
  {
    title: "Informatii",
    links: [
      { label: "Despre noi", to: "/despre" },
      { label: "Echipa noastra", to: "/despre#echipa" },
      { label: "Galerie foto", to: "/galerie" },
      { label: "Certificari & Garantii", to: "/despre#certificari" },
      { label: "Parteneri", to: "/parteneri" },
    ],
  },
  {
    title: "Suport",
    links: [
      { label: "Intrebari frecvente", to: "/faq" },
      { label: "Contactati-ne", to: "/contact" },
      { label: "Politica de confidentialitate", to: "/privacy" },
      { label: "Termeni si conditii", to: "/terms" },
      { label: "GDPR", to: "/gdpr" },
    ],
  },
];

const socialLinks = [
  { icon: "📘", label: "Facebook", href: "https://facebook.com", color: "#1877f2" },
  { icon: "📸", label: "Instagram", href: "https://instagram.com", color: "#e1306c" },
  { icon: "▶️", label: "YouTube", href: "https://youtube.com", color: "#ff0000" },
  { icon: "💼", label: "LinkedIn", href: "https://linkedin.com", color: "#0a66c2" },
];

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");

  const bg = darkMode ? "#0f172a" : "#1a1a2e";
  const cardBg = darkMode ? "#1e293b" : "#16213e";
  const textColor = "#e2e8f0";
  const mutedColor = "#94a3b8";
  const borderColor = darkMode ? "#334155" : "#2d3748";

  const handleSubscribe = () => {
    if (!email.trim()) {
      setEmailError("Introduceti adresa de email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Email invalid.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
  };

  return (
    <footer style={{ background: bg, color: textColor, fontFamily: "Arial, sans-serif" }}>
      {/* Top CTA band */}
      <div
        style={{
          background: "linear-gradient(90deg, #d32f2f 0%, #b71c1c 100%)",
          padding: "28px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "8px" }}>
            🚗 Programeaza-ti vehiculul acum — rapid si simplu!
          </div>
          <div style={{ opacity: 0.9, marginBottom: "18px", fontSize: "0.95rem" }}>
            Fara apel telefonic. Alege data, ora si serviciul dorit in 3 minute.
          </div>
          <Link
            to="/programari"
            style={{
              background: "#fff",
              color: "#d32f2f",
              padding: "12px 32px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              display: "inline-block",
            }}
          >
            Programeaza-te online →
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "50px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "40px",
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "6px" }}>
              <span style={{ color: "#d32f2f" }}>CAR</span>FIX
            </div>
            <div style={{ fontSize: "0.8rem", color: mutedColor, marginBottom: "16px" }}>
              Platforma digitala de service auto
            </div>
            <div style={{ color: mutedColor, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "24px" }}>
              CarFix este platforma web care conecteaza clientii cu service-ul auto profesional din Chisinau.
              Programare online, transparenta totala a preturilor si garantie pentru toate lucrarile efectuate.
            </div>

            {/* Contact quick info */}
            <div style={{ marginBottom: "24px" }}>
              {[
                { icon: "📍", text: "Chisinau, str. Calea Iesilor 12" },
                { icon: "📞", text: "+373 22 123 456" },
                { icon: "📧", text: "contact@carfix.md" },
                { icon: "🕐", text: "Luni–Vineri: 08:00–18:00" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "8px",
                    fontSize: "0.85rem",
                    color: mutedColor,
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    fontSize: "1rem",
                    transition: "background 0.2s",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  marginBottom: "16px",
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: "8px" }}>
                    <Link
                      to={link.to}
                      style={{
                        color: mutedColor,
                        textDecoration: "none",
                        fontSize: "0.88rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = mutedColor)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          style={{
            background: cardBg,
            borderRadius: "14px",
            padding: "28px 32px",
            marginTop: "44px",
            border: `1px solid ${borderColor}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "6px" }}>
              📬 Abonati-va la newsletter
            </div>
            <div style={{ color: mutedColor, fontSize: "0.88rem" }}>
              Primiti oferte exclusive si sfaturi auto direct in inbox.
            </div>
          </div>
          {subscribed ? (
            <div style={{ color: "#10b981", fontWeight: "bold", fontSize: "0.95rem" }}>
              ✅ Va multumim! Veti primi ofertele noastre curand.
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div>
                <input
                  type="email"
                  placeholder="email@exemplu.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${emailError ? "#ef4444" : borderColor}`,
                    background: "#0f172a",
                    color: "#fff",
                    fontSize: "0.9rem",
                    outline: "none",
                    width: "240px",
                  }}
                />
                {emailError && <div style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "4px" }}>{emailError}</div>}
              </div>
              <button
                onClick={handleSubscribe}
                style={{
                  padding: "10px 20px",
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                Aboneaza-ma
              </button>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "32px",
          }}
        >
          {[
            { icon: "🔒", text: "Date securizate" },
            { icon: "✅", text: "Garantie lucrari" },
            { icon: "⭐", text: "Servicii certificate" },
            { icon: "💳", text: "Plata cash / card" },
            { icon: "🏆", text: "10+ ani experienta" },
          ].map((badge) => (
            <div
              key={badge.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: mutedColor,
                fontSize: "0.82rem",
                background: cardBg,
                padding: "6px 14px",
                borderRadius: "20px",
                border: `1px solid ${borderColor}`,
              }}
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: `1px solid ${borderColor}`,
          padding: "18px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ color: mutedColor, fontSize: "0.82rem" }}>
            © {new Date().getFullYear()} CarFix — Platforma web de service auto. Toate drepturile rezervate.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            {["Confidentialitate", "Termeni", "GDPR"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                style={{ color: mutedColor, textDecoration: "none", fontSize: "0.8rem" }}
              >
                {link}
              </Link>
            ))}
          </div>
          <div style={{ color: mutedColor, fontSize: "0.78rem" }}>
            Realizat cu ❤️ de echipa SI-242 UTM
          </div>
        </div>
      </div>
    </footer>
  );
}