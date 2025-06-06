"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdminProduitsPage() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/produits`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des produits");
        return res.json();
      })
      .then((data) => setProduits(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [API_URL]);

  const formatPrix = (prix) => {
    return typeof prix === "number" ? prix.toFixed(2) + " €" : "Prix non défini";
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 tracking-wide select-none text-center sm:text-left break-words max-w-full sm:max-w-none">
          Gestion des Produits
        </h1>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/admin/produits/ajouter"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-transform font-semibold select-none text-center
              w-4/5 max-w-xs mx-auto sm:w-auto sm:mx-0 block"
          >
            Ajouter un produit
          </Link>
        </motion.div>
      </header>

      {loading ? (
        <p className="text-gray-600 text-center">Chargement...</p>
      ) : (
        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {produits.map((produit) => (
            <motion.div
              key={produit.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden border border-yellow-100"
              onClick={() => router.push(`/admin/produits/${produit.id}`)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {produit.images?.length > 0 ? (
                  <Image
                    src={produit.images[0]}
                    alt={produit.nomProduit}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Image Manquante
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-yellow-400 mb-1 truncate text-center">
                  {produit.nomProduit || "Produit sans nom"}
                </h2>
                <div className="text-sm text-gray-600 mb-2 truncate text-center">
                  Stock : {produit.stock ?? "N/A"}
                </div>
                <div className="text-md font-semibold text-center">
                  {typeof produit.prixReduction === "number" &&
                  produit.prixReduction < produit.prix ? (
                    <>
                      <span className="line-through text-red-600 mr-2">
                        {formatPrix(produit.prix)}
                      </span>
                      <span className="text-green-600">
                        {formatPrix(produit.prixReduction)}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-800">{formatPrix(produit.prix)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
