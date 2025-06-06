"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaShoppingCart, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import logo from "@/app/assets/logo.webp";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Partie 1 */}
      <div className="grid grid-cols-6 md:grid-cols-3 items-center justify-between px-4 py-3 md:px-8 border-b border-yellow-100 md:col-span-1">
        {/* Logo */}
        <div className="flex items-center gap-2 col-span-2">
          <Image src={logo} alt="Logo" className="rounded-full" />
        </div>

        {/* Search (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center md:col-span-1 ">
          <div className="flex border border-green-500 rounded overflow-hidden w-full max-w-md">
            <input
              type="text"
              placeholder="Rechercher..."
              className="flex-1 p-2 outline-none"
            />
            <button className="bg-green-600 text-white p-2">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center justify-between gap-4 col-span-3 col-start-4 md:col-span-1 ">
          <Link href="/panier" className="text-green-600 text-xl">
            <FaShoppingCart />
          </Link>
          <Link href="/login" className="flex items-center text-green-600 gap-1 text-sm">
            <FaUserPlus />
            <span className>S'identifier</span>
          </Link>
          {/* Burger menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-green-600 text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Partie 2: Nav (desktop) */}
      <nav className="hidden md:flex justify-center bg-yellow-100 text-green-800 font-medium space-x-8 py-2">
        <Link href="/">Accueil</Link>
        <Link href="/produits">Produits</Link>
        <Link href="/offres">Offres</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 flex flex-col p-4 gap-6 animate-slideIn">
          <div className="flex justify-between items-center">
            <Image src={logo} alt="Logo" width={36} height={36} />
            <button onClick={() => setMenuOpen(false)} className="text-red-600 text-2xl">
              <FaTimes />
            </button>
          </div>

          {/* Search mobile */}
          <div className="flex border border-green-500 rounded overflow-hidden">
            <input type="text" placeholder="Rechercher..." className="flex-1 p-2 outline-none" />
            <button className="bg-green-600 text-white p-2">
              <FaSearch />
            </button>
          </div>

          {/* Links mobile */}
          <nav className="flex flex-col gap-4 text-green-700">
            <Link href="/">Accueil</Link>
            <Link href="/produits">Produits</Link>
            <Link href="/offres">Offres</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}

