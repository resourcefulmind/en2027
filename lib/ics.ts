import { content } from "@/content";

/**
 * Minimal RFC-5545 VEVENT for the ceremony, built from content.ts and
 * downloaded client-side. Dependency-free (per library-docs.md). Times are
 * emitted in UTC ("Z") derived from content.event.isoDateTime (1 PM WAT →
 * 12:00:00Z), so the invite lands at the right local time on any device.
 */

const DURATION_HOURS = 5; // ~1 PM → 6 PM WAT

// iCalendar UTC timestamp: YYYYMMDDTHHMMSSZ.
function toIcsUtc(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}T` +
    `${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`
  );
}

// Escape TEXT values per RFC 5545 (backslash, comma, semicolon, newline).
function esc(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/([,;])/g, "\\$1")
    .replace(/\n/g, "\\n");
}

export function buildIcs(): string {
  const start = new Date(content.event.isoDateTime);
  const end = new Date(start.getTime() + DURATION_HOURS * 60 * 60 * 1000);
  const dtStart = toIcsUtc(start);

  const summary = `${content.couple.namesDisplay}: ${content.event.framing}`;
  const location = `${content.event.venueName}, ${content.event.venueAddress}`;
  const description = `Join ${content.couple.namesDisplay} as they celebrate their ${content.event.framing}.`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Woven//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:ebere-nnamdi-2027@woven",
    `DTSTAMP:${dtStart}`,
    `DTSTART:${dtStart}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${esc(summary)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
