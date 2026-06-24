import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { WishInput } from "@/lib/validation";

/**
 * Supabase seam (feature 13): the ONLY module that talks to the wishes table.
 * Service-role key, server-only. Inserts go live instantly (status 'approved');
 * moderation is hide-after-the-fact in the dashboard. The public read returns
 * APPROVED wishes only, newest first, capped, and never throws, so a wall read
 * can never crash the server-rendered page.
 */

export type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const WALL_LIMIT = 60; // most-recent cap for the public wall
const COLUMNS = "id,name,message,created_at";

let client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
  }
  return client;
}

/** Insert a wish (instant, status 'approved'). Throws on failure; the API route catches. */
export async function insertWish(input: WishInput): Promise<Wish> {
  const { data, error } = await db()
    .from("wishes")
    .insert({ name: input.name, message: input.message, status: "approved" })
    .select(COLUMNS)
    .single();
  if (error) throw error;
  return data as Wish;
}

/** The public wall: approved only, newest first, capped. Never throws; returns [] on failure. */
export async function getApprovedWishes(): Promise<Wish[]> {
  try {
    const { data, error } = await db()
      .from("wishes")
      .select(COLUMNS)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(WALL_LIMIT);
    if (error) throw error;
    return (data as Wish[] | null) ?? [];
  } catch {
    return [];
  }
}
