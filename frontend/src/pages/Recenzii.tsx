import { useState } from "react";
import { Link } from "react-router-dom";

const REVIEWS = [
  { name: "Ion Popescu", car: "BMW E46", rating: 5, date: "Martie 2025", service: "Diagnosticare Computerizată", text: "Serviciu excelent! Au diagnosticat problema rapid și au reparat-o la un preț corect. Echipa este foarte prietenoasă și profesionistă. Recomand cu toată încrederea!" },
  { name: "Maria Ionescu", car: "Toyota Corolla", rating: 5, date: "Februarie 2025", service: "Reparație Motor Electric", text: "Profesioniști adevărați. Mașina mea funcționează perfect după reparație. Prețuri transparente și echipă amabilă. Nu am avut nicio surpriză neplăcută la plată." },
  { name: "Alexandru Rusu", car: "Volkswagen Golf", rating: 5, date: "Ianuarie 2025", service: "Schimb Ulei & Revizie", text: "Am venit cu o problemă la motor și au rezolvat-o în aceeași zi. Foarte mulțumit de servicii! O să revin cu siguranță pentru toate lucrările viitoare." },
  { name: "Elena Chiriac", car: "Dacia Logan", rating: 4, date: "Decembrie 2024", service: "Sistem de Frânare", text: "Frânele au fost înlocuite rapid și la un preț corect. Personalul este amabil și te explică ce anume s-a lucrat. Singura îmbunătățire ar fi un timp de așteptare mai scurt." },
  { name: "Victor Moraru", car: "Ford Focus", rating: 5, date: "Noiembrie 2024", service: "Reparație Generatoare", text: "Alternator reparat în câteva ore. Prețul a fost mult mai mic față de dealer. Echipa tehnică știe exact ce face și comunică deschis cu clientul." },
  { name: "Ana Lungu", car: "Skoda Octavia", rating: 5, date: "Octombrie 2024", service: "Diagnosticare + Reparație", text: "Cel mai bun service din Chișinău! Am venit cu martorul aprins și în 2 ore știam exact ce e și era deja reparat. Prețuri corecte și oameni de treabă." },
];

const STATS = [
  { num: "4.9", label: "Rating mediu", icon: "⭐" },
  { num: "200+", label: "Recenzii pozitive", icon: "💬" },
  { num: "98%", label: "Clienți satisfăcuți", icon: "😊" },
  { num: "2000+", label: "Clienți serviți", icon: "🚗" },
];

// MODIFICARE: Componenta primeste acum theme si isDark
export default function Recenzii({ theme, isDark }: { theme: any, isDark: boolean }) {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", car: "", rating: 5, service: "", text: "" });
  const [localReviews, setLocalReviews] = useState(REVIEWS);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.text) return;
    const review = {
      ...newReview,
      date: new Date().toLocaleDateString("ro-RO", { month: "long", year: "numeric" }),
    };
    setLocalReviews(prev => [review, ...prev]);
    setSubmitted(true);
    setShowForm(false);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ 
      fontFamily: "Arial, sans-serif", 
      color: theme.text, 
      backgroundColor: theme.bg, 
      minHeight: "100vh",
      transition: "0.3s ease" 
    }}>
      
      {/* Breadcrumbs */}
      <div style={{ padding: "20px 5%", fontSize: "14px", color: isDark ? "#888" : "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span>
        <strong style={{ color: theme.text }}>RECENZII</strong>
      </div>

      {/* HEADER */}
      <div style={{ padding: "40px 5% 50px" }}>
        <h1 style={{ fontSize: "2.5rem", color: theme.text, borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "20px" }}>
          RECENZII CLIENȚI
        </h1>
        <p style={{ fontSize: "1.1rem", color: isDark ? "#aaa" : "#666", maxWidth: "650px", lineHeight: "1.8" }}>
          Peste 200 de clienți mulțumiți ne-au lăsat recenzii. Citește experiențele lor și convinge-te singur.
        </p>
      </div>

      {/* STATS */}
      <div style={{ backgroundColor: isDark ? "#1a1a1a" : "#222", padding: "50px 5%", marginBottom: "60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "30px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{s.icon}</div>
              <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#ff4d29" }}>{s.num}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div style={{ padding: "0 5% 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <h2 style={{ fontSize: "1.6rem", color: theme.text, margin: 0 }}>Ce spun clienții noștri</h2>
          <button 
            onClick={() => setShowForm(f => !f)}
            style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "0.9rem" }}
          >
            {showForm ? "Închide formularul" : "+ Lasă o recenzie"}
          </button>
        </div>

        {/* FORM RECENZIE */}
        {showForm && (
          <div style={{ 
            backgroundColor: isDark ? "#1e1e1e" : "#fff5f2", 
            borderRadius: "20px", 
            padding: "28px", 
            marginBottom: "36px", 
            border: isDark ? `1px solid ${theme.border}` : "1px solid #ffe0d6" 
          }}>
            <h3 style={{ color: "#ff4d29", marginBottom: "20px", marginTop: 0 }}>Lasă o recenzie</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
              {[
                { field: "name", label: "Numele tău *", placeholder: "Ion Popescu" },
                { field: "car", label: "Marca mașinii", placeholder: "BMW E46" },
                { field: "service", label: "Serviciul folosit", placeholder: "Diagnosticare, Frâne..." },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label style={{ display: "block", fontWeight: "bold", color: isDark ? "#ccc" : "#444", marginBottom: "6px", fontSize: "0.85rem" }}>{label}</label>
                  <input 
                    value={(newReview as any)[field]} 
                    onChange={e => setNewReview(r => ({ ...r, [field]: e.target.value }))} 
                    placeholder={placeholder} 
                    style={{ 
                      width: "100%", padding: "10px 14px", borderRadius: "10px", 
                      border: `1px solid ${theme.border}`, 
                      backgroundColor: isDark ? "#2a2a2a" : "#fff",
                      color: theme.text,
                      fontSize: "0.9rem", outline: "none", boxSizing: "border-box" 
                    }} 
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontWeight: "bold", color: isDark ? "#ccc" : "#444", marginBottom: "6px", fontSize: "0.85rem" }}>Rating</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} onClick={() => setNewReview(r => ({ ...r, rating: star }))} style={{ fontSize: "1.6rem", cursor: "pointer", color: star <= newReview.rating ? "#f59e0b" : "#ddd", transition: "0.15s" }}>★</span>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontWeight: "bold", color: isDark ? "#ccc" : "#444", marginBottom: "6px", fontSize: "0.85rem" }}>Recenzia ta *</label>
                <textarea 
                  value={newReview.text} 
                  onChange={e => setNewReview(r => ({ ...r, text: e.target.value }))} 
                  placeholder="Descrie experiența ta cu CarFix..." 
                  rows={4} 
                  style={{ 
                    width: "100%", padding: "10px 14px", borderRadius: "10px", 
                    border: `1px solid ${theme.border}`, 
                    backgroundColor: isDark ? "#2a2a2a" : "#fff",
                    color: theme.text,
                    fontSize: "0.9rem", outline: "none", resize: "vertical", boxSizing: "border-box" 
                  }} 
                />
              </div>
            </div>
            <button onClick={handleSubmitReview} style={{ marginTop: "20px", background: "#ff4d29", color: "#fff", border: "none", padding: "12px 30px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "0.95rem" }}>
              Trimite recenzia
            </button>
          </div>
        )}

        {submitted && <div style={{ color: "#10b981", fontWeight: "bold", marginBottom: "16px", padding: "10px", backgroundColor: "#ecfdf5", borderRadius: "10px", textAlign: "center" }}>✅ Recenzia ta a fost adăugată! Mulțumim!</div>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {localReviews.map((review, i) => (
            <div key={i} style={{ 
              backgroundColor: theme.cardBg, 
              borderRadius: "20px", 
              padding: "28px", 
              boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.07)", 
              border: `1px solid ${theme.border}`,
              transition: "0.3s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ color: "#f59e0b", fontSize: "1.1rem" }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                <span style={{ color: isDark ? "#666" : "#bbb", fontSize: "0.8rem" }}>{review.date}</span>
              </div>
              <p style={{ color: isDark ? "#ccc" : "#555", lineHeight: "1.7", marginBottom: "20px", fontStyle: "italic", fontSize: "0.95rem" }}>"{review.text}"</p>
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: "14px" }}>
                <div style={{ fontWeight: "bold", color: theme.text }}>{review.name}</div>
                <div style={{ color: isDark ? "#888" : "#aaa", fontSize: "0.82rem", marginTop: "2px" }}>
                  {review.car}{review.service ? ` • ${review.service}` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ 
        backgroundColor: isDark ? "#1a1a1a" : "#fff5f2", 
        padding: "60px 5%", 
        textAlign: "center", 
        borderTop: `1px solid ${theme.border}` 
      }}>
        <h2 style={{ color: theme.text, fontSize: "1.8rem", marginBottom: "12px" }}>Vino și tu să te convingi!</h2>
        <p style={{ color: isDark ? "#888" : "#888", marginBottom: "28px" }}>Programează-te online și alătură-te celor 2000+ clienți mulțumiți</p>
        <Link to="/programari">
          <button style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "14px 36px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
            Programează-te acum
          </button>
        </Link>
      </div>

    </div>
  );
}