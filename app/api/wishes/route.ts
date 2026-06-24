import { NextResponse } from "next/server";
import { wishSchema } from "@/lib/validation";
import { insertWish, getApprovedWishes } from "@/lib/db";

/**
 * Well-Wishes endpoint (feature 15).
 * POST: re-validate (no-links + length) → insert (status 'approved') → return the
 * new wish so the client can finalise its optimistic card.
 * GET: the approved wall (approved-only, capped, newest-first).
 * Flat { success, data?, error? }; internals logged, never leaked.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = wishSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Please check your wish." },
      { status: 400 },
    );
  }

  try {
    const wish = await insertWish(parsed.data);
    return NextResponse.json({ success: true, data: wish });
  } catch (err) {
    console.error("Wish insert failed:", err);
    return NextResponse.json(
      { success: false, error: "Couldn't share your wish. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const wishes = await getApprovedWishes(); // never throws → []
  return NextResponse.json({ success: true, data: wishes });
}
