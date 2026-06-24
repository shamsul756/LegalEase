"use client";

import DashboardHeading from "@/components/DashboardHeading";
import DashHeader from "@/components/DashHeader";
import { useSession } from "@/lib/auth-client";
import { Card, CardHeader, Button } from "@heroui/react";
import { useEffect, useState } from "react";

const HiringHistory = () => {
    const { data: session } = useSession();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHiringHistory = async () => {
            try {
                // ব্যাকএন্ড থেকে সেশন ইউজারের ইমেইল অনুযায়ী ডেটা আনার লজিক
                // const res = await fetch(`/api/hiring?email=${session?.user?.email}`);
                // const data = await res.json();
                // setHistory(data);

                // অ্যাসাইনমেন্ট রিকোয়ারমেন্ট ও চ্যালেঞ্জ অনুযায়ী মক ডাটা (Mock Data):
                const mockData = [
                    {
                        _id: "1",
                        lawyerName: "Adv. John Doe",
                        specialization: "Criminal Law", // যোগ করা হয়েছে
                        hiringDate: "2026-06-15",
                        consultationFee: 150.00,
                        status: "accepted", // রিকোয়ারমেন্ট অনুযায়ী ভ্যালু
                        paymentStatus: "unpaid" // পেমেন্ট ট্র্যাকিংয়ের জন্য
                    },
                    {
                        _id: "2",
                        lawyerName: "Adv. Sarah Khan",
                        specialization: "Corporate Law", // যোগ করা হয়েছে
                        hiringDate: "2026-06-20",
                        consultationFee: 200.00,
                        status: "pending", // রিকোয়ারমেন্ট অনুযায়ী ভ্যালু
                        paymentStatus: "unpaid"
                    },
                    {
                        _id: "3",
                        lawyerName: "Adv. John Doe",
                        specialization: "Family Law", // যোগ করা হয়েছে
                        hiringDate: "2026-06-22",
                        consultationFee: 150.00,
                        status: "accepted", 
                        paymentStatus: "paid" // অলরেডি পেইড কেস
                    }
                ];
                setHistory(mockData);
            } catch (error) {
                console.error("Error fetching hiring history:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.email) {
            fetchHiringHistory();
        }
    }, [session]);

    // রিকোয়ারমেন্ট স্ট্যাটাস অনুযায়ী স্টাইল হেল্পার
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "rejected":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "pending":
            default:
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
        }
    };

    // পেমেন্ট হ্যান্ডলার (এখানে পরবর্তীতে Stripe ট্রিলিগেশন বসাবেন)
    const handlePayment = (id) => {
        alert(`Redirecting to Stripe for payment of record ID: ${id}`);
        // পেমেন্ট সফল হওয়ার পর স্টেট আপডেট করার ডামি লজিক:
        setHistory(prev => prev.map(item => item._id === id ? { ...item, paymentStatus: 'paid' } : item));
    };

    return (
        <div>
            <DashHeader
                title="Hiring History" 
                description="View and track all your previous legal consultations and hiring records."
            />
            
            <div className="mt-6 max-w-5xl">
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl" radius="lg">
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">Records Table</h3>
                        <p className="text-slate-400 text-xs">A detailed log of legal service requests and transitions.</p>
                    </CardHeader>
                    
                    <div className="p-6 overflow-x-auto">
                        {loading ? (
                            <p className="text-slate-400 text-sm">Loading history...</p>
                        ) : history.length === 0 ? (
                            <p className="text-slate-400 text-sm">No hiring records found.</p>
                        ) : (
                            <table className="w-full text-left border-collapse text-sm text-slate-300">
                                <thead>
                                    <tr className="border-b border-white/10 text-slate-400 uppercase text-xs tracking-wider">
                                        <th className="pb-3 pl-2">Lawyer</th>
                                        <th className="pb-3">Specialization</th> {/* কলাম যোগ করা হয়েছে */}
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Fee</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3 pr-2 text-right">Action / Payment</th> {/* চ্যালেঞ্জ ৪ */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {history.map((record) => (
                                        <tr key={record._id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 pl-2 font-semibold text-white">{record.lawyerName}</td>
                                            <td className="py-4 text-slate-400">{record.specialization}</td>
                                            <td className="py-4">{record.hiringDate}</td>
                                            <td className="py-4 text-emerald-400 font-medium">${record.consultationFee.toFixed(2)}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusStyle(record.status)}`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-2 text-right">
                                                {/* চ্যালেঞ্জ ৪ রিকোয়ারমেন্ট লজিক */}
                                                {record.status === "accepted" ? (
                                                    record.paymentStatus === "paid" ? (
                                                        <Button size="sm" className="bg-emerald-600 text-white font-medium" disabled>
                                                            Paid
                                                        </Button>
                                                    ) : (
                                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium" onClick={() => handlePayment(record._id)}>
                                                            Pay
                                                        </Button>
                                                    )
                                                ) : (
                                                    <span className="text-xs text-slate-500 italic">Awaiting Acceptance</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default HiringHistory;