import "server-only";
import { google } from "googleapis";
import type { RsvpInput } from "@/lib/validation";

/**
 * Google Sheets seam (feature 13) — the ONLY module that talks to the RSVP
 * Sheet. Service-account auth via server-only env vars. Writes are RAW (never
 * USER_ENTERED) and leading formula characters are neutralised, so a guest's
 * name or message can never become a live spreadsheet formula. Header/column
 * order must match docs/DATA_SETUP.md.
 */

const RANGE = "RSVPs!A:H"; // timestamp · name · email · phone · attending · adults · children · message

// Build the client lazily so importing this module never reads env at load time.
function getSheets() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// Neutralise leading = + - @ so a value can't be parsed as a formula.
function safeCell(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

export async function appendRsvp(input: RsvpInput): Promise<void> {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.RSVP_SHEET_ID,
    range: RANGE,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          safeCell(input.name),
          safeCell(input.email),
          safeCell(input.phone),
          input.attending,
          input.adults,
          input.children,
          safeCell(input.message ?? ""),
        ],
      ],
    },
  });
}
