import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ElectricaDetalii() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: "40px 10%", fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>
      
      <Link to="/" style={{ color: "#ff4d29", textDecoration: "none", fontWeight: "bold", fontSize: "14px", display: "inline-block", marginBottom: "20px" }}>
        ← ÎNAPOI LA ACASĂ
      </Link>

      <header>
        <h1 style={{ fontSize: "2.2rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "10px" }}>
          ELECTRICĂ AUTO & GENERATOARE — CARFIX CHIȘINĂU
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "30px" }}>
          Reparații profesionale pentru sistemele electrice ale automobilului dvs.
        </p>
      </header>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        
        {/* Coloana Stângă */}
        <div style={{ flex: "1 1 500px" }}>
          <img
            src="/electrica.jpg"
            alt="Electrica Auto CarFix"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            style={{ width: "100%", borderRadius: "20px", marginBottom: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          />
          <p style={{ lineHeight: "1.8", fontSize: "1.1rem", textAlign: "justify" }}>
            La <strong>CarFix Chișinău</strong>, oferim servicii complete de electrică auto pentru orice marcă și model de vehicul. Echipa noastră de tehnicieni specializați dispune de echipamente moderne pentru diagnosticarea și repararea tuturor sistemelor electrice ale automobilului dvs.
          </p>
          <p style={{ lineHeight: "1.8", fontSize: "1.1rem", textAlign: "justify", marginTop: "15px" }}>
            De la probleme simple cu becurile sau siguranțele, până la reparații complexe ale alternatorului, demarorului sau sistemelor electronice avansate — suntem pregătiți să rezolvăm orice defecțiune electrică rapid și eficient.
          </p>
        </div>

        {/* Coloana Dreaptă */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ color: "#ff4d29", fontSize: "1.5rem", marginBottom: "20px" }}>CE SERVICII OFERIM?</h2>
          
          <ul style={{ listStyleType: "none", padding: 0, lineHeight: "2.4" }}>
            {[
              "Diagnosticare computerizată a sistemelor electrice",
              "Reparație și înlocuire alternator",
              "Reparație și înlocuire demaror",
              "Reparații motoare electrice",
              "Înlocuire și reparație senzori (ABS, O2, temperatură)",
              "Reparații cablaje și instalații electrice",
              "Reparații sistem de iluminare (faruri LED/xenon)",
              "Diagnosticare și reparare ECU (calculator motor)",
              "Reparații sistem de pornire și încărcare",
              "Montare și programare alarme și imobilizatoare",
            ].map((item, i) => (
              <li key={i}>✅ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Carduri Servicii */}
      <div style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
        
        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px", borderTop: "5px solid #ff4d29" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>⚡</div>
          <h3 style={{ color: "#ff4d29", marginBottom: "12px" }}>ALTERNATOR</h3>
          <p style={{ lineHeight: "1.7", color: "#555" }}>
            Alternatorul este responsabil de încărcarea bateriei și alimentarea sistemelor electrice. Diagnosticăm și reparăm sau înlocuim alternatorul defect cu piese de calitate.
          </p>
          <p style={{ marginTop: "12px", fontWeight: "bold", color: "#333" }}>Preț de la: <span style={{ color: "#ff4d29" }}>400 MDL</span></p>
        </div>

        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px", borderTop: "5px solid #333" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🔑</div>
          <h3 style={{ marginBottom: "12px" }}>DEMAROR</h3>
          <p style={{ lineHeight: "1.7", color: "#555" }}>
            Demarorul pornește motorul vehiculului. Dacă mașina nu pornește sau auziți zgomote ciudate la pornire, este posibil ca demarorul să fie defect. Îl reparăm sau înlocuim rapid.
          </p>
          <p style={{ marginTop: "12px", fontWeight: "bold", color: "#333" }}>Preț de la: <span style={{ color: "#ff4d29" }}>350 MDL</span></p>
        </div>

        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px", borderTop: "5px solid #ff4d29" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🔌</div>
          <h3 style={{ color: "#ff4d29", marginBottom: "12px" }}>CABLAJE & SENZORI</h3>
          <p style={{ lineHeight: "1.7", color: "#555" }}>
            Cablajele deteriorate și senzorii defecți pot cauza multiple probleme. Diagnosticăm complet și reparăm instalațiile electrice și toți senzorii vehiculului.
          </p>
          <p style={{ marginTop: "12px", fontWeight: "bold", color: "#333" }}>Preț de la: <span style={{ color: "#ff4d29" }}>200 MDL</span></p>
        </div>

        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px", borderTop: "5px solid #333" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🖥️</div>
          <h3 style={{ marginBottom: "12px" }}>ECU & CALCULATOR MOTOR</h3>
          <p style={{ lineHeight: "1.7", color: "#555" }}>
            Calculatorul motor controlează toate funcțiile electronice ale vehiculului. Diagnosticăm și reprogramăm sau înlocuim ECU-ul defect.
          </p>
          <p style={{ marginTop: "12px", fontWeight: "bold", color: "#333" }}>Preț de la: <span style={{ color: "#ff4d29" }}>500 MDL</span></p>
        </div>

        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px", borderTop: "5px solid #ff4d29" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>💡</div>
          <h3 style={{ color: "#ff4d29", marginBottom: "12px" }}>SISTEM ILUMINARE</h3>
          <p style={{ lineHeight: "1.7", color: "#555" }}>
            Montare și reparare faruri LED, xenon, lumini de zi. Verificare și reparare sistem de iluminare complet pentru siguranță maximă pe drum.
          </p>
          <p style={{ marginTop: "12px", fontWeight: "bold", color: "#333" }}>Preț de la: <span style={{ color: "#ff4d29" }}>150 MDL</span></p>
        </div>

        <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "20px", borderTop: "5px solid #333" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🛡️</div>
          <h3 style={{ marginBottom: "12px" }}>ALARMĂ & IMOBILIZATOR</h3>
          <p style={{ lineHeight: "1.7", color: "#555" }}>
            Montare sisteme de alarmă profesionale și imobilizatoare. Programare chei și telecomenzi pentru securizarea optimă a vehiculului.
          </p>
          <p style={{ marginTop: "12px", fontWeight: "bold", color: "#333" }}>Preț de la: <span style={{ color: "#ff4d29" }}>300 MDL</span></p>
        </div>
      </div>

      {/* Simptome */}
      <div style={{ marginTop: "60px", backgroundColor: "#fff5f2", padding: "40px", borderRadius: "20px", borderLeft: "6px solid #ff4d29" }}>
        <h3 style={{ color: "#ff4d29", fontSize: "1.5rem", marginBottom: "20px" }}>⚠️ SEMNE CĂ MAȘINA TA ARE PROBLEME ELECTRICE</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
          {[
            "🔋 Bateria se descarcă rapid",
            "🚗 Mașina nu pornește sau pornește greu",
            "💡 Luminile pâlpâie sau sunt slabe",
            "⚠️ Martori de avertizare aprinși pe bord",
            "🔌 Siguranțe care se ard repetat",
            "📻 Probleme cu sistemul audio/multimedia",
            "❄️ Aer condiționat care nu funcționează",
            "🪟 Geamuri electrice care nu funcționează",
          ].map((item, i) => (
            <div key={i} style={{ padding: "12px", backgroundColor: "#fff", borderRadius: "10px", fontSize: "0.95rem" }}>{item}</div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "60px", padding: "40px", borderTop: "1px solid #eee" }}>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#222", marginBottom: "10px" }}>
          Nu lăsa problemele electrice să te lase în pană!
        </p>
        <p style={{ color: "#666", marginBottom: "25px" }}>
          Contactează CarFix Chișinău pentru o diagnosticare rapidă și profesionistă.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => window.location.href = '/programari'}
            style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "15px 35px", borderRadius: "30px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}
          >
            PROGRAMEAZĂ O VIZITĂ
          </button>
          <button
            onClick={() => window.location.href = '/contact'}
            style={{ backgroundColor: "#333", color: "#fff", border: "none", padding: "15px 35px", borderRadius: "30px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}
          >
            CONTACTEAZĂ-NE
          </button>
        </div>
      </footer>
    </div>
  );
}