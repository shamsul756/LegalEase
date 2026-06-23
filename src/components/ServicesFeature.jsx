"use client";

import { FaAward, FaShieldAlt, FaUsers, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "animate.css";
import "swiper/css";
import "swiper/css/pagination";
import { Card } from "@heroui/react";

const features = [
  {
    icon: <FaAward size={24} />,
    title: "Verified Legal Experts",
    description:
      "Every lawyer is carefully verified through strict credential checks, ensuring trusted and professional legal representation.",
  },
  {
    icon: <FaShieldAlt size={24} />,
    title: "Secure Legal Consultations",
    description:
      "End-to-end encrypted consultations and payment systems designed to protect client confidentiality and sensitive case data.",
  },
  {
    icon: <FaUsers size={24} />,
    title: "Client & Lawyer Dashboard",
    description:
      "Dedicated dashboards for managing cases, consultations, documents, and communication in a structured workflow.",
  },
];

export default function ServicesFeatures() {
  return (
    <section className="py-4 max-w-7xl mx-auto px-6 w-full relative">

  <div className="text-center mb-6 max-w-3xl mx-auto">

  {/* Subtitle */}
  <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold animate__animated animate__fadeInDown animate__faster">
    Why LegalEase
  </p>

  {/* Title */}
  <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight animate__animated animate__fadeInUp animate__fast">
    Trusted Legal Platform
    <span className="block text-blue-400 animate__animated animate__fadeInUp animate__delay-1s">
      Built for Clients & Lawyers
    </span>
  </h2>

  {/* Description */}
  <p className="text-slate-400 mt-6 text-sm md:text-base animate__animated animate__fadeInUp animate__delay-1s animate__faster">
    A secure and professional legal ecosystem connecting verified lawyers
    with clients for consultations, case handling, and legal guidance.
  </p>

</div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={25}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {features.map((item, index) => (
          <SwiperSlide key={index}>
            <Card className="bg-black border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-between hover:border-blue-500/40 transition duration-300">

              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                {item.description}
              </p>

              {/* Bottom Link */}
              <div className="mt-6 flex items-center gap-2 text-sm text-blue-400 font-medium cursor-pointer group">
                Learn More
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </div>

            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}