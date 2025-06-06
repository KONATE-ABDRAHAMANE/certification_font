"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function ProduitDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/produits/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then(setProduit)
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger le produit.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const supprimerProduit = async () => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await fetch(`http://localhost:8000/api/produits/${id}`, {
        method: "DELETE",
      });
      router.push("/admin/produits");
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Une erreur est survenue.");
    }
  };

  if (loading) return <p className="text-center py-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!produit) return <p className="text-center text-gray-500">Produit introuvable.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-600 text-center mb-6 break-words">
          {produit.nomProduit}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative w-full h-64 bg-gray-100 rounded overflow-hidden">
            {produit.images && produit.images.length > 0 ? (
              <Image
                src={produit.images[0]}
                alt={produit.nomProduit}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Pas d&apos;image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-gray-700 mb-4">{produit.description}</p>
            <p className="mb-2 font-medium">Stock : {produit.stock}</p>
            <p className="text-lg font-bold">
              {produit.prixReduction && produit.prixReduction < produit.prix ? (
                <>
                  <span className="line-through text-red-500 mr-2">
                    {parseFloat(produit.prix).toFixed(2)} €
                  </span>
                  <span className="text-green-600">
                    {parseFloat(produit.prixReduction).toFixed(2)} €
                  </span>
                </>
              ) : (
                <span>{parseFloat(produit.prix).toFixed(2)} €</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push(`/admin/produits/modifier/${id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded text-sm"
          >
            Modifier
          </button>
          <button
            onClick={supprimerProduit}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
