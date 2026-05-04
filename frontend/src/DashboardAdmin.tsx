import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import axiosInstance from "./api/axiosInstance";

type Booking = {
  id: number;
  service?: string;
  serviceId: number;
  clientId: number;
  carBrand: string;
  carModel: string;
  licensePlate: string;
  scheduledAt: string;
  notes?: string;
  mechanic?: string;
  status: "pending" | "confirmed" | "inprogress" | "completed" | "cancelled" | "Pending";
};

type Service = {
  id: number;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  durationMinutes: number;
};

type ContactMessage = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  isRead: boolean;
  createdAt: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "In asteptare", Pending: "In asteptare",
  confirmed: "Confirmata", inprogress: "In lucru",
  completed: "Finalizata", cancelled: "Anulata",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b", Pending: "#f59e0b", confirmed: "#3b82f6",
  inprogress: "#8b5cf6", completed: "#10b981", cancelled: "#ef4444",
};
const MECHANICS = ["Ion Popescu", "Andrei Rusu", "Mihai Ionescu", "Alexandru Dumitru"];

export default function DashboardAdmin({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"overview" | "bookings" | "services" | "stats" | "messages">("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [msgSearch, setMsgSearch] = useState("");
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [editService, setEditService] = useState<Service | null>(null);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ serviceName: "", serviceDescription: "", servicePrice: 0, durationMinutes: 60 });
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [apptRes, svcRes, msgRes] = await Promise.all([
        axiosInstance.get("/appointments/getAll"),
        axiosInstance.get("/services/getAll"),
        axiosInstance.get("/contact"),
      ]);
      setBookings(apptRes.data || []);
      setServices(svcRes.data || []);
      setMessages(msgRes.data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    const b = bookings.find(x => x.id === id); if (!b) return;
    try { await axiosInstance.put("/appointments", { ...b, status }); setBookings(bookings.map(x => x.id === id ? { ...x, status: status as Booking["status"] } : x)); } catch (e) { console.error(e); }
  };
  const updateMechanic = async (id: number, mechanic: string) => {
    const b = bookings.find(x => x.id === id); if (!b) return;
    try { await axiosInstance.put("/appointments", { ...b, mechanic }); setBookings(bookings.map(x => x.id === id ? { ...x, mechanic } : x)); } catch (e) { console.error(e); }
  };
  const saveEditBooking = async () => {
    if (!editBooking) return;
    try { await axiosInstance.put("/appointments", editBooking); setBookings(bookings.map(b => b.id === editBooking.id ? editBooking : b)); setEditBooking(null); } catch (e) { console.error(e); }
  };
  const addService = async () => {
    if (!newService.serviceName || !newService.servicePrice) return;
    try { await axiosInstance.post("/services", newService); await loadData(); setNewService({ serviceName: "", serviceDescription: "", servicePrice: 0, durationMinutes: 60 }); setShowAddService(false); } catch (e) { console.error(e); }
  };
  const saveEditService = async () => {
    if (!editService) return;
    try { await axiosInstance.put("/services", editService); setServices(services.map(s => s.id === editService.id ? editService : s)); setEditService(null); } catch (e) { console.error(e); }
  };
  const deleteService = async (id: number) => {
    try { await axiosInstance.delete(`/services?id=${id}`); setServices(services.filter(s => s.id !== id)); } catch (e) { console.error(e); }
  };
  const markRead = async (id: number) => {
    try { await axiosInstance.put(`/contact/read/${id}`); setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m)); } catch (e) { console.error(e); }
  };
  const deleteMessage = async (id: number) => {
    try { await axiosInstance.delete(`/contact/${id}`); setMessages(messages.filter(m => m.id !== id)); if (selectedMessage?.id === id) setSelectedMessage(null); } catch (e) { console.error(e); }
  };
  const openMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) await markRead(msg.id);
  };

  const filtered = bookings.filter(b => {
    const matchStatus = filterStatus === "all" || b.status.toLowerCase() === filterStatus;
    const s = search.toLowerCase();
    return matchStatus && (!s || b.licensePlate.toLowerCase().includes(s) || b.carModel.toLowerCase().includes(s) || b.carBrand.toLowerCase().includes(s));
  });
  const filteredMsgs = messages.filter(m => {
    const s = msgSearch.toLowerCase();
    return !s || m.firstName.toLowerCase().includes(s) || m.lastName.toLowerCase().includes(s) || m.email.toLowerCase().includes(s) || m.subject.toLowerCase().includes(s);
  });
  const unread = messages.filter(m => !m.isRead).length;
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status.toLowerCase() === "pending").length,
    inprogress: bookings.filter(b => b.status.toLowerCase() === "inprogress").length,
    completed: bookings.filter(b => b.status.toLowerCase() === "completed").length,
    revenue: bookings.filter(b => b.status.toLowerCase() === "completed").reduce((acc, b) => acc + (services.find(s => s.id === b.serviceId)?.servicePrice || 0), 0),
  };
  const serviceStats = services.map(s => ({ name: s.serviceName.split(" ").slice(0, 2).join(" "), count: bookings.filter(b => b.serviceId === s.id).length })).filter(s => s.count > 0);
  const statusData = [
    { name: "In asteptare", value: stats.pending, color: "#f59e0b" },
    { name: "In lucru", value: stats.inprogress, color: "#8b5cf6" },
    { name: "Finalizate", value: stats.completed, color: "#10b981" },
    { name: "Anulate", value: bookings.filter(b => b.status.toLowerCase() === "cancelled").length, color: "#ef4444" },
  ].filter(d => d.value > 0);

  const NAV = (active: boolean): React.CSSProperties => ({ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem", background: active ? "#ff4d29" : "transparent", color: active ? "#fff" : "#666", transition: "0.2s" });
  const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", boxSizing: "border-box", outline: "none" };

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "Arial", fontSize: "1.2rem", color: "#888" }}>Se incarca datele...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f5f7", fontFamily: "Arial, sans-serif" }}>
      {/* NAVBAR */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#d32f2f" }}>CAR<span style={{ color: "#333" }}>FIX</span> <span style={{ fontSize: "0.8rem", color: "#888", fontWeight: "normal" }}>Admin</span></div>
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <button onClick={() => setTab("overview")} style={NAV(tab === "overview")}>📊 Dashboard</button>
            <button onClick={() => setTab("bookings")} style={NAV(tab === "bookings")}>
              📅 Programari {stats.pending > 0 && <span style={{ background: "#ff4d29", color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: "0.7rem", marginLeft: 4 }}>{stats.pending}</span>}
            </button>
            <button onClick={() => setTab("services")} style={NAV(tab === "services")}>🔧 Servicii</button>
            <button onClick={() => setTab("stats")} style={NAV(tab === "stats")}>📈 Statistici</button>
            <button onClick={() => setTab("messages")} style={NAV(tab === "messages")}>
              📬 Mesaje {unread > 0 && <span style={{ background: "#3b82f6", color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: "0.7rem", marginLeft: 4 }}>{unread}</span>}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={loadData} style={{ background: "#f3f4f6", color: "#333", border: "none", padding: "7px 14px", borderRadius: 20, cursor: "pointer", fontSize: "0.8rem" }}>🔄 Refresh</button>
          <button onClick={onLogout} style={{ background: "#333", color: "#fff", border: "none", padding: "7px 16px", borderRadius: 20, fontWeight: "bold", cursor: "pointer", fontSize: "0.8rem" }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "28px 24px" }}>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <h2 style={{ color: "#222", marginBottom: 20 }}>Bun venit, Administrator! 👋</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total programari", value: stats.total, color: "#6366f1", icon: "📅" },
                { label: "In asteptare", value: stats.pending, color: "#f59e0b", icon: "⏳" },
                { label: "In lucru", value: stats.inprogress, color: "#8b5cf6", icon: "🔧" },
                { label: "Finalizate", value: stats.completed, color: "#10b981", icon: "✅" },
                { label: "Venituri MDL", value: stats.revenue, color: "#ff4d29", icon: "💰" },
                { label: "Mesaje noi", value: unread, color: "#3b82f6", icon: "📬" },
              ].map(card => (
                <div key={card.label} style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${card.color}` }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{card.icon}</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#222" }}>{card.value}</div>
                  <div style={{ color: "#888", fontSize: "0.82rem" }}>{card.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <h3 style={{ margin: 0 }}>Programari recente</h3>
                  <button onClick={() => setTab("bookings")} style={{ color: "#ff4d29", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>Vezi toate →</button>
                </div>
                {bookings.slice(0, 5).map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f3f3" }}>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{b.carBrand} {b.carModel} — {b.licensePlate}</div>
                      <div style={{ color: "#888", fontSize: "0.78rem" }}>{b.scheduledAt?.substring(0, 16).replace("T", " ")}</div>
                    </div>
                    <span style={{ background: (STATUS_COLORS[b.status] || "#888") + "20", color: STATUS_COLORS[b.status] || "#888", padding: "2px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: "bold", alignSelf: "center" }}>
                      {STATUS_LABELS[b.status] || b.status}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <h3 style={{ margin: 0 }}>Mesaje recente</h3>
                  <button onClick={() => setTab("messages")} style={{ color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>Vezi toate →</button>
                </div>
                {messages.length === 0 ? (
                  <div style={{ color: "#aaa", textAlign: "center", padding: "30px 0" }}>Nu exista mesaje.</div>
                ) : messages.slice(0, 5).map((m, i) => (
                  <div key={i} onClick={() => { setTab("messages"); openMessage(m); }}
                    style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f3f3", cursor: "pointer" }}>
                    <div>
                      <div style={{ fontWeight: m.isRead ? "normal" : "bold", fontSize: "0.9rem" }}>
                        {!m.isRead && <span style={{ width: 7, height: 7, background: "#3b82f6", borderRadius: "50%", display: "inline-block", marginRight: 6 }} />}
                        {m.firstName} {m.lastName}
                      </div>
                      <div style={{ color: "#888", fontSize: "0.78rem" }}>{m.subject}</div>
                    </div>
                    <div style={{ color: "#aaa", fontSize: "0.75rem", alignSelf: "center" }}>{m.createdAt?.substring(0, 10)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {tab === "bookings" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0 }}>Programari ({bookings.length})</h2>
              <div style={{ display: "flex", gap: 10 }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cauta..." style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ddd", fontSize: "0.85rem", outline: "none" }} />
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "9px 12px", borderRadius: 10, border: "1px solid #ddd", fontSize: "0.85rem", outline: "none" }}>
                  <option value="all">Toate</option>
                  <option value="pending">In asteptare</option>
                  <option value="confirmed">Confirmate</option>
                  <option value="inprogress">In lucru</option>
                  <option value="completed">Finalizate</option>
                  <option value="cancelled">Anulate</option>
                </select>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              {filtered.length === 0 ? <div style={{ padding: 50, textAlign: "center", color: "#aaa" }}>Nu exista programari.</div>
                : filtered.map((b, i) => (
                  <div key={i} style={{ padding: "18px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #f3f3f3" : "none" }}>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                      <div style={{ flex: "1 1 160px" }}>
                        <div style={{ fontWeight: "bold" }}>{b.carBrand} {b.carModel}</div>
                        <div style={{ color: "#888", fontSize: "0.82rem" }}>{b.licensePlate}</div>
                        <div style={{ color: "#aaa", fontSize: "0.78rem" }}>{b.scheduledAt?.substring(0, 16).replace("T", " ")}</div>
                      </div>
                      <div style={{ flex: "1 1 160px" }}>
                        <div style={{ fontSize: "0.78rem", color: "#aaa", marginBottom: 4 }}>Mecanic</div>
                        <select value={b.mechanic || ""} onChange={e => updateMechanic(b.id, e.target.value)}
                          style={{ padding: "5px 8px", borderRadius: 8, border: "1px solid #ddd", fontSize: "0.82rem", width: "100%", outline: "none" }}>
                          <option value="">— Neatribuit —</option>
                          {MECHANICS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                        <span style={{ background: (STATUS_COLORS[b.status] || "#888") + "20", color: STATUS_COLORS[b.status] || "#888", padding: "3px 12px", borderRadius: 20, fontSize: "0.78rem", fontWeight: "bold" }}>
                          {STATUS_LABELS[b.status] || b.status}
                        </span>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {b.status.toLowerCase() === "pending" && <button onClick={() => updateStatus(b.id, "confirmed")} style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 7, cursor: "pointer", fontSize: "0.78rem", fontWeight: "bold" }}>Confirma</button>}
                          {b.status.toLowerCase() === "confirmed" && <button onClick={() => updateStatus(b.id, "inprogress")} style={{ background: "#8b5cf6", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 7, cursor: "pointer", fontSize: "0.78rem", fontWeight: "bold" }}>In lucru</button>}
                          {b.status.toLowerCase() === "inprogress" && <button onClick={() => updateStatus(b.id, "completed")} style={{ background: "#10b981", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 7, cursor: "pointer", fontSize: "0.78rem", fontWeight: "bold" }}>Finalizeaza</button>}
                          {!["cancelled", "completed"].includes(b.status.toLowerCase()) && <button onClick={() => updateStatus(b.id, "cancelled")} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "4px 10px", borderRadius: 7, cursor: "pointer", fontSize: "0.78rem", fontWeight: "bold" }}>Anuleaza</button>}
                          <button onClick={() => setEditBooking(b)} style={{ background: "#f3f4f6", color: "#333", border: "none", padding: "4px 10px", borderRadius: 7, cursor: "pointer", fontSize: "0.78rem", fontWeight: "bold" }}>Editeaza</button>
                        </div>
                      </div>
                    </div>
                    {b.notes && <div style={{ marginTop: 8, background: "#fafafa", borderRadius: 8, padding: "7px 12px", fontSize: "0.82rem", color: "#666" }}>💬 {b.notes}</div>}
                  </div>
                ))}
            </div>
            {editBooking && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
                <div style={{ background: "#fff", borderRadius: 20, padding: "32px", width: "90%", maxWidth: 500 }}>
                  <h3 style={{ margin: "0 0 20px" }}>Editeaza Programare</h3>
                  <div style={{ display: "grid", gap: 14 }}>
                    <div><label style={{ display: "block", fontWeight: "bold", marginBottom: 6, fontSize: "0.85rem" }}>Data si ora</label>
                      <input type="datetime-local" value={editBooking.scheduledAt?.substring(0, 16)} onChange={e => setEditBooking({ ...editBooking, scheduledAt: e.target.value })} style={inp} /></div>
                    <div><label style={{ display: "block", fontWeight: "bold", marginBottom: 6, fontSize: "0.85rem" }}>Status</label>
                      <select value={editBooking.status} onChange={e => setEditBooking({ ...editBooking, status: e.target.value as Booking["status"] })} style={inp}>
                        <option value="pending">In asteptare</option><option value="confirmed">Confirmata</option>
                        <option value="inprogress">In lucru</option><option value="completed">Finalizata</option><option value="cancelled">Anulata</option>
                      </select></div>
                    <div><label style={{ display: "block", fontWeight: "bold", marginBottom: 6, fontSize: "0.85rem" }}>Note</label>
                      <input value={editBooking.notes || ""} onChange={e => setEditBooking({ ...editBooking, notes: e.target.value })} style={inp} /></div>
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                    <button onClick={() => setEditBooking(null)} style={{ background: "#f3f4f6", color: "#333", border: "none", padding: "10px 24px", borderRadius: 20, cursor: "pointer", fontWeight: "bold" }}>Anuleaza</button>
                    <button onClick={saveEditBooking} style={{ background: "#ff4d29", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 20, cursor: "pointer", fontWeight: "bold" }}>Salveaza</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SERVICES */}
        {tab === "services" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>Servicii ({services.length})</h2>
              <button onClick={() => setShowAddService(true)} style={{ background: "#ff4d29", color: "#fff", border: "none", padding: "10px 22px", borderRadius: 20, fontWeight: "bold", cursor: "pointer" }}>+ Adauga</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
              {services.map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold" }}>{s.serviceName}</div>
                    <div style={{ color: "#888", fontSize: "0.82rem" }}>{s.durationMinutes} min • <span style={{ color: "#ff4d29", fontWeight: "bold" }}>{s.servicePrice} MDL</span></div>
                    {s.serviceDescription && <div style={{ color: "#aaa", fontSize: "0.78rem", marginTop: 4 }}>{s.serviceDescription}</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button onClick={() => setEditService(s)} style={{ background: "#f3f4f6", color: "#333", border: "none", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.78rem", fontWeight: "bold" }}>Editeaza</button>
                    <button onClick={() => deleteService(s.id)} style={{ background: "#ef444420", color: "#ef4444", border: "none", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.78rem", fontWeight: "bold" }}>Sterge</button>
                  </div>
                </div>
              ))}
            </div>
            {(editService || showAddService) && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
                <div style={{ background: "#fff", borderRadius: 20, padding: "32px", width: "90%", maxWidth: 460 }}>
                  <h3 style={{ margin: "0 0 20px" }}>{editService ? "Editeaza Serviciu" : "Adauga Serviciu Nou"}</h3>
                  <div style={{ display: "grid", gap: 14 }}>
                    {[{ label: "Denumire", field: "serviceName" }, { label: "Descriere", field: "serviceDescription" }, { label: "Pret (MDL)", field: "servicePrice" }, { label: "Durata (min)", field: "durationMinutes" }].map(({ label, field }) => (
                      <div key={field}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: 6, fontSize: "0.85rem" }}>{label}</label>
                        <input value={editService ? (editService as any)[field] : (newService as any)[field]}
                          onChange={e => {
                            const v = ["servicePrice", "durationMinutes"].includes(field) ? Number(e.target.value) : e.target.value;
                            editService ? setEditService({ ...editService, [field]: v }) : setNewService({ ...newService, [field]: v });
                          }} style={inp} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                    <button onClick={() => { setEditService(null); setShowAddService(false); }} style={{ background: "#f3f4f6", color: "#333", border: "none", padding: "10px 24px", borderRadius: 20, cursor: "pointer", fontWeight: "bold" }}>Anuleaza</button>
                    <button onClick={editService ? saveEditService : addService} style={{ background: "#ff4d29", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 20, cursor: "pointer", fontWeight: "bold" }}>Salveaza</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STATS */}
        {tab === "stats" && (
          <div>
            <h2 style={{ color: "#222", marginBottom: 20 }}>Statistici & Rapoarte</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[{ label: "Venituri totale", value: `${stats.revenue} MDL`, color: "#ff4d29", icon: "💰" }, { label: "Finalizate", value: stats.completed, color: "#10b981", icon: "✅" }, { label: "Total programari", value: stats.total, color: "#6366f1", icon: "📅" }, { label: "Servicii", value: services.length, color: "#3b82f6", icon: "🔧" }]
                .map(card => (
                  <div key={card.label} style={{ background: "#fff", borderRadius: 14, padding: "22px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${card.color}` }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{card.icon}</div>
                    <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{card.value}</div>
                    <div style={{ color: "#888", fontSize: "0.82rem" }}>{card.label}</div>
                  </div>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 16px" }}>Servicii solicitate</h3>
                {serviceStats.length === 0 ? <div style={{ color: "#aaa", textAlign: "center", padding: 40 }}>Nu exista date</div> : (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={serviceStats}><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="count" fill="#ff4d29" radius={[4, 4, 0, 0]} /></BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div style={{ background: "#fff", borderRadius: 14, padding: "22px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 16px" }}>Distributia statusurilor</h3>
                {statusData.length === 0 ? <div style={{ color: "#aaa", textAlign: "center", padding: 40 }}>Nu exista date</div> : (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart><Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>{statusData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Legend /><Tooltip /></PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === "messages" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0 }}>
                📬 Mesaje Contact
                {unread > 0 && <span style={{ background: "#3b82f6", color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: "0.8rem", marginLeft: 10 }}>{unread} necitite</span>}
              </h2>
              <input value={msgSearch} onChange={e => setMsgSearch(e.target.value)} placeholder="Cauta dupa nume, email, subiect..."
                style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid #ddd", fontSize: "0.85rem", width: 280, outline: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: selectedMessage ? "1fr 1.4fr" : "1fr", gap: 20 }}>
              {/* LIST */}
              <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                {filteredMsgs.length === 0 ? (
                  <div style={{ padding: "60px", textAlign: "center", color: "#aaa" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
                    Nu exista mesaje.
                  </div>
                ) : filteredMsgs.map((m, i) => (
                  <div key={m.id} onClick={() => openMessage(m)}
                    style={{ padding: "16px 20px", borderBottom: i < filteredMsgs.length - 1 ? "1px solid #f3f3f3" : "none", cursor: "pointer", background: selectedMessage?.id === m.id ? "#eff6ff" : m.isRead ? "#fff" : "#f0f7ff" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          {!m.isRead && <span style={{ width: 8, height: 8, background: "#3b82f6", borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />}
                          <span style={{ fontWeight: m.isRead ? "normal" : "bold", fontSize: "0.92rem" }}>{m.firstName} {m.lastName}</span>
                          <span style={{ fontSize: "0.73rem", background: "#e0edff", color: "#3b82f6", borderRadius: 10, padding: "1px 8px" }}>{m.subject}</span>
                        </div>
                        <div style={{ color: "#666", fontSize: "0.8rem", marginBottom: 2 }}>{m.email} • {m.phone}</div>
                        <div style={{ color: "#999", fontSize: "0.78rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 300 }}>{m.message}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginLeft: 10 }}>
                        <div style={{ color: "#aaa", fontSize: "0.73rem" }}>{m.createdAt?.substring(0, 10)}</div>
                        <button onClick={e => { e.stopPropagation(); deleteMessage(m.id); }}
                          style={{ background: "#ef444420", color: "#ef4444", border: "none", padding: "3px 8px", borderRadius: 6, cursor: "pointer", fontSize: "0.72rem", fontWeight: "bold" }}>Sterge</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* DETAIL */}
              {selectedMessage && (
                <div style={{ background: "#fff", borderRadius: 14, padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <h3 style={{ margin: "0 0 6px" }}>{selectedMessage.firstName} {selectedMessage.lastName}</h3>
                      <div style={{ color: "#666", fontSize: "0.85rem" }}>
                        <a href={`mailto:${selectedMessage.email}`} style={{ color: "#3b82f6", textDecoration: "none" }}>{selectedMessage.email}</a>
                        {" • "}
                        <a href={`tel:${selectedMessage.phone}`} style={{ color: "#3b82f6", textDecoration: "none" }}>{selectedMessage.phone}</a>
                      </div>
                    </div>
                    <button onClick={() => setSelectedMessage(null)} style={{ background: "#f3f4f6", color: "#333", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem" }}>✕ Inchide</button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                    {[
                      { label: "Subiect", value: selectedMessage.subject },
                      { label: "Data", value: selectedMessage.createdAt?.substring(0, 16).replace("T", " ") },
                      ...(selectedMessage.vehicleBrand ? [{ label: "Marca", value: selectedMessage.vehicleBrand }] : []),
                      ...(selectedMessage.vehicleModel ? [{ label: "Model", value: selectedMessage.vehicleModel }] : []),
                    ].map(item => (
                      <div key={item.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 3, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>{item.label}</div>
                        <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#f8fafc", borderRadius: 12, padding: "18px", marginBottom: 20 }}>
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 10, textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Mesaj</div>
                    <div style={{ lineHeight: 1.7, fontSize: "0.92rem", whiteSpace: "pre-wrap" }}>{selectedMessage.message}</div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      style={{ flex: 1, background: "#3b82f6", color: "#fff", padding: "11px", borderRadius: 10, textDecoration: "none", textAlign: "center" as const, fontWeight: "bold", fontSize: "0.9rem" }}>
                      📧 Raspunde prin email
                    </a>
                    <button onClick={() => deleteMessage(selectedMessage.id)}
                      style={{ background: "#ef4444", color: "#fff", border: "none", padding: "11px 20px", borderRadius: 10, cursor: "pointer", fontWeight: "bold", fontSize: "0.9rem" }}>
                      🗑 Sterge
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}