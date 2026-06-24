
import { headers } from "next/headers";
import DashHeader from "@/components/DashHeader";
import ManageLegalRecordsClient from "./manage-legal-records-client"; // পাথ ঠিক করা হয়েছে
import { auth } from "@/lib/auth";

const ManageLegalRecords = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    let records = [];
    try {
        // রিকোয়ারমেন্ট অনুযায়ী লাইভ সার্ভার ফেচিং ইউআরএল
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
                title="Hiring History & Requests"
                description="Review, accept, or reject legal consultation requests from your clients."
            />
            
            {/* ডাটা ফেচিং যেহেতু ওপরেই await হচ্ছে, তাই এখানে সরাসরি কম্পোনেন্ট রেন্ডার করাই নিরাপদ */}
            <ManageLegalRecordsClient records={records} />
        </div>
    );
};

export default ManageLegalRecords;