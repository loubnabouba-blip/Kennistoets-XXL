"use client";
import { useEffect, useState } from "react";
import { getUitspraak } from "@/lib/sources";

export function UitspraakBlok({ ecli }: { ecli: string }) {
  const snap = getUitspraak(ecli);
  const [d, setD] = useState<{ bron: string; tekst: string; datum: string | null } | null>(null);
  useEffect(() => {
    let weg = false;
    fetch(`/api/uitspraak?ecli=${encodeURIComponent(ecli)}`)
      .then((r) => r.json())
      .then((x) => !weg && setD(x))
      .catch(() => {});
    return () => {
      weg = true;
    };
  }, [ecli]);
  const tekst = d?.tekst || snap?.samenvatting || "";
  const live = d?.bron === "live";
  return (
    <div className="bron">
      <div className="head">
        <span>
          {snap?.instantie ?? "Uitspraak"} {d?.datum ?? snap?.datum ?? ""} · {ecli}
        </span>
        <span className={`badge ${live ? "live" : "snap"}`}>
          {live ? "Live van Rechtspraak.nl" : "Samenvatting (eigen woorden, snapshot)"}
        </span>
      </div>
      <p style={{ margin: "6px 0" }}>{tekst}</p>
      <a href={`https://uitspraken.rechtspraak.nl/details?id=${ecli}`} target="_blank" rel="noreferrer">
        Volledige uitspraak op uitspraken.rechtspraak.nl ↗
      </a>
    </div>
  );
}
