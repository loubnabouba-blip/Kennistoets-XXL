"use client";
import { useEffect, useState } from "react";
import { WET_LABELS, type Niveau, type ToetsConfig, type WetKey } from "@/lib/types";
import { CASUS_POOL } from "@/lib/cases";
import { bewaarProfiel, leesProfielen, type Profiel } from "@/lib/store";

const GROEPEN = Array.from(new Set(Object.values(WET_LABELS).map((w) => w.groep)));
const BESCHIKBAAR = new Set<WetKey>(CASUS_POOL.flatMap((c) => c.wetten));

export function Configurator({ start, onStart }: { start: ToetsConfig; onStart: (c: ToetsConfig) => void }) {
  const [cfg, setCfg] = useState<ToetsConfig>(start);
  const [profielen, setProfielen] = useState<Profiel[]>([]);
  const [naam, setNaam] = useState("");
  useEffect(() => setProfielen(leesProfielen()), []);
  useEffect(() => setCfg(start), [start]);

  const toggleWet = (w: WetKey) =>
    setCfg((c) => ({ ...c, wetten: c.wetten.includes(w) ? c.wetten.filter((x) => x !== w) : [...c.wetten, w] }));

  const passend = CASUS_POOL.filter(
    (c) =>
      (cfg.niveau === "gemengd" || c.niveau.includes(cfg.niveau)) &&
      c.wetten.some((w) => cfg.wetten.includes(w))
  ).length;

  return (
    <div className="card">
      <h1>Stel je toets samen</h1>
      <p className="muted">Kies het functieniveau, de wetten en de focus. Daarna start je de casussen met “Verder”.</p>

      <fieldset>
        <legend>Functieniveau</legend>
        <div className="radios">
          {([
            ["agent", "Politieagent (executief)"],
            ["hovj", "Hulpofficier van Justitie (HOvJ)"],
            ["gemengd", "Gemengd"],
          ] as [Niveau, string][]).map(([v, l]) => (
            <label className="opt" key={v}>
              <input type="radio" name="niveau" checked={cfg.niveau === v} onChange={() => setCfg({ ...cfg, niveau: v })} />
              {l}
            </label>
          ))}
        </div>
      </fieldset>

      {GROEPEN.map((g) => (
        <fieldset key={g}>
          <legend>{g}</legend>
          <div className="grid">
            {(Object.entries(WET_LABELS) as [WetKey, { label: string; groep: string }][])
              .filter(([, w]) => w.groep === g)
              .map(([k, w]) => (
                <label className="opt" key={k}>
                  <input type="checkbox" checked={cfg.wetten.includes(k)} onChange={() => toggleWet(k)} />
                  <span>
                    {w.label}
                    {!BESCHIKBAAR.has(k) && <span className="muted"> (nog geen casus in prototype)</span>}
                  </span>
                </label>
              ))}
          </div>
        </fieldset>
      ))}

      <fieldset>
        <legend>Toetsvorm</legend>
        <div className="grid">
          <div>
            <div className="muted">Aantal casussen</div>
            <select value={cfg.aantal} onChange={(e) => setCfg({ ...cfg, aantal: Number(e.target.value) })}>
              <option value={3}>3</option>
              <option value={5}>5 (prototype: max. {CASUS_POOL.length})</option>
              <option value={10}>10 (prototype: max. {CASUS_POOL.length})</option>
            </select>
          </div>
          <div>
            <div className="muted">Focus</div>
            <select value={cfg.focus} onChange={(e) => setCfg({ ...cfg, focus: e.target.value as ToetsConfig["focus"] })}>
              <option value="alle">Alle aspecten</option>
              <option value="vorm">Alleen vormvoorschriften & machtigingen</option>
              <option value="proportionaliteit">Alleen proportionaliteit & subsidiariteit</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Profielen</legend>
        <div className="grid">
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" placeholder="Naam van profiel" value={naam} onChange={(e) => setNaam(e.target.value)} />
            <button
              className="btn secondary"
              disabled={!naam.trim()}
              onClick={() => {
                bewaarProfiel({ naam: naam.trim(), config: cfg });
                setProfielen(leesProfielen());
                setNaam("");
              }}
            >
              Opslaan
            </button>
          </div>
          <select
            value=""
            onChange={(e) => {
              const p = profielen.find((x) => x.naam === e.target.value);
              if (p) setCfg(p.config);
            }}
          >
            <option value="">Laad opgeslagen profiel…</option>
            {profielen.map((p) => (
              <option key={p.naam}>{p.naam}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <p className="muted">{passend} casus(sen) voldoen aan je selectie.</p>
      <div className="btn-row">
        <button className="btn" disabled={passend === 0} onClick={() => onStart(cfg)}>
          Verder
        </button>
      </div>
    </div>
  );
}
