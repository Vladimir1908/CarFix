import { useEffect, useRef, useState } from "react";
import Login from "./Login";
import DashboardAdmin from "./DashboardAdmin";

// frontend/src/App.tsx
function App() {
  // ======= LOGIN / ROLE (ADĂUGAT) =======
  type Role = "admin" | "user" | null;

  const [role, setRole] = useState<Role>(
    (localStorage.getItem("role") as Role) || null
  );

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setRole(null);
  };
  // =====================================

  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // offset pentru navbar sticky (ca să nu acopere titlul)
    const yOffset = -90;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // închide dropdown dacă dai click în afară
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
    },
    {
      title: "DIAGNOSTICAREA COMPUTERIZATĂ A AUTOMOBILULUI",
      desc: "Preț de la:",
      price: "200 MDL",
    },
    {
      title: "REPARAȚIA MOTOARELOR ELECTRICE",
      desc: "Preț de la:",
      price: "400 MDL",
    },
    {
      title: "REPARAȚIA GENERATOARELOR",
      desc: "Preț de la:",
      price: "400 MDL",
    },
  ];

  // ======= LOGICA AFIȘARE (ADĂUGAT) =======
  // dacă nu e logat -> Login
  if (!role) {
    return <Login onLogin={(r: "admin" | "user") => setRole(r)} />;
  }

  // dacă e admin -> Dashboard Admin
  if (role === "admin") {
    return <DashboardAdmin onLogout={logout} />;
  }
  // dacă e user -> continuă site-ul normal (return-ul de mai jos)
  // =======================================

  return (
    <div
      style={{
        width: "100vw",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 5%",
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.8rem", color: "#d32f2f" }}>
          CAR<span style={{ color: "#333" }}>FIX</span>
        </div>

        <div style={{ display: "flex", gap: "25px", fontWeight: "bold", color: "#444", cursor: "pointer" }}>
          <span
            onClick={() => {
              setServicesOpen(false);
              scrollToSection("acasa");
            }}
          >
            ACASĂ
          </span>

          {/* SERVICII DROPDOWN */}
          <div ref={servicesRef} style={{ position: "relative", display: "inline-block" }}>
            <span
              onClick={() => setServicesOpen((v) => !v)}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, userSelect: "none" }}
            >
              SERVICII
              <span
                style={{
                  fontSize: 14,
                  transition: "0.2s",
                  transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ▾
              </span>
            </span>

            {servicesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 44,
                  left: -120,
                  width: 520,
                  background: "#fff",
                  borderRadius: 20,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                  padding: 18,
                  zIndex: 2000,
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: "#333" }}>
                  Vezi toate serviciile
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {services.map((service, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setServicesOpen(false);
                        scrollToSection("servicii");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: 12,
                        borderRadius: 14,
                        border: index === 0 ? "2px dashed #ddd" : "1px solid #eee",
                        cursor: "pointer",
                        background: "#fff",
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 12,
                          background: "#f3f3f3",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: 20,
                        }}
                      >
                        🛠️
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, color: "#333", fontSize: 13, lineHeight: 1.2 }}>
                          {service.title}
                        </div>
                        <div style={{ color: "#777", fontSize: 13, marginTop: 4 }}>
                          {service.desc}{" "}
                          {service.price ? (
                            <span style={{ color: "#ff4d29", fontWeight: 800 }}>{service.price}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span
            onClick={() => {
              setServicesOpen(false);
              scrollToSection("despre");
            }}
          >
            DESPRE NOI
          </span>
          <span
            onClick={() => {
              setServicesOpen(false);
              scrollToSection("recenzii");
            }}
          >
            RECENZII
          </span>
          <span
            onClick={() => {
              setServicesOpen(false);
              scrollToSection("contact");
            }}
          >
            CONTACT
          </span>
        </div>

<<<<<<< HEAD
       <div style={{ display: "flex", gap: "10px" }}>
=======
        <div style={{ display: "flex", gap: "10px" }}>
>>>>>>> d8dd7b565eb81a1b6da9c5a5283257c34ced5574
  <button
    onClick={() => {
      setServicesOpen(false);
      scrollToSection("contact");
    }}
    style={{
      backgroundColor: "#ff4d29",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "25px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Contactează-ne
  </button>

  <button
    onClick={logout}
    style={{
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "25px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>
<<<<<<< HEAD

=======
>>>>>>> d8dd7b565eb81a1b6da9c5a5283257c34ced5574
      </nav>
      

      {/* HERO */}
      <div style={{ display: "flex", width: "100%", minHeight: "90vh", flexWrap: "wrap" }}>
        {/* IMAGINE STÂNGA */}
        <div
          style={{
            flex: "1 1 500px",
            minHeight: "600px",
            backgroundImage: 'url("/mecanic.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#f5f5f5",
          }}
        />

        {/* TEXT DREAPTA + CARDURI */}
        <div
          style={{
            flex: "1 1 500px",
            padding: "60px 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 id="acasa" style={{ fontSize: "3.5rem", color: "#222", marginBottom: "20px" }}>
            Bun venit în atelierul nostru!
          </h1>

          <p style={{ color: "#666", fontSize: "1.2rem", marginBottom: "40px", lineHeight: "1.6" }}>
            Știm cât de importantă este siguranța ta la drum. Echipa noastră te primește cu profesionalism și soluții
            rapide pentru orice problemă tehnică.
          </p>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Card 1 */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                padding: "30px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                borderRadius: "20px",
                borderTop: "5px solid #ff4d29",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Cu ce te putem ajuta?</h3>
              <p style={{ color: "#ff4d29", fontWeight: "bold" }}>Echipa noastră se ocupă de orice problemă.</p>
              <p style={{ color: "#777" }}>De la diagnoză la mecanica grea.</p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                padding: "30px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                borderRadius: "20px",
                borderTop: "5px solid #ff4d29",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>De ce noi?</h3>
              <p style={{ color: "#ff4d29", fontWeight: "bold" }}>Calitate garantată la orice reparație.</p>
              <p style={{ color: "#777" }}>Piese de origine și specialiști dedicați.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECȚIUNEA SERVICII */}
      <section id="servicii" style={{ padding: "90px 5%", backgroundColor: "#fafafa" }}>
        <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Servicii</h2>
        <p style={{ color: "#666", maxWidth: 900, lineHeight: 1.6 }}>
          Oferim diagnoză, mecanică, schimb ulei, frâne și mentenanță completă pentru mașina ta.
        </p>
      </section>

      {/* SECȚIUNEA DESPRE NOI */}
      <section id="despre" style={{ padding: "90px 5%", backgroundColor: "#fff" }}>
        <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Despre noi</h2>
        <p style={{ color: "#666", maxWidth: 900, lineHeight: 1.6 }}>
          Suntem o echipă de specialiști dedicați, cu experiență în service auto și soluții rapide.
        </p>
      </section>

      {/* SECȚIUNEA RECENZII */}
      <section id="recenzii" style={{ padding: "90px 5%", backgroundColor: "#fafafa" }}>
        <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Recenzii</h2>
        <p style={{ color: "#666", maxWidth: 900, lineHeight: 1.6 }}>
          Clienții noștri ne aleg pentru calitate, transparență și rapiditate.
        </p>
      </section>

      {/* SECȚIUNEA CONTACT */}
      <section id="contact" style={{ padding: "90px 5%", backgroundColor: "#fff" }}>
        <h2 style={{ fontSize: "2.4rem", marginBottom: "12px", color: "#222" }}>Contact</h2>
        <p style={{ color: "#666", maxWidth: 900, lineHeight: 1.6 }}>
          Telefon: +37369751748 • Email: contact@carfix.md
        </p>
      </section>
    </div>
  );
}

export default App;