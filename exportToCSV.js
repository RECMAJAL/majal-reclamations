// exportToCSV.js
const { MongoClient } = require("mongodb");
const { parse } = require("json2csv");
const fs = require("fs");

const uri = "mongodb+srv://ouriemchiaya:Hasnae2002aya@<cluster>.mongodb.net/reclamations_db";

async function exportToCSV() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("reclamations_db");
    const collection = db.collection("reclamations");

    const data = await collection.find().toArray();
    const csv = parse(data);

    fs.writeFileSync("reclamations.csv", csv);
    console.log("✅ Fichier CSV exporté avec succès !");
  } catch (err) {
    console.error("❌ Erreur:", err);
  } finally {
    await client.close();
  }
}

exportToCSV();
