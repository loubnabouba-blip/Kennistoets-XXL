"use client";
import { ASPECT_LABELS, type AspectKey, type CasusResultaat } from "@/lib/types";
import { getCasus } from "@/lib/cases";
import { leesZwak, zwaksteAspecten, zwaksteWetten } from "@/lib/store";
import { useEffect, useState } from "react";

export function Resultaat({
  resultaten,
  onNieuw,
  onZwak,
}: {
  resultaten: CasusResultaat[];
  onNieuw: () => void;
  onZwak: () => void;
}) {
  const [heeftZwak, setHeeftZwak] = useState(false);
  useEffect(() => {
    const z = leesZwak();
    setHeeftZwak(zwaksteAspecten(z).length > 0 || zwaksteWetten(z).length > 0);
  }, [resultaten]);

  const perAspect = new Map<AspectKey, { g: number; t: number }>();
  for (const r of resultaten) {
    const c = getCasus(r.casusId);
    for (const a of r.aspecten) {
      const t = c?.aspecten.find((m) => m.key === a.key)?.kernpunten.length ?? 0;
      const e = perAspect.get(a.key) ?? { g: 0, t: 0 };
      perAspect.set(a.key, { g: e.g + a.gehaald.length, t: e.t + t });
    }
  }
  return (
    <div className="card">
      <h1>Resultaat</h1>
      <table className="res">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Kernpunten geraakt</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(perAspect.entries()).map(([k, v]) => (
            <tr key={k}>
              <td>{ASPECT_LABELS[k]}</td>
              <td>
                {v.g} / {v.t}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">Gemiste aspecten en wetten worden onthouden (alleen in deze browser).</p>
      <div className="btn-row">
        <button className="btn secondary" onClick={onNieuw}>
          Nieuwe toets samenstellen
        </button>
        <button className="btn" onClick={onZwak} disabled={!heeftZwak}>
          Oefen mijn zwakke punten
        </button>
      </div>
    </div>
  );
}
