import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://perks-marketplace-backend.vercel.app/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const backendUrl = `${BACKEND_URL}/v1/perks/${id}`;

    console.log(`[API ROUTE] GET /api/v1/perks/${id} - Call #${Date.now()}`);
    console.log('Proxying GET request to:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend responded with:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch perk from backend' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}