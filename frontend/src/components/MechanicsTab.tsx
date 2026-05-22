import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

// ─── Tipuri ──────────────────────────────────────────────────────────────────
export type Mechanic = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  specialization: string;
  experienceYears: number;
  isActive: boolean;
};

const EMPTY_MECHANIC: Omit<Mechanic, "id"> = {
  firstName: "",
  lastName: "",
  phone: "",
  specialization: "",
  experienceYears: 0,
  isActive: true,
};

const SPECIALIZATIONS = [
  "Mecanică generală",
  "Electrică auto",
  "Diagnoză",
  "Suspensie & Frâne",
  "Caroserie & Vopsitorie",
  "Transmisie",
];

// ─── Stiluri inline (consistent cu DashboardAdmin) ───────────────────────────
const card: React.CSSProperties = {
  background: "#1e1e1e",
  borderRadius: 12,
  padding: "20px 24px",
  marginBottom: 16,
};

const inputStyle: React.CSSProperties = {
  background: "#2a2a2a",
  border: "1px solid #444",
  borderRadius: 8,
  color: "#fff",
  padding: "8px 12px",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
};

const btnPrimary: React.CSSProperties = {
  background: "#ff4d29",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "9px 20px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};

const btnSecondary: React.CSSProperties = {
  background: "#2a2a2a",
  color: "#ccc",
  border: "1px solid #444",
  borderRadius: 8,
  padding: "9px 16px",
  cursor: "pointer",
  fontSize: 14,
};

const btnDanger: React.CSSProperties = {
  background: "transparent",
  color: "#ef4444",
  border: "1px solid #ef4444",
  borderRadius: 8,
  padding: "6px 12px",
  cursor: "pointer",
  fontSize: 13,
};

const badge = (active: boolean): React.CSSProperties => ({
  background: active ? "#10b98120" : "#6b728020",
  color: active ? "#10b981" : "#9ca3af",
  border: `1px solid ${active ? "#10b981" : "#6b7280"}`,
  borderRadius: 20,
  padding: "2px 10px",
  fontSize: 12,
  fontWeight: 600,
});

// ─── Componenta principală ────────────────────────────────────────────────────
export default function MechanicsTab() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Mechanic, "id">>(EMPTY_MECHANIC);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Confirm delete
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    loadMechanics();
  }, []);

  // ── API calls ──────────────────────────────────────────────────────────────

  const loadMechanics = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/mechanics/getAll");
      setMechanics(res.data || []);
    } catch (e) {
      console.error("Eroare la incarcarea mecanicilor:", e);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Prenumele si numele sunt obligatorii.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (editingId !== null) {
        // UPDATE
        await axiosInstance.put("/mechanics", { ...form, id: editingId });
        setMechanics(mechanics.map(m =>
          m.id === editingId ? { ...form, id: editingId } : m
        ));
      } else {
        // CREATE
        await axiosInstance.post("/mechanics", form);
        await loadMechanics(); // reload pentru a lua ID-ul generat
      }
      resetForm();
    } catch (e) {
      setError("A aparut o eroare. Verificati consola.");
      console.error(e);
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/mechanics?id=${id}`);
      setMechanics(mechanics.filter(m => m.id !== id));
    } catch (e) {
      console.error("Eroare la stergere:", e);
    }
    setDeleteConfirm(null);
  };

  const handleToggleActive = async (mechanic: Mechanic) => {
    try {
      await axiosInstance.put("/mechanics", { ...mechanic, isActive: !mechanic.isActive });
      setMechanics(mechanics.map(m =>
        m.id === mechanic.id ? { ...m, isActive: !m.isActive } : m
      ));
    } catch (e) {
      console.error(e);
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_MECHANIC);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (m: Mechanic) => {
    setEditingId(m.id);
    setForm({
      firstName: m.firstName,
      lastName: m.lastName,
      phone: m.phone,
      specialization: m.specialization,
      experienceYears: m.experienceYears,
      isActive: m.isActive,
    });
    setError(null);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_MECHANIC);
    setError(null);
  };

  const filtered = mechanics.filter(m => {
    const matchSearch =
      `${m.firstName} ${m.lastName} ${m.specialization}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchActive =
      filterActive === "all" ||
      (filterActive === "active" && m.isActive) ||
      (filterActive === "inactive" && !m.isActive);
    return matchSearch && matchActive;
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 22 }}>🔩 Mecanici</h2>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>
            {mechanics.filter(m => m.isActive).length} activi din {mechanics.length} total
          </p>
        </div>
        <button style={btnPrimary} onClick={openAdd}>+ Adauga Mecanic</button>
      </div>

      {/* Filtre */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          style={{ ...inputStyle, maxWidth: 260 }}
          placeholder="Cauta dupa nume sau specializare..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {(["all", "active", "inactive"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilterActive(f)}
            style={{
              ...btnSecondary,
              background: filterActive === f ? "#ff4d29" : "#2a2a2a",
              color: filterActive === f ? "#fff" : "#ccc",
              border: filterActive === f ? "1px solid #ff4d29" : "1px solid #444",
            }}
          >
            {f === "all" ? "Toti" : f === "active" ? "Activi" : "Inactivi"}
          </button>
        ))}
      </div>

      {/* Form adaugare / editare */}
      {showForm && (
        <div style={{ ...card, border: "1px solid #ff4d2940", marginBottom: 24 }}>
          <h3 style={{ color: "#ff4d29", margin: "0 0 16px" }}>
            {editingId !== null ? "✏️ Editeaza Mecanic" : "➕ Mecanic Nou"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Prenume *</label>
              <input
                style={inputStyle}
                placeholder="Ion"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Nume *</label>
              <input
                style={inputStyle}
                placeholder="Popescu"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Telefon</label>
              <input
                style={inputStyle}
                placeholder="07xx xxx xxx"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Specializare</label>
              <select
                style={inputStyle}
                value={form.specialization}
                onChange={e => setForm({ ...form, specialization: e.target.value })}
              >
                <option value="">Alege specializarea</option>
                {SPECIALIZATIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Ani experienta</label>
              <input
                style={inputStyle}
                type="number"
                min={0}
                max={50}
                value={form.experienceYears}
                onChange={e => setForm({ ...form, experienceYears: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 20 }}>
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
                style={{ width: 16, height: 16, cursor: "pointer" }}
              />
              <label htmlFor="isActive" style={{ color: "#ccc", cursor: "pointer", fontSize: 14 }}>
                Mecanic activ (disponibil pentru programari)
              </label>
            </div>
          </div>

          {error && (
            <p style={{ color: "#ef4444", margin: "12px 0 0", fontSize: 13 }}>⚠️ {error}</p>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? "Se salveaza..." : editingId !== null ? "Salveaza modificarile" : "Adauga Mecanic"}
            </button>
            <button style={btnSecondary} onClick={resetForm}>Anuleaza</button>
          </div>
        </div>
      )}

      {/* Lista mecanici */}
      {loading ? (
        <p style={{ color: "#888", textAlign: "center", padding: 40 }}>Se incarca...</p>
      ) : filtered.length === 0 ? (
        <div style={{ ...card, textAlign: "center", padding: 40 }}>
          <p style={{ color: "#888", margin: 0 }}>Niciun mecanic gasit.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {filtered.map(m => (
            <div key={m.id} style={{ ...card, border: "1px solid #2a2a2a", position: "relative" }}>
              {/* Header card */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
                    {m.firstName} {m.lastName}
                  </div>
                  <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>
                    {m.specialization || "Fara specializare"}
                  </div>
                </div>
                <span style={badge(m.isActive)}>
                  {m.isActive ? "Activ" : "Inactiv"}
                </span>
              </div>

              {/* Detalii */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                {m.phone && (
                  <div style={{ color: "#aaa", fontSize: 13 }}>📞 {m.phone}</div>
                )}
                <div style={{ color: "#aaa", fontSize: 13 }}>
                  ⭐ {m.experienceYears} {m.experienceYears === 1 ? "an" : "ani"} experienta
                </div>
              </div>

              {/* Actiuni */}
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...btnSecondary, flex: 1, fontSize: 13 }} onClick={() => openEdit(m)}>
                  ✏️ Editeaza
                </button>
                <button
                  style={{
                    ...btnSecondary,
                    fontSize: 13,
                    color: m.isActive ? "#f59e0b" : "#10b981",
                    border: `1px solid ${m.isActive ? "#f59e0b" : "#10b981"}`,
                  }}
                  onClick={() => handleToggleActive(m)}
                  title={m.isActive ? "Dezactiveaza" : "Activeaza"}
                >
                  {m.isActive ? "⏸" : "▶"}
                </button>
                {deleteConfirm === m.id ? (
                  <div style={{ display: "flex", gap: 4 }}>
                    <button style={{ ...btnDanger, fontSize: 12 }} onClick={() => handleDelete(m.id)}>
                      ✓ Confirma
                    </button>
                    <button style={{ ...btnSecondary, fontSize: 12 }} onClick={() => setDeleteConfirm(null)}>
                      ✗
                    </button>
                  </div>
                ) : (
                  <button style={btnDanger} onClick={() => setDeleteConfirm(m.id)}>
                    🗑
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
