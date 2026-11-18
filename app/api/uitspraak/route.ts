import { NextResponse } from "next/server";
import { getUitspraak } from "@/lib/sources";
import { ECLI_RE, haalUitspraakLive } from "@/lib/rechtspraak";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const ecli = new URL(req.url).searchParams.get("ecli") ?? "";
  if (!ECLI_RE.test(ecli)) return NextResponse.json({ error: "Ongeldig ECLI" }, { status: 400 });
  const snap = getUitspraak(ecli);
  const url = `https://uitspraken.rechtspraak.nl/details?id=${ecli}`;
  try {
    const live = await haalUitspraakLive(ecli);
    return NextResponse.json({
      ecli,
      url,
      bron: "live",
      instantie: snap?.instantie ?? null,
      datum: live.datum ?? snap?.datum ?? null,
      tekst: live.inhoudsindicatie ?? snap?.samenvatting ?? "",
    });
  } catch (e) {
    return NextResponse.json({
      ecli,
      url,
      bron: "snapshot",
      instantie: snap?.instantie ?? null,
      datum: snap?.datum ?? null,
      tekst: snap?.samenvatting ?? "",
      reden: e instanceof Error ? e.message : "Live ophalen mislukt",
    });
  }
}
