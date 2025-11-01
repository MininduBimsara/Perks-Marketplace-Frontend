"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

export default function Page() {
  return (
    <Card>
      <CardHeader title="Journal moved to CMS" />
      <CardContent className="space-y-4">
        <p className="text-gray-700">
          Blog/Journal management now lives in the CMS section.
        </p>
        <Link href="/cms/journal">
          <Button>
            <Icon name="blog" className="w-4 h-4 mr-2" /> Go to CMS → Journal
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
