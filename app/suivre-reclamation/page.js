'use client';

import React, { useState } from 'react';

export default function SuiviReclamationPage() {
  const [email, setEmail] = useState('');
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReclamations([]);
    setMessage('');

    try {
      const response = await fetch(`/api/reclamations?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok) {
        if (data.length === 0) {
          setMessage("Aucune réclamation trouvée pour cet email.");
        } else {
          setReclamations(data);
        }
      } else {
        setMessage(data.message || "Erreur lors de la récupération des données.");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#003865] to-[#FF8C00] flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#003865]">Suivi de votre réclamation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#003865] rounded-lg p-3"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003865] text-white py-3 rounded-lg hover:bg-[#FF8C00] transition duration-300"
          >
            {loading ? "Recherche..." : "Voir mes réclamations"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        {reclamations.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#003865]">Résultats :</h2>
            <ul className="space-y-3">
            {reclamations.map((rec, index) => (
  <li key={index} className="border border-gray-300 p-4 rounded-lg">
    <p><strong>Description :</strong> {rec.description}</p>
    <p>
      <strong>Statut :</strong>{" "}
      {rec.statut === "réglée"
        ? "✅ Votre réclamation est réglée."
        : rec.statut === "en cours"
        ? "⏳ Votre réclamation est en cours de traitement."
        : rec.statut === "en attente"
        ? "🕐 Votre réclamation est en attente de traitement."
        : "❓ Statut inconnu."}
    </p>
    <p><strong>Réponse :</strong> {rec.reponse ? rec.reponse : "Pas encore de réponse."}</p>
    <p className="text-sm text-gray-500">
      Soumise le {new Date(rec.date).toLocaleDateString()}
    </p>
  </li>
))}

            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
