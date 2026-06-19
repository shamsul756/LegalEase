import Image from "next/image";

const ExtraSection = () => {
  return (
    <section className="relative py-2 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background glows for high energy */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent px-3 py-1 rounded-full bg-white/5 border border-white/10">
          Why LegalEase
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-cyan-900 tracking-tight mt-4">
          Built on Trust &{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Professionalism
          </span>
        </h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          LegalEase ensures a secure, transparent, and professional environment
          where clients and lawyers connect seamlessly.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Card 1 */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <div className="relative h-64 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 opacity-60" />
            <Image
              src="/pic1.jpg"
              alt="Legal consultation"
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
            />
          </div>
          <div className="p-6 relative">
            <h3 className="text-white text-xl font-bold group-hover:text-blue-400 transition-colors duration-300">
              Expert Legal Consultation
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Connect with verified lawyers for personal and business legal guidance.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
              Learn more <span className="ml-1">→</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <div className="relative h-64 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 opacity-60" />
            <Image
              src="/pic2.jpg"
              alt="Legal documentation"
              fill
              className="object-cover group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700"
            />
          </div>
          <div className="p-6 relative">
            <h3 className="text-white text-xl font-bold group-hover:text-indigo-400 transition-colors duration-300">
              Secure Legal Documentation
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Manage and review legal documents with complete confidentiality.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
              Learn more <span className="ml-1">→</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <div className="relative h-64 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10 opacity-60" />
            <Image
              src="/pic3.jpg"
              alt="Court and justice system"
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
            />
          </div>
          <div className="p-6 relative">
            <h3 className="text-white text-xl font-bold group-hover:text-purple-400 transition-colors duration-300">
              Justice & Case Handling
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Track legal cases and get professional representation easily.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
              Learn more <span className="ml-1">→</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExtraSection;