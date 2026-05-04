import { useState } from "react";
import { Link } from "react-router-dom";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Programari",
    question: "Cum pot face o programare online?",
    answer:
      "Programarea online se realizeaza in 4 pasi simpli. In primul pas, selectati serviciul dorit din lista serviciilor disponibile. In al doilea pas, alegeti data si ora convenabila din calendarul interactiv. In al treilea pas, completati datele personale si informatiile despre vehicul (marca, model, numar de inmatriculare). In al patrulea pas, verificati rezumatul programarii si confirmati. Veti primi imediat o confirmare vizuala pe ecran. Intregul proces dureaza mai putin de 3 minute.",
  },
  {
    id: 2,
    category: "Programari",
    question: "Pot anula sau reprograma o programare deja facuta?",
    answer:
      "Da, orice programare poate fi anulata sau reprogramata. Contactati service-ul la numarul de telefon afisat pe site sau trimiteti un email si personalul nostru va modifica sau va anula programarea dumneavoastra. In viitoarea versiune a platformei, veti putea gestiona programarile direct din contul personal. Recomandam sa anuntati cu cel putin 24 de ore inainte daca doriti sa anulati sau sa reprogramati.",
  },
  {
    id: 3,
    category: "Programari",
    question: "Ce se intampla dupa ce confirm programarea?",
    answer:
      "Dupa confirmare, programarea este inregistrata automat in sistemul nostru cu statusul In asteptare. Echipa service-ului va verifica programarea si o va confirma in cel mai scurt timp. Veti putea vedea statusul actualizat (Confirmat, In lucru, Finalizat) la urmatoarea vizita pe site. Administratorul va aloca un mecanic specific programarii dumneavoastra si va gestiona toate detaliile operationale.",
  },
  {
    id: 4,
    category: "Programari",
    question: "Pot face o programare pentru mai multe servicii deodata?",
    answer:
      "In prezent, fiecare programare poate include un singur serviciu principal. Daca doriti mai multe servicii in aceeasi vizita, va rugam sa mentionati acest lucru in campul Note din formularul de programare. Mecanicul alocat va evalua vehiculul si va stabili impreuna cu dumneavoastra lista completa de lucrari necesare. Pretul final poate diferi de cel indicat online in cazul lucrarilor multiple.",
  },
  {
    id: 5,
    category: "Programari",
    question: "Este obligatorie crearea unui cont pentru programare?",
    answer:
      "Nu, nu este obligatorie crearea unui cont pentru a face o programare. Puteti programa ca vizitator, completand datele necesare in formularul de programare. Totusi, in viitoarele versiuni ale platformei, un cont personal va oferi beneficii suplimentare: istoric complet al vizitelor, acces rapid la datele vehiculului si notificari despre statusul programarii.",
  },
  {
    id: 6,
    category: "Servicii",
    question: "Ce servicii ofera CarFix?",
    answer:
      "CarFix ofera o gama completa de servicii auto: Diagnosticare Computerizata (scanare erori sistem, 200 MDL, 60 min), Reparatii Electrice (sisteme electrice auto, 400 MDL, 2-4h), Reparatii Generatoare si Demaroare (400 MDL, 2-3h), Reparatii Mecanice Generale (300 MDL, 1-3h), Sistem de Franare (verificare si reparatie, 250 MDL, 1-2h), Schimb Ulei si Filtre (150 MDL, 30 min), Climatizare si AC (reumplere freon si reparatii, 200 MDL, 1-2h) si Revizie Completa (verificare generala, 350 MDL, 2-3h).",
  },
  {
    id: 7,
    category: "Servicii",
    question: "Preturile afisate pe site sunt finale?",
    answer:
      "Preturile afisate reprezinta tarifele de baza pentru fiecare serviciu. Pretul final poate varia in functie de complexitatea lucrarilor identificate la diagnosticare, costul pieselor de schimb necesare (daca acestea nu sunt incluse in tarif) si timpul suplimentar necesar pentru lucrari mai complexe. Mecanicul va discuta cu dumneavoastra orice cost suplimentar inainte de a incepe lucrarile, avand acordul dumneavoastra explicit.",
  },
  {
    id: 8,
    category: "Servicii",
    question: "Oferiti garantie pentru lucrarile efectuate?",
    answer:
      "Da, toate lucrarile efectuate in service-ul nostru sunt garantate. Garantia acopera atat manopera cat si piesele de schimb montate de noi. Durata garantiei variaza in functie de tipul lucrarii: pentru reparatii mecanice garantia este de 6 luni sau 10.000 km (oricare survine primul), pentru componente electrice 3 luni, iar pentru schimbul de ulei si filtre garantia nu este aplicabila deoarece acestea sunt consumabile.",
  },
  {
    id: 9,
    category: "Servicii",
    question: "Puteti achizitiona piesele necesare sau trebuie sa le aduc eu?",
    answer:
      "Service-ul nostru dispune de un stoc de piese originale si de calitate OEM pentru cele mai comune marci si modele. In cazul pieselor mai rare sau speciale, le putem comanda de la furnizori autorizati, de obicei in 1-3 zile lucratoare. Puteti aduce si piesele proprii, insa in acest caz nu oferim garantie pentru piesele furnizate de client, ci doar pentru manopera efectuata.",
  },
  {
    id: 10,
    category: "Servicii",
    question: "Cat timp dureaza in medie o reparatie?",
    answer:
      "Duratele estimate sunt afisate pentru fiecare serviciu in parte pe pagina de programare. Schimbul de ulei si filtre dureaza aproximativ 30 de minute, diagnosticarea computerizata circa 60 de minute, iar reparatiile electrice sau mecanice complexe pot dura intre 2 si 6 ore in functie de complexitate. In cazul in care lucrarile necesita mai mult timp decat estimat initial, veti fi notificat si se va conveni impreuna o solutie.",
  },
  {
    id: 11,
    category: "Plata",
    question: "Ce metode de plata acceptati?",
    answer:
      "Acceptam plata in numerar (MDL) si plata cu cardul bancar (Visa, Mastercard) direct la sediul service-ului. In prezent nu oferim plata online in avans prin site, insa aceasta functionalitate este planificata pentru versiunile viitoare ale platformei. Factura fiscala este emisa la cerere pentru persoane juridice.",
  },
  {
    id: 12,
    category: "Plata",
    question: "Pot plati in rate?",
    answer:
      "Momentan nu oferim posibilitatea de plata in rate direct prin service. Totusi, puteti utiliza carduri de credit sau facilitati de finantare oferite de banca dumneavoastra. Pentru lucrari de valoare mare, va rugam sa contactati echipa noastra pentru a discuta posibile solutii personalizate.",
  },
  {
    id: 13,
    category: "Locatie si Program",
    question: "Unde este localizat service-ul CarFix?",
    answer:
      "Service-ul CarFix este localizat in Chisinau, Republica Moldova. Adresa exacta si instructiunile de localizare sunt disponibile pe pagina de Contact a site-ului. Dispunem de parcare proprie pentru clienti, astfel incat puteti lasa vehiculul pe toata durata reparatiei fara grija. Suntem accesibili cu transportul public (traseul X, statia Y) si cu taxiul sau ridesharing.",
  },
  {
    id: 14,
    category: "Locatie si Program",
    question: "Care este programul de lucru al service-ului?",
    answer:
      "Programul de lucru al service-ului CarFix este de luni pana vineri intre orele 08:00 si 18:00, iar sambata intre 08:00 si 14:00. Duminica service-ul este inchis. Programarile online pot fi facute 24/7, insa vor fi procesate in urmatoarea zi lucratoare. Ultima programare acceptata este cu o ora inainte de inchidere.",
  },
  {
    id: 15,
    category: "Locatie si Program",
    question: "Pot aduce vehiculul fara programare in avans?",
    answer:
      "In functie de disponibilitate, acceptam si clienti fara programare (walk-in). Totusi, recomandam programarea online pentru a va garanta un slot orar disponibil si pentru a evita asteptarile inutile. Clientii cu programare sunt prioritizati fata de cei fara programare. In perioadele aglomerate (iarna si primavara), programarile in avans sunt esentiale.",
  },
  {
    id: 16,
    category: "Vehicule acceptate",
    question: "Ce tipuri de vehicule reparati?",
    answer:
      "Service-ul CarFix lucreaza cu toate tipurile de autoturisme (berline, SUV-uri, monovolume, crossovere) cu motorizare termica (benzina, diesel, GPL). Acceptam toate marcile europene, asiatice si americane: Dacia, Renault, Volkswagen, Skoda, BMW, Mercedes-Benz, Toyota, Honda, Ford, Opel, Peugeot si multe altele. Nu lucram cu vehicule grele (camioane, autobuze), motociclete sau utilaje.",
  },
  {
    id: 17,
    category: "Vehicule acceptate",
    question: "Reparati si vehicule cu motor hibrid sau electric?",
    answer:
      "Momentan service-ul nostru se specializeaza in vehicule cu motorizare termica (benzina si diesel). Vehiculele hibride pot fi acceptate pentru diagnosticare si lucrari mecanice standard, dar nu garantam interventia pe sistemele de propulsie electrica sau bateriile de inalta tensiune. Vehiculele 100% electrice nu sunt acceptate in prezent.",
  },
  {
    id: 18,
    category: "Platforma digitala",
    question: "Este sigura platforma CarFix din punct de vedere al datelor personale?",
    answer:
      "Da, platforma CarFix respecta toate reglementarile privind protectia datelor personale (GDPR). Datele dumneavoastra (nume, telefon, email, date vehicul) sunt colectate exclusiv in scopul gestionarii programarilor si nu sunt partajate cu terte parti. Datele sunt stocate in baza de date SQL Server securizata, cu acces restrictionat exclusiv personalului autorizat al service-ului.",
  },
  {
    id: 19,
    category: "Platforma digitala",
    question: "Pe ce dispozitive functioneaza platforma CarFix?",
    answer:
      "Platforma CarFix este complet responsiva si functioneaza optimal pe toate tipurile de dispozitive: calculatoare desktop, laptopuri, tablete si smartphone-uri. Nu este necesara instalarea unei aplicatii — accesati direct din browserul preferat (Chrome, Firefox, Safari, Edge). Recomandam utilizarea unui browser actualizat pentru cea mai buna experienta.",
  },
  {
    id: 20,
    category: "Platforma digitala",
    question: "Ce inseamna statusurile programarii: In asteptare, Confirmat, In lucru, Finalizat?",
    answer:
      "Statusul In asteptare inseamna ca programarea a fost receptionata si urmeaza sa fie verificata de echipa service-ului. Statusul Confirmat inseamna ca programarea a fost validata si slotul orar este rezervat pentru dumneavoastra. Statusul In lucru inseamna ca vehiculul dumneavoastra se afla in service si lucrarile sunt in desfasurare. Statusul Finalizat inseamna ca toate lucrarile au fost efectuate si vehiculul este gata de ridicare.",
  },
];

