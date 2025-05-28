import { useState } from 'react';

const ReclamationCard = ({ rec, onStatusChange }) => {
  const [reponse, setReponse] = useState('');

  const handleReponseChange = (e) => {
    setReponse(e.target.value);
  };

  return (
    <div className="border p-4 rounded mb-4 bg-white shadow-md">
      <h3 className="font-semibold">{rec.nom}</h3>
      <p><strong>Description :</strong> {rec.description}</p>
      <p><strong>Email :</strong> {rec.email}</p>
      <p><strong>Statut :</strong> {rec.statut}</p>

      <textarea
        placeholder="Réponse..."
        value={reponse}
        onChange={handleReponseChange}
        className="w-full p-2 border mb-2"
      />

      <button
        onClick={() => onStatusChange(rec._id, 'Réglée', reponse)}
        className="bg-green-500 text-white p-2 rounded"
      >
        Marquer comme réglée et répondre
      </button>
    </div>
  );
};

export default ReclamationCard;
