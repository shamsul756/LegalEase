

import ManageEventClient from "./ManageEventClient";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashHeader from "@/components/DashHeader";


const ManageEvent = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const events = await myEventn(session?.user?.email)



    return (
        <div>
            <DashHeader
                title="Manage Event"
                description="Manage event"
            />
            <Suspense fallback={<Spinner />}>
                <ManageEventClient events={events} />
            </Suspense>

        </div>
    );
};

export default ManageEvent;