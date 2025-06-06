"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/app/assets/logo.webp";

export default function ImageGlissante() {
  const [produitsPromo, setProduitsPromo] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8000/api/produits")
      .then((res) => res.json())
      .then((data) => {
        const promos = data.filter(
          (p) => p.prixReduction && Number(p.prixReduction) < Number(p.prix)
        );
        setProduitsPromo(promos);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % produitsPromo.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [produitsPromo]);

  if (produitsPromo.length === 0) return null;

  const produit = produitsPromo[index];

  return (
    <div className="relative h-[400px] w-full overflow-hidden bg-yellow-100 shadow-md rounded-lg">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={produit.id}
          className="absolute inset-0"
          initial={{ x: direction > 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Image optimisée */}
          <Image
            src={produit.images?.[0] || logo}
            alt={produit.nomProduit}
            fill
            priority
            sizes="100vw"
            className="object-cover w-full h-full"
          />

          {/* Badge promo stylisé */}
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 text-sm font-bold rotate-[-6deg] shadow-lg rounded-md">
            {produit.promotion?.titre || "PROMO"}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

