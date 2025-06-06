"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProduitsPage() {
  const [produits, setProduits] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/produits")
      .then((res) => res.json())
      .then((data) => setProduits(data))
      .catch(console.error);
  }, []);

  const ajouterAuPanier = async (produit) => {
    setLoading(true);
    try {
      await fetch("http://localhost:8000/api/panier/ajout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produitId: produit.id, quantite: 1 }),
      });
      alert(`Produit \"${produit.nomProduit}\" ajouté au panier !`);
    } catch (e) {
      alert("Erreur lors de l'ajout au panier");
    }
    setLoading(false);
  };

  const formatPrix = (valeur) => {
    const num = Number(valeur);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <main className="min-h-screen bg-yellow-50">
      <h1 className="text-4xl font-extrabold text-center my-10 text-green-700">
        Nos Produits
      </h1>

      <div className="max-w-7xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produits.map((produit) => {
          const onPromo =
            produit.prixReduction &&
            Number(produit.prixReduction) < Number(produit.prix);

          return (
            <motion.div
              layout
              key={produit.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 overflow-hidden cursor-pointer border border-green-100"
              onClick={() => {
                setSelectedProduit(produit);
                setSelectedImageIndex(0);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="h-52 w-full overflow-hidden">
                {produit.images?.[0] ? (
                  <img
                    src={produit.images[0]}
                    alt={produit.nomProduit}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                    Pas d’image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate text-gray-900">
                  {produit.nomProduit}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  {onPromo ? (
                    <>
                      <span className="line-through text-sm text-red-500">
                        {formatPrix(produit.prix)} €
                      </span>
                      <span className="text-green-600 font-bold text-lg">
                        {formatPrix(produit.prixReduction)} €
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-900 font-bold text-lg">
                      {formatPrix(produit.prix)} €
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProduit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl"
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500"
                onClick={() => setSelectedProduit(null)}
              >
                &times;
              </button>

              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="md:w-1/2">
                  <div className="border rounded overflow-hidden mb-4 bg-gray-100">
                    {selectedProduit.images?.[selectedImageIndex] ? (
                      <img
                        src={selectedProduit.images[selectedImageIndex]}
                        alt={`Produit ${selectedImageIndex + 1}`}
                        className="w-full h-80 object-contain"
                      />
                    ) : (
                      <div className="h-80 flex items-center justify-center bg-gray-200 text-gray-500">
                        Pas d’image
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProduit.images?.map((img, idx) => (
                      <button
                        key={idx}
                        className={`w-16 h-16 rounded border overflow-hidden ${
                          idx === selectedImageIndex
                            ? "border-green-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <img
                          src={img}
                          alt={`Miniature ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-green-700 mb-2">
                      {selectedProduit.nomProduit}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {selectedProduit.description || "Pas de description"}
                    </p>
                    <div className="flex gap-4 items-center mb-6 text-xl">
                      {selectedProduit.prixReduction &&
                      Number(selectedProduit.prixReduction) <
                        Number(selectedProduit.prix) ? (
                        <>
                          <span className="line-through text-red-500">
                            {formatPrix(selectedProduit.prix)} €
                          </span>
                          <span className="text-green-600 font-extrabold text-3xl">
                            {formatPrix(selectedProduit.prixReduction)} €
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-900 font-extrabold text-3xl">
                          {formatPrix(selectedProduit.prix)} €
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => ajouterAuPanier(selectedProduit)}
                    disabled={loading}
                    className="mt-auto bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {loading ? "Ajout en cours..." : "Ajouter au panier"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
