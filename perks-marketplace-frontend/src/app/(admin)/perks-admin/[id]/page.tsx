"use client";

import { useRouter } from "next/navigation";
import { PerkForm } from "@/components/forms/PerkForm";

interface Params {
  params: { id: string };
}

export default function Page({ params }: Params) {
  const router = useRouter();
  const { id } = params;
  return <PerkForm perkId={id} onSave={() => router.push("/perks")} />;
}
