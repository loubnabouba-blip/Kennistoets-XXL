import { NextResponse } from "next/server";
import { getBron } from "@/lib/sources";
import { haalArtikelLive } from "@/lib/bwb";

export const dynamic = "force-dynamic";
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").replace(/\s*\[…\]\s*$/, "").trim();

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  const snap = getBron(id);
  if (!snap) return NextResponse.json({ error: "Onbekende bron" }, { status: 404 });

  const basis = {
    id: snap.id,
    wet: snap.wet,
    artikel: snap.artikel,
    lid: snap.lid ?? null,
    url: snap.url,
  };
  try {
    const live = await haalArtikelLive(snap.bwb, snap.artikel);
    const tekst = snap.lid ? live.leden[snap.lid] : live.heleTekst;
    if (!tekst) throw new Error("Lid niet gevonden in live tekst");
    const afwijking = !norm(tekst).includes(norm(snap.tekst).slice(0, 80)) && !norm(snap.tekst).includes(norm(tekst).slice(0, 80));
    return NextResponse.json({
      ...basis,
      bron: "live",
      tekst,
      volledig: true,
      peildatum: live.peildatum,
      afwijking,
      snapshotTekst: afwijking ? snap.tekst : undefined,
    });
  } catch (e) {
    return NextResponse.json({
      ...basis,
      bron: "snapshot",
      tekst: snap.tekst,
      volledig: snap.volledig,
      peildatum: snap.peildatum,
      reden: e instanceof Error ? e.message : "Live ophalen mislukt",
    });
  }
}
