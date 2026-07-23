'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

export default function SettingsPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiFetch('/api/v1/site/config').then((r) => setConfig(r.data)).finally(() => setLoading(false));
  }, []);

  const update = (path: string[], value: string) => {
    const c = { ...config };
    let obj = c;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
    obj[path[path.length - 1]] = value;
    setConfig(c);
  };

  const handleSave = async () => {
    setSaving(true);
    await apiFetch('/api/v1/site/config', { method: 'PUT', body: JSON.stringify(config) });
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="h-96 rounded-3xl bg-white animate-pulse" />;
  if (!config) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl">Paramètres</h1>
          <p className="text-gray text-sm mt-1">Configurez votre site</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-6 py-3 rounded-full bg-pink text-white font-display font-semibold text-sm hover:bg-pink-deep transition-colors disabled:opacity-50">
          {saving ? 'Enregistrement...' : saved ? '✓ Enregistré !' : 'Enregistrer'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4">Marque</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray mb-1 block">Nom</label>
              <input value={config.brand?.name || ''} onChange={(e) => update(['brand', 'name'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <div>
              <label className="text-xs text-gray mb-1 block">Tagline</label>
              <input value={config.brand?.tagline || ''} onChange={(e) => update(['brand', 'tagline'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <div>
              <label className="text-xs text-gray mb-1 block">Localisation</label>
              <input value={config.brand?.location || ''} onChange={(e) => update(['brand', 'location'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs text-gray mb-1 block">Description</label>
            <textarea value={config.brand?.description || ''} onChange={(e) => update(['brand', 'description'], e.target.value)} rows={3} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4">Hero</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray mb-1 block">Titre</label>
              <input value={config.hero?.title || ''} onChange={(e) => update(['hero', 'title'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <div>
              <label className="text-xs text-gray mb-1 block">Titre accent (script)</label>
              <input value={config.hero?.titleAccent || ''} onChange={(e) => update(['hero', 'titleAccent'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs text-gray mb-1 block">Sous-titre</label>
            <textarea value={config.hero?.subtitle || ''} onChange={(e) => update(['hero', 'subtitle'], e.target.value)} rows={2} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4">Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray mb-1 block">WhatsApp</label>
              <input value={config.contact?.whatsapp || ''} onChange={(e) => update(['contact', 'whatsapp'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <div>
              <label className="text-xs text-gray mb-1 block">Adresse</label>
              <input value={config.contact?.address || ''} onChange={(e) => update(['contact', 'address'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <div>
              <label className="text-xs text-gray mb-1 block">Horaires</label>
              <input value={config.contact?.hours || ''} onChange={(e) => update(['contact', 'hours'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
            <div>
              <label className="text-xs text-gray mb-1 block">Instagram URL</label>
              <input value={config.socials?.instagram || ''} onChange={(e) => update(['socials', 'instagram'], e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-pink-light/50 bg-pink-pale/30 text-sm outline-none focus:border-pink" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
