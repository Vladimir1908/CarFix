import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export type InventoryItem = {
  id: number;
  partName: string;
  partCode: string;
  category: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
  isActive: boolean;
};

const EMPTY: Omit<InventoryItem, "id"> = {
  partName: "", partCode: "", category: "", supplier: "",
  quantity: 0, unitPrice: 0, isActive: true,
};

const CATEGORIES = [
  "Filtre", "Frâne", "Suspensie", "Motor", "Transmisie",
  "Electrică", "Caroserie", "Lichide & Uleiuri", "Altele",
];

// ── Stiluri (identice cu MechanicsTab) ────────────────────────────────────────
const card: React.CSSProperties = {
  background: "#1e1e1e", borderRadius: 12, padding: "20px 24px", marginBottom: 16,
};
const inputStyle: React.CSSProperties = {
  background: "#2a2a2a", border: "1px solid #444", borderRadius: 8,
  color: "#fff", padding: "8px 12px", fontSize: 14, width: "100%", boxSizing: "border-box",
};
const btnPrimary: React.CSSProperties = {
  background: "#ff4d29", color: "#fff", border: "none", borderRadius: 8,
  padding: "9px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14,
};
const btnSecondary: React.CSSProperties = {
  background: "#2a2a2a", color: "#ccc", border: "1px solid #444",
  borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 14,
};
const btnDanger: React.CSSProperties = {
  background: "transparent", color: "#ef4444", border: "1px solid #ef4444",
  borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13,
};
const badge = (active: boolean): React.CSSProperties => ({
  background: active ? "#10b98120" : "#6b728020",
  color: active ? "#10b981" : "#9ca3af",
  border: `1px solid ${active ? "#10b981" : "#6b7280"}`,
  borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600,
});

export default function InventoryTab() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<InventoryItem, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => { loadItems(); }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/inventory/getAll");
      setItems(res.data || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.partName.trim()) { setError("Numele piesei este obligatoriu."); return; }
    setSaving(true); setError(null);
    try {
      if (editingId !== null) {
        await axiosInstance.put("/inventory", { ...form, id: editingId });
        setItems(items.map(i => i.id === editingId ? { ...form, id: editingId } : i));
      } else {
        await axiosInstance.post("/inventory", form);
        await loadItems();
      }
      resetForm();
    } catch (e) { setError("A aparut o eroare."); console.error(e); }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/inventory?id=${id}`);
      setItems(items.filter(i => i.id !== id));
    } catch (e) { console.error(e); }
    setDeleteConfirm(null);
  };

  const openAdd = () => { setEditingId(null); setForm(EMPTY); setError(null); setShowForm(true); };
  const openEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setForm({
      partName: item.partName, partCode: item.partCode, category: item.category,
      supplier: item.supplier, quantity: item.quantity, unitPrice: item.unitPrice,
      isActive: item.isActive,
    });
    setError(null); setShowForm(true);
  };
  const resetForm = () => { setShowForm(false); setEditingId(null); setForm(EMPTY); setError(null); };

  const filtered = items.filter(i => {
    const matchSearch = `${i.partName} ${i.partCode} ${i.supplier}`.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || i.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 22 }}>🔧 Inventar Piese</h2>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>
            {items.length} piese · stoc total {items.reduce((s, i) => s + i.quantity, 0)} buc
          </p>
        </div>
        <button style={btnPrimary} onClick={openAdd}>+ Adauga Piesa</button>
      </div>

      {/* Filtre */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          style={{ ...inputStyle, maxWidth: 260 }}
          placeholder="Cauta dupa nume, cod, furnizor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={{ ...inputStyle, maxWidth: 220 }}
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="all">Toate categoriile</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Form adaugare / editare */}
      {showForm && (
        <div style={{ ...card, border: "1px solid #ff4d2940", marginBottom: 24 }}>
          <h3 style={{ color: "#ff4d29", margin: "0 0 16px" }}>
            {editingId !== null ? "✏️ Editeaza Piesa" : "➕ Piesa Noua"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Nume piesa *</label>
              <input style={inputStyle} placeholder="ex: Filtru ulei" value={form.partName}
                onChange={e => setForm({ ...form, partName: e.target.value })} />
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Cod piesa</label>
              <input style={inputStyle} placeholder="ex: FU-1234" value={form.partCode}
                onChange={e => setForm({ ...form, partCode: e.target.value })} />
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Categorie</label>
              <select style={inputStyle} value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">Alege categoria</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Furnizor</label>
              <input style={inputStyle} placeholder="ex: Bosch" value={form.supplier}
                onChange={e => setForm({ ...form, supplier: e.target.value })} />
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Cantitate (buc)</label>
              <input style={inputStyle} type="number" min={0} value={form.quantity}
                onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <label style={{ color: "#aaa", fontSize: 12, display: "block", marginBottom: 4 }}>Pret unitar (RON)</label>
              <input style={inputStyle} type="number" min={0} step={0.01} value={form.unitPrice}
                onChange={e => setForm({ ...form, unitPrice: parseFloat(e.target.value) || 0 })} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 20 }}>
              <input type="checkbox" id="invActive" checked={form.isActive}
                onChange={e => setForm({ ...form, isActive: e.target.checked })}
                style={{ width: 16, height: 16, cursor: "pointer" }} />
              <label htmlFor="invActive" style={{ color: "#ccc", cursor: "pointer", fontSize: 14 }}>
                Piesa activa
              </label>
            </div>
          </div>
          {error && <p style={{ color: "#ef4444", margin: "12px 0 0", fontSize: 13 }}>⚠️ {error}</p>}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button style={btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? "Se salveaza..." : editingId !== null ? "Salveaza modificarile" : "Adauga Piesa"}
            </button>
            <button style={btnSecondary} onClick={resetForm}>Anuleaza</button>
          </div>
        </div>
      )}

      {/* Lista piese */}
      {loading ? (
        <p style={{ color: "#888", textAlign: "center", padding: 40 }}>Se incarca...</p>
      ) : filtered.length === 0 ? (
        <div style={{ ...card, textAlign: "center", padding: 40 }}>
          <p style={{ color: "#888", margin: 0 }}>Nicio piesa gasita.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ ...card, border: "1px solid #2a2a2a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{item.partName}</div>
                  <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>
                    {item.partCode || "—"} · {item.category || "Fara categorie"}
                  </div>
                </div>
                <span style={badge(item.isActive)}>{item.isActive ? "Activ" : "Inactiv"}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                {item.supplier && (
                  <div style={{ color: "#aaa", fontSize: 13 }}>🏭 {item.supplier}</div>
                )}
                <div style={{ color: "#aaa", fontSize: 13 }}>
                  📦 Stoc:{" "}
                  <strong style={{ color: item.quantity < 5 ? "#ef4444" : "#10b981" }}>
                    {item.quantity} buc
                  </strong>
                </div>
                <div style={{ color: "#aaa", fontSize: 13 }}>
                  💰 {item.unitPrice.toFixed(2)} RON / buc
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ ...btnSecondary, flex: 1, fontSize: 13 }} onClick={() => openEdit(item)}>
                  ✏️ Editeaza
                </button>
                {deleteConfirm === item.id ? (
                  <div style={{ display: "flex", gap: 4 }}>
                    <button style={{ ...btnDanger, fontSize: 12 }} onClick={() => handleDelete(item.id)}>
                      ✓ Confirma
                    </button>
                    <button style={{ ...btnSecondary, fontSize: 12 }} onClick={() => setDeleteConfirm(null)}>
                      ✗
                    </button>
                  </div>
                ) : (
                  <button style={btnDanger} onClick={() => setDeleteConfirm(item.id)}>🗑</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
