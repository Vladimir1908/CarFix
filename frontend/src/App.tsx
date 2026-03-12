import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import DashboardAdmin from "./DashboardAdmin";

// Pages existente
import DiagnozaPage from "./pages/DiagnozaPage";
import Servicii from "./pages/Servicii";
import ElectricaDetalii from "./pages/ElectricaDetalii";

import Despre from "./pages/Despre";
import Echipa from "./pages/Echipa";
import FAQ from "./pages/FAQ";
import Galerie from "./pages/Galerie";
import Preturi from "./pages/Preturi";
import Programari from "./pages/Programari";
import Recenzii from "./pages/Recenzii";
import Contact from "./pages/Contact";

function App() {
  type Role = "admin" | "user" | null;

  const [role, setRole] = useState<Role>(
    (localStorage.getItem("role") as Role) || null
  );

  // --- MODIFICARE: Logica pentru Temă ---
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const theme = {
    bg: darkMode ? "#121212" : "#ffffff",
    text: darkMode ? "#ffffff" : "#333333",
    navBg: darkMode ? "#1a1a1a" : "#ffffff",
    border: darkMode ? "#333333" : "#eee",
    cardBg: darkMode ? "#1e1e1e" : "#ffffff"
  };

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  // --------------------------------------

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
      <div style={{ 
        width: "100vw", 
        margin: 0, 
        padding: 0, 
        overflowX: "hidden", 
        fontFamily: "Arial, sans-serif",
        backgroundColor: theme.bg, // Aplicare temă fundal
        color: theme.text,         // Aplicare temă text
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}>

        {/* NAVBAR */}
        <nav style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "15px 5%", 
          backgroundColor: theme.navBg, // Aplicare temă nav
          borderBottom: `1px solid ${theme.border}`, 
          position: "sticky", 
          top: 0, 
          zIndex: 1000 
        }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.8rem", color: "#d32f2f" }}>
              CAR<span style={{ color: theme.text }}>FIX</span>
            </div>
          </Link>

          <div style={{ display: "flex", gap: "25px", fontWeight: "bold", color: theme.text, cursor: "pointer", alignItems: "center" }}>
            
            {/* BUTON DARK MODE */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: "none",
                border: `1px solid ${theme.border}`,
                borderRadius: "20px",
                padding: "6px 12px",
                cursor: "pointer",
                color: theme.text,
                fontSize: "12px",
                fontWeight: "bold"
              }}
            >
              {darkMode ? "☀️ LIGHT" : "🌙 DARK"}
            </button>

            <Link to="/" onClick={() => { setServicesOpen(false); scrollToSection("acasa"); }} style={{ textDecoration: "none", color: "inherit" }}>ACASĂ</Link>

            {/* SERVICII DROPDOWN */}
            <div ref={servicesRef} style={{ position: "relative", display: "inline-block" }}>
              <span onClick={() => setServicesOpen((v) => !v)} style={{ display: "inline-flex", alignItems: "center", gap: 6, userSelect: "none" }}>
                SERVICII <span style={{ fontSize: 14, transition: "0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
              </span>

              {servicesOpen && (
                <div style={{ 
                  position: "absolute", top: 44, left: -120, width: 520, 
                  background: theme.navBg, // Temă dropdown
                  borderRadius: 20, boxShadow: "0 20px 50px rgba(0,0,0,0.2)", padding: 18, zIndex: 2000, cursor: "default",
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: theme.text }}>Vezi toate serviciile</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {services.map((service, index) => (
                      <Link key={index} to={service.path} onClick={() => setServicesOpen(false)} style={{ textDecoration: "none" }}>
                        <div style={{ 
                          display: "flex", alignItems: "center", gap: 14, padding: 12, borderRadius: 14, 
                          border: index === 0 ? "2px dashed #ddd" : `1px solid ${theme.border}`, 
                          cursor: "pointer", background: theme.cardBg 
                        }}>
                          <div style={{ width: 46, height: 46, borderRadius: 12, background: darkMode ? "#333" : "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>🛠️</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, color: theme.text, fontSize: 13, lineHeight: 1.2 }}>{service.title}</div>
                            <div style={{ color: darkMode ? "#aaa" : "#777", fontSize: 13, marginTop: 4 }}>
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

            <Link to="/despre" onClick={() => setServicesOpen(false)} style={{ textDecoration: "none", color: "inherit" }}>DESPRE NOI</Link>
            <Link to="/recenzii" onClick={() => setServicesOpen(false)} style={{ textDecoration: "none", color: "inherit" }}>RECENZII</Link>
            <Link to="/preturi" onClick={() => setServicesOpen(false)} style={{ textDecoration: "none", color: "inherit" }}>PREȚURI</Link>
            <Link to="/contact" onClick={() => setServicesOpen(false)} style={{ textDecoration: "none", color: "inherit" }}>CONTACT</Link>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/programari" style={{ textDecoration: "none" }}>
              <button style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "25px", fontWeight: "bold", cursor: "pointer" }}>
                Programare
              </button>
            </Link>
            <button onClick={logout} style={{ backgroundColor: darkMode ? "#444" : "#333", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "25px", fontWeight: "bold", cursor: "pointer" }}>Logout</button>
          </div>
        </nav>

        {/* RUTE */}
        <Routes>
          <Route path="/" element={
            <>
              {/* HERO */}
              <div style={{ display: "flex", width: "100%", minHeight: "90vh", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 500px", minHeight: "600px", backgroundImage: 'url("/mecanic.webp")', backgroundSize: "cover", backgroundPosition: "center", backgroundColor: darkMode ? "#222" : "#f5f5f5" }} />
                <div style={{ flex: "1 1 500px", padding: "60px 5%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h1 id="acasa" style={{ fontSize: "3.5rem", color: theme.text, marginBottom: "20px" }}>Bun venit în atelierul nostru!</h1>
                  <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: "1.2rem", marginBottom: "40px", lineHeight: "1.6" }}>Știm cât de importantă este siguranța ta la drum.</p>
                  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    <div style={{ flex: "1", minWidth: "250px", padding: "30px", boxShadow: darkMode ? "0 15px 35px rgba(0,0,0,0.5)" : "0 15px 35px rgba(0,0,0,0.1)", borderRadius: "20px", borderTop: "5px solid #ff4d29", background: theme.cardBg }}>
                      <h3>Cu ce te putem ajuta?</h3>
                      <p style={{ color: "#ff4d29", fontWeight: "bold" }}>Echipa noastră se ocupă de orice problemă.</p>
                    </div>
                    <div style={{ flex: "1", minWidth: "250px", padding: "30px", boxShadow: darkMode ? "0 15px 35px rgba(0,0,0,0.5)" : "0 15px 35px rgba(0,0,0,0.1)", borderRadius: "20px", borderTop: "5px solid #ff4d29", background: theme.cardBg }}>
                      <h3>De ce noi?</h3>
                      <p style={{ color: "#ff4d29", fontWeight: "bold" }}>Calitate garantată la orice reparație.</p>
                    </div>
                  </div>
                </div>
              </div>

              <section id="servicii" style={{ padding: "90px 5%", backgroundColor: darkMode ? "#1a1a1a" : "#fafafa" }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: theme.text }}>Servicii</h2>
                <p>Oferim diagnoză, mecanică și mentenanță completă.</p>
              </section>

              <section id="despre" style={{ padding: "90px 5%", backgroundColor: theme.bg }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: theme.text }}>Despre noi</h2>
                <p>Specialiști dedicați cu experiență.</p>
              </section>

              {/* ... Restul secțiunilor cu theme.text ... */}
            </>
          } />

          <Route path="/servicii" element={<Servicii />} />
          <Route path="/servicii/diagnoza" element={<DiagnozaPage />} />
          <Route path="/servicii/motoare" element={<ElectricaDetalii />} />
          <Route path="/despre" element={<Despre />} />
          <Route path="/echipa" element={<Echipa />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/preturi" element={<Preturi />} />
          <Route path="/programari" element={<Programari />} />
          {/* Pasăm tema către Recenzii */}
          <Route path="/recenzii" element={<Recenzii theme={theme} isDark={darkMode} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;