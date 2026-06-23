import Link from "next/link";
import {
    Card,
    Button
} from "@heroui/react";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaBriefcase, FaEnvelope } from "react-icons/fa";
import { baseURL } from "@/lib/api/baseUrl";
import BookingWidget from "@/components/BookingWidget"; // এই উইজেটের ভেতরে টিকিট সিটের বদলে ফি এবং ডেট হ্যান্ডেল করবেন

// আইনজীবী বা আইনি সেবার সিঙ্গেল ডাটা ফেচ করার ফাংশন
const fetchLawyerDetails = async (id) => {
    const res = await fetch(`${baseURL}/api/lawyers/${id}`);
    const data = await res.json();
    return data;
}

export default async function LawyerDetailsPage({ params }) {
    const { id } = await params;
    const lawyer = await fetchLawyerDetails(id);

    return (
        <div className="min-h-screen py-16 px-6 max-w-6xl mx-auto w-full space-y-12">
            {/* Back Button */}
            <Link href="/lawyers">
                <Button
                    variant="light"
                    className="text-slate-400 hover:text-white"
                    startContent={<FaArrowLeft />}
                >
                    Back to Lawyers List
                </Button>
            </Link>

            {/* Profile Banner or Image Container */}
            <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <Image
                    src={lawyer?.image || lawyer?.banner} // আইনজীবীর ছবি বা কভার
                    alt={lawyer?.name || "Lawyer Profile"}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-1" />

                {/* আইনজীবীর প্র্যাকটিস ক্যাটাগরি (যেমন: Criminal, Corporate, Family Law) */}
                <span className="absolute top-6 left-6 bg-pink-500 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-pink-400/20 shadow-lg z-10">
                    {lawyer?.category || "Legal Expert"}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Lawyer Biography & Experience */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                            {lawyer?.name || lawyer?.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                                <FaBriefcase className="text-pink-500" />
                                <span>
                                    {lawyer?.experience || "5+"} Years Experience
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-pink-500" />
                                <span>
                                    {lawyer?.chamberLocation || lawyer?.location}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Professional Bio / Description */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Professional Summary</h2>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                            {lawyer?.description || "No biography provided. Please contact the lawyer's chamber for more comprehensive credentials."}
                        </p>
                    </div>

                    {/* Contact Email / Bar Info */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">
                            Official Communication:{" "}
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 text-xs font-semibold normal-case tracking-wider">
                                <FaEnvelope className="text-xs" /> {lawyer?.lawyerEmail || lawyer?.organizationEmail}
                            </span> 
                        </h2>
                    </div>
                </div>

                {/* Right Column: Appointment Booking Widget */}
                <div className="space-y-6">
                    {/* Booking Widget এ ইভেন্টের টিকিট প্রাইস ও সিটের বদলে ফি ও আইডি পাঠানো হচ্ছে */}
                    <BookingWidget 
                        ticketPrice={lawyer?.consultationFee || lawyer?.price} 
                        availableSeats={lawyer?.availableSlots || lawyer?.capacity} 
                        eventId={lawyer?._id} 
                        eventTitle={lawyer?.name || lawyer?.title} 
                    />
                </div>
            </div>
        </div>
    );
}