import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reclamation from '@/models/Reclamation';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newReclamation = new Reclamation(data);
    await newReclamation.save();
    return NextResponse.json({ message: 'Réclamation enregistrée avec succès' });
  } catch (error) {
    console.error('Erreur POST:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}



export async function GET(req) {
  try {
    await connectDB();

    // Récupérer l'email depuis l'URL (ex: ?email=test@gmail.com)
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email requis" }, { status: 400 });
    }

    // Filtrer les réclamations par email
    const reclamations = await Reclamation.find({ email }).lean();

    return new Response(JSON.stringify(reclamations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Erreur GET:", error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
