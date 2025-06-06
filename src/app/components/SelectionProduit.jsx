"use client";
import { useEffect, useState } from "react";
import ListeProduits from "./ListeProduits"

export default function SelectionProduit({ endpoint, limit }) {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    if (!endpoint) return; // protection si endpoint absent

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProduits(limit ? data.slice(0, limit) : data);
        } else {
          console.error("Données reçues ne sont pas un tableau", data);
          setProduits([]);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
        setProduits([]);
      });
  }, [endpoint, limit]);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {produits.length > 0 ? (
        produits.map((produit) => (
          <ListeProduits
            key={produit.id}
            produit={produit}
            onClick={() => console.log(`Clicked ${produit.nomProduit}`)}
          />
        ))
      ) : (
        <p>Aucun produit disponible</p>
      )}
    </div>
  );
}
