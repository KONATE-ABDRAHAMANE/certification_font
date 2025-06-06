"use client";
import { motion } from "framer-motion";

export default function ProduitCard({ produit, onClick }) {
  const onPromo = produit.prixReduction && Number(produit.prixReduction) < Number(produit.prix);

  const formatPrix = (valeur) => {
    const num = Number(valeur);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer bg-white border border-green-100 rounded-xl shadow hover:shadow-lg transition-transform overflow-hidden"
    >
      <div className="h-52 w-full bg-gray-200">
        {produit.images?.[0] ? (
          <img
            src={produit.images[0]}
            alt={produit.nomProduit}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Pas d’image</div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate text-gray-900">{produit.nomProduit}</h2>
        <div className="mt-2 flex items-center gap-2">
          {onPromo ? (
            <>
              <span className="line-through text-sm text-red-500">{formatPrix(produit.prix)} €</span>
              <span className="text-green-600 font-bold text-lg">{formatPrix(produit.prixReduction)} €</span>
            </>
          ) : (
            <span className="text-gray-900 font-bold text-lg">{formatPrix(produit.prix)} €</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}




