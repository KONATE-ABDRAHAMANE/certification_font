"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ClientRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    nom: "",
    prenom: "",
    telephone: "",
    password: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await axios.post(API_URL + "/client", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess("Compte créé avec succès ! Redirection...");
      setFormData({
        email: "",
        nom: "",
        prenom: "",
        telephone: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-yellow-300 to-green-500 animate-gradient-x px-4">
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 300% 300%;
          animation: gradient-x 12s ease infinite;
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-4 animate-fade-in"
      >
        <h2 className="text-center text-2xl font-bold text-green-600">
          Créer un compte client
        </h2>

        <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} />
        <Input name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} />
        <Input name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} />
        <Input name="password" type="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-semibold text-black transition duration-300 ${
            loading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {loading ? "Création en cours..." : "Créer le compte"}
        </button>

        <p className="text-center text-sm mt-4">
          <a href="/login" className="text-green-600 hover:underline">
            Déjà un compte ? Connectez-vous
          </a>
        </p>
      </form>
    </main>
  );
}

function Input({ name, type = "text", placeholder, value, onChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
    />
  );
}
