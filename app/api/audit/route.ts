// TIJDELIJK: audit-route, wordt na de controle verwijderd.
import { haalArtikelLive } from "@/lib/bwb";
import { BRONNEN } from "@/lib/sources";
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
const nrm = (x: string) => x.toLowerCase().replace(/\s+/g, " ").trim();
async function snapCheck() {
  const uit: string[] = ["id | volledigVlag | woordenSnap | woordenLive | gelijk | beginGelijk"];
  for (const b of BRONNEN) {
    try {
      const a = await haalArtikelLive(b.bwb, b.artikel);
      const live = b.lid ? a.leden[b.lid] : a.heleTekst;
      if (!live) { uit.push(`${b.id} | ${b.volledig} | - | - | LID/ARTIKEL NIET GEVONDEN`); continue; }
      const snap = nrm(b.tekst.replace(/\s*\[…\]\s*/g, " ")).trim();
      const l = nrm(live);
      const delen = b.tekst.split(/\[…\]/).map((x) => nrm(x)).filter(Boolean);
      const alleDelen = delen.every((d) => l.includes(d));
      uit.push(`${b.id} | ${b.volledig} | ${b.tekst.split(/\s+/).length} | ${live.split(/\s+/).length} | ${snap === l ? "JA" : "NEE"} | ${l.startsWith(delen[0] ?? "") ? "JA" : "NEE"} | delenInLive=${alleDelen ? "JA" : "NEE"}`);
    } catch (e) {
      uit.push(`${b.id} | FOUT ${e instanceof Error ? e.message : "?"}`);
    }
  }
  return new Response(uit.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
export async function GET(req: Request) {
  const u = new URL(req.url);
  if (u.searchParams.get("mode") === "snap") return snapCheck();
  const wet = (u.searchParams.get("wet") ?? "").toUpperCase();
  const art = u.searchParams.get("art") ?? "";
  const probes = (u.searchParams.get("p") ?? "").split("|").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!WET[wet]) return new Response("onbekende wet", { status: 400 });
  try {
    const a = await haalArtikelLive(WET[wet], art);
    const items = Object.entries(a.leden).length ? Object.entries(a.leden) : [["-", a.heleTekst] as [string, string]];
    const regels: string[] = [`${wet} art. ${art}, toestand ${a.peildatum}`];
    probes.forEach((p, i) => regels.push(`P${i + 1} = ${p}`));
    for (const [nr, t] of items) {
      const lo = t.toLowerCase();
      const res = probes.map((p, i) => `P${i + 1}=${lo.includes(p) ? "JA" : "NEE"}`).join(" ");
      regels.push(`LID ${nr} (${t.split(/\s+/).length} woorden): ${res}`);
      if (u.searchParams.get("sk") !== "0") regels.push(`  skelet: ${skelet(t)}`);
    }
    return new Response(regels.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
  } catch (e) {
    return new Response("FOUT: " + (e instanceof Error ? e.message : "?"), { status: 500 });
  }
}
