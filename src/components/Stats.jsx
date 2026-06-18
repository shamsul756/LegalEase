"use client";

import "animate.css";
import { Card } from "@heroui/react";

export default function Stats({ stats = {} }) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-transparent border-t border-white/5 w-full">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

        {/* Lawyers */}
        <Card className="space-y-3 p-8 bg-white/5 border border-white/10 rounded-2xl animate__animated animate__fadeInUp animate__faster hover:scale-105 transition-transform">
          <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text">
            {stats.totalLawyers ?? 0}+
          </span>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
            Verified Lawyers
          </p>
        </Card>

        {/* Clients */}
        <Card className="space-y-3 p-8 bg-white/5 border border-white/10 rounded-2xl animate__animated animate__fadeInUp animate__fast hover:scale-105 transition-transform">
          <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text">
            {(stats.totalClients ?? 0).toLocaleString()}+
          </span>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
            Happy Clients
          </p>
        </Card>

        {/* Cases */}
        <Card className="space-y-3 p-8 bg-white/5 border border-white/10 rounded-2xl animate__animated animate__fadeInUp animate__slow hover:scale-105 transition-transform">
          <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
            {stats.totalCases ?? 0}+
          </span>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider">
            Cases Resolved
          </p>
        </Card>

      </div>
    </section>
  );
}