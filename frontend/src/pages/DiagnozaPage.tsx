import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DiagnozaPage() {
  // Scroll automat în partea de sus la încărcarea paginii
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: "40px 10%", fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Navigare înapoi */}
      <Link to="/" style={{ color: "#ff4d29", textDecoration: "none", fontWeight: "bold", fontSize: "14px", display: "inline-block", marginBottom: "20px" }}>
        ← ÎNAPOI LA ACASĂ
      </Link>

      <header>
        <h1 style={{ fontSize: "2.2rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "30px" }}>
          DIAGNOSTICAREA COMPUTERIZATĂ A AUTOMOBILULUI – CARFIX CHIȘINĂU
        </h1>
      </header>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        {/* Coloana Stângă - Imagine și Introducere */}
        <div style={{ flex: "1 1 500px" }}>
          <img 
            src="/diagnoza.webp" 
            alt="Diagnoza Computerizata CarFix" 
            style={{ width: "100%", borderRadius: "20px", marginBottom: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          />
          <p style={{ lineHeight: "1.8", fontSize: "1.1rem", textAlign: "justify" }}>
            La <strong>CarFix Chișinău</strong>, diagnosticarea computerizată reprezintă o metodă modernă și extrem de precisă de identificare a problemelor tehnice ale vehiculului. Folosind echipamente profesionale de scanare și software avansat, tehnicienii noștri pot accesa toate modulele electronice ale mașinii pentru a detecta orice eroare sau defecțiune ascunsă.
          </p>
        </div>

        {/* Coloana Dreaptă - Detalii Procedură */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ color: "#ff4d29", fontSize: "1.5rem", marginBottom: "20px" }}>CE PRESUPUNE DIAGNOSTICAREA COMPUTERIZATĂ?</h2>
          <p style={{ fontStyle: "italic", marginBottom: "15px", color: "#666" }}>
            Procedura constă în conectarea autoturismului la un tester specializat care citește codurile de eroare și analizează parametrii de funcționare ai motorului și sistemelor electronice.
          </p>
          
          <ul style={{ listStyleType: "none", padding: 0, lineHeight: "2.2" }}>
            <li>✅ Scanarea computerizată a tuturor modulelor (motor, ABS, airbag, cutie, injecție etc.).</li>
            <li>✅ Detectarea codurilor de eroare și interpretarea lor corectă.</li>
            <li>✅ Citirea parametrilor în timp real pentru analiză avansată.</li>
            <li>✅ Testarea componentelor electronice și mecanice.</li>
            <li>✅ Resetarea erorilor după reparație.</li>
          </ul>
        </div>
      </div>

      {/* Secțiunea Probleme Identificate & Beneficii */}
      <div style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
        
        {/* Probleme Card */}
        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px", borderTop: "5px solid #333" }}>
          <h3 style={{ marginBottom: "20px" }}>CE PROBLEME POT FI IDENTIFICATE?</h3>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>Defecțiuni la motor</li>
            <li>Probleme la sistemul de injecție</li>
            <li>Erori ABS, ESP, airbag</li>
            <li>Defecțiuni ale cutiei de viteze</li>
            <li>Senzori defectuoși (sondă lambda, debitmetru, etc.)</li>
            <li>Probleme la sistemele electrice</li>
          </ul>
        </div>

        {/* Beneficii Card */}
        <div style={{ backgroundColor: "#fff5f2", padding: "30px", borderRadius: "20px", borderTop: "5px solid #ff4d29" }}>
          <h3 style={{ marginBottom: "20px", color: "#ff4d29" }}>BENEFICIILE DIAGNOSTICĂRII</h3>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>Identificare rapidă și precisă a problemelor</li>
            <li>Reducerea costurilor de reparații</li>
            <li>Prevenirea defecțiunilor majore</li>
            <li>Repararea corectă, pe baza datelor reale</li>
            <li>Îmbunătățirea performanței și consumului</li>
          </ul>
        </div>
      </div>

      {/* Footer Pagina Diagnoza */}
      <footer style={{ textAlign: "center", marginTop: "60px", padding: "40px", borderTop: "1px solid #eee" }}>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#222" }}>
          Alege CarFix Chișinău pentru o diagnosticare computerizată profesionistă, realizată cu tehnologie modernă și acuratețe maximă.
        </p>
        <button 
          onClick={() => window.location.href='/#contact'}
          style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "15px 35px", borderRadius: "30px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", marginTop: "20px", boxShadow: "0 4px 15px rgba(255, 77, 41, 0.3)" }}
        >
          PROGRAMEAZĂ O DIAGNOZĂ ACUM
        </button>
      </footer>
    </div>
  );
}