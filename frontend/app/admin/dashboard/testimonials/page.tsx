'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

interface Testimonial { id: string; author: string; text: string; rating: number; visible: boolean; order: number; }

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author: '', text: '', rating: 5, visible: true });
  const [saving, setSaving] = useState(false);

  const load = () => {
    apiFetch('/api/v1/testimonials/admin').then((r) => setItems(r.data || [])).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ author: '', text: '', rating: 5, visible: true }); setEditing(null); setShowForm(false); };

  const openEdit = (t: Testimonial) => {
    setForm({ author: t.author, text: t.text, rating: t.rating || 5, visible: t.visible !== false });
    setEditing(t);
    setShowForm(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, order: editing?.order || items.length };
    if (editing) {
      await apiFetch(`/api/v1/testimonials/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
    } else {
      await apiFetch('/api/v1/testimonials', { method: 'POST', body: JSON.stringify(body) });
    }
    resetForm();
    load();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet avis ?')) return;
    await apiFetch(`/api/v1/testimonials/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl">Avis clients</h1>
          <p className="text-gray text-sm mt-1">{items.length} avis</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-6 py-3 rounded-full bg-pink text-white font-display font-semibold text-sm hover:bg-pink-deep transition-colors">
          + Ajouter un avis
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="font-display font-bold text-lg mb-4">{editing ? 'Modifier' : 'Ajouter'} un avis</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nom du client" required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} étoiles</option>)}
              </select>
            </div>
            <textarea placeholder="Avis du client" required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink resize-none" />
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

      <div className="space-y-4">
        {items.map((t) => (
          <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm flex items-start justify-between">
            <div className="flex-1">
              <div className="text-candy-yellow text-sm mb-1">{'★'.repeat(t.rating || 5)}</div>
              <p className="text-sm text-dark-soft mb-2">&ldquo;{t.text}&rdquo;</p>
              <span className="text-xs font-display font-semibold text-pink">— {t.author}</span>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => openEdit(t)} className="px-4 py-2 rounded-xl bg-pink-pale text-pink text-xs font-semibold hover:bg-pink-light transition-colors">Modifier</button>
              <button onClick={() => handleDelete(t.id)} className="px-4 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
