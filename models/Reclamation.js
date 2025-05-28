import mongoose from 'mongoose';

const ReclamationSchema = new mongoose.Schema(
  {
    nom: String,
    email: String,
    telephone: String,
    description: String,
    statut: {
      type: String,
      default: 'En attente',
    },
  },
  { timestamps: true }
);

const Reclamation =
  mongoose.models.Reclamation || mongoose.model('Reclamation', ReclamationSchema);

export default Reclamation;
