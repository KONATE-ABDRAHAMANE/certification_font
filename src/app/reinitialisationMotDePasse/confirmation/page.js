"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ConfirmerReinitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const emailFromUrl = searchParams.get("email") || "";

  const [form, setForm] = useState({ email: "", code: "", password: "" });

  useEffect(() => {
    setForm((prev) => ({ ...prev, email: emailFromUrl }));
  }, [emailFromUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/utilisateur/confirmer-reinitialisation`, form);
      toast.success("Mot de passe modifié !");
      router.push("/login");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Erreur réseau ou serveur");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-green-600">
          Confirmation du code
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Votre email"
            className="w-full border p-3 rounded bg-gray-200 cursor-not-allowed"
            value={form.email}
            readOnly
            required
          />
          <input
            name="code"
            type="text"
            placeholder="Code reçu"
            className="w-full border p-3 rounded"
            value={form.code}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Nouveau mot de passe"
            className="w-full border p-3 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
          >
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
}
