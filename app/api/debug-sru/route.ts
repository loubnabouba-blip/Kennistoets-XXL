import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// TIJDELIJK: alleen om de SRU-respons te inspecteren. Wordt verwijderd.
export async function GET(req: Request) {
  const u = new URL(req.url).searchParams;
  const bwb = u.get("bwb") ?? "BWBR0008804";
  const target = u.get("url");
  const url =
    target && /^https:\/\/(repository|zoekservice)\./.test(target)
      ? target
      : `https://zoekservice.overheid.nl/sru/Search?x-connection=BWB&operation=searchRetrieve&version=1.2&query=${encodeURIComponent("dcterms.identifier==" + bwb)}&maximumRecords=1`;
  try {
    const r = await fetch(url, { cache: "no-store" });
    const t = await r.text();
    const xmlLinks = Array.from(new Set(t.match(/https?:\/\/[^"'<>\s]+/g) ?? [])).slice(0, 40);
    return NextResponse.json({ status: r.status, url, lengte: t.length, links: xmlLinks, begin: t.slice(0, 1500), einde: t.slice(-2500) });
  } catch (e) {
    return NextResponse.json({ fout: String(e), url });
  }
}
