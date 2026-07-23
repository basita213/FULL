'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

interface GalleryItem { id: string; image: string; alt: string; category: string; visible: boolean; order: number; }

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ image: '', alt: '', category: '', visible: true });
  const [saving, setSaving] = useState(false);

  const load = () => {
    apiFetch('/api/v1/gallery/admin').then((r) => setItems(r.data || [])).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ image: '', alt: '', category: '', visible: true }); setEditing(null); setShowForm(false); };

  const openEdit = (g: GalleryItem) => {
    setForm({ image: g.image, alt: g.alt, category: g.category || '', visible: g.visible !== false });
    setEditing(g);
    setShowForm(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, order: editing?.order || items.length };
    if (editing) {
      await apiFetch(`/api/v1/gallery/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
    } else {
      await apiFetch('/api/v1/gallery', { method: 'POST', body: JSON.stringify(body) });
    }
    resetForm();
    load();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette photo ?')) return;
    await apiFetch(`/api/v1/gallery/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl">Galerie</h1>
          <p className="text-gray text-sm mt-1">{items.length} photo(s)</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-6 py-3 rounded-full bg-pink text-white font-display font-semibold text-sm hover:bg-pink-deep transition-colors">
          + Ajouter une photo
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="font-display font-bold text-lg mb-4">{editing ? 'Modifier' : 'Ajouter'} une photo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="URL de l'image" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Description (alt)" required value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
              <input placeholder="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            {form.image && <img src={form.image} alt="Preview" className="w-40 h-40 object-cover rounded-2xl" />}
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-3 rounded-full bg-pink text-white font-display font-semibold text-sm hover:bg-pink-deep transition-colors disabled:opacity-50">
                {saving ? 'Enregistrement...' : editing ? 'Modifier' : 'Ajouter'}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3 rounded-full border-2 border-pink-light text-pink font-display font-semibold text-sm hover:bg-pink-pale transition-colors">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <div key={i} className="h-48 rounded-3xl bg-white animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((g) => (
            <div key={g.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={g.image} alt={g.alt} className="w-full h-48 object-cover" />
              <div className="p-3">
                <p className="text-xs text-gray truncate">{g.alt}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => openEdit(g)} className="flex-1 py-1.5 rounded-xl bg-pink-pale text-pink text-[11px] font-semibold hover:bg-pink-light transition-colors">Modifier</button>
                  <button onClick={() => handleDelete(g.id)} className="py-1.5 px-2 rounded-xl bg-red-50 text-red-500 text-[11px] font-semibold hover:bg-red-100 transition-colors">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
