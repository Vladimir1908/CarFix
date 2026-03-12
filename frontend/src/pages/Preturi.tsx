import { Link } from "react-router-dom";

const PRICE_CATEGORIES = [
  {
    category: "Diagnosticare",
    icon: "🔍",
    services: [
      { name: "Diagnosticare computerizată completă", price: "200 MDL", duration: "~1 oră" },
      { name: "Citire & resetare coduri eroare", price: "100 MDL", duration: "~30 min" },
      { name: "Testare baterie & alternator", price: "80 MDL", duration: "~20 min" },
      { name: "Verificare pre-cumpărare mașină second-hand", price: "350 MDL", duration: "~2 ore" },
    ]
  },
  {
    category: "Electrică Auto",
    icon: "⚡",
    services: [
      { name: "Reparație motor electric (pornire/ventilator)", price: "400 MDL", duration: "2–4 ore" },
      { name: "Reparație alternator / generator", price: "400 MDL", duration: "2–3 ore" },
      { name: "Înlocuire baterie auto", price: "150 MDL + piesă", duration: "~20 min" },
      { name: "Reparație cablaj / scurtcircuit", price: "300–800 MDL", duration: "1–3 ore" },
      { name: "Programare / codare ECU", price: "500 MDL", duration: "1–2 ore" },
    ]
  },
  {
    category: "Mecanică Generală",
    icon: "🔧",
    services: [
      { name: "Schimb ulei motor + filtru ulei", price: "150 MDL + ulei", duration: "~30 min" },
      { name: "Schimb kit distribuție", price: "800–1500 MDL", duration: "4–6 ore" },
      { name: "Reparație ambreiaj", price: "600–1200 MDL", duration: "3–5 ore" },
      { name: "Schimb filtre (aer, habitaclu, combustibil)", price: "50–100 MDL/buc", duration: "~20 min" },
      { name: "Revizie completă (ulei + filtre + verificare)", price: "350 MDL + materiale", duration: "1–2 ore" },
    ]
  },
  {
    category: "Frâne & Suspensie",
    icon: "🛞",
    services: [
      { name: "Înlocuire plăcuțe frână față sau spate", price: "200 MDL + piese", duration: "~1 oră" },
      { name: "Înlocuire discuri frână (per axă)", price: "250 MDL + piese", duration: "~1 oră" },
      { name: "Verificare & reglare frâne", price: "100 MDL", duration: "~30 min" },
      { name: "Înlocuire amortizoare (per buc.)", price: "200 MDL + piesă", duration: "1–2 ore" },
      { name: "Geometrie roți (reglare unghi)", price: "180 MDL", duration: "~45 min" },
    ]
  },
  {
    category: "Climatizare",
    icon: "❄️",
    services: [
      { name: "Reîncărcare freon AC", price: "300 MDL", duration: "~45 min" },
      { name: "Diagnosticare sistem AC", price: "150 MDL", duration: "~30 min" },
      { name: "Curățare & igienizare AC", price: "200 MDL", duration: "~45 min" },
      { name: "Înlocuire compresor AC", price: "500 MDL + piesă", duration: "2–3 ore" },
    ]
  },
];

export default function Preturi() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>

      {/* Breadcrumbs */}
      <div style={{ padding: "20px 5%", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span>
        <strong style={{ color: "#333" }}>PREȚURI</strong>
      </div>

      {/* HEADER */}
      <div style={{ padding: "40px 5% 60px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "20px" }}>
          PREȚURI SERVICII
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "750px", lineHeight: "1.8" }}>
          Prețuri transparente, fără costuri ascunse. Prețurile pentru manoperă sunt orientative — costul final poate varia în funcție de marca mașinii și complexitatea lucrării. Piesele se adaugă separat la costul manoperei.
        </p>
      </div>

      {/* NOTA BENE */}
      <div style={{ margin: "0 5% 50px", backgroundColor: "#fff5f2", borderRadius: "16px", padding: "20px 24px", borderLeft: "5px solid #ff4d29", display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "1.4rem" }}>ℹ️</span>
        <p style={{ margin: 0, color: "#555", lineHeight: "1.7", fontSize: "0.95rem" }}>
          <strong>Important:</strong> Prețurile afișate reprezintă costul manoperei. Piesele de schimb necesare se vor adăuga la valoarea finală. Înainte de orice lucrare, vei primi o estimare clară a costului total.
        </p>
      </div>

      {/* TABELE PRETURI */}
      <div style={{ padding: "0 5% 80px", display: "flex", flexDirection: "column", gap: "48px" }}>
        {PRICE_CATEGORIES.map(cat => (
          <div key={cat.category}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ fontSize: "1.8rem" }}>{cat.icon}</span>
              <h2 style={{ fontSize: "1.4rem", color: "#222", margin: 0, borderBottom: "3px solid #ff4d29", paddingBottom: "6px" }}>{cat.category}</h2>
            </div>
            <div style={{ border: "1px solid #eee", borderRadius: "16px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f9" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", color: "#555", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #eee" }}>Serviciu</th>
                    <th style={{ padding: "14px 20px", textAlign: "center", color: "#555", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #eee", whiteSpace: "nowrap" }}>Durată</th>
                    <th style={{ padding: "14px 20px", textAlign: "right", color: "#555", fontWeight: "bold", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #eee" }}>Preț manoperă</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.services.map((s, i) => (
                    <tr key={s.name} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "14px 20px", color: "#333", fontSize: "0.95rem", borderBottom: "1px solid #f0f0f0" }}>{s.name}</td>
                      <td style={{ padding: "14px 20px", color: "#888", fontSize: "0.9rem", textAlign: "center", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>⏱ {s.duration}</td>
                      <td style={{ padding: "14px 20px", color: "#ff4d29", fontWeight: "bold", fontSize: "1rem", textAlign: "right", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>{s.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: "#222", padding: "60px 5%", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "12px" }}>Vrei o ofertă personalizată?</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "28px" }}>Contactează-ne și îți facem o estimare gratuită pentru mașina ta</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/programari">
            <button style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
              Programare online
            </button>
          </Link>
          <a href="tel:+37369751748">
            <button style={{ backgroundColor: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "14px 32px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
              📞 +373 69 751 748
            </button>
          </a>
        </div>
      </div>

    </div>
  );
}