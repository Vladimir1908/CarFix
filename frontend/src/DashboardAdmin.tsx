import { useState, useEffect } from "react";

type Booking = {
  id: number;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  carModel: string;
  licensePlate: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "În așteptare",
  confirmed: "Confirmată",
  completed: "Finalizată",
  cancelled: "Anulată",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  completed: "#10b981",
  cancelled: "#ef4444",
};

export default function DashboardAdmin({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"overview" | "bookings" | "services">("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("carfix_bookings");
    if (raw) {
      setBookings(JSON.parse(raw));
    } else {
      // Demo data
      const demo: Booking[] = [
        { id: 1, service: "Diagnosticare Computerizată", date: "2025-07-15", time: "10:00", name: "Ion Popescu", phone: "+373 69 111 222", email: "ion@mail.md", carModel: "BMW E46", licensePlate: "CBA 001", notes: "", status: "confirmed", createdAt: new Date().toISOString() },
        { id: 2, service: "Reparație Motoare Electrice", date: "2025-07-16", time: "14:00", name: "Maria Ionescu", phone: "+373 69 333 444", email: "", carModel: "Toyota Corolla", licensePlate: "XYZ 999", notes: "Motor zgomot ciudat la pornire", status: "pending", createdAt: new Date().toISOString() },
        { id: 3, service: "Schimb Ulei & Filtre", date: "2025-07-14", time: "09:00", name: "Alexandru Rusu", phone: "+373 69 555 666", email: "", carModel: "Volkswagen Golf", licensePlate: "AAA 123", notes: "", status: "completed", createdAt: new Date().toISOString() },
        { id: 4, service: "Sistem de Frânare", date: "2025-07-17", time: "11:30", name: "Elena Chiriac", phone: "+373 69 777 888", email: "elena@gmail.com", carModel: "Dacia Logan", licensePlate: "MMM 777", notes: "Frâne care scârțâie", status: "pending", createdAt: new Date().toISOString() },
        { id: 5, service: "Reparație Generatoare", date: "2025-07-13", time: "15:00", name: "Victor Moraru", phone: "+373 69 999 000", email: "", carModel: "Ford Focus", licensePlate: "VVV 321", notes: "", status: "cancelled", createdAt: new Date().toISOString() },
      ];
      setBookings(demo);
    }
  }, []);

  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem("carfix_bookings", JSON.stringify(updated));
  };

  const updateStatus = (id: number, status: Booking["status"]) => {
    saveBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const filtered = bookings.filter(b => {
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.licensePlate.toLowerCase().includes(search.toLowerCase()) || b.carModel.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    completed: bookings.filter(b => b.status === "completed").length,
  };

  const NAV_STYLE = (active: boolean): React.CSSProperties => ({
    padding: "10px 20px",
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem",
    background: active ? "#ff4d29" : "transparent",
    color: active ? "#fff" : "#666",
    transition: "0.2s",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f4f5f7", fontFamily: "Arial, sans-serif" }}>
      {/* TOP BAR */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#d32f2f" }}>CAR<span style={{ color: "#333" }}>FIX</span> <span style={{ fontSize: "0.9rem", color: "#888", fontWeight: "normal" }}>Admin</span></div>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setTab("overview")} style={NAV_STYLE(tab === "overview")}>📊 Prezentare generală</button>
            <button onClick={() => setTab("bookings")} style={NAV_STYLE(tab === "bookings")}>
              📅 Programări {stats.pending > 0 && <span style={{ background: "#ff4d29", color: "#fff", borderRadius: 10, padding: "2px 7px", fontSize: "0.75rem", marginLeft: 6 }}>{stats.pending}</span>}
            </button>
            <button onClick={() => setTab("services")} style={NAV_STYLE(tab === "services")}>🔧 Servicii</button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>👤 Administrator</div>
          <button onClick={onLogout} style={{ background: "#333", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 20, fontWeight: "bold", cursor: "pointer", fontSize: "0.85rem" }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "32px" }}>

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div>
            <h2 style={{ color: "#222", marginBottom: 24 }}>Bun venit, Administrator! 👋</h2>
            {/* Stats Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20, marginBottom: 40 }}>
              {[
                { label: "Total programări", value: stats.total, color: "#6366f1", icon: "📅" },
                { label: "În așteptare", value: stats.pending, color: "#f59e0b", icon: "⏳" },
                { label: "Confirmate", value: stats.confirmed, color: "#3b82f6", icon: "✅" },
                { label: "Finalizate", value: stats.completed, color: "#10b981", icon: "🏁" },
              ].map(card => (
                <div key={card.label} style={{ background: "#fff", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${card.color}` }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{card.icon}</div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#222" }}>{card.value}</div>
                  <div style={{ color: "#888", fontSize: "0.9rem" }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* Programari recente */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ margin: 0, color: "#222" }}>Programări recente</h3>
                <button onClick={() => setTab("bookings")} style={{ color: "#ff4d29", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>Vezi toate →</button>
              </div>
              {bookings.slice(0, 4).map(b => (
                <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f3f3f3" }}>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#222" }}>{b.name} — {b.carModel}</div>
                    <div style={{ color: "#888", fontSize: "0.85rem" }}>{b.service} • {b.date} la {b.time}</div>
                  </div>
                  <span style={{ background: STATUS_COLORS[b.status] + "20", color: STATUS_COLORS[b.status], padding: "4px 12px", borderRadius: 20, fontSize: "0.8rem", fontWeight: "bold" }}>
                    {STATUS_LABELS[b.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {tab === "bookings" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0, color: "#222" }}>Toate programările</h2>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Caută după nume, mașină, nr..."
                  style={{ padding: "10px 16px", borderRadius: 12, border: "1px solid #ddd", fontSize: "0.9rem", width: 240, outline: "none" }}
                />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid #ddd", fontSize: "0.9rem", outline: "none", cursor: "pointer" }}
                >
                  <option value="all">Toate statusurile</option>
                  <option value="pending">În așteptare</option>
                  <option value="confirmed">Confirmate</option>
                  <option value="completed">Finalizate</option>
                  <option value="cancelled">Anulate</option>
                </select>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              {filtered.length === 0 ? (
                <div style={{ padding: "60px", textAlign: "center", color: "#aaa" }}>Nu există programări pentru filtrele selectate.</div>
              ) : (
                filtered.map((b, i) => (
                  <div key={b.id} style={{ padding: "20px 24px", borderBottom: i < filtered.length - 1 ? "1px solid #f3f3f3" : "none", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <div style={{ fontWeight: "bold", color: "#222", fontSize: "1rem" }}>{b.name}</div>
                      <div style={{ color: "#888", fontSize: "0.85rem", marginTop: 2 }}>{b.phone} {b.email && `• ${b.email}`}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontWeight: "bold", color: "#333", fontSize: "0.9rem" }}>{b.service}</div>
                      <div style={{ color: "#888", fontSize: "0.85rem" }}>{b.carModel} • {b.licensePlate}</div>
                    </div>
                    <div style={{ minWidth: 140 }}>
                      <div style={{ fontWeight: "bold", color: "#333" }}>{b.date}</div>
                      <div style={{ color: "#888", fontSize: "0.85rem" }}>ora {b.time}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      <span style={{ background: STATUS_COLORS[b.status] + "20", color: STATUS_COLORS[b.status], padding: "4px 14px", borderRadius: 20, fontSize: "0.8rem", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        {STATUS_LABELS[b.status]}
                      </span>
                      <div style={{ display: "flex", gap: 6 }}>
                        {b.status === "pending" && (
                          <button onClick={() => updateStatus(b.id, "confirmed")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>Confirmă</button>
                        )}
                        {(b.status === "pending" || b.status === "confirmed") && (
                          <button onClick={() => updateStatus(b.id, "completed")} style={{ background: "#10b981", color: "#fff", border: "none", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>Finalizează</button>
                        )}
                        {b.status !== "cancelled" && b.status !== "completed" && (
                          <button onClick={() => updateStatus(b.id, "cancelled")} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>Anulează</button>
                        )}
                      </div>
                    </div>
                    {b.notes && (
                      <div style={{ width: "100%", background: "#fafafa", borderRadius: 8, padding: "8px 12px", fontSize: "0.85rem", color: "#666", marginTop: 4 }}>
                        💬 {b.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {tab === "services" && (
          <div>
            <h2 style={{ color: "#222", marginBottom: 24 }}>Gestionare servicii</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {[
                { icon: "🔍", name: "Diagnosticare Computerizată", price: "200 MDL", duration: "1h", active: true },
                { icon: "⚡", name: "Reparație Motoare Electrice", price: "400 MDL", duration: "2-4h", active: true },
                { icon: "🔋", name: "Reparație Generatoare", price: "400 MDL", duration: "2-3h", active: true },
                { icon: "🔧", name: "Reparație Mecanică Generală", price: "300 MDL", duration: "1-3h", active: true },
                { icon: "🛞", name: "Sistem de Frânare", price: "250 MDL", duration: "1-2h", active: true },
                { icon: "🛢️", name: "Schimb Ulei & Filtre", price: "150 MDL", duration: "30min", active: true },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: "2rem" }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", color: "#222", fontSize: "0.95rem" }}>{s.name}</div>
                    <div style={{ color: "#888", fontSize: "0.85rem", marginTop: 2 }}>{s.duration} • <span style={{ color: "#ff4d29", fontWeight: "bold" }}>{s.price}</span></div>
                  </div>
                  <div style={{ width: 36, height: 20, borderRadius: 10, background: s.active ? "#10b981" : "#ddd", position: "relative", cursor: "pointer" }}>
                    <div style={{ position: "absolute", width: 16, height: 16, background: "#fff", borderRadius: "50%", top: 2, left: s.active ? 18 : 2, transition: "0.2s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}