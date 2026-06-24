import DashHeader from "@/components/DashHeader";
import PremiumButton from "@/components/PremiumButton";
import { getUser } from "@/lib/api/session";
import { Card } from "@heroui/react";
import { FaCrown, FaBriefcase, FaHourglassHalf, FaDollarSign } from "react-icons/fa";

const LawyerOverviewPage = async () => {
    // ডামি স্ট্যাটাস ডাটা (পরবর্তীতে ডাটাবেজ থেকে আনবেন)
    const stats = {
        totalHires: 12,
        pendingRequests: 3,
        totalEarnings: 1500.00,
    };

    const user = await getUser();
    const isVerifiedLawyer = user?.isVerified; 

    return (
        <div className="space-y-6 mt-6">
            <DashHeader
                title="Overview"
                description="Welcome to your LegalEase Dashboard" 
            />
            
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Total Hires */}
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Client Hires</span>
                            <h2 className="text-3xl font-extrabold text-white">{stats.totalHires}</h2> {/* text-white করা হয়েছে */}
                        </div>
                        <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
                            <FaBriefcase size={24} />
                        </div>
                    </div>
                </Card>

                {/* Card 2: Pending Requests */}
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Requests</span>
                            <h2 className="text-3xl font-extrabold text-white">{stats.pendingRequests}</h2>
                        </div>
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
                            <FaHourglassHalf size={24} />
                        </div>
                    </div>
                </Card>

                {/* Card 3: Accumulated Earnings */}
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl" radius="lg">
                    <div className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Earnings</span>
                            <h2 className="text-3xl font-extrabold text-white">{`$${stats.totalEarnings.toFixed(2)}`}</h2>
                        </div>
                        <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
                            <FaDollarSign size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Verification Fee Alert Banner */}
            {!isVerifiedLawyer ? (
                <Card className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent relative overflow-hidden" radius="lg">
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FaCrown className="text-yellow-400" /> Complete Verification to Publish Profile
                            </h3>
                            <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                                Lawyers must pay a <strong className="text-yellow-400">one-time publishing fee</strong> to make their legal services visible to clients globally.
                            </p>
                        </div>
                        <div>
                            {/* প্রিমিয়াম বাটন কম্পোনেন্ট */}
                            <PremiumButton />
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className="border border-green-500/20 bg-gradient-to-r from-green-500/5 via-emerald-600/5 to-transparent relative overflow-hidden" radius="lg">
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FaCrown className="text-green-400" /> Verified Legal Expert
                            </h3>
                            <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                                Your profile is active and fully verified. Clients can now browse and hire your legal services!
                            </p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default LawyerOverviewPage;