import { Link } from "react-router-dom";

export default function Despre() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>

      {/* Breadcrumbs */}
      <div style={{ padding: "20px 5%", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span>
        <strong style={{ color: "#333" }}>DESPRE NOI</strong>
      </div>

      {/* HERO */}
      <div style={{ padding: "60px 5% 80px", backgroundColor: "#fff" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "20px" }}>
          DESPRE CARFIX CHIȘINĂU
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "750px", lineHeight: "1.8" }}>
          Suntem un service auto din Chișinău cu peste <strong>10 ani de experiență</strong> în diagnosticarea, repararea și întreținerea automobilelor. Echipa noastră este formată din tehnicieni specializați, pasionați de automobile și dedicați calității.
        </p>
      </div>

      {/* MISIUNE + VIZIUNE */}
      <div style={{ padding: "0 5% 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
        <div style={{ backgroundColor: "#f9f9f9", borderRadius: "20px", padding: "35px", borderTop: "5px solid #ff4d29" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🎯</div>
          <h2 style={{ color: "#ff4d29", marginBottom: "16px", fontSize: "1.3rem" }}>MISIUNEA NOASTRĂ</h2>
          <p style={{ color: "#666", lineHeight: "1.8" }}>
            Să oferim servicii auto de înaltă calitate la prețuri corecte, asigurând siguranța și satisfacția fiecărui client. Fiecare mașină care intră în service-ul nostru este tratată cu maximă atenție și profesionalism.
          </p>
        </div>
        <div style={{ backgroundColor: "#f9f9f9", borderRadius: "20px", padding: "35px", borderTop: "5px solid #333" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🔭</div>
          <h2 style={{ color: "#333", marginBottom: "16px", fontSize: "1.3rem" }}>VIZIUNEA NOASTRĂ</h2>
          <p style={{ color: "#666", lineHeight: "1.8" }}>
            Să devenim service-ul auto de referință în Republica Moldova, recunoscut pentru transparență, tehnologie modernă și o relație de lungă durată cu clienții noștri.
          </p>
        </div>
      </div>

      {/* STATISTICI */}
      <div style={{ backgroundColor: "#222", padding: "60px 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "30px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          {[
            { num: "10+", label: "Ani de experiență" },
            { num: "2000+", label: "Clienți mulțumiți" },
            { num: "15+", label: "Servicii disponibile" },
            { num: "100%", label: "Garanție reparații" },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: "2.8rem", fontWeight: "bold", color: "#ff4d29" }}>{stat.num}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", marginTop: "8px", fontSize: "0.95rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DE CE NOI */}
      <div style={{ padding: "80px 5%" }}>
        <h2 style={{ fontSize: "2rem", color: "#222", marginBottom: "12px", textAlign: "center" }}>DE CE SĂ ALEGI CARFIX?</h2>
        <p style={{ color: "#888", textAlign: "center", marginBottom: "50px" }}>Avantajele care ne diferențiază de restul</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { icon: "🏆", title: "Calitate garantată", desc: "Toate lucrările efectuate beneficiază de garanție. Lucrăm corect de prima dată." },
            { icon: "💰", title: "Prețuri transparente", desc: "Niciun cost ascuns. Îți comunicăm prețul înainte de a începe orice lucrare." },
            { icon: "⚡", title: "Intervenții rapide", desc: "Înțelegem că mașina ta e importantă. Lucrăm eficient fără a compromite calitatea." },
            { icon: "🔧", title: "Echipamente moderne", desc: "Investim constant în tehnologie pentru a oferi diagnosticări și reparații precise." },
            { icon: "👨‍🔧", title: "Tehnicieni specializați", desc: "Echipa noastră este formată din profesioniști cu experiență vastă în domeniu." },
            { icon: "📞", title: "Suport după reparație", desc: "Suntem disponibili și după finalizarea lucrărilor dacă ai orice întrebare." },
          ].map(item => (
            <div key={item.title} style={{ backgroundColor: "#fafafa", borderRadius: "16px", padding: "28px", border: "1px solid #eee" }}>
              <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ color: "#222", marginBottom: "10px", fontSize: "1rem" }}>{item.title}</h3>
              <p style={{ color: "#777", fontSize: "0.9rem", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: "#fff5f2", padding: "60px 5%", textAlign: "center", borderTop: "1px solid #ffe0d6" }}>
        <h2 style={{ color: "#222", fontSize: "1.8rem", marginBottom: "12px" }}>Ai o problemă cu mașina?</h2>
        <p style={{ color: "#666", marginBottom: "28px" }}>Contactează-ne și îți oferim o consultație gratuită</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/programari">
            <button style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
              Programare online
            </button>
          </Link>
          <Link to="/contact">
            <button style={{ backgroundColor: "#fff", color: "#333", border: "2px solid #ddd", padding: "14px 32px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
              Contactează-ne
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}