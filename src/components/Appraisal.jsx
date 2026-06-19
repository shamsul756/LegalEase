"use client";

import Image from "next/image";

export default function Appraisals() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6 w-full">

     
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Testimonial 1 */}
        <div className="bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 p-8 rounded-2xl space-y-6 hover:-translate-y-1">

          <p className="text-slate-300 italic leading-relaxed">
            "LegalEase helped me find a highly experienced lawyer for my property dispute.
            The consultation was smooth, professional, and I finally got a fair resolution
            after months of stress."
          </p>

          <div className="flex items-center gap-4">

            <Image
              width={48}
              height={48}
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
              className="rounded-full h-12 w-12 object-cover"
              alt="client image"
            />

            <div>
              <h4 className="text-white font-bold text-sm">
                Jonathan Miller
              </h4>
              <p className="text-blue-400 text-xs font-semibold">
                Property Case Client
              </p>
            </div>

          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-300 p-8 rounded-2xl space-y-6 hover:-translate-y-1">

          <p className="text-slate-300 italic leading-relaxed">
            "I needed urgent legal advice for my startup agreement.
            The lawyer I found on LegalEase was extremely knowledgeable and
            helped me avoid costly mistakes."
          </p>

          <div className="flex items-center gap-4">

            <Image
              width={48}
              height={48}
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80"
              className="rounded-full h-12 w-12 object-cover"
              alt="client image"
            />

            <div>
              <h4 className="text-white font-bold text-sm">
                Emily Carter
              </h4>
              <p className="text-indigo-400 text-xs font-semibold">
                Startup Founder
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}