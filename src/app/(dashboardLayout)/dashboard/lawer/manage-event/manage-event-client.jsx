"use client";

import { Button, Card, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const ManageLegalRecordsClient = ({ records: initialRecords = [] }) => {
    const [records, setRecords] = useState(initialRecords);

    // রিকোয়ারমেন্ট অনুযায়ী Accept/Reject হ্যান্ডলার লজিক
    const handleAction = async (id, action) => {
        try {
            // আপনার ব্যাকএন্ডে স্ট্যাটাস আপডেটের API কল করুন এখানে
            // await fetch(`/api/appointments/${id}`, { method: 'PATCH', body: JSON.stringify({ status: action }) });
            
            alert(`Hiring request ${action}ed successfully!`);
            
            // স্টেট আপডেট করা যেন সাথে সাথে UI-তে চেঞ্জ দেখা যায়
            setRecords(prev => 
                prev.map(item => item._id === id ? { ...item, status: action } : item)
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="mt-6">
            <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
                <div className="overflow-x-auto">
                    <Table aria-label="Lawyer Manage Hiring History Table">
                        <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                            <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">CLIENT NAME</TableColumn>
                            <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">REQUEST DATE</TableColumn>
                            <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">CONSULTATION FEE</TableColumn>
                            <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">STATUS</TableColumn>
                            <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider text-right">ACTIONS</TableColumn>
                        </TableHeader>
                        
                        <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No hiring requests found.</p>}>
                            {records?.map((item) => (
                                <TableRow key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150">
                                    <td className="py-4 px-6 font-bold text-white">
                                        {item.clientName || "Unknown Client"}
                                    </td>
                                    <td className="text-slate-300 font-medium">{item.date || item.requestDate}</td>
                                    <td className="font-semibold text-emerald-400">
                                        ${item.fee?.toFixed(2) || "0.00"}
                                    </td>
                                    <td>
                                        <Chip
                                            size="sm"
                                            className={`font-bold uppercase text-[10px] ${
                                                item.status === "accepted"
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : item.status === "rejected"
                                                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                            }`}
                                        >
                                            {item.status || "pending"}
                                        </Chip>
                                    </td>
                                    <td className="py-4 pr-2">
                                        <div className="flex gap-2 justify-end">
                                            {item.status === "pending" || !item.status ? (
                                                <>
                                                    <Button 
                                                        size="sm" 
                                                        className="bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-1"
                                                        onPress={() => handleAction(item._id, "accepted")}
                                                    >
                                                        <FaCheck size={10} /> Accept
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        className="bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1"
                                                        onPress={() => handleAction(item._id, "rejected")}
                                                    >
                                                        <FaTimes size={10} /> Reject
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-slate-500 italic font-medium capitalize">
                                                    Action Taken ({item.status})
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default ManageLegalRecordsClient;