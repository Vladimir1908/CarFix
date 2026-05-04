import { useState } from "react";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  category: string;
  icon: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  priceNote: string;
  duration: string;
  popularFor: string[];
}

const services: Service[] = [
  {
    id: 1,
    category: "Diagnoza",
    icon: "🖥️",
    name: "Diagnosticare Computerizata",
    description: "Scanare completa a sistemelor electronice ale vehiculului folosind echipamente de ultima generatie.",
    details: [
      "Citire si stergere coduri de eroare (DTC) din toate sistemele",
      "Verificare senzori motor, transmisie si sisteme auxiliare",
      "Testare sistem ABS, ESP, airbag si sisteme de asistenta",
      "Raport detaliat cu recomandarile tehnice necesare",
      "Compatibil cu toate marcile si modelele",
    ],
    price: 200,
    priceNote: "Pretul include scanare completa si raport",
    duration: "60 min",
    popularFor: ["BMW", "Audi", "Volkswagen", "Mercedes", "Toyota"],
  },
  {
    id: 2,
    category: "Electrica",
    icon: "⚡",
    name: "Reparatii Electrice Auto",
    description: "Diagnosticare si reparatie a tuturor sistemelor electrice si electronice ale autovehiculului.",
    details: [
      "Reparatii cablaj electric si inlocuire fire defecte",
      "Reparatii calculator motor ECU/ECM",
      "Reparatii sisteme de injectie si aprindere",
      "Reparatii sisteme de iluminare si semnalizare",
      "Montaj si programare senzori parcare si camere",
      "Reparatii sistem audio si infotainment",
    ],
    price: 400,
    priceNote: "Pret de la, in functie de complexitate",
    duration: "2-4 ore",
    popularFor: ["Toate marcile"],
  },
  {
    id: 3,
    category: "Electrica",
    icon: "🔋",
    name: "Reparatii Generatoare si Demaroare",
    description: "Reparatii si inlocuire generator alternator si demaror pentru toate tipurile de vehicule.",
    details: [
      "Verificare si testare generator pe vehicul",
      "Inlocuire perii de carbon si regulator de tensiune",
      "Reparatii sau inlocuire stator si rotor generator",
      "Verificare si reparatii demaror (starter motor)",
      "Testare sistem de incarcare baterie",
      "Inlocuire baterie auto si verificare compatibilitate",
    ],
    price: 400,
    priceNote: "Pret de la, fara piese de schimb",
    duration: "2-3 ore",
    popularFor: ["Dacia", "Renault", "Opel", "Ford"],
  },
  {
    id: 4,
    category: "Mecanica",
    icon: "🔧",
    name: "Reparatii Mecanice Generale",
    description: "Servicii complete de reparatii mecanice pentru motor, transmisie, directie si suspensie.",
    details: [
      "Reparatii motor: garnitura chiulasa, piston, segmenti",
      "Reparatii cutie de viteze manuala si automata",
      "Inlocuire ambreiaj si volant bimasa",
      "Reparatii directie: bara directie, cap bara, articulatii",
      "Reparatii suspensie: amortizoare, arcuri, bucsi",
      "Inlocuire curele de distributie si accesorii",
      "Reparatii sistem de racire si schimb termostat",
    ],
    price: 300,
    priceNote: "Pret evaluare, lucrari complexe calculat separat",
    duration: "1-6 ore",
    popularFor: ["Toate marcile si modelele"],
  },
  {
    id: 5,
    category: "Mecanica",
    icon: "🛞",
    name: "Sistem de Franare",
    description: "Verificare, reglare si reparatii complete ale sistemului de franare pentru siguranta maxima.",
    details: [
      "Verificare si inlocuire placute si discuri de frana",
      "Reparatii pompa de frana principala si secundara",
      "Inlocuire furtune si conducte de frana",
      "Aerisire si inlocuire lichid de frana DOT4/DOT5",
      "Reglare frane de mana si inlocuire cablu",
      "Verificare si reparatii sistem ABS",
      "Testare eficienta franare pe stand",
    ],
    price: 250,
    priceNote: "Pret verificare, inlocuire piese calculata separat",
    duration: "1-2 ore",
    popularFor: ["Toate marcile", "Recomandat anual"],
  },
  {
    id: 6,
    category: "Intretinere",
    icon: "🛢️",
    name: "Schimb Ulei si Filtre",
    description: "Schimb complet de ulei motor si filtre la interval recomandat de producator.",
    details: [
      "Schimb ulei motor (mineralul, semi-sintetic, sintetic)",
      "Inlocuire filtru ulei",
      "Inlocuire filtru aer motor",
      "Inlocuire filtru habitaclu (optional)",
      "Inlocuire filtru combustibil (optional)",
      "Verificare nivel lichide: racire, directie, frana",
      "Resetare intervalul service in bord",
    ],
    price: 150,
    priceNote: "Include manopera, uleiul si filtrele se platesc separat",
    duration: "30 min",
    popularFor: ["Toate marcile", "Recomandat la 10.000 km"],
  },
  {
    id: 7,
    category: "Climatizare",
    icon: "❄️",
    name: "Climatizare si AC",
    description: "Verificare, reumplere si reparatii complete ale sistemului de climatizare auto.",
    details: [
      "Verificare presiune freon si etanseitate sistem",
      "Reumplere freon R134a sau R1234yf",
      "Inlocuire filtru deshidrator (uscator)",
      "Reparatii compresor AC",
      "Inlocuire condensator si evaporator",
      "Curatare si dezinfectare sistem climatizare",
      "Igienizare habitaclu (optional)",
    ],
    price: 200,
    priceNote: "Pret verificare si reumplere freon de baza",
    duration: "1-2 ore",
    popularFor: ["Recomandat primavara", "Toate marcile"],
  },
  {
    id: 8,
    category: "Intretinere",
    icon: "📋",
    name: "Revizie Completa (ITP Pregatire)",
    description: "Verificare tehnica completa a vehiculului pentru pregatire ITP sau control periodic.",
    details: [
      "Verificare sistem frana (eficienta, joc, uzura)",
      "Verificare directie si geometrie roti",
      "Verificare lumini si semnalizare",
      "Verificare sistem evacuare (noxe, zgomot)",
      "Verificare stare anvelope si presiune",
      "Verificare caroserie si sasiu (coroziune)",
      "Verificare documente si placi inmatriculare",
      "Raport complet cu lista recomandarilor",
    ],
    price: 350,
    priceNote: "Include verificare tehnica completa cu raport scris",
    duration: "1.5-2 ore",
    popularFor: ["Inainte de ITP", "Achizitie vehicul second-hand"],
  },
];

