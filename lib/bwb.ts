/**
 * Live koppeling met de officiële bronnen (BWB / SRU).
 * LET OP: deze adapter kon niet worden getest vanuit de ontwikkelomgeving (netwerk geblokkeerd).
 * Hij is bewust defensief en geïsoleerd: faalt iets, dan valt /api/wet terug op de snapshot
 * en toont de UI dat het géén live data is.
 */
const SRU = "https://repository.overheid.nl/sru";

export interface LiveArtikel {
  peildatum: string | null;
  leden: Record<string, string>;
  heleTekst: string;
  bronXml: string;
}

const strip = (s: string) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .trim();

async function get(url: string, ms = 8000): Promise<string> {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  try {
    const r = await fetch(url, { signal: c.signal, cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status} voor ${new URL(url).host}`);
    return await r.text();
  } finally {
    clearTimeout(t);
  }
}

export async function haalArtikelLive(bwb: string, artikel: string): Promise<LiveArtikel> {
  if (!/^BWBR\d{7}$/.test(bwb)) throw new Error("Ongeldig BWB-nummer");
  if (!/^[0-9]+[a-z]{0,3}$/i.test(artikel)) throw new Error("Ongeldig artikelnummer");

  // Het manifest van de repository somt alle toestanden (versies) van de regeling op.
  const REPO = "https://repository.officiele-overheidspublicaties.nl/bwb";
  const manifest = await get(`${REPO}/${bwb}/manifest.xml`, 15000);
  const vandaag = new Date().toISOString().slice(0, 10);
  const labels = Array.from(
    new Set(Array.from(manifest.matchAll(/<expression[^>]*\blabel="(\d{4}-\d{2}-\d{2}_\d+)"/g)).map((m) => m[1]))
  ).filter((l) => l.slice(0, 10) <= vandaag);
  if (!labels.length) throw new Error("Geen geldige toestand in manifest gevonden");
  labels.sort((x, y) => x.localeCompare(y, "en", { numeric: true }));
  const label = labels[labels.length - 1];
  const xmlUrl = `${REPO}/${bwb}/${label}/xml/${bwb}_${label}.xml`;
  const xml = await get(xmlUrl, 20000);

  const blokken = xml.match(/<artikel[\s>][\s\S]*?<\/artikel>/g) ?? [];
  const blok = blokken.find((b) => {
    const nr = b.match(/<kop>[\s\S]*?<nr[^>]*>([\s\S]*?)<\/nr>/);
    return nr && strip(nr[1]).toLowerCase() === artikel.toLowerCase();
  });
  if (!blok) throw new Error(`Artikel ${artikel} niet gevonden in toestand-XML`);

  const leden: Record<string, string> = {};
  const ledenBlokken = blok.match(/<lid[\s>][\s\S]*?<\/lid>/g) ?? [];
  for (const l of ledenBlokken) {
    const nr = l.match(/<lidnr[^>]*>([\s\S]*?)<\/lidnr>/);
    const body = l.replace(/<lidnr[^>]*>[\s\S]*?<\/lidnr>/, "");
    leden[nr ? strip(nr[1]) : "1"] = strip(body);
  }
  const heleTekst = strip(blok.replace(/<kop>[\s\S]*?<\/kop>/, ""));
  return {
    peildatum: label.slice(0, 10),
    leden,
    heleTekst,
    bronXml: xmlUrl,
  };
}
