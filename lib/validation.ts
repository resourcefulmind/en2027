import { z } from "zod";

/**
 * Shared zod schemas (feature 13). Validated client-side for UX and server-side
 * for trust — never trust the client. Inferred types are the single source of
 * truth for the persisted shapes.
 */

export const rsvpSchema = z
  .object({
    name: z.string().trim().min(1, "Your name is required.").max(80),
    email: z.email("Enter a valid email."),
    phone: z.string().trim().min(3, "Enter a phone number.").max(40),
    attending: z.enum(["yes", "no"]),
    adults: z.number().int().min(0).max(20),
    children: z.number().int().min(0).max(20),
    message: z.string().trim().max(500).optional().default(""),
  })
  // When attending, at least one adult must be coming (0 adults is illogical).
  .refine((d) => d.attending === "no" || d.adults >= 1, {
    message: "At least one adult is required.",
    path: ["adults"],
  });

// Light spam guard for the public wall: reject URLs and bare domains.
const NO_LINKS = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|ng|io|co)\b)/i;

export const wishSchema = z.object({
  name: z.string().trim().min(1, "Your name is required.").max(60),
  message: z
    .string()
    .trim()
    .min(2, "Say a little more.")
    .max(280, "Keep it under 280 characters.")
    .refine((m) => !NO_LINKS.test(m), "No links, please."),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
export type WishInput = z.infer<typeof wishSchema>;
