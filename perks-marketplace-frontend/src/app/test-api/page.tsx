"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function TestAPI() {
  const [result, setResult] = useState<string>("");

  const testConnection = async () => {
    try {
      setResult("Testing connection...");

      // Test direct fetch
      const response = await fetch("/api/v1/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      <Button onClick={testConnection}>Test API Connection</Button>

      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
}
