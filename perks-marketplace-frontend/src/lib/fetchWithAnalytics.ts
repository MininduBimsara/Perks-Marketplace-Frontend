export async function fetchWithAnalytics(
  url: string,
  data?: Record<string, any>,
  method: string = "POST"
) {
  const headers: HeadersInit = (typeof window !== "undefined" &&
    (window as any).analyticsHeaders) || {
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  return res.json();
}
