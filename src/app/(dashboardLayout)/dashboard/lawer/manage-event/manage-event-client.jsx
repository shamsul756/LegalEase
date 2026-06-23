"use client";

import DeleteEventModal from "@/components/DeleteLawerModal";
import EditLawyerModal from "@/components/EditLawerModal";

import { Button, Card, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// 🎯 আর্গুমেন্টে { records = [] } রিসিভ করা হলো
const ManageLegalRecordsClient = ({ records = [] }) => {
    const [deletedId, setDeletedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <div>
            <div className="mt-6">
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
                    <div className="p-0 overflow-x-auto">

                        {/* 🛠️ <TableContent> বাদ দেওয়া হয়েছে */}
                        <Table aria-label="Manage Legal Records Table">
                            <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                                <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">CLIENT / CASE</TableColumn>
                                <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">CATEGORY</TableColumn>
                                <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">APPOINTMENT DATE</TableColumn>
                                <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">CONSULTATION FEE</TableColumn>
                                <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">STATUS</TableColumn>
                                <TableColumn className="text-slate-400 font-extrabold uppercase text-[11px] tracking-wider">ACTIONS</TableColumn>
                            </TableHeader>
                            
                            <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No legal appointments or records found.</p>}>
                                {records?.map((item) => (
                                    <TableRow key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150">
                                        <TableCell className="py-4 px-6 font-bold text-white">
                                            <span className="line-clamp-1 truncate max-w-[150px]">{item.clientName || item.title}</span>
                                        </TableCell>
                                        <TableCell className="text-slate-300 font-medium">{item.category}</TableCell>
                                        <TableCell className="text-slate-300 font-medium">{item.date}</TableCell>
                                        <TableCell className="font-semibold text-green-400">
                                            ${item.price?.toFixed(2) || item.fee?.toFixed(2) || "0.00"}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                size="sm"
                                                className={`font-bold uppercase text-[10px] ${
                                                    item.status === "approved" || item.status === "completed"
                                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                        : item.status === "rejected" || item.status === "cancelled"
                                                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                }`}
                                            >
                                                {item.status || "pending"}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button isIconOnly size="sm" radius="full" className="bg-indigo-500/10 text-indigo-400" onPress={() => { setEditingRecord({ ...item }); setIsModalOpen(true); }}>
                                                    <FaEdit size={12} />
                                                </Button>
                                                <Button isIconOnly size="sm" radius="full" className="bg-red-500/10 text-red-400" onPress={() => { setDeletedId(item._id); setIsDeleteOpen(true); }}>
                                                    <FaTrash size={12} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </Card>
            </div>

            <EditLawyerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editingEvent={editingRecord} />
            <DeleteEventModal isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} id={deletedId} />
        </div>
    );
};

export default ManageLegalRecordsClient;