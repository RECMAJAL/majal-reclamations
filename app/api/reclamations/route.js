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



export async function GET() {
  await connectDB();

  const reclamations = await Reclamation.find({}).lean();

  return new Response(JSON.stringify(reclamations), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}