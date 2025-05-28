'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReclamationCard from '@/components/ReclamationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminPassword = 'MajalBerkane2025';

  // Authentification de l'admin
  const handleLogin = () => {
    if (password === adminPassword) {
      setAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  // Récupérer les réclamations depuis l'API
  useEffect(() => {
    if (authenticated) fetchReclamations();
  }, [authenticated]);

  const fetchReclamations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reclamations");
      const data = await res.json();
  
      // Ici on attend un tableau directement (pas un objet avec une clé "reclamations")
      setReclamations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erreur de récupération', err);
    } finally {
      setLoading(false);
    }
  };
  
  

  // Mettre à jour le statut et la réponse
  const handleStatusChange = async (id, newStatus, reponse) => {
    try {
      const res = await fetch('/api/reclamations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, statut: newStatus, reponse }),
      });
      if (res.ok) {
        toast.success('Réclamation mise à jour ✅');
        await fetchReclamations();
      } else {
        toast.error('Erreur lors de la mise à jour ❌');
      }
    } catch (err) {
      console.error('Erreur PUT:', err);
      toast.error('Erreur inconnue ❌');
    }
  };

  // Si l'administrateur n'est pas authentifié
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-xl rounded-lg border-t-4 border-orange-500">
          <Image src="/sa.png" width={120} height={80} alt="logo" className="mx-auto mb-4" />
          <h1 className="text-xl font-bold text-center mb-4">Espace Admin</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4"
          />
          <button onClick={handleLogin} className="w-full bg-green-700 text-white py-2 rounded">
            Connexion
          </button>
        </div>
      </div>
    );
  }

  // Affichage des réclamations
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Réclamations des Citoyens</h2>
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : reclamations.length === 0 ? (
        <p className="text-center">Aucune réclamation.</p>
      ) : (
        reclamations.map((rec) => (
          <ReclamationCard
            key={rec._id}
            rec={rec}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
}
