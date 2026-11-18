/** Live koppeling met de Rechtspraak.nl Open Data API (ongetest vanuit deze omgeving; zie lib/bwb.ts). */
export const ECLI_RE = /^ECLI:[A-Z]{2}:[A-Z0-9]+:\d{4}:[A-Z0-9.]+$/;

const strip = (s: string) =>
  s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

export async function haalUitspraakLive(ecli: string) {
  if (!ECLI_RE.test(ecli)) throw new Error("Ongeldig ECLI");
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 8000);
  try {
    const r = await fetch(
      `https://data.rechtspraak.nl/uitspraken/content?id=${encodeURIComponent(ecli)}`,
      { signal: c.signal, cache: "no-store" }
    );
    if (!r.ok) throw new Error(`HTTP ${r.status} van data.rechtspraak.nl`);
    const xml = await r.text();
    const indicatie = xml.match(/<(?:\w+:)?inhoudsindicatie[^>]*>([\s\S]*?)<\/(?:\w+:)?inhoudsindicatie>/);
    const datum = xml.match(/<dcterms:date[^>]*>([^<]+)<\/dcterms:date>/);
    return {
      inhoudsindicatie: indicatie ? strip(indicatie[1]) : null,
      datum: datum ? datum[1].trim() : null,
    };
  } finally {
    clearTimeout(t);
  }
}
