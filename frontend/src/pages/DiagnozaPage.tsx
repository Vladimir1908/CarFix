import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DiagnozaPage() {
  // Scroll sus când se deschide pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: "40px 10%", fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Breadcrumbs / Navigare înapoi */}
      <Link to="/" style={{ color: "#ff4d29", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
        ← ÎNAPOI LA PAGINA PRINCIPALĂ
      </Link>

      <h1 style={{ fontSize: "2.5rem", marginTop: "20px", color: "#222", textTransform: "uppercase" }}>
        Diagnosticarea computerizată a automobilului
      </h1>

      <div style={{ display: "flex", gap: "40px", marginTop: "30px", flexWrap: "wrap" }}>
        {/* Imagine */}
        <div style={{ flex: "1 1 400px" }}>
          <img 
            src="/diagnoza.jpg" // Pune o imagine cu un motor/tester în public
            alt="Diagnoza Auto" 
            style={{ width: "100%", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          />
        </div>

        {/* Detalii */}
        <div style={{ flex: "1 1 400px" }}>
          <h3 style={{ color: "#ff4d29" }}>CE PRESUPUNE ACEST SERVICIU?</h3>
          <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>
            Diagnosticarea computerizată permite verificarea tuturor sistemelor electronice ale mașinii tale. 
            Folosim scanere profesionale pentru a identifica erorile stocate în calculatorul de bord (ECU).
          </p>
          
          <ul style={{ lineHeight: "2", fontSize: "1rem" }}>
            <li>✅ Scanarea modulelor motor, ABS, Airbag</li>
            <li>✅ Citirea și ștergerea codurilor de eroare</li>
            <li>✅ Verificarea parametrilor în timp real</li>
            <li>✅ Resetarea intervalelor de service</li>
          </ul>

          <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "15px", borderLeft: "5px solid #ff4d29" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Preț serviciu: de la 200 MDL</span>
          </div>
        </div>
      </div>
    </div>
  );
}