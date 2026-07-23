'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

interface Submission { id: string; name: string; email: string; phone?: string; subject: string; message: string; submittedAt: string; }

export default function ContactsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/v1/contact').then((r) => setItems(r.data || [])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl">Messages</h1>
        <p className="text-gray text-sm mt-1">{items.length} message(s) reçu(s)</p>
      </div>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 rounded-3xl bg-white animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
          <span className="text-4xl">📭</span>
          <p className="text-gray mt-3">Aucun message pour l&apos;instant</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((s) => (
            <div key={s.id} className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-display font-bold text-sm">{s.name}</h3>
                  <p className="text-xs text-gray">{s.email} {s.phone ? `· ${s.phone}` : ''}</p>
                </div>
                <span className="text-[11px] text-gray-light">{new Date(s.submittedAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="text-xs font-display font-semibold text-pink mb-2">{s.subject}</div>
              <p className="text-sm text-dark-soft leading-relaxed">{s.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
