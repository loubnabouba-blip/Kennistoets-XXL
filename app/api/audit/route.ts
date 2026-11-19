// TIJDELIJK: audit-route, wordt na de controle verwijderd.
import { haalArtikelLive } from "@/lib/bwb";
export const dynamic = "force-dynamic";
const WET: Record<string, string> = {
  SV: "BWBR0001903", AWBI: "BWBR0006763", OW: "BWBR0001941", GW: "BWBR0005416",
  WWM: "BWBR0008804", WVW: "BWBR0006622", WID: "BWBR0006297", PW: "BWBR0031788",
};
// Sleutelwoorden (prefix-match). Alle andere woorden worden vervangen door "…".
const KEY = [
  "officier","justitie","hulpofficier","opsporingsambt","opsporing","ambtenaar","politie","agent","verdacht","verdenking",
  "heterdaad","misdrijf","overtreding","strafbaar","ernstige","bezwaren","redelijk","vermoeden","dringend","noodzak",
  "rechter","commissaris","machtiging","toestemming","woning","woongedeelte","vervoermiddel","doorzoek","binnentre",
  "inbeslag","aanhoud","aangehouden","bevel","bevoeg","beveg","burgemeester","gezag","gevaar","onmiddellijk","waarschuw",
  "geweld","openbare","orde","wanorde","oproer","ramp","vrees","verordening","voorschrift","kleding","lichaam","onderzoek",
  "belang","afwacht","tijdig","schriftelijk","vertonen","overbrengen","voorgeleid","verhoor","ten","spoedigste","bloed",
  "adem","identiteit","identificatie","bewijs","vordering","vorder","jaar","veertien","politietaak","taak","zonder","niet",
  "geen","tenzij","indien","ingeval","slechts","alleen","mits","wapen","munitie","categorie","verlof","voorhanden","vervoer",
  "lid","artikel","onder","genoemd","bedoeld","opium","lijst","hennep","verkopen","afleveren","verstrekken","bezit","aanwezig",
  "uitwendig","inwendig","arts","geslacht","dringende","onverwijld","terstond","bevoegdheid","machtigen","rechtsstaat",
  "ziekenhuis","apothe","kennisgeving","proces-verbaal","verslag","tonen","opgave","weigert","weigering","medewerking",
];
const key = (w: string) => { const l = w.toLowerCase().replace(/[^a-zà-ÿ0-9\-]/g, ""); return !!l && (/^\d/.test(l) || KEY.some((k) => l.startsWith(k))); };
function skelet(t: string) {
  const out: string[] = []; let gat = false;
  for (const w of t.split(/\s+/)) {
    if (key(w)) { out.push(w); gat = false; } else if (!gat) { out.push("…"); gat = true; }
  }
  return out.join(" ");
}
export async function GET(req: Request) {
  const u = new URL(req.url);
  const wet = (u.searchParams.get("wet") ?? "").toUpperCase();
  const art = u.searchParams.get("art") ?? "";
  const probes = (u.searchParams.get("p") ?? "").split("|").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!WET[wet]) return new Response("onbekende wet", { status: 400 });
  try {
    const a = await haalArtikelLive(WET[wet], art);
    const uit: unknown[] = [];
    const items = Object.entries(a.leden).length ? Object.entries(a.leden) : [["-", a.heleTekst] as [string, string]];
    for (const [nr, t] of items) {
      const lo = t.toLowerCase();
      uit.push({
        lid: nr,
        woorden: t.split(/\s+/).length,
        skelet: skelet(t),
        probes: Object.fromEntries(probes.map((p) => [p, lo.includes(p)])),
      });
    }
    return Response.json({ wet, art, toestand: a.peildatum, leden: uit });
  } catch (e) {
    return new Response("FOUT: " + (e instanceof Error ? e.message : "?"), { status: 500 });
  }
}
