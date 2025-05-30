import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reclamation from '@/models/Reclamation';

export async function GET() {
  try {
    await connectDB();
    const reclamations = await Reclamation.find({}).lean();
    return NextResponse.json(reclamations);
  } catch (error) {
    console.error('Erreur GET admin:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
