"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { BRAND_MARK_UPPER } from "@/lib/brand";

type ReservationRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  organisation?: string;
  version: string;
  message?: string;
  locale: string;
  brand?: string;
  status: string;
  notes?: string;
};

type WaitlistRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  locale: string;
  brand?: string;
  status: string;
  notes?: string;
};

type Entry = (ReservationRow | WaitlistRow) & { _table: "reservations" | "waitlist" };

type Tab = "all" | "stamps" | "authentication" | "silicon-valley" | "dealers" | "club";

const STAMP_VERSIONS = ["essential", "business", "executive", "exclusive"];
const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  reviewed: "Examiné",
  contacted: "Contacté",
  completed: "Complété",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "#6b7280",
  reviewed: "#3b82f6",
  contacted: "#f2ca50",
  completed: "#22c55e",
};
const VERSION_LABELS: Record<string, string> = {
  essential: "Essential",
  business: "Business",
  executive: "Executive",
  exclusive: "Exclusive",
  "silicon-valley": "Silicon Valley",
  dealer: "Revendeur",
  authentication: "Authentification",
  waitlist: "Club",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className="text-[10px] px-2 py-1 font-cinzel tracking-widest uppercase"
      style={{
        color: STATUS_COLORS[status] ?? "#6b7280",
        border: `1px solid ${STATUS_COLORS[status] ?? "#6b7280"}33`,
        background: `${STATUS_COLORS[status] ?? "#6b7280"}15`,
      }}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function TypeBadge({ version }: { version: string }) {
  return (
    <span className="text-[10px] px-2 py-1 border border-[#d4af37]/20 text-[#f2ca50] font-cinzel tracking-wider uppercase">
      {VERSION_LABELS[version] ?? version}
    </span>
  );
}

export default function AdminDashboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [noteEdits, setNoteEdits] = useState<Record<string, string>>({});
  const [allBrands, setAllBrands] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/data${allBrands ? "?scope=all" : ""}`);
      if (!res.ok) throw new Error();
      const { reservations, waitlist } = await res.json();
      const all: Entry[] = [
        ...(reservations as ReservationRow[]).map((r) => ({ ...r, _table: "reservations" as const })),
        ...(waitlist as WaitlistRow[]).map((w) => ({ ...w, _table: "waitlist" as const, version: "waitlist" })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setEntries(all);
    } catch {
      // silently fail, show empty state
    } finally {
      setLoading(false);
    }
  }, [allBrands]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function updateStatus(entry: Entry, newStatus: string) {
    setUpdating(entry.id);
    const notes = noteEdits[entry.id];
    const res = await fetch("/api/admin/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: entry._table, id: entry.id, status: newStatus, notes }),
    });
    if (res.ok) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entry.id ? { ...e, status: newStatus, notes: notes ?? e.notes } : e
        )
      );
      setExpandedId(null);
    }
    setUpdating(null);
  }

  const filtered = entries.filter((e) => {
    if (activeTab === "all") return true;
    if (activeTab === "stamps") return STAMP_VERSIONS.includes((e as ReservationRow).version ?? "");
    if (activeTab === "authentication") return (e as ReservationRow).version === "authentication";
    if (activeTab === "silicon-valley") return (e as ReservationRow).version === "silicon-valley";
    if (activeTab === "dealers") return (e as ReservationRow).version === "dealer";
    if (activeTab === "club") return e._table === "waitlist";
    return true;
  });

  const stats = {
    stamps: entries.filter((e) => STAMP_VERSIONS.includes((e as ReservationRow).version ?? "")).length,
    authentication: entries.filter((e) => (e as ReservationRow).version === "authentication").length,
    sv: entries.filter((e) => (e as ReservationRow).version === "silicon-valley").length,
    dealers: entries.filter((e) => (e as ReservationRow).version === "dealer").length,
    club: entries.filter((e) => e._table === "waitlist").length,
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "Tout", count: entries.length },
    { key: "stamps", label: "Timbres", count: stats.stamps },
    { key: "authentication", label: "Authentification", count: stats.authentication },
    { key: "silicon-valley", label: "Silicon Valley", count: stats.sv },
    { key: "dealers", label: "Revendeurs", count: stats.dealers },
    { key: "club", label: "Club", count: stats.club },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1]">
      {/* Header */}
      <header className="border-b border-[#1e1a0e] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <p className="font-cinzel text-[#f2ca50] tracking-[0.2rem] text-sm">{BRAND_MARK_UPPER}</p>
          <span className="text-neutral-700 text-xs tracking-widest uppercase">Tableau de bord</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAllBrands((v) => !v)}
            className={`text-[10px] font-cinzel tracking-widest uppercase transition-colors duration-200 ${
              allBrands ? "text-[#f2ca50]" : "text-neutral-600 hover:text-[#f2ca50]"
            }`}
            title="Afficher les demandes de toutes les marques"
          >
            {allBrands ? "Toutes les marques" : "Cette marque"}
          </button>
          <button
            onClick={fetchData}
            className="text-neutral-600 hover:text-[#f2ca50] transition-colors duration-200"
            title="Actualiser"
          >
            <span className="material-symbols-outlined text-xl font-light">refresh</span>
          </button>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-[10px] font-cinzel tracking-widest uppercase text-neutral-600 hover:text-[#f2ca50] transition-colors duration-200"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <main className="px-8 py-8 max-w-[1400px] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Timbres réservés", value: stats.stamps, color: "#f2ca50" },
            { label: "Demandes d'authentification", value: stats.authentication, color: "#e11d48" },
            { label: "Silicon Valley", value: stats.sv, color: "#3b82f6" },
            { label: "Revendeurs", value: stats.dealers, color: "#8b5cf6" },
            { label: "Club — Liste d'attente", value: stats.club, color: "#22c55e" },
          ].map((s) => (
            <div key={s.label} className="border border-[#1e1a0e] bg-[#111] p-5">
              <div className="text-3xl font-cinzel font-black mb-1" style={{ color: s.color }}>
                {loading ? "—" : s.value}
              </div>
              <div className="text-[10px] text-neutral-600 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#1e1a0e]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setExpandedId(null); }}
              className={`px-4 py-2.5 text-[10px] font-cinzel tracking-widest uppercase transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "border-[#f2ca50] text-[#f2ca50]"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-[9px] opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-neutral-700 font-cinzel tracking-widest text-xs uppercase">
            Chargement…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-700 font-cinzel tracking-widest text-xs uppercase">
            Aucune entrée
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#1e1a0e]">
                  {["Date", "Nom", "Email", "Pays", "Type", "Statut", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-3 text-[10px] text-neutral-600 font-cinzel tracking-widest uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry) => {
                  const isExpanded = expandedId === entry.id;
                  const version = (entry as ReservationRow).version ?? "waitlist";
                  return (
                    <Fragment key={entry.id}>
                      <tr
                        className={`border-b border-[#161616] cursor-pointer transition-colors duration-150 ${
                          isExpanded ? "bg-[#131313]" : "hover:bg-[#111]"
                        }`}
                        onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      >
                        <td className="py-3.5 px-3 text-neutral-500 text-xs whitespace-nowrap">
                          {formatDate(entry.created_at)}
                        </td>
                        <td className="py-3.5 px-3 font-medium text-[#e5e2e1]">{entry.name}</td>
                        <td className="py-3.5 px-3 text-neutral-400 text-xs">{entry.email}</td>
                        <td className="py-3.5 px-3 text-neutral-400 text-xs">
                          {(entry as ReservationRow).country ?? "—"}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <TypeBadge version={version} />
                            {allBrands && entry.brand && (
                              <span className="text-[10px] px-2 py-1 border border-neutral-700 text-neutral-500 font-cinzel tracking-wider uppercase">
                                {entry.brand}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <StatusBadge status={entry.status} />
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            className="text-neutral-700 hover:text-[#f2ca50] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(entry.email);
                            }}
                            title="Copier l'email"
                          >
                            <span className="material-symbols-outlined text-base font-light">content_copy</span>
                          </button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-[#111]">
                          <td colSpan={7} className="px-6 py-5">
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Left: details */}
                              <div className="space-y-3 text-xs">
                                <p className="text-neutral-600 text-[10px] tracking-widest uppercase font-cinzel mb-3">
                                  Détails complets
                                </p>
                                {[
                                  ["Date & heure", `${formatDate(entry.created_at)} à ${formatTime(entry.created_at)}`],
                                  ["Nom", entry.name],
                                  ["Email", entry.email],
                                  ["Téléphone", (entry as ReservationRow).phone ?? "—"],
                                  ["Pays", (entry as ReservationRow).country ?? "—"],
                                  ["Organisation", (entry as ReservationRow).organisation ?? "—"],
                                  ["Langue", entry.locale.toUpperCase()],
                                ].map(([label, value]) => (
                                  <div key={label} className="flex gap-4">
                                    <span className="text-neutral-600 w-28 shrink-0">{label}</span>
                                    <span className="text-[#e5e2e1]">{value}</span>
                                  </div>
                                ))}
                                {(entry as ReservationRow).message && (
                                  <div className="flex gap-4">
                                    <span className="text-neutral-600 w-28 shrink-0">Message</span>
                                    <span className="text-[#e5e2e1] italic">{(entry as ReservationRow).message}</span>
                                  </div>
                                )}
                              </div>

                              {/* Right: status + notes */}
                              <div className="space-y-4">
                                <p className="text-neutral-600 text-[10px] tracking-widest uppercase font-cinzel mb-3">
                                  Gestion
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                  {Object.keys(STATUS_LABELS).map((s) => (
                                    <button
                                      key={s}
                                      disabled={updating === entry.id}
                                      onClick={() => updateStatus(entry, s)}
                                      className={`text-[10px] px-3 py-1.5 font-cinzel tracking-widest uppercase transition-all duration-200 border ${
                                        entry.status === s
                                          ? "border-[#f2ca50] text-[#f2ca50] bg-[#f2ca50]/10"
                                          : "border-neutral-800 text-neutral-500 hover:border-neutral-600"
                                      }`}
                                    >
                                      {STATUS_LABELS[s]}
                                    </button>
                                  ))}
                                </div>
                                <div>
                                  <label className="block text-[10px] text-neutral-600 tracking-widest uppercase mb-2">
                                    Notes internes
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={noteEdits[entry.id] ?? entry.notes ?? ""}
                                    onChange={(e) =>
                                      setNoteEdits((prev) => ({ ...prev, [entry.id]: e.target.value }))
                                    }
                                    className="w-full bg-[#0a0a0a] border border-[#1e1a0e] text-[#e5e2e1] text-xs p-3 resize-none focus:outline-none focus:border-[#f2ca50]/40 transition-colors"
                                    placeholder="Ajouter une note…"
                                  />
                                  <button
                                    onClick={() => updateStatus(entry, entry.status)}
                                    disabled={updating === entry.id}
                                    className="mt-2 text-[10px] font-cinzel tracking-widest uppercase text-[#f2ca50] border border-[#f2ca50]/30 px-4 py-1.5 hover:bg-[#f2ca50]/5 transition-all duration-200 disabled:opacity-40"
                                  >
                                    {updating === entry.id ? "…" : "Sauvegarder"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
