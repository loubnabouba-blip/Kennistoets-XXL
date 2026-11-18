"use client";
import { useState } from "react";
import { ASPECT_INSTRUCTIES, ASPECT_LABELS, type AspectKey, type Casus, type CasusResultaat } from "@/lib/types";
import { beoordeelCasus, status } from "@/lib/grade";
import { BronBlok } from "./BronBlok";
import { UitspraakBlok } from "./UitspraakBlok";

export function Toets({
  casussen,
  aspecten,
  onKlaar,
}: {
  casussen: Casus[];
  aspecten: AspectKey[];
  onKlaar: (r: CasusResultaat[]) => void;
}) {
  const [i, setI] = useState(0);
  const [fase, setFase] = useState<"invullen" | "feedback">("invullen");
  const [antw, setAntw] = useState<Partial<Record<AspectKey, string>>>({});
  const [res, setRes] = useState<CasusResultaat[]>([]);
  const casus = casussen[i];
  const huidig = res[i];

  const controleer = () => {
    const r = beoordeelCasus(casus, antw, aspecten);
    setRes((x) => {
      const n = [...x];
      n[i] = r;
      return n;
    });
    setFase("feedback");
    window.scrollTo({ top: 0 });
  };
  const volgende = () => {
    if (i + 1 >= casussen.length) return onKlaar(res);
    setI(i + 1);
    setAntw({});
    setFase("invullen");
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <div className="progress">
        <div style={{ width: `${((i + (fase === "feedback" ? 1 : 0)) / casussen.length) * 100}%` }} />
      </div>
      <div className="card">
        <div className="muted">
          Casus {i + 1} van {casussen.length}
        </div>
        <h2>{casus.titel}</h2>

        {fase === "invullen" ? (
          <>
            <div className="situatie">
              {casus.situatie.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
            {casus.bijlage && (
              <details>
                <summary>Bijlage: {casus.bijlage.titel}</summary>
                <p>{casus.bijlage.inhoud}</p>
              </details>
            )}
            <p>
              <b>Opdracht:</b> {casus.vraag}
            </p>
            {casus.aspecten
              .filter((a) => aspecten.includes(a.key))
              .map((a) => (
                <div className="aspect" key={a.key}>
                  <div className="lbl">{ASPECT_LABELS[a.key]}</div>
                  <div className="hint">{ASPECT_INSTRUCTIES[a.key]}</div>
                  <textarea
                    value={antw[a.key] ?? ""}
                    onChange={(e) => setAntw({ ...antw, [a.key]: e.target.value })}
                  />
                </div>
              ))}
            <div className="btn-row">
              <button className="btn" onClick={controleer}>
                Verder
              </button>
            </div>
          </>
        ) : (
          <>
            {huidig.aspecten.map((ar) => {
              const model = casus.aspecten.find((m) => m.key === ar.key)!;
              const st = status(ar.score);
              const bronIds = Array.from(
                new Set(
                  model.kernpunten
                    .sort((a, b) => Number(ar.gemist.includes(b.id)) - Number(ar.gemist.includes(a.id)))
                    .flatMap((k) => k.bronIds)
                )
              );
              return (
                <div className="aspect" key={ar.key}>
                  <div className="lbl">
                    {ASPECT_LABELS[ar.key]}{" "}
                    <span className={`chip ${st}`}>
                      {st === "goed" ? "Goed" : st === "deels" ? "Deels" : "Onvolledig"} · {ar.gehaald.length}/
                      {model.kernpunten.length}
                    </span>
                  </div>
                  <div className="hint">Jouw antwoord</div>
                  <div className="answer">{ar.antwoord.trim() || "(niet ingevuld)"}</div>
                  <ul className="kp">
                    {model.kernpunten.map((k) => (
                      <li key={k.id} className={ar.gehaald.includes(k.id) ? "ok" : "no"}>
                        <b>{k.label}</b>
                        {ar.gemist.includes(k.id) && <div>{k.toelichting}</div>}
                      </li>
                    ))}
                  </ul>
                  <div className="model">
                    <b>Modelantwoord:</b> {model.modelantwoord}
                  </div>
                  {bronIds.map((id) => (
                    <BronBlok id={id} key={id} />
                  ))}
                </div>
              );
            })}
            {casus.uitspraken.length > 0 && <h3>Jurisprudentie</h3>}
            {casus.uitspraken.map((e) => (
              <UitspraakBlok ecli={e} key={e} />
            ))}
            <div className="notice">
              De beoordeling controleert op kernpunten uit het modelantwoord (trefwoorden), niet op volledige juridische
              redeneringen. Lees altijd het modelantwoord en de bronnen.
            </div>
            <div className="btn-row">
              <button className="btn" onClick={volgende}>
                Verder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
