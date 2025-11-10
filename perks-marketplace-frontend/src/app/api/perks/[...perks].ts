import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://perks-marketplace-backend.vercel.app/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { perks: string[] } }
) {
  try {
    const { perks } = params;
    const searchParams = request.nextUrl.searchParams;
    
    // Construct the backend URL
    const backendPath = `/v1/perks/${perks.join('/')}`;
    const queryString = searchParams.toString();
    const backendUrl = `${BACKEND_URL}${backendPath}${queryString ? `?${queryString}` : ''}`;

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
        { error: 'Failed to fetch from backend' },
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

export async function POST(
  request: NextRequest,
  { params }: { params: { perks: string[] } }
) {
  try {
    const { perks } = params;
    const body = await request.json();
    
    // Get auth token from headers
    const authHeader = request.headers.get('authorization');
    
    // Construct the backend URL
    const backendPath = `/v1/perks/${perks.join('/')}`;
    const backendUrl = `${BACKEND_URL}${backendPath}`;

    console.log('Proxying POST request to:', backendUrl);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Backend responded with:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to post to backend' },
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