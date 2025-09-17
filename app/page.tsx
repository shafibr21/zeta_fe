"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-950 relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating sparkles */}
        <motion.div
          className="sparkle absolute top-10 right-10 h-6 w-6 text-purple-400/50"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <Sparkles />
        </motion.div>
        <motion.div
          className="sparkle absolute top-32 left-16 h-4 w-4 text-blue-400/50"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <Star />
        </motion.div>

        <motion.div
          className="sparkle absolute bottom-20 left-20 h-5 w-5 text-yellow-400/50"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <Zap />
        </motion.div>

        <motion.div
          className="sparkle absolute bottom-32 right-32 h-6 w-6 text-pink-400/50"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        >
          <Sparkles />
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent leading-tight">
            Zetabyte FE
            <span className="block text-4xl md:text-6xl mt-4 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Experience the future of user management with stunning animations,
            real-time data, and beautiful modern design.
          </p>

          <div className="flex justify-center mt-8">
            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group">
                Launch Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