const categories = ["Toate", "Diagnoza", "Electrica", "Mecanica", "Intretinere", "Climatizare"];

interface Props {
  darkMode?: boolean;
}

export default function Servicii({ darkMode: darkModeProp }: Props) {
  const [darkMode] = useState(() => darkModeProp ?? document.body.classList.contains("dark-mode"));
  const [activeCategory, setActiveCategory] = useState("Toate");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "duration">("default");

  const filtered = services
    .filter((s) => activeCategory === "Toate" || s.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const bg = darkMode ? "#0f172a" : "#f8fafc";
  const card = darkMode ? "#1e293b" : "#fff";
  const border = darkMode ? "#334155" : "#e2e8f0";
  const text = darkMode ? "#e2e8f0" : "#1a202c";
  const sub = darkMode ? "#94a3b8" : "#4a5568";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "Arial, sans-serif", color: text }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #d32f2f 100%)", padding: "80px 20px 60px", textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: "2.6rem", fontWeight: "bold", marginBottom: "14px" }}>🔧 Serviciile Noastre</div>
        <div style={{ fontSize: "1rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto" }}>
          Oferim o gama completa de servicii auto profesionale, cu garantie si transparenta totala a preturilor.
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <Link to="/" style={{ color: sub, textDecoration: "none", fontSize: "0.9rem", display: "inline-block", marginBottom: "24px" }}>
          ← Inapoi la pagina principala
        </Link>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "36px" }}>
          {[
            { icon: "🔧", value: "8+", label: "Servicii disponibile" },
            { icon: "⭐", value: "98%", label: "Clienti satisfacuti" },
            { icon: "🏆", value: "10+", label: "Ani de experienta" },
            { icon: "🚗", value: "50+", label: "Marci acceptate" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: card, borderRadius: "12px", padding: "20px", textAlign: "center", border: `1px solid ${border}` }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{stat.icon}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#d32f2f" }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", color: sub }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter + Sort */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  border: "2px solid",
                  borderColor: activeCategory === cat ? "#d32f2f" : border,
                  background: activeCategory === cat ? "#d32f2f" : "transparent",
                  color: activeCategory === cat ? "#fff" : sub,
                  cursor: "pointer",
                  fontWeight: activeCategory === cat ? "bold" : "normal",
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{ padding: "8px 12px", borderRadius: "10px", border: `1px solid ${border}`, background: card, color: text, fontSize: "0.85rem", outline: "none" }}
          >
            <option value="default">Sortare implicita</option>
            <option value="price-asc">Pret: mic → mare</option>
            <option value="price-desc">Pret: mare → mic</option>
          </select>
        </div>

        {/* Services grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filtered.map((svc) => (
            <div
              key={svc.id}
              style={{
                background: card,
                borderRadius: "14px",
                border: `1px solid ${expandedId === svc.id ? "#d32f2f" : border}`,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                transition: "border-color 0.2s",
              }}
            >
              {/* Card header */}
              <div style={{ padding: "22px 22px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1.8rem" }}>{svc.icon}</span>
                    <span style={{ fontSize: "0.72rem", background: "#d32f2f20", color: "#d32f2f", padding: "2px 8px", borderRadius: "10px", fontWeight: "bold" }}>
                      {svc.category}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#d32f2f" }}>{svc.price} MDL</div>
                    <div style={{ fontSize: "0.72rem", color: sub }}>⏱ {svc.duration}</div>
                  </div>
                </div>
                <div style={{ fontWeight: "bold", fontSize: "1.05rem", marginBottom: "8px" }}>{svc.name}</div>
                <div style={{ color: sub, fontSize: "0.88rem", lineHeight: 1.5 }}>{svc.description}</div>
              </div>

              {/* Expandable details */}
              <div style={{ maxHeight: expandedId === svc.id ? "500px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <div style={{ padding: "0 22px 16px" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: sub, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                    Ce include:
                  </div>
                  {svc.details.map((d) => (
                    <div key={d} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "5px" }}>
                      <span style={{ color: "#10b981", fontWeight: "bold", flexShrink: 0 }}>✓</span>
                      <span style={{ color: sub, fontSize: "0.85rem" }}>{d}</span>
                    </div>
                  ))}
                  {svc.popularFor.length > 0 && (
                    <div style={{ marginTop: "12px", background: darkMode ? "#0f172a" : "#f1f5f9", borderRadius: "8px", padding: "10px 12px" }}>
                      <div style={{ fontSize: "0.75rem", color: sub, marginBottom: "4px" }}>Popular pentru:</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {svc.popularFor.map((tag) => (
                          <span key={tag} style={{ fontSize: "0.72rem", background: "#d32f2f20", color: "#d32f2f", padding: "2px 8px", borderRadius: "8px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ fontSize: "0.75rem", color: sub, marginTop: "10px", fontStyle: "italic" }}>ℹ️ {svc.priceNote}</div>
                </div>
              </div>

              {/* Footer buttons */}
              <div style={{ padding: "12px 22px 18px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setExpandedId(expandedId === svc.id ? null : svc.id)}
                  style={{
                    flex: 1,
                    padding: "9px",
                    border: `1px solid ${border}`,
                    borderRadius: "8px",
                    background: "transparent",
                    color: text,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  {expandedId === svc.id ? "▲ Mai putine" : "▼ Mai multe detalii"}
                </button>
                <Link
                  to="/programari"
                  style={{
                    flex: 1.5,
                    padding: "9px",
                    background: "#d32f2f",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Programeaza-te →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bottom */}
        <div style={{ marginTop: "60px", background: card, borderRadius: "16px", padding: "40px", textAlign: "center", border: `1px solid ${border}` }}>
          <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🚘</div>
          <div style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "10px" }}>Nu stiti ce serviciu aveti nevoie?</div>
          <div style={{ color: sub, maxWidth: "500px", margin: "0 auto 24px", lineHeight: 1.6 }}>
            Veniti la o diagnosticare computerizata si mecanicii nostri va vor spune exact de ce are nevoie vehiculul dumneavoastra.
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/programari" style={{ background: "#d32f2f", color: "#fff", padding: "12px 28px", borderRadius: "25px", textDecoration: "none", fontWeight: "bold" }}>
              Programeaza diagnosticare
            </Link>
            <Link to="/contact" style={{ background: "transparent", color: text, padding: "12px 28px", borderRadius: "25px", textDecoration: "none", border: `1px solid ${border}` }}>
              Contacteaza-ne
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}