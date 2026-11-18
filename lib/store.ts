import type { AspectKey, CasusResultaat, ToetsConfig, WetKey } from "./types";
import { getCasus } from "./cases";

const ZWAK = "kt_zwak_v1";
const PROFIELEN = "kt_profielen_v1";

export interface ZwakRegister {
  aspect: Partial<Record<AspectKey, { gemist: number; totaal: number }>>;
  wet: Partial<Record<WetKey, { gemist: number; totaal: number }>>;
}

const leeg = (): ZwakRegister => ({ aspect: {}, wet: {} });

export function leesZwak(): ZwakRegister {
  try {
    const raw = localStorage.getItem(ZWAK);
    return raw ? { ...leeg(), ...JSON.parse(raw) } : leeg();
  } catch {
    return leeg();
  }
}

export function registreerResultaten(resultaten: CasusResultaat[]) {
  const z = leesZwak();
  for (const r of resultaten) {
    const casus = getCasus(r.casusId);
    if (!casus) continue;
    for (const a of r.aspecten) {
      const model = casus.aspecten.find((m) => m.key === a.key);
      const totaal = model?.kernpunten.length ?? 0;
      const gemist = a.gemist.length;
      const e = z.aspect[a.key] ?? { gemist: 0, totaal: 0 };
      z.aspect[a.key] = { gemist: e.gemist + gemist, totaal: e.totaal + totaal };
      for (const w of casus.wetten) {
        const we = z.wet[w] ?? { gemist: 0, totaal: 0 };
        z.wet[w] = { gemist: we.gemist + gemist, totaal: we.totaal + totaal };
      }
    }
  }
  try {
    localStorage.setItem(ZWAK, JSON.stringify(z));
  } catch {}
}

export function zwaksteAspecten(z: ZwakRegister, n = 2): AspectKey[] {
  return (Object.entries(z.aspect) as [AspectKey, { gemist: number; totaal: number }][])
    .filter(([, v]) => v.totaal > 0 && v.gemist > 0)
    .sort((a, b) => b[1].gemist / b[1].totaal - a[1].gemist / a[1].totaal)
    .slice(0, n)
    .map(([k]) => k);
}

export function zwaksteWetten(z: ZwakRegister, n = 3): WetKey[] {
  return (Object.entries(z.wet) as [WetKey, { gemist: number; totaal: number }][])
    .filter(([, v]) => v.totaal > 0 && v.gemist > 0)
    .sort((a, b) => b[1].gemist / b[1].totaal - a[1].gemist / a[1].totaal)
    .slice(0, n)
    .map(([k]) => k);
}

export interface Profiel {
  naam: string;
  config: ToetsConfig;
}

export function leesProfielen(): Profiel[] {
  try {
    return JSON.parse(localStorage.getItem(PROFIELEN) ?? "[]");
  } catch {
    return [];
  }
}

export function bewaarProfiel(p: Profiel) {
  const all = leesProfielen().filter((x) => x.naam !== p.naam);
  all.push(p);
  try {
    localStorage.setItem(PROFIELEN, JSON.stringify(all));
  } catch {}
}
