import { Link } from "react-router-dom";

export default function Servicii() {
  const listaServicii = [
    {
      title: "DIAGNOSTICAREA COMPUTERIZATĂ A AUTOMOBILULUI",
      desc: "Citire erori, parametri live, resetări, recomandări.",
      price: "200 MDL",
      img: "/Diagnoza-auto.webp", 
      path: "/servicii/diagnoza"
    },
    {
      title: "REPARAȚII MECANICE ȘI SUSPENSIE",
      desc: "Revizie, frâne, distribuție, ambreiaj, suspensie.",
      price: "400 MDL",
      
      img: "/suspenise.jpeg", 
      path: "/servicii/mecanica"
    },
    {
      title: "ELECTRICĂ AUTO / GENERATOARE",
      desc: "Alternator, demaror, senzori, cablaje, reparații motoare electrice.",
      price: "400 MDL",
      img: "/Electric.avif",
      path: "/servicii/generatoare"
    }
  ];

  return (
    <div style={{ padding: "40px 5%", fontFamily: "Arial, sans-serif", backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: "30px", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link> 
        <span style={{ margin: "0 10px" }}>{">"}</span> 
        <strong style={{ color: "#333" }}>SERVICII</strong>
      </nav>

      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#222" }}>SERVICII</h1>
      <p style={{ color: "#666", maxWidth: "800px", lineHeight: "1.6", marginBottom: "40px" }}>
        La CarFix Chișinău, oferim o gamă completă de servicii pentru întreținerea și repararea automobilului tău, 
        folosind echipamente de ultimă generație.
      </p>

      {/* Grid-ul de carduri */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "25px" 
      }}>
        {listaServicii.map((s, index) => (
          <div key={index} style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            border: "1px solid #eee",
            transition: "transform 0.3s ease",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Imagine Card */}
            <div style={{ height: "200px", overflow: "hidden" }}>
              <img 
                src={s.img} 
                alt={s.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>

            {/* Conținut Card */}
            <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "#222", height: "50px" }}>
                {s.title}
              </h3>
              <p style={{ color: "#777", fontSize: "0.95rem", marginBottom: "20px", lineHeight: "1.5" }}>
                {s.desc}
              </p>
              <div style={{ marginTop: "auto" }}>
                <p style={{ margin: "0 0 15px 0", fontWeight: "800", color: "#ff4d29", fontSize: "1.2rem" }}>
                  Preț de la: {s.price}
                </p>
                <Link to={s.path}>
                  <button style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#ff4d29",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "0.2s"
                  }}>
                    DETALII SERVICIU
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}