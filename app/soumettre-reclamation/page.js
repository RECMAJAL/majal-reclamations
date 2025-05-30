'use client';
import React, { useState } from 'react';

export default function ReclamationPage() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [datedereclamation, setDatedeReclamation] = useState('');
  const [identite, setIdentite] = useState('');
  const [descriptiondelareclamation, setDescriptiondelaReclamation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !email || !telephone || !localisation || !datedereclamation || !identite || !descriptiondelareclamation) {
      setErrorMessage("Tous les champs sont obligatoires !");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("L'email n'est pas valide !");
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reclamations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          email,
          telephone,
          localisation,
          date: datedereclamation,
          identite,
          description: descriptiondelareclamation,
        }),
      });

      if (response.ok) {
        alert('Réclamation soumise avec succès !');
        setNom('');
        setEmail('');
        setTelephone('');
        setLocalisation('');
        setDatedeReclamation('');
        setIdentite('');
        setDescriptiondelaReclamation('');
      } else {
        setErrorMessage("Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#003865] to-[#FF8C00] flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl animate__animated animate__fadeInUp">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#003865]">Soumettre une réclamation</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-[#003865]">Nom</label>
            <input
              type="text"
              className="w-full border border-[#003865] rounded-lg p-3"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#003865]">Email</label>
            <input
              type="email"
              className="w-full border border-[#003865] rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#003865]">Téléphone</label>
            <input
              type="text"
              className="w-full border border-[#003865] rounded-lg p-3"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#003865]">Localisation</label>
            <input
              type="text"
              className="w-full border border-[#003865] rounded-lg p-3"
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#003865]">Date de la réclamation</label>
            <input
              type="date"
              className="w-full border border-[#003865] rounded-lg p-3"
              value={datedereclamation}
              onChange={(e) => setDatedeReclamation(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#003865]">Numéro de carte nationale ou passeport</label>
            <input
              type="text"
              className="w-full border border-[#003865] rounded-lg p-3"
              value={identite}
              onChange={(e) => setIdentite(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-[#003865]">Description de la réclamation</label>
            <textarea
              className="w-full border border-[#003865] rounded-lg p-3"
              value={descriptiondelareclamation}
              onChange={(e) => setDescriptiondelaReclamation(e.target.value)}
              required
            ></textarea>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#003865] text-white py-3 rounded-lg hover:bg-[#FF8C00] transition duration-300 font-semibold"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Soumettre la réclamation'}
          </button>
        </form>
      </div>
    </div>
  );
}
