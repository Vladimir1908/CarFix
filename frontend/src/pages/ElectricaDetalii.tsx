import { Link } from "react-router-dom";

export default function ElectricaDetalii() {
  return (
    <div style={{ padding: "40px 5%", fontFamily: "Arial, sans-serif", color: "#333" }}>
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: "30px", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link> 
        <span style={{ margin: "0 10px" }}>{">"}</span> 
        <Link to="/servicii" style={{ textDecoration: "none", color: "#888" }}>SERVICII</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span> 
        <strong style={{ color: "#333" }}>REPARAȚIA MOTOARELOR ELECTRICE</strong>
      </nav>

      <h1 style={{ fontSize: "2.5rem", color: "#222", borderLeft: "5px solid #ff4d29", paddingLeft: "20px", marginBottom: "40px" }}>
        REPARAȚIA MOTOARELOR ELECTRICE – CARFIX CHIȘINĂU
      </h1>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap", marginBottom: "50px" }}>
        <div style={{ flex: "1 1 500px" }}>
          <img 
            src="/electrica-auto.jpg" 
            alt="Reparatii Motoare Electrice CarFix" 
            style={{ width: "100%", borderRadius: "20px", marginBottom: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          />
          <p style={{ lineHeight: "1.8", fontSize: "1.1rem", textAlign: "justify" }}>
            La <strong>CarFix Chișinău</strong>, reparația motoarelor electrice reprezintă o procedură complexă care include diagnosticarea, demontarea și restaurarea componentelor interne. Motoarele electrice sunt vitale pentru ventilatoare, pompe și servomotoare auxiliare.
          </p>
        </div>

        <div style={{ flex: "1 1 400px", backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px" }}>
          <h2 style={{ color: "#ff4d29", marginTop: "0" }}>CE IMPLICĂ REPARAȚIA?</h2>
          <ul style={{ lineHeight: "2", fontSize: "1.05rem" }}>
            <li>Diagnosticare electronică și mecanică</li>
            <li>Demontarea completă pentru evaluare</li>
            <li>Înlocuirea rulmenților și a periilor colectoare</li>
            <li>Curățarea și lubrifierea componentelor</li>
            <li>Rebobinare și testare finală de performanță</li>
          </ul>
        </div>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>ANALIZA DEFECȚIUNILOR ȘI BENEFICII</h2>
      
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px", backgroundColor: "#fff" }}>
        <thead>
          <tr style={{ backgroundColor: "#ff4d29", color: "#fff" }}>
            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Simptome Defecte</th>
            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Beneficii Reparație Profesionistă</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Zgomote neobișnuite / Scârțâit</td>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Funcționare stabilă și sigură</td>
          </tr>
          <tr>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Miros de ars sau supraîncălzire</td>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Prevenirea defecțiunilor majore</td>
          </tr>
          <tr>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Funcționare intermitentă</td>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Durată de viață extinsă a pieselor</td>
          </tr>
          <tr>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Blocarea totală a mecanismului</td>
            <td style={{ padding: "15px", border: "1px solid #ddd" }}>• Costuri reduse față de înlocuire</td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#222", color: "#fff", borderRadius: "20px" }}>
        <h3>Ai probleme cu sistemele electrice?</h3>
        <p>Alege profesionalismul pentru siguranța mașinii tale.</p>
        <button style={{ padding: "15px 30px", backgroundColor: "#ff4d29", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          PROGRAMEAZĂ O VERIFICARE
        </button>
      </div>
    </div>
  );
}