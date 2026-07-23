'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

interface Product { id: string; name: string; description: string; image: string; category: string; tag?: string; price?: string; visible: boolean; order: number; }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', image: '', category: '', tag: '', price: '', visible: true });
  const [saving, setSaving] = useState(false);

  const load = () => {
    apiFetch('/api/v1/products/admin').then((r) => setProducts(r.data || [])).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ name: '', description: '', image: '', category: '', tag: '', price: '', visible: true }); setEditing(null); setShowForm(false); };

  const openEdit = (p: Product) => {
    setForm({ name: p.name, description: p.description, image: p.image, category: p.category, tag: p.tag || '', price: p.price || '', visible: p.visible !== false });
    setEditing(p);
    setShowForm(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, order: editing?.order || products.length };
    if (editing) {
      await apiFetch(`/api/v1/products/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
    } else {
      await apiFetch('/api/v1/products', { method: 'POST', body: JSON.stringify(body) });
    }
    resetForm();
    load();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return;
    await apiFetch(`/api/v1/products/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl">Produits</h1>
          <p className="text-gray text-sm mt-1">{products.length} produit(s)</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-6 py-3 rounded-full bg-pink text-white font-display font-semibold text-sm hover:bg-pink-deep transition-colors">
          + Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="font-display font-bold text-lg mb-4">{editing ? 'Modifier' : 'Ajouter'} un produit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nom du produit" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
              <input placeholder="Catégorie" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <input placeholder="URL de l'image" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Tag (ex: Populaire)" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
              <input placeholder="Prix (ex: 2000 DA)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <textarea placeholder="Description" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink resize-none" />
            {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded-2xl" />}
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
        <div className="grid grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="h-48 rounded-3xl bg-white animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    {p.tag && <span className="text-[10px] font-display font-semibold uppercase bg-pink text-white px-2 py-0.5 rounded-full">{p.tag}</span>}
                    <h3 className="font-display font-bold text-sm mt-1">{p.name}</h3>
                    <p className="text-xs text-gray mt-1 line-clamp-2">{p.description}</p>
                    {p.price && <p className="text-xs text-pink font-semibold mt-1">{p.price}</p>}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(p)} className="flex-1 py-2 rounded-xl bg-pink-pale text-pink text-xs font-semibold hover:bg-pink-light transition-colors">Modifier</button>
                  <button onClick={() => handleDelete(p.id)} className="py-2 px-3 rounded-xl bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
