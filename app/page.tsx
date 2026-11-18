"use client";
import { useMemo, useState } from "react";
import { Configurator } from "@/components/Configurator";
import { Toets } from "@/components/Toets";
import { Resultaat } from "@/components/Resultaat";
import { CASUS_POOL } from "@/lib/cases";
import { ALLE_ASPECTEN, type AspectKey, type Casus, type CasusResultaat, type ToetsConfig } from "@/lib/types";
import { leesZwak, registreerResultaten, zwaksteAspecten, zwaksteWetten } from "@/lib/store";

const START: ToetsConfig = {
  niveau: "gemengd",
  wetten: ["sv", "awbi", "gemw", "opiumwet"],
  aantal: 3,
  focus: "alle",
};

const aspectenVoor = (f: ToetsConfig["focus"]): AspectKey[] =>
  f === "vorm" ? ["bevoegd", "vorm"] : f === "proportionaliteit" ? ["proportionaliteit"] : ALLE_ASPECTEN;

function kies(cfg: ToetsConfig, voorkeurWetten?: string[]): Casus[] {
  let pool = CASUS_POOL.filter(
    (c) => (cfg.niveau === "gemengd" || c.niveau.includes(cfg.niveau)) && c.wetten.some((w) => cfg.wetten.includes(w))
  );
  if (voorkeurWetten?.length) {
    pool = [...pool].sort(
      (a, b) =>
        b.wetten.filter((w) => voorkeurWetten.includes(w)).length - a.wetten.filter((w) => voorkeurWetten.includes(w)).length
    );
  }
  return pool.slice(0, cfg.aantal);
}

export default function Home() {
  const [stap, setStap] = useState<"melding" | "config" | "toets" | "resultaat">("melding");
  const [cfg, setCfg] = useState<ToetsConfig>(START);
  const [casussen, setCasussen] = useState<Casus[]>([]);
  const [aspecten, setAspecten] = useState<AspectKey[]>(ALLE_ASPECTEN);
  const [res, setRes] = useState<CasusResultaat[]>([]);
  const [melding, setMelding] = useState(true);
  const [run, setRun] = useState(0);

  const starten = (c: ToetsConfig, a: AspectKey[], voorkeur?: string[]) => {
    setCfg(c);
    setAspecten(a);
    setCasussen(kies(c, voorkeur));
    setRun((x) => x + 1);
    setStap("toets");
  };

  const zwakStarten = () => {
    const z = leesZwak();
    const wetten = zwaksteWetten(z);
    const asp = zwaksteAspecten(z);
    const c: ToetsConfig = { ...cfg, wetten: wetten.length ? wetten : cfg.wetten, aantal: 3, focus: "alle" };
    starten(c, asp.length ? asp : ALLE_ASPECTEN, wetten);
  };

  const titel = useMemo(
    () => ({ melding: "Start", config: "Toets samenstellen", toets: "Toets", resultaat: "Resultaat" }[stap]),
    [stap]
  );

  return (
    <div className="shell">
      <div className="topbar">
        <b>Kennistoets XXL</b> · {titel}
      </div>

      {stap === "melding" && melding && (
        <div className="overlay">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="mt">
            <button className="x" aria-label="Sluiten" onClick={() => { setMelding(false); setStap("config"); }}>
              ×
            </button>
            <h2 id="mt">Mededeling</h2>
            <p>
              Met deze toets oefen je de juridische aspecten van politiebevoegdheden. Bij elke casus vul je de aspecten
              gestructureerd in en krijg je feedback met de bijbehorende wettekst en bronverwijzing.
            </p>
            <p className="muted">
              Alle wetteksten verwijzen naar wetten.overheid.nl. Controleer bij twijfel altijd de actuele tekst.
            </p>
            <div className="btn-row">
              <button className="btn" onClick={() => { setMelding(false); setStap("config"); }}>
                Verder
              </button>
            </div>
          </div>
        </div>
      )}

      {stap === "config" && (
        <Configurator start={cfg} onStart={(c) => starten(c, aspectenVoor(c.focus))} />
      )}

      {stap === "toets" && (
        <Toets
          key={run}
          casussen={casussen}
          aspecten={aspecten}
          onKlaar={(r) => {
            registreerResultaten(r);
            setRes(r);
            setStap("resultaat");
          }}
        />
      )}

      {stap === "resultaat" && (
        <Resultaat resultaten={res} onNieuw={() => setStap("config")} onZwak={zwakStarten} />
      )}
    </div>
  );
}
