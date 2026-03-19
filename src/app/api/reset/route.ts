import { auth } from "@/lib/auth/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const email = "gsahindu@gmail.com";
    const newPassword = "Sahi@448866";

    // Update password requires the user id, let's fetch the user first
    const users = await auth.api.listUsers({ query: { email } });
    const user = users?.users?.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Force set password
    const { data, error } = await auth.admin.setUserPassword({
      userId: user.id,
      password: newPassword
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Password force updated." });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
