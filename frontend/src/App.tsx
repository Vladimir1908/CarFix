import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Importuri noi
import Login from "./Login";
import DashboardAdmin from "./DashboardAdmin";
import DiagnozaPage from "./pages/DiagnozaPage"; // Import componenta nouă

function App() {
  type Role = "admin" | "user" | null;

  const [role, setRole] = useState<Role>(
    (localStorage.getItem("role") as Role) || null
  );

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setRole(null);
  };

  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const yOffset = -90;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = [
    {
      title: "Vezi toate serviciile",
      desc: "Explorează toate serviciile noastre",
      price: "",
      path: "/servicii"
    },
    {
      title: "DIAGNOSTICAREA COMPUTERIZATĂ A AUTOMOBILULUI",
      desc: "Preț de la:",
      price: "200 MDL",
      path: "/servicii/diagnoza"
    },
    {
      title: "REPARAȚIA MOTOARELOR ELECTRICE",
      desc: "Preț de la:",
      price: "400 MDL",
      path: "/servicii/motoare"
    },
    {
      title: "REPARAȚIA GENERATOARELOR",
      desc: "Preț de la:",
      price: "400 MDL",
      path: "/servicii/generatoare"
    },
  ];

  if (!role) {
    return <Login onLogin={(r: "admin" | "user") => setRole(r)} />;
  }

  if (role === "admin") {
    return <DashboardAdmin onLogout={logout} />;
  }

  return (
    <Router>
      <div style={{ width: "100vw", margin: 0, padding: 0, overflowX: "hidden", fontFamily: "Arial, sans-serif" }}>
        
        {/* NAVBAR */}
        <nav style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 5%", backgroundColor: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 1000 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.8rem", color: "#d32f2f" }}>
              CAR<span style={{ color: "#333" }}>FIX</span>
            </div>
          </Link>

          <div style={{ display: "flex", gap: "25px", fontWeight: "bold", color: "#444", cursor: "pointer" }}>
            <Link to="/" onClick={() => { setServicesOpen(false); scrollToSection("acasa"); }} style={{ textDecoration: "none", color: "inherit" }}>ACASĂ</Link>

            {/* SERVICII DROPDOWN */}
            <div ref={servicesRef} style={{ position: "relative", display: "inline-block" }}>
              <span onClick={() => setServicesOpen((v) => !v)} style={{ display: "inline-flex", alignItems: "center", gap: 6, userSelect: "none" }}>
                SERVICII <span style={{ fontSize: 14, transition: "0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
              </span>

              {servicesOpen && (
                <div style={{ position: "absolute", top: 44, left: -120, width: 520, background: "#fff", borderRadius: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.2)", padding: 18, zIndex: 2000, cursor: "default" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: "#333" }}>Vezi toate serviciile</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {services.map((service, index) => (
                      <Link key={index} to={service.path} onClick={() => setServicesOpen(false)} style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, borderRadius: 14, border: index === 0 ? "2px dashed #ddd" : "1px solid #eee", cursor: "pointer", background: "#fff" }}>
                          <div style={{ width: 46, height: 46, borderRadius: 12, background: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>🛠️</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, color: "#333", fontSize: 13, lineHeight: 1.2 }}>{service.title}</div>
                            <div style={{ color: "#777", fontSize: 13, marginTop: 4 }}>
                              {service.desc} {service.price ? <span style={{ color: "#ff4d29", fontWeight: 800 }}>{service.price}</span> : null}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span onClick={() => { setServicesOpen(false); scrollToSection("despre"); }}>DESPRE NOI</span>
            <span onClick={() => { setServicesOpen(false); scrollToSection("recenzii"); }}>RECENZII</span>
            <span onClick={() => { setServicesOpen(false); scrollToSection("contact"); }}>CONTACT</span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => { setServicesOpen(false); scrollToSection("contact"); }} style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "25px", fontWeight: "bold", cursor: "pointer" }}>Contactează-ne</button>
            <button onClick={logout} style={{ backgroundColor: "#333", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "25px", fontWeight: "bold", cursor: "pointer" }}>Logout</button>
          </div>
        </nav>

        {/* RUTELE APLICATIEI */}
        <Routes>
          <Route path="/" element={
            <>
              {/* HERO */}
              <div style={{ display: "flex", width: "100%", minHeight: "90vh", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 500px", minHeight: "600px", backgroundImage: 'url("/mecanic.webp")', backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#f5f5f5" }} />
                <div style={{ flex: "1 1 500px", padding: "60px 5%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h1 id="acasa" style={{ fontSize: "3.5rem", color: "#222", marginBottom: "20px" }}>Bun venit în atelierul nostru!</h1>
                  <p style={{ color: "#666", fontSize: "1.2rem", marginBottom: "40px", lineHeight: "1.6" }}>Știm cât de importantă este siguranța ta la drum.</p>
                  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1", minWidth: "250px", padding: "30px", boxShadow: "0 15px 35px rgba(0,0,0,0.1)", borderRadius: "20px", borderTop: "5px solid #ff4d29" }}>
                      <h3>Cu ce te putem ajuta?</h3>
                      <p style={{ color: "#ff4d29", fontWeight: "bold" }}>Echipa noastră se ocupă de orice problemă.</p>
                    </div>
                    <div style={{ flex: "1", minWidth: "250px", padding: "30px", boxShadow: "0 15px 35px rgba(0,0,0,0.1)", borderRadius: "20px", borderTop: "5px solid #ff4d29" }}>
                      <h3>De ce noi?</h3>
                      <p style={{ color: "#ff4d29", fontWeight: "bold" }}>Calitate garantată la orice reparație.</p>
                    </div>
                  </div>
                </div>
              </div>

              <section id="servicii" style={{ padding: "90px 5%", backgroundColor: "#fafafa" }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Servicii</h2>
                <p>Oferim diagnoză, mecanică și mentenanță completă.</p>
              </section>

              <section id="despre" style={{ padding: "90px 5%", backgroundColor: "#fff" }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Despre noi</h2>
                <p>Specialiști dedicați cu experiență.</p>
              </section>

              <section id="recenzii" style={{ padding: "90px 5%", backgroundColor: "#fafafa" }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Recenzii</h2>
                <p>Clienții noștri ne aleg pentru calitate.</p>
              </section>

              <section id="contact" style={{ padding: "90px 5%", backgroundColor: "#fff" }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Contact</h2>
                <p>Telefon: +37369751748</p>
              </section>
            </>
          } />
          
          <Route path="/servicii/diagnoza" element={<DiagnozaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;