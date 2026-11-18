import { NextResponse } from "next/server";
import { BRONNEN } from "@/lib/sources";
import { haalArtikelLive } from "@/lib/bwb";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
// TIJDELIJK: vergelijkt alle snapshots met de live tekst. Wordt verwijderd.
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").replace(/\[…\]/g, "").trim();
export async function GET() {
  const uit = [];
  for (const b of BRONNEN) {
    uit.push(await (async () => {
      try {
        const l = await haalArtikelLive(b.bwb, b.artikel);
        const t = b.lid ? l.leden[b.lid] : l.heleTekst;
        if (!t) return { id: b.id, status: "LID-NIET-GEVONDEN", leden: Object.keys(l.leden).join(","), peil: l.peildatum };
        const snap = norm(b.tekst).split("  ")[0];
        const deel = norm(b.tekst).slice(0, 60);
        const gelijk = norm(t) === norm(b.tekst);
        const bevat = norm(t).includes(deel);
        return { id: b.id, status: gelijk ? "GELIJK" : bevat ? "BEGIN-KLOPT" : "AFWIJKT", peil: l.peildatum, live: t.slice(0, 160), snap: snap.slice(0, 160) };
      } catch (e) {
        return { id: b.id, status: "FOUT", fout: String(e).slice(0, 120) };
      }
    })());
  }
  return NextResponse.json(uit);
}
