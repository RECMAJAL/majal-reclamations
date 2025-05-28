'use client';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [langueOuverte, setLangueOuverte] = useState(false);
  const toggleLangue = () => setLangueOuverte(!langueOuverte);

  const [photoIndex, setPhotoIndex] = useState(0);
  const photoGroup = [
    ["/he.jpg", "/h.jpg"],
    ["/sc.jpeg", "/be.png"],
    ["/j.jpg", "/s.jpg"]
  ];

  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const interval = setInterval(() => {
      setPhotoIndex((prevIndex) => (prevIndex + 1) % photoGroup.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-[#003865] shadow-md relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-4 relative">
            <div className="flex flex-col items-center">
              <div className="animate-logo transition-all duration-300">
                <Image src="/majal.png" alt="Logo Majal Berkane" width={40} height={40} />
              </div>
              <div className="text-white text-sm">
                <span className="block text-center text-lg font-bold" data-aos="fade-up">Majal Berkane</span>
                <span className="block text-center text-sm font-normal text-white" data-aos="fade-down">Province Berkane</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 relative">
            <a href="/soumettre-reclamation" className="bg-transparent text-orange-500 px-4 py-2 text-sm rounded-full hover:bg-orange-500 hover:text-white transition font-semibold">Soumettre une réclamation</a>
            <a href="/suivre-reclamation" className="bg-transparent text-orange-500 px-4 py-2 text-sm rounded-full hover:bg-orange-500 hover:text-white transition font-semibold">Suivre ma réclamation</a>

            {/* Bouton Espace Admin */}
            <a
              href="/admin"
              className="bg-transparent text-orange-500 px-4 py-2 text-sm rounded-full hover:bg-orange-500 hover:text-white transition font-semibold flex items-center gap-2"
              title="Espace Administrateur"
            >
              🛠️ Espace Admin
            </a>

            <button
              onClick={toggleLangue}
              className="bg-transparent text-orange-500 px-4 py-2 text-sm rounded-full hover:bg-orange-500 hover:text-white transition font-semibold"
            >
              Langue
            </button>
            {langueOuverte && (
              <div className="absolute top-14 right-0 bg-white text-[#003865] border rounded-md shadow-md w-40 z-10">
                <button onClick={() => router.push('/fr')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">🇫🇷 Français</button>
                <button onClick={() => router.push('/ar')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">🇦🇪 Arabe</button>
                <button onClick={() => router.push('/en')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">🇬🇧 Anglais</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="py-24 px-4 bg-cover bg-center relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-orange-500 leading-tight" data-aos="fade-down">Plateforme de Gestion des Réclamations</h1>
          <p className="text-lg text-black mt-6" data-aos="fade-up">Bienvenue sur la plateforme officielle de Majal Berkane dédiée aux réclamations des citoyens.</p>
        </div>
      </header>

      {/* Description */}
      <section className="bg-white py-16 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-600" data-aos="fade-up">Chers citoyens de Berkane,</h2>
          <p className="text-lg text-gray-600 mt-6" data-aos="fade-up">Notre plateforme est l’espace dédié où chaque citoyen peut signaler, suivre et résoudre les problèmes urbains du quotidien : voirie, éclairage public, propreté, transports, et bien plus encore. Grâce au soutien de Majal Berkane, nous facilitons le dialogue entre habitants et services municipaux, pour des solutions rapides et transparentes.</p>
        </div>
      </section>

      {/* Actions */}
      <section className="bg-[#f5f7fa] py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-1/2 text-center">
            <h2 className="text-3xl font-bold text-[#003865]" data-aos="fade-up">Soumettre une réclamation</h2>
            <p className="text-lg text-gray-600 mt-6" data-aos="fade-up">Cliquez ci-dessous pour faire votre signalement.</p>
            <a href="/soumettre-reclamation" className="mt-10 inline-block bg-transparent text-orange-500 px-8 py-3 rounded-full hover:bg-orange-500 hover:text-white transition font-semibold">Commencez la démarche!</a>
          </div>

          <div className="w-full md:w-1/2 text-center">
            <h2 className="text-3xl font-bold text-[#003865]" data-aos="fade-up">Suivre ma réclamation</h2>
            <p className="text-lg text-gray-600 mt-6" data-aos="fade-up">Consultez le statut de vos demandes.</p>
            <a href="/suivre-reclamation" className="mt-10 inline-block bg-transparent text-orange-500 px-8 py-3 rounded-full hover:bg-orange-500 hover:text-white transition font-semibold">Suivre ma réclamation</a>
          </div>
        </div>
      </section>

      {/* Texte + Images */}
      <section className="bg-white py-16 px-6 text-center">
        <h3 className="text-2xl font-bold text-[#003865] mb-6" data-aos="zoom-in">Berkane construit sa smart city !</h3>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg mb-10" data-aos="fade-up" data-aos-delay="200">
          La ville modernise ses services urbains (transports, propreté, éclairage...) avec des outils technologiques pour plus d’efficacité. Avec Majal Berkane, chaque citoyen participe : signalez les problèmes en temps réel, suivez les solutions, et contribuez à une ville plus connectée, plus propre, et adaptée à vos besoins. L’avenir s’écrit ici, ensemble.
        </p>
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 transition-all duration-1000">
          {photoGroup[photoIndex].map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`Activité ${idx + 1}`}
              width={350}
              height={250}
              className="rounded-xl shadow-lg object-cover border-4 border-orange-500 w-full md:w-[45%] h-auto"
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003865] text-white text-center py-6 mt-20 text-sm">
        © {new Date().getFullYear()} Majal Berkane. Tous droits réservés.
      </footer>
    </div>
  );
}
