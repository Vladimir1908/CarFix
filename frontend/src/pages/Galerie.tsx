import { useState } from "react";
import { Link } from "react-router-dom";

// Galeria foloseste imagini din folderul /public pe care le ai deja
// Adauga imaginile tale reale in /public si actualizeaza array-ul de mai jos
const PHOTOS = [
  { src: "/diagnozaauto.jpg", label: "Diagnosticare Computerizată" },
  { src: "/electrica-auto.jpg", label: "Electrică Auto" },
  { src: "/mecanic.webp", label: "Atelier CarFix" },
  { src: "/Diagnoza-auto.webp", label: "Echipament Diagnosticare" },
  { src: "/Electric.avif", label: "Reparație Motoare" },
  { src: "/suspenise.jpeg", label: "Suspensie & Frâne" },
  { src: "/background-service.jpg", label: "Service CarFix" },
  { src: "/diagnozaauto.jpg", label: "Testare Motor" },
  { src: "/electrica-auto.jpg", label: "Cablaje Auto" },
];

const FILTERS = ["Toate", "Diagnosticare", "Electrică", "Atelier", "Echipamente"];

export default function Galerie() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("Toate");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>

      {/* Breadcrumbs */}
      <div style={{ padding: "20px 5%", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span>
        <strong style={{ color: "#333" }}>GALERIE FOTO</strong>
      </div>

      {/* HEADER */}
      <div style={{ padding: "40px 5% 50px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "20px" }}>
          GALERIE CARFIX
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "650px", lineHeight: "1.8" }}>
          O privire în interiorul service-ului nostru — echipamente moderne, echipa noastră și rezultatele lucrărilor efectuate.
        </p>
      </div>

      {/* FILTRE */}
      <div style={{ padding: "0 5% 36px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{ padding: "8px 20px", borderRadius: "30px", border: activeFilter === f ? "none" : "1px solid #ddd", background: activeFilter === f ? "#ff4d29" : "#fff", color: activeFilter === f ? "#fff" : "#555", fontWeight: "bold", cursor: "pointer", fontSize: "0.9rem", transition: "0.2s" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID FOTO */}
      <div style={{ padding: "0 5% 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox(photo.src)}
              style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "4/3", backgroundColor: "#f5f5f5", border: "1px solid #eee", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
              {/* Label overlay */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.65))", padding: "24px 16px 14px", color: "#fff", fontSize: "0.85rem", fontWeight: "bold" }}>
                {photo.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.88)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}
        >
          <img
            src={lightbox}
            alt="Preview"
            style={{ maxWidth: "90%", maxHeight: "88vh", borderRadius: "12px", objectFit: "contain", boxShadow: "0 0 60px rgba(0,0,0,0.8)" }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: "20px", right: "28px", background: "none", border: "none", color: "#fff", fontSize: "2rem", cursor: "pointer", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* CTA */}
      <div style={{ backgroundColor: "#222", padding: "60px 5%", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "12px" }}>Vino să ne vizitezi!</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "28px" }}>Str. Automobilistilor 12, Chișinău • Lu–Sâ: 09:00–18:00</p>
        <Link to="/programari">
          <button style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "14px 36px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
            Programează-te acum
          </button>
        </Link>
      </div>

    </div>
  );
}