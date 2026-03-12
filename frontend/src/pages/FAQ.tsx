import { useState } from "react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    category: "Programări",
    items: [
      { q: "Cum fac o programare la CarFix?", a: "Poți face o programare online prin pagina noastră de Programări, prin telefon la +373 69 751 748 sau direct la service-ul nostru. Îți recomandăm programarea online pentru a alege data și ora care ți se potrivesc." },
      { q: "Cât durează o reparație obișnuită?", a: "Depinde de tipul lucrării. Un schimb de ulei durează ~30 minute, o diagnosticare ~1 oră, iar reparațiile mai complexe (motor, transmisie) pot dura 1–3 zile. Îți comunicăm estimarea înainte de a începe." },
      { q: "Pot să aștept mașina în service?", a: "Da! Avem o zonă de așteptare confortabilă cu Wi-Fi. Pentru lucrările rapide (diagnoză, ulei, filtre) poți rămâne și aștepți. Pentru lucrările complexe, îți recomandăm să laști mașina." },
    ]
  },
  {
    category: "Prețuri & Plată",
    items: [
      { q: "Cum sunt stabilite prețurile la CarFix?", a: "Prețurile sunt stabilite transparent — manoperă + piesele utilizate. Înainte de orice lucrare îți prezentăm o estimare de cost. Nu există costuri ascunse sau surprize la final." },
      { q: "Ce metode de plată acceptați?", a: "Acceptăm plata în numerar (MDL) și prin card bancar. Emitem bonuri fiscale pentru toate lucrările efectuate." },
      { q: "Oferiți garanție pentru lucrările efectuate?", a: "Da! Toate lucrările de reparație beneficiază de garanție. Piesele montate beneficiază de garanția producătorului, iar manopera de garanția CarFix. Dacă apare orice problemă după reparație, revino la noi." },
    ]
  },
  {
    category: "Servicii Tehnice",
    items: [
      { q: "Ce înseamnă diagnosticarea computerizată?", a: "Diagnosticarea computerizată presupune conectarea mașinii tale la un echipament specializat care citește toate codurile de eroare ale sistemelor electronice (motor, ABS, airbag, cutie de viteze etc.) și analizează parametrii în timp real." },
      { q: "Lucrați cu toate mărcile de mașini?", a: "Da, lucrăm cu toate mărcile auto europene, asiatice și americane: BMW, Mercedes, Audi, Volkswagen, Toyota, Dacia, Ford, Renault, Opel, Skoda, Hyundai, Kia și altele." },
      { q: "Folosiți piese originale sau aftermarket?", a: "Folosim atât piese originale cât și piese aftermarket de calitate (Bosch, Febi, LUK, etc.), în funcție de preferințele și bugetul clientului. Îți prezentăm întotdeauna opțiunile disponibile." },
      { q: "Pot veni fără programare?", a: "Da, poți veni și fără programare, dar pentru a evita timpii de așteptare îți recomandăm să te programezi în prealabil, mai ales pentru lucrările mai complexe." },
    ]
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (key: string) => setOpenIndex(prev => prev === key ? null : key);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>

      {/* Breadcrumbs */}
      <div style={{ padding: "20px 5%", fontSize: "14px", color: "#888" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#888" }}>ACASĂ</Link>
        <span style={{ margin: "0 10px" }}>{">"}</span>
        <strong style={{ color: "#333" }}>ÎNTREBĂRI FRECVENTE</strong>
      </div>

      {/* HEADER */}
      <div style={{ padding: "40px 5% 60px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#222", borderLeft: "6px solid #ff4d29", paddingLeft: "15px", marginBottom: "20px" }}>
          ÎNTREBĂRI FRECVENTE
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "650px", lineHeight: "1.8" }}>
          Răspunsuri la cele mai comune întrebări ale clienților noștri. Nu găsești ce cauți? Contactează-ne direct.
        </p>
      </div>

      {/* FAQ LISTA */}
      <div style={{ padding: "0 5% 80px", maxWidth: "860px" }}>
        {FAQS.map(section => (
          <div key={section.category} style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "1.2rem", color: "#ff4d29", fontWeight: "bold", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
              {section.category}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {section.items.map((item, i) => {
                const key = `${section.category}-${i}`;
                const isOpen = openIndex === key;
                return (
                  <div key={key} style={{ border: "1px solid #eee", borderRadius: "16px", overflow: "hidden", boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.06)" : "none", transition: "0.2s" }}>
                    <button
                      onClick={() => toggle(key)}
                      style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: isOpen ? "#fff5f2" : "#fff", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
                    >
                      <span style={{ fontWeight: "bold", color: "#222", fontSize: "1rem", lineHeight: "1.4" }}>{item.q}</span>
                      <span style={{ fontSize: "1.2rem", color: "#ff4d29", flexShrink: 0, transition: "0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 24px 22px", color: "#555", lineHeight: "1.75", fontSize: "0.95rem" }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "60px 5%", textAlign: "center", borderTop: "1px solid #eee" }}>
        <h2 style={{ color: "#222", fontSize: "1.8rem", marginBottom: "12px" }}>Mai ai o întrebare?</h2>
        <p style={{ color: "#888", marginBottom: "28px" }}>Echipa noastră îți răspunde cu plăcere</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:+37369751748">
            <button style={{ backgroundColor: "#ff4d29", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
              📞 +373 69 751 748
            </button>
          </a>
          <Link to="/contact">
            <button style={{ backgroundColor: "#fff", color: "#333", border: "2px solid #ddd", padding: "14px 32px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
              Trimite un mesaj
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}