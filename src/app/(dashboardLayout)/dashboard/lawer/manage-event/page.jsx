import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import DashHeader from "@/components/DashHeader";
import ManageLegalRecordsClient from "./manage-event-client";

const ManageLegalRecords = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    let records = [];
    try {
        // 🔗 আপনার ব্যাকএন্ড API রুট বা ফাংশনটি এখানে কল করুন 
        // উদাহরণ: (আপনার বেস ইউআরএল এনভায়রনমেন্ট ভ্যারিয়েবল থেকে নেওয়া ভালো)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments?email=${session?.user?.email}`, {
            cache: 'no-store'
        });
        if (res.ok) {
            records = await res.json();
        }
    } catch (error) {
        console.error("Error fetching records:", error);
    }

    return (
        <div>
            <DashHeader
                title="Manage Appointments"
                description="Review, update, or cancel your client legal consultations and requests."
            />
            
            <Suspense fallback={<div className="flex justify-center p-10"><Spinner color="pink" /></div>}>
                {/* 🎯 এখানে records প্রপ্স আকারে পাস করা হলো */}
                <ManageLegalRecordsClient records={records} />
            </Suspense>
        </div>
    );
};

export default ManageLegalRecords;