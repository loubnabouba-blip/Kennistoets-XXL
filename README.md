# Kennistoets XXL

Prototype van een interactieve aspectenkennistoets voor politie-agenten en hulpofficieren van justitie (Next.js + TypeScript).

## Starten
```
npm install
npm run dev     # http://localhost:3000
```

## Wat zit erin
- Start-pop-up ("Mededeling"), configurator ("Stel je toets samen") en toetsscherm met groene "Verder"-knoppen.
- 6 uitgewerkte casussen: Opiumwet + Sv 96b, Gemeentewet noodbevel, HOvJ-doorzoeking woning (Sv 97 + Awbi), WWM-pistool (art. 26), WVW-bloedonderzoek (art. 163) en Wid-identiteitscontrole (art. 2 Wid + art. 8 Pw).
- Per aspect feedback op kernpunten, modelantwoord, wettekst met peildatum en link naar wetten.overheid.nl / uitspraken.rechtspraak.nl.
- Zwakke punten worden in de browser (localStorage) onthouden; "Oefen mijn zwakke punten" kiest casussen op die onderdelen.

## Bronnen en nauwkeurigheid
- `app/api/wet` en `app/api/uitspraak` proberen **live** op te halen (SRU/BWB van repository.overheid.nl en data.rechtspraak.nl).
  Lukt dat niet, dan wordt de **geverifieerde snapshot** uit `lib/sources.ts` getoond met een duidelijk label. Er wordt nooit tekst verzonnen.
- De live-adapters (`lib/bwb.ts`, `lib/rechtspraak.ts`) zijn **nog niet getest tegen de echte API's**: de ontwikkelomgeving had geen toegang.
  Draai de app lokaal en controleer of de badge "Live opgehaald" verschijnt; pas anders de parsing in `lib/bwb.ts` aan.
- Snapshots met "Oudere versie" of "Fragment" zijn gemarkeerd; controleer die via de bronlink.
- De feedback is trefwoord-gebaseerd (kernpunten in `lib/cases.ts`), geen volledige juridische beoordeling.

## Nog te doen
- Live-koppeling testen; meer casussen (WWM, WVW, Wid, Wth, Alcoholwet, WED, APV, Wom).
- Automatisch nieuwe casussen genereren uit live bronnen (vereist een LLM-koppeling met bronverificatie).
- Aanmelding/accounts en server-side opslag van leerresultaten.
