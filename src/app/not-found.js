"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-fuchsia-500 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 text-7xl font-black tracking-tight text-white"
        >
          404
        </motion.div>

        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-105 hover:bg-cyan-200"
          >
            Go Home
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Back to Start
          </Link>
        </div>
      </motion.div>
    </div>
  );
}