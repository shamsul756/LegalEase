"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";

export default function PremiumButton() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/checkout_sessions", { method: "POST" });
            const data = await res.json();
            
            if (data?.url) {
                // Stripe পেমেন্ট পেজে রিডাইরেক্ট
                window.location.href = data.url;
            } else {
                console.error("Stripe URL not found");
            }
        } catch (error) {
            console.error("Checkout error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            isLoading={loading}
            onPress={handleCheckout}
            className="bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-extrabold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform"
            radius="lg"
            endContent={<FaCrown />}
        >
            Pay Verification Fee
        </Button>
    );
}