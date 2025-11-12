"use client";

import { useRouter } from "next/navigation";
import { PerkForm } from "@/components/forms/PerkForm";

export default function Page() {
  const router = useRouter();
  return <PerkForm onSave={() => router.push("/perks")} />;
}
