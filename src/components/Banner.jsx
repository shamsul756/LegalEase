"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import {
Scale,
Landmark,
FileText,
ShieldCheck,
Gavel,
Briefcase,
ArrowRight,
Users,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function Banner() {
return (
<Swiper
pagination={{ clickable: true }}
autoplay={{
delay: 5000,
disableOnInteraction: false,
}}
modules={[Pagination, Autoplay]}
className="w-full"
>
{/* ========================= */}
{/* SLIDE 1 */}
{/* ========================= */}

<SwiperSlide>
    <section className="relative min-h-[90vh] bg-slate-900 overflow-hidden">

      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 min-h-[90vh] flex items-center">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 mb-6">
              <Briefcase size={18} />
              Professional Legal Services
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white">
              Expert Legal Solutions
              <span className="block text-blue-400">
                For Every Case
              </span>
            </h2>

            <p className="mt-6 text-slate-300 text-lg">
              Family law, corporate matters, criminal defense,
              property disputes, immigration, and business compliance
              handled by experienced professionals.
            </p>

            <Link
              href="/lawyers"
              className="inline-flex mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-semibold"
            >
              Explore Lawyers
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <Scale className="text-blue-400 w-10 h-10" />
              <h3 className="text-white font-bold mt-4">
                1200+
              </h3>
              <p className="text-slate-400">
                Cases Resolved
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <FileText className="text-green-400 w-10 h-10" />
              <h3 className="text-white font-bold mt-4">
                300+
              </h3>
              <p className="text-slate-400">
                Legal Experts
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <Landmark className="text-indigo-400 w-10 h-10" />
              <h3 className="text-white font-bold mt-4">
                50+
              </h3>
              <p className="text-slate-400">
                Practice Areas
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <ShieldCheck className="text-yellow-400 w-10 h-10" />
              <h3 className="text-white font-bold mt-4">
                95%
              </h3>
              <p className="text-slate-400">
                Client Satisfaction
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  </SwiperSlide>
 

  {/* ========================= */}
  {/* SLIDE 2 */}
  {/* ========================= */}

<SwiperSlide>
  <section className="relative min-h-[90vh] bg-slate-950 overflow-hidden">

    {/* GLOW BACKGROUNDS */}
    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 blur-[140px] rounded-full" />
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 blur-[140px] rounded-full" />

    {/* BACKGROUND IMAGE */}
    <div className="absolute inset-0">
      <Image
        src="/pic2.jpg"
        alt="banner photo"
        fill
        className="object-cover"
        priority
      />
    </div>

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/90" />

    {/* CONTENT */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[90vh] flex items-center">

      <div className="max-w-3xl">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 mb-6">
          <Scale size={18} />
          Trusted Legal Platform
        </div>

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          Trusted Legal Advice
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            Anytime, Anywhere
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg text-slate-300 max-w-xl">
          Connect with experienced lawyers, schedule consultations,
          and get expert legal guidance for personal, business,
          property, and corporate matters.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            href="/lawyers"
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-semibold flex items-center gap-2 transition"
          >
            Find a Lawyer
            <ArrowRight className="group-hover:translate-x-1 transition" />
          </Link>

          <Link
            href="/consultation"
            className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-xl rounded-2xl text-white hover:bg-white/10 transition"
          >
            Book Consultation
          </Link>

        </div>

        {/* STATS */}
        <div className="flex flex-wrap gap-10 mt-12">

          <div>
            <h3 className="text-3xl font-bold text-white">500+</h3>
            <p className="text-slate-400">Verified Lawyers</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">10K+</h3>
            <p className="text-slate-400">Clients Served</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">98%</h3>
            <p className="text-slate-400">Success Rate</p>
          </div>

        </div>

      </div>
    </div>

  </section>
</SwiperSlide>

  {/* ========================= */}
  {/* SLIDE 3 */}
  {/* ========================= */}

<SwiperSlide>
  <section className="relative min-h-[90vh] bg-slate-950 overflow-hidden">

    {/* BACKGROUND IMAGE */}
    <div className="absolute inset-0">
      <Image
        src="/pic3.jpg"
        alt="banner image"
        fill
        className="object-cover"
        priority
      />
    </div>

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-slate-950/60 to-indigo-950/70" />

    {/* CONTENT */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[90vh] flex items-center justify-center">

      <div className="text-center max-w-4xl">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 mb-6">
          <Gavel size={18} />
          LegalEase Marketplace
        </div>

        {/* TITLE */}
        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
          Get Legal Help
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            When You Need It Most
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg text-slate-300">
          Search lawyers by specialization, location, and experience.
          Book consultations instantly and receive trusted legal support.
        </p>

        {/* SEARCH BOX */}
        <div className="mt-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 max-w-4xl mx-auto">

          <div className="grid md:grid-cols-3 gap-3">

            <input
              type="text"
              placeholder="Family Law, Corporate Law..."
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
            />

            <input
              type="text"
              placeholder="Location"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
            />

            <button className="bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-semibold transition">
              Find Lawyer
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="flex justify-center gap-10 mt-10 flex-wrap">

          <div>
            <h3 className="text-3xl font-bold text-white">500+</h3>
            <p className="text-slate-400">Verified Lawyers</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">50+</h3>
            <p className="text-slate-400">Practice Areas</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">24/7</h3>
            <p className="text-slate-400">Legal Support</p>
          </div>

        </div>

      </div>
    </div>

  </section>
</SwiperSlide>

</Swiper>

)
}
