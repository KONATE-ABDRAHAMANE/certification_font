"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DemandeReinitialisationPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(API_URL+"/utilisateur/demande-reinitialisation", { email });

      // Redirection avec l’email encodé dans l’URL
      router.push(`/reinitialisationMotDePasse/confirmation?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la demande");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center text-green-600">Réinitialisation du mot de passe</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Entrez votre email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full">
            Envoyer le code
          </button>
        </form>
      </div>
    </div>
  );
}
