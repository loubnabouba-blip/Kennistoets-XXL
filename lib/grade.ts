import type { AspectKey, Casus, CasusResultaat, AspectResultaat } from "./types";
import { MC } from "./mc";

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

export function beoordeelCasus(
  casus: Casus,
  antwoorden: Partial<Record<AspectKey, string>>,
  aspecten: AspectKey[],
  modi: Partial<Record<AspectKey, "open" | "mc">> = {},
  keuzes: Partial<Record<AspectKey, string>> = {}
): CasusResultaat {
  const res: AspectResultaat[] = [];
  for (const model of casus.aspecten) {
    if (!aspecten.includes(model.key)) continue;
    if (modi[model.key] === "mc" && MC[casus.id]?.[model.key]) {
      const v = MC[casus.id]![model.key]!;
      const gekozen = keuzes[model.key];
      const goed = gekozen === v.juist;
      res.push({
        key: model.key,
        modus: "mc",
        gekozen,
        antwoord: gekozen ? (v.opties.find((o) => o.id === gekozen)?.tekst ?? "") : "",
        gehaald: goed ? ["mc"] : [],
        gemist: goed ? [] : ["mc"],
        score: goed ? 1 : 0,
      });
      continue;
    }
    const antwoord = antwoorden[model.key] ?? "";
    const tekst = norm(antwoord);
    const gehaald: string[] = [];
    const gemist: string[] = [];
    for (const kp of model.kernpunten) {
      const ok =
        tekst.length > 0 &&
        kp.patronen.some((p) => {
          try {
            return new RegExp(p, "i").test(tekst);
          } catch {
            return false;
          }
        });
      (ok ? gehaald : gemist).push(kp.id);
    }
    res.push({
      key: model.key,
      modus: "open",
      antwoord,
      gehaald,
      gemist,
      score: model.kernpunten.length ? gehaald.length / model.kernpunten.length : 1,
    });
  }
  return { casusId: casus.id, aspecten: res };
}

export const status = (score: number) =>
  score >= 0.99 ? "goed" : score > 0 ? "deels" : "ontbreekt";
