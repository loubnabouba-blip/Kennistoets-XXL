"use client";
import { useEffect, useState } from "react";
import { getBron } from "@/lib/sources";

interface Antwoord {
  bron: "live" | "snapshot";
  tekst: string;
  volledig: boolean;
  peildatum: string | null;
  url: string;
  afwijking?: boolean;
  snapshotTekst?: string;
  reden?: string;
}

const OUD_VOOR = "2026-01-01";

export function BronBlok({ id }: { id: string }) {
  const snap = getBron(id);
  const [data, setData] = useState<Antwoord | null>(null);

  useEffect(() => {
    let weg = false;
    fetch(`/api/wet?id=${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((d) => !weg && setData(d))
      .catch(() => !weg && setData(null));
    return () => {
      weg = true;
    };
  }, [id]);

  if (!snap) return null;
  const d: Antwoord = data ?? {
    bron: "snapshot",
    tekst: snap.tekst,
    volledig: snap.volledig,
    peildatum: snap.peildatum,
    url: snap.url,
  };
  const oud = d.bron === "snapshot" && (!d.peildatum || d.peildatum < OUD_VOOR);
  const kop = `${snap.wet}, art. ${snap.artikel}${snap.lid ? ` lid ${snap.lid}` : ""}`;

  return (
    <div className="bron">
      <div className="head">
        <span>{kop}</span>
        {d.bron === "live" ? (
          <span className="badge live">Live opgehaald{d.peildatum ? ` · peildatum ${d.peildatum}` : ""}</span>
        ) : (
          <span className="badge snap">
            Geverifieerde snapshot{d.peildatum ? ` · peildatum ${d.peildatum}` : " · peildatum onbekend"}
          </span>
        )}
        {oud && <span className="badge old">Oudere versie – controleer actuele tekst</span>}
        {d.afwijking && <span className="badge fout">Live tekst wijkt af van snapshot</span>}
      </div>
      <blockquote>{d.tekst}</blockquote>
      {!d.volledig && <div className="muted">Fragment – de volledige tekst staat in de bron.</div>}
      {d.afwijking && d.snapshotTekst && (
        <div className="notice">Eerder gecontroleerde tekst: {d.snapshotTekst}</div>
      )}
      <a href={d.url} target="_blank" rel="noreferrer">
        Bekijk op wetten.overheid.nl ↗
      </a>
    </div>
  );
}
