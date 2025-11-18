export function monthToQuarter(monthValue: string): string {
  const normalized = monthValue.trim().toLowerCase();

  // map full names to short names
  const monthMap: Record<string, string> = {
    january: "jan",
    february: "feb",
    march: "mar",
    april: "apr",
    may: "may",
    june: "jun",
    july: "jul",
    august: "aug",
    september: "sep",
    october: "oct",
    november: "nov",
    december: "dec",
  };

  const short = monthMap[normalized];
  if (!short) return "";

  const map: Record<string, number> = {
    jan: 1, feb: 2, mar: 3,
    apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9,
    oct: 10, nov: 11, dec: 12,
  };

  const m = map[short];
  if (!m) return "";

  if (m <= 3) return "Q1";
  if (m <= 6) return "Q2";
  if (m <= 9) return "Q3";
  return "Q4";
}
