"use client";

import { Button } from "@heroui/react";

export default function PremiumButton() {
  const updateToPremium = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      console.error(data.error);
      return;
    }

    window.location.href = data.url;
  };

  return (
    <Button onClick={updateToPremium}>
      Upgrade
    </Button>
  );
}