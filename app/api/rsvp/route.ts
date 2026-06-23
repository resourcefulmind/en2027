import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validation";
import { appendRsvp } from "@/lib/sheets";

/**
 * RSVP endpoint (feature 14). Re-validates the body (never trust the client),
 * appends a row to the Google Sheet via lib/sheets.ts, and returns a flat
 * { success, error? }. Internal errors are logged, never leaked to the client.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Please check the form." },
      { status: 400 },
    );
  }

  try {
    await appendRsvp(parsed.data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RSVP append failed:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
