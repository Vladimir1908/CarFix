import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Alexandru Moraru",
    role: "Mecanic Senior & Manager Service",
    exp: "12 ani experiență",
    desc: "Specialist în diagnosticarea avansată și reparații complexe ale motorului. A lucrat cu toate mărcile europene și asiatice.",
    icon: "👨‍🔧",
    speciality: "Motor & Transmisie",
  },
  {
    name: "Ion Cojocariu",
    role: "Electrician Auto Senior",
    exp: "9 ani experiență",
    desc: "Expert în sisteme electrice complexe, ECU și cablaje. Rezolvă orice problemă electronică a vehiculului tău.",
    icon: "⚡",
    speciality: "Electrică Auto",
  },
  {
    name: "Vasile Rotaru",
    role: "Mecanic Suspensie & Frâne",
    exp: "8 ani experiență",
    desc: "Specializat în sistemele de rulare, suspensie, direcție și frânare. Precizie maximă la geometria roților.",
    icon: "🛞",
    speciality: "Suspensie & Frâne",
  },
  {
    name: "Dumitru Lungu",
    role: "Tehnician Diagnosticare",
    exp: "6 ani experiență",
    desc: "Operator principal al echipamentelor de diagnosticare computerizată. Interpretează rapid și precis codurile de eroare.",
    icon: "🔍",
    speciality: "Diagnosticare",
  },
  {
    name: "Andrei Ciobanu",
    role: "Mecanic Auto",
    exp: "5 ani experiență",
    desc: "Realizează revizii, schimburi de ulei, distribuții și orice lucrare de mentenanță preventivă cu grijă și eficiență.",
    icon: "🔧",
    speciality: "Mentenanță",
  },
  {
    name: "Maria Popescu",
    role: "Recepționer & Coordonator",
    exp: "4 ani experiență",
    desc: "Prima față a CarFix. Coordonează programările, informează clienții și asigură că totul decurge fără probleme.",
    icon: "📋",
    speciality: "Relații Clienți",
  },
];

export default function Echipa() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>

      {/* Breadcrumbs */}
      <div style={{ padding: "20px 5%", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span>
        <strong style={{ color: "#333" }}>ECHIPA NOASTRĂ</strong>
      </div>

      {/* HEADER */}
      <div style={{ padding: "40px 5% 60px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "20px" }}>
          ECHIPA CARFIX
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "700px", lineHeight: "1.8" }}>
          Oamenii din spatele fiecărei reparații. O echipă unită de profesioniști dedicați calității și siguranței tale pe drum.
        </p>
      </div>

      {/* GRID ECHIPA */}
      <div style={{ padding: "0 5% 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", maxWidth: "1100px", margin: "0 auto" }}>
          {TEAM.map(member => (
            <div key={member.name} style={{ backgroundColor: "#fff", borderRadius: "20px", border: "1px solid #eee", overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.06)" }}>
              {/* Avatar area */}
              <div style={{ backgroundColor: "#f9f9f9", padding: "36px", textAlign: "center", borderBottom: "1px solid #eee" }}>
                <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{member.icon}</div>
                <div style={{ fontWeight: "bold", color: "#222", fontSize: "1.1rem" }}>{member.name}</div>
                <div style={{ color: "#ff4d29", fontWeight: "bold", fontSize: "0.85rem", marginTop: "4px" }}>{member.role}</div>
              </div>
              {/* Info */}
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ backgroundColor: "#fff5f2", color: "#ff4d29", padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold" }}>{member.speciality}</span>
                  <span style={{ color: "#aaa", fontSize: "0.8rem" }}>⏱ {member.exp}</span>
                </div>
                <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: "1.65", margin: 0 }}>{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JOIN US */}
      <div style={{ backgroundColor: "#222", padding: "60px 5%", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "16px" }}>Vrei să faci parte din echipa CarFix?</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "28px" }}>Căutăm tehnicieni pasionați și dedicați calității</p>
        <Link to="/contact">
          <button style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "14px 36px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
            Contactează-ne
          </button>
        </Link>
      </div>

    </div>
  );
}