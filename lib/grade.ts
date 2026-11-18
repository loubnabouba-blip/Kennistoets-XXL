import type { AspectKey, Casus, CasusResultaat, AspectResultaat } from "./types";

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

export function beoordeelCasus(
  casus: Casus,
  antwoorden: Partial<Record<AspectKey, string>>,
  aspecten: AspectKey[]
): CasusResultaat {
  const res: AspectResultaat[] = [];
  for (const model of casus.aspecten) {
    if (!aspecten.includes(model.key)) continue;
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
