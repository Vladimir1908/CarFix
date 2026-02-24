export default function Servicii() {
  return (
    <div style={{ padding: "90px 5%", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: 10 }}>Servicii</h1>
      <p style={{ color: "#666", maxWidth: 900, lineHeight: 1.7 }}>
        Aici sunt informații și detalii despre toate serviciile CarFix: diagnoză computerizată,
        mecanică, schimb ulei, frâne, suspensie, electrică auto și multe altele.
      </p>

      <div style={{ marginTop: 30, display: "grid", gap: 16, maxWidth: 900 }}>
        <div style={{ padding: 18, borderRadius: 16, border: "1px solid #eee" }}>
          <h3 style={{ margin: 0 }}>Diagnosticare computerizată</h3>
          <p style={{ marginTop: 8, color: "#777" }}>
            Citire erori, parametri live, resetări, recomandări.
          </p>
          <p style={{ margin: 0, fontWeight: 800, color: "#ff4d29" }}>Preț de la: 200 MDL</p>
        </div>

        <div style={{ padding: 18, borderRadius: 16, border: "1px solid #eee" }}>
          <h3 style={{ margin: 0 }}>Reparații mecanice</h3>
          <p style={{ marginTop: 8, color: "#777" }}>
            Revizie, frâne, distribuție, ambreiaj, suspensie.
          </p>
          <p style={{ margin: 0, fontWeight: 800, color: "#ff4d29" }}>Preț de la: 400 MDL</p>
        </div>

        <div style={{ padding: 18, borderRadius: 16, border: "1px solid #eee" }}>
          <h3 style={{ margin: 0 }}>Electrică auto</h3>
          <p style={{ marginTop: 8, color: "#777" }}>
            Alternator, demaror, senzori, cablaje.
          </p>
          <p style={{ margin: 0, fontWeight: 800, color: "#ff4d29" }}>Preț de la: 400 MDL</p>
        </div>
      </div>
    </div>
  );
}