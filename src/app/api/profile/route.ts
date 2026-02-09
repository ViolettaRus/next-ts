import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (res.ok) {
      const json = await res.json();
      return NextResponse.json(json);
    }
  } catch {
    // ignore and fall back to static data
  }

  return NextResponse.json({
    id: 1,
    name: "Demo User",
    username: "demo",
    email: "demo@example.com",
  });
}

