
import DashHeader from "@/components/DashHeader";
import PaymentsTable from "@/components/PaymentTable";
import { fethMyPayments } from "@/lib/api/payment/data";
import { getUser } from "@/lib/api/session";




const AttendeePayments = async () => {
    const user = await getUser();
    const payments = await fethMyPayments(user?.email);

    return (
        <div>
            <DashHeader
                title="My Payment Overview"
                description="All payments of user"
            />
            <PaymentsTable payments={payments} />
        </div>
    );
};

export default AttendeePayments;