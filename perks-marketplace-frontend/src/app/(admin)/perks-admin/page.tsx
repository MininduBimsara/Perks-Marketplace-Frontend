"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

export default function Page() {
  return (
    <Card>
      <CardHeader title="Perks moved to CMS" />
      <CardContent className="space-y-4">
        <p className="text-gray-700">
          Perks management now lives in the CMS section.
        </p>
        <Link href="/cms/perks">
          <Button>
            <Icon name="perk" className="w-4 h-4 mr-2" /> Go to CMS → Perks
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