const categories = Array.from(new Set(faqData.map((f) => f.category)));

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Toate");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [darkMode] = useState(() => document.body.classList.contains("dark-mode"));

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const filtered = faqData.filter((item) => {
    const matchCat =
      activeCategory === "Toate" || item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const catBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 20px",
    borderRadius: "20px",
    border: "2px solid",
    borderColor: active ? "#d32f2f" : darkMode ? "#334155" : "#e2e8f0",
    background: active ? "#d32f2f" : "transparent",
    color: active ? "#fff" : darkMode ? "#94a3b8" : "#4a5568",
    cursor: "pointer",
    fontWeight: active ? "bold" : "normal",
    fontSize: "0.9rem",
    transition: "all 0.2s",
  });

  const answerStyle = (open: boolean): React.CSSProperties => ({
    maxHeight: open ? "400px" : "0",
    overflow: "hidden",
    transition: "max-height 0.3s ease",
  });

  const chevronStyle = (open: boolean): React.CSSProperties => ({
    fontSize: "1.2rem",
    transition: "transform 0.3s",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    color: "#d32f2f",
  });

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      background: darkMode ? "#0f172a" : "#f8fafc",
      fontFamily: "Arial, sans-serif",
      color: darkMode ? "#e2e8f0" : "#1a202c",
    },
    hero: {
      background: "linear-gradient(135deg, #1a1a2e 0%, #d32f2f 100%)",
      padding: "80px 20px 60px",
      textAlign: "center" as const,
      color: "#fff",
    },
    heroTitle: {
      fontSize: "2.6rem",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    heroSubtitle: {
      fontSize: "1.1rem",
      opacity: 0.85,
      maxWidth: "600px",
      margin: "0 auto 32px",
    },
    searchBox: {
      display: "flex",
      justifyContent: "center",
    },
    searchInput: {
      padding: "14px 20px",
      borderRadius: "30px",
      border: "none",
      fontSize: "1rem",
      width: "100%",
      maxWidth: "500px",
      outline: "none",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "40px 20px",
    },
    categoryBar: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap" as const,
      marginBottom: "32px",
      justifyContent: "center",
    },
    sectionTitle: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#d32f2f",
      textTransform: "uppercase" as const,
      letterSpacing: "1px",
      marginBottom: "12px",
      marginTop: "32px",
    },
    card: {
      background: darkMode ? "#1e293b" : "#fff",
      borderRadius: "12px",
      marginBottom: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      overflow: "hidden",
      border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
    },
    question: {
      padding: "18px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
    },
    answerInner: {
      padding: "0 24px 20px",
      color: darkMode ? "#94a3b8" : "#4a5568",
      lineHeight: 1.7,
      fontSize: "0.95rem",
    },
    noResults: {
      textAlign: "center" as const,
      padding: "60px 20px",
      color: darkMode ? "#64748b" : "#a0aec0",
      fontSize: "1.1rem",
    },
    backBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: darkMode ? "#94a3b8" : "#4a5568",
      textDecoration: "none",
      fontSize: "0.9rem",
      marginBottom: "24px",
      padding: "8px 16px",
      borderRadius: "8px",
      border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
      background: "transparent",
    },
    counter: {
      textAlign: "center" as const,
      color: darkMode ? "#64748b" : "#a0aec0",
      fontSize: "0.85rem",
      marginBottom: "24px",
    },
  };

  const visibleCategories =
    activeCategory === "Toate"
      ? categories
      : [activeCategory];

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.heroTitle}>
          🔧 Intrebari frecvente
        </div>
        <div style={styles.heroSubtitle}>
          Gasiti raspunsuri la cele mai comune intrebari despre serviciile,
          programarile si platforma CarFix.
        </div>
        <div style={styles.searchBox}>
          <input
            style={styles.searchInput}
            placeholder="🔍 Cautati o intrebare..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenId(null);
            }}
          />
        </div>
      </div>

      <div style={styles.container}>
        <Link to="/" style={styles.backBtn as React.CSSProperties}>
          ← Inapoi la pagina principala
        </Link>

        <div style={styles.categoryBar}>
          {["Toate", ...categories].map((cat) => (
            <button
              key={cat}
              style={catBtnStyle(activeCategory === cat)}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 && (
          <div style={styles.counter}>
            {filtered.length} din {faqData.length} intrebari
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={styles.noResults}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
            <div>Nu am gasit rezultate pentru "{searchQuery}"</div>
            <div style={{ fontSize: "0.9rem", marginTop: "8px" }}>
              Incercati alte cuvinte cheie sau selectati o alta categorie.
            </div>
          </div>
        ) : (
          visibleCategories.map((cat) => {
            const catItems = filtered.filter((f) => f.category === cat);
            if (catItems.length === 0) return null;
            return (
              <div key={cat}>
                {activeCategory === "Toate" && (
                  <div style={styles.sectionTitle}>{cat}</div>
                )}
                {catItems.map((item) => (
                  <div key={item.id} style={styles.card}>
                    <div
                      style={styles.question}
                      onClick={() => toggleItem(item.id)}
                    >
                      <span>{item.question}</span>
                      <span style={chevronStyle(openId === item.id)}>▼</span>
                    </div>
                    <div style={answerStyle(openId === item.id)}>
                      <div style={styles.answerInner}>{item.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}

        <div
          style={{
            marginTop: "60px",
            background: darkMode ? "#1e293b" : "#fff3f3",
            borderRadius: "16px",
            padding: "32px",
            textAlign: "center",
            border: `1px solid ${darkMode ? "#334155" : "#fecdd3"}`,
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "12px" }}>💬</div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "8px",
            }}
          >
            Nu ati gasit raspunsul cautat?
          </div>
          <div
            style={{
              color: darkMode ? "#94a3b8" : "#4a5568",
              marginBottom: "20px",
            }}
          >
            Echipa noastra este disponibila pentru orice intrebare.
          </div>
          <Link
            to="/contact"
            style={{
              background: "#d32f2f",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.95rem",
            }}
          >
            Contactati-ne
          </Link>
        </div>
      </div>
    </div>
  );
}