"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);

    const decoded = jwtDecode(token);
    console.log(decoded);
    const { roles, email: userEmail, id } = decoded;

    // Stockage de l'ID et de l'email du client
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_email', userEmail);

    if (roles.includes('ROLE_ADMIN')) router.push('/dashboard/admin');
    else if (roles.includes('ROLE_LIVREUR')) router.push('/dashboard/livreur');
    else router.push('/dashboard/client');
  } catch (err) {
    setError('Identifiants incorrects');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-yellow-300 to-green-500 animate-gradient-x px-4">
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
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-green-600 text-center">Connexion</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-semibold transition duration-300"
        >
          Se connecter
        </button>
        <div className="text-sm text-center text-gray-600 space-y-1">
          <p>
            Mot de passe oublié ?{' '}
            <Link href="/reinitialisationMotDePasse/demande" className="text-yellow-600 hover:underline">
              Réinitialiser
            </Link>
          </p>
          <p>
            Pas encore de compte ?{' '}
            <Link href="/clients/register" className="text-yellow-600 hover:underline">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}

