/**
 * Controle van alle bronnen. Gebruik:
 *   npm run check:bronnen            (offline + live, vereist internet)
 *   npm run check:bronnen -- --offline
 * Exit-code 1 bij elke afwijking.
 */
import { BRONNEN, UITSPRAKEN } from "../lib/sources";
import { CASUS_POOL } from "../lib/cases";
import { MC } from "../lib/mc";
import { haalArtikelLive } from "../lib/bwb";
import { haalUitspraakLive } from "../lib/rechtspraak";

const offline = process.argv.includes("--offline");
const fouten: string[] = [];
const fout = (m: string) => fouten.push(m);
const nrm = (x: string) => x.toLowerCase().replace(/\s+/g, " ").trim();

// ---------- Offline: verwijzingen ----------
const bronIds = new Set(BRONNEN.map((b) => b.id));
const eclis = new Set(UITSPRAKEN.map((u) => u.ecli));
for (const c of CASUS_POOL) {
  for (const e of c.uitspraken) if (!eclis.has(e)) fout(`${c.id}: onbekende uitspraak ${e}`);
  for (const a of c.aspecten) for (const k of a.kernpunten) for (const id of k.bronIds) if (!bronIds.has(id)) fout(`${k.id}: onbekende bron ${id}`);
}
for (const [cid, per] of Object.entries(MC)) {
  for (const [key, q] of Object.entries(per)) {
    if (!q) continue;
    const lbl = `MC ${cid}/${key}`;
    for (const id of q.bronIds) if (!bronIds.has(id)) fout(`${lbl}: onbekende bron ${id}`);
    if (!q.opties.some((o) => o.id === q.juist)) fout(`${lbl}: juist-id ontbreekt in opties`);
    if (new Set(q.opties.map((o) => o.id)).size !== q.opties.length) fout(`${lbl}: dubbele optie-id's`);
  }
}
for (const b of BRONNEN) {
  const heeftEllips = b.tekst.includes("[…]");
  if (b.volledig && heeftEllips) fout(`${b.id}: volledig=true maar tekst bevat […]`);
  if (!b.volledig && !heeftEllips) fout(`${b.id}: volledig=false maar tekst bevat geen […]`);
}

// ---------- Live ----------
async function live() {
  for (const b of BRONNEN) {
    try {
      const a = await haalArtikelLive(b.bwb, b.artikel);
      const tekst = b.lid ? a.leden[b.lid] : a.heleTekst;
      if (!tekst) { fout(`${b.id}: art. ${b.artikel}${b.lid ? " lid " + b.lid : ""} niet gevonden in live tekst`); continue; }
      const l = nrm(tekst);
      const delen = b.tekst.split("[…]").map(nrm).filter(Boolean);
      if (b.volledig) {
        // Live tekst mag achteraan wijzigingsmetadata hebben, maar moet met de snapshot beginnen.
        if (!l.startsWith(nrm(b.tekst))) fout(`${b.id}: snapshot (volledig) wijkt af van live tekst`);
      } else {
        let pos = 0;
        delen.forEach((d, i) => {
          const at = l.indexOf(d, pos);
          if (at < 0) fout(`${b.id}: deel ${i + 1} van de snapshot staat niet (in die volgorde) in de live tekst`);
          else pos = at + d.length;
        });
      }
    } catch (e) {
      fout(`${b.id}: live ophalen mislukt (${e instanceof Error ? e.message : "?"})`);
    }
  }
  for (const u of UITSPRAKEN) {
    try {
      const r = await haalUitspraakLive(u.ecli);
      const datum = (r as { datum?: string | null }).datum;
      if (datum && datum !== u.datum) fout(`${u.ecli}: datum snapshot ${u.datum} ≠ live ${datum}`);
    } catch (e) {
      fout(`${u.ecli}: live ophalen mislukt (${e instanceof Error ? e.message : "?"})`);
    }
  }
}

(async () => {
  if (!offline) await live();
  if (fouten.length) {
    console.error(`❌ ${fouten.length} afwijking(en):\n- ` + fouten.join("\n- "));
    process.exit(1);
  }
  console.log(`✅ ${BRONNEN.length} bronnen, ${UITSPRAKEN.length} uitspraken, ${CASUS_POOL.length} casussen gecontroleerd (${offline ? "offline" : "offline + live"}).`);
})();
