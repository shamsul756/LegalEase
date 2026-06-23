"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { useSession } from "@/lib/auth-client";
import { Card, CardHeader } from "@heroui/react";
import { useEffect, useState } from "react";

const HiringHistory = () => {
    const { data: session } = useSession();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHiringHistory = async () => {
            try {
                // ব্যাকএন্ড থেকে সেশন ইউজারের ইমেইল অনুযায়ী ডেটা আনার লজিক
                // const res = await fetch(`/api/hiring?email=${session?.user?.email}`);
                // const data = await res.json();
                // setHistory(data);

                // অ্যাসাইনমেন্ট চেক করার জন্য ডামি ডেটা (Mock Data):
                const mockData = [
                    {
                        _id: "1",
                        lawyerName: "Adv. John Doe",
                        clientEmail: "client1@gmail.com",
                        hiringDate: "2026-06-15",
                        consultationFee: 150.00,
                        status: "Completed"
                    },
                    {
                        _id: "2",
                        lawyerName: "Adv. Sarah Khan",
                        clientEmail: "client2@yahoo.com",
                        hiringDate: "2026-06-20",
                        consultationFee: 200.00,
                        status: "Pending"
                    },
                    {
                        _id: "3",
                        lawyerName: "Adv. John Doe",
                        clientEmail: "client3@gmail.com",
                        hiringDate: "2026-06-22",
                        consultationFee: 150.00,
                        status: "Approved"
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

    // স্ট্যাটাস কালার ঠিক করার হেল্পার ফাংশন
    const getStatusStyle = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Approved":
                return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
            default:
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
        }
    };

    return (
        <div>
            <DashboardHeading 
                title="Hiring History" 
                description="View and track all your previous legal consultations and hiring records."
            />
            
            <div className="mt-6 max-w-4xl">
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
                                        <th className="pb-3">Client Email</th>
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Fee</th>
                                        <th className="pb-3 pr-2 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {history.map((record) => (
                                        <tr key={record._id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 pl-2 font-semibold text-white">{record.lawyerName}</td>
                                            <td className="py-4 text-slate-400">{record.clientEmail}</td>
                                            <td className="py-4">{record.hiringDate}</td>
                                            <td className="py-4 text-emerald-400 font-medium">${record.consultationFee.toFixed(2)}</td>
                                            <td className="py-4 pr-2 text-right">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(record.status)}`}>
                                                    {record.status}
                                                </span>
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