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
- Vraagvorm kiezen in de configurator: meerkeuze, open of een mix (meerkeuze voor grondslag, verdenking en bevoegdheid; de rest open). Elke casus heeft per aspect één meerkeuzevraag met uitleg en bronnen.
- Per aspect feedback op kernpunten, modelantwoord, wettekst met peildatum en link naar wetten.overheid.nl / uitspraken.rechtspraak.nl.
- Zwakke punten worden in de browser (localStorage) onthouden; "Oefen mijn zwakke punten" kiest casussen op die onderdelen.

## Bronnen en nauwkeurigheid
- `app/api/wet` en `app/api/uitspraak` proberen **live** op te halen (SRU/BWB van repository.overheid.nl en data.rechtspraak.nl).
  Lukt dat niet, dan wordt de **geverifieerde snapshot** uit `lib/sources.ts` getoond met een duidelijk label. Er wordt nooit tekst verzonnen.
- De live-adapters (`lib/bwb.ts`, `lib/rechtspraak.ts`) zijn getest op de Vercel-deployment (18-11-2026): wetteksten komen uit het manifest en de toestand-XML van repository.officiele-overheidspublicaties.nl, uitspraken uit data.rechtspraak.nl. Alle snapshots zijn daartegen gecontroleerd.
- Snapshots met "Oudere versie" of "Fragment" zijn gemarkeerd; controleer die via de bronlink.
- De feedback is trefwoord-gebaseerd (kernpunten in `lib/cases.ts`), geen volledige juridische beoordeling.

## Controle (19-11-2026)
Alle bronsnapshots zijn woord voor woord vergeleken met de live toestand-XML (peildatum 2026-07-01/2026-10-01). Voor Sv 27, 53, 56, 96b, 97, Awbi 2 en 3, Opiumwet 2 en 3, Gemeentewet 172, 175 en 176, WWM 13 en 26, WVW 163 (lid 1, 4, 5), Wid 2 en Pw 8 klopt elk fragment en elke "volledig"-vlag. De vergelijking is gedaan met een tijdelijke route die daarna is verwijderd.

## Nog te doen
- Meer casussen (WED, Wth, APV, Wom, Wet dieren, Politiewet art. 7). Alcoholwet: casus 7 (art. 45) staat erin; art. 20 volgt zodra de aangekondigde wijziging (afleveren bij verkoop op afstand) in werking is.
- Inhoudelijke controle van de modelantwoorden door een vakinhoudelijk deskundige (jurist/HOvJ).
- Automatisch nieuwe casussen genereren uit live bronnen (vereist een LLM-koppeling met bronverificatie).
- Aanmelding/accounts en server-side opslag van leerresultaten.
