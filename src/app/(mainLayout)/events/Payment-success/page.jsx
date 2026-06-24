import { stripe } from '@/lib/stripe';
import { Button, Card, CardFooter, CardHeader } from '@heroui/react';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, FaCrown } from 'react-icons/fa';

export default async function PremiumSuccess({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    // Stripe থেকে সেশন ডাটা রিট্রিভ করা
    let session = null;
    try {
        session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items', 'payment_intent']
        });
    } catch (err) {
        console.error("Stripe session retrieve error:", err);
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#080c16] px-6 py-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10" />

            <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
                <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                    <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500 border border-yellow-500/20 mb-2">
                        <FaCrown size={48} className="animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                        Upgrade Successful!
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {session?.customer_details?.email || session?.customer_email} You are now a Premium Member.
                    </p>
                </CardHeader>

                <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 text-center">
                    <div className="space-y-4">
                        <FaCheckCircle className="text-green-500 mx-auto" size={40} />
                        <h3 className="text-white font-bold text-lg">Premium Legal Access Unlocked</h3>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto">
                            All restrictions have been removed from your account! You can now access priority legal consultations, enjoy unlimited case appointments, and track your ongoing legal history seamlessly.
                        </p>
                    </div>
                </div>

                <CardFooter className="flex pt-8 justify-center">
                    <Link href="/dashboard" className="w-full">
                        <Button
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-950 font-extrabold h-11 px-8 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20"
                            radius="lg"
                            endContent={<FaArrowRight />}
                        >
                            Go to Dashboard
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}