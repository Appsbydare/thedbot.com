import { auth } from "@/lib/auth/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const email = "gsahindu@gmail.com";
    const password = "Sahi@448866";
    const name = "Admin Sahi";

    const { data, error } = await auth.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      if (error.status === 422 || error.status === 400 || error.message?.includes('exist')) {
        return NextResponse.json({ message: "Admin user already exists." });
      }
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "Admin user seeded successfully.", data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
