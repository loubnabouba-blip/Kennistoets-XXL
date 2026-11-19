// TIJDELIJK: audit-route, wordt na de controle verwijderd.
import { haalArtikelLive } from "@/lib/bwb";
export const dynamic = "force-dynamic";
const WET: Record<string, string> = {
  SV: "BWBR0001903", AWBI: "BWBR0006763", OW: "BWBR0001941", GW: "BWBR0005416",
  WWM: "BWBR0008804", WVW: "BWBR0006622", WID: "BWBR0006297", PW: "BWBR0031788",
};
export async function GET(req: Request) {
  const u = new URL(req.url);
  const wet = (u.searchParams.get("wet") ?? "").toUpperCase();
  const art = u.searchParams.get("art") ?? "";
  if (!WET[wet]) return new Response("onbekende wet", { status: 400 });
  try {
    const a = await haalArtikelLive(WET[wet], art);
    const regels = [`${wet} art. ${art} — toestand ${a.peildatum}`];
    for (const [nr, t] of Object.entries(a.leden)) regels.push(`LID ${nr}: ${t}`);
    if (!Object.keys(a.leden).length) regels.push(`GEEN LEDEN: ${a.heleTekst}`);
    return new Response(regels.join("\n\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
  } catch (e) {
    return new Response("FOUT: " + (e instanceof Error ? e.message : "?"), { status: 500 });
  }
}
