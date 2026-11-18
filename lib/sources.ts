import type { BronArtikel, BronUitspraak } from "./types";

/**
 * VERIFIEERDE SNAPSHOTS (geraadpleegd 18-11-2026 via wetten.overheid.nl).
 * Alleen tekst die daadwerkelijk is gezien staat hier. Wat niet gezien is, is weggelaten
 * of gemarkeerd als fragment (volledig: false). De app probeert bij elke weergave eerst
 * live op te halen (zie /api/wet) en vergelijkt dat met deze snapshot.
 */

export const wettenUrl = (bwb: string, artikel: string) =>
  `https://wetten.overheid.nl/jci1.3:c:${bwb}&artikel=${artikel}`;

const SV = "BWBR0001903";
const AWBI = "BWBR0006763";
const OW = "BWBR0001941";
const GW = "BWBR0005416";
const WWM = "BWBR0008804";
const WVW = "BWBR0006622";
const WID = "BWBR0006297";
const PW = "BWBR0031788";

export const BRONNEN: BronArtikel[] = [
  // ---------- Wetboek van Strafvordering ----------
  {
    id: "sv-27-1",
    wet: "Wetboek van Strafvordering",
    bwb: SV,
    artikel: "27",
    lid: "1",
    tekst:
      "Als verdachte wordt vóórdat de vervolging is aangevangen, aangemerkt degene te wiens aanzien […]",
    volledig: false,
    peildatum: "2026-07-01",
    url: wettenUrl(SV, "27"),
  },
  {
    id: "sv-53-2",
    wet: "Wetboek van Strafvordering",
    bwb: SV,
    artikel: "53",
    lid: "2",
    tekst:
      "De opsporingsambtenaar die een verdachte bij ontdekking op heterdaad aanhoudt, brengt deze ten spoedigste over naar de plaats voor verhoor ter voorgeleiding aan de hulpofficier van justitie of de officier van justitie.",
    volledig: true,
    peildatum: "2018-10-16",
    url: wettenUrl(SV, "53"),
  },
  {
    id: "sv-96b-1",
    wet: "Wetboek van Strafvordering",
    bwb: SV,
    artikel: "96b",
    lid: "1",
    tekst:
      "In geval van ontdekking op heterdaad van een strafbaar feit of in geval van verdenking van een misdrijf als omschreven in artikel 67, eerste lid, is de opsporingsambtenaar bevoegd ter inbeslagneming een vervoermiddel, met uitzondering van het woongedeelte zonder toestemming van de bewoner, te doorzoeken en zich daartoe de toegang tot dit vervoermiddel te verschaffen.",
    volledig: true,
    peildatum: null,
    url: wettenUrl(SV, "96b"),
  },
  {
    id: "sv-97-1",
    wet: "Wetboek van Strafvordering",
    bwb: SV,
    artikel: "97",
    lid: "1",
    tekst:
      "In geval van ontdekking op heterdaad van een strafbaar feit of in geval van verdenking van een misdrijf als omschreven in artikel 67, eerste lid, kan de officier van justitie, bij dringende noodzakelijkheid en indien het optreden van de rechter-commissaris niet kan worden afgewacht, ter inbeslagneming de volgende plaatsen doorzoeken: a. een woning zonder toestemming van de bewoner, en […]",
    volledig: false,
    peildatum: "2017-06-17",
    url: wettenUrl(SV, "97"),
  },
  {
    id: "sv-97-3",
    wet: "Wetboek van Strafvordering",
    bwb: SV,
    artikel: "97",
    lid: "3",
    tekst:
      "Kan ook het optreden van de officier van justitie niet worden afgewacht, dan komt de bevoegdheid tot doorzoeking toe aan de hulpofficier. Het eerste en het tweede lid zijn van overeenkomstige toepassing.",
    volledig: true,
    peildatum: "2019-01-01",
    url: wettenUrl(SV, "97"),
  },
  // ---------- Algemene wet op het binnentreden ----------
  {
    id: "awbi-2-1",
    wet: "Algemene wet op het binnentreden",
    bwb: AWBI,
    artikel: "2",
    lid: "1",
    tekst:
      "Voor het binnentreden in een woning zonder toestemming van de bewoner is een schriftelijke machtiging vereist, tenzij en voor zover bij wet aan rechters, rechterlijke colleges, leden van het openbaar ministerie, burgemeesters, gerechtsdeurwaarders en belastingdeurwaarders de bevoegdheid is toegekend tot het binnentreden in een woning zonder toestemming van de bewoner. De machtiging wordt zo mogelijk getoond.",
    volledig: true,
    peildatum: null,
    url: wettenUrl(AWBI, "2"),
  },
  {
    id: "awbi-2-3",
    wet: "Algemene wet op het binnentreden",
    bwb: AWBI,
    artikel: "2",
    lid: "3",
    tekst:
      "Een schriftelijke machtiging als bedoeld in het eerste lid is niet vereist, indien ter voorkoming of bestrijding van ernstig en onmiddellijk gevaar voor de veiligheid van personen of goederen terstond in de woning moet worden binnengetreden.",
    volledig: true,
    peildatum: null,
    url: wettenUrl(AWBI, "2"),
  },
  {
    id: "awbi-hovj",
    wet: "Algemene wet op het binnentreden",
    bwb: AWBI,
    artikel: "3",
    // Het lidnummer is in de geraadpleegde bron niet bevestigd.
    tekst:
      "Bij dringende noodzakelijkheid en indien het optreden van de advocaat-generaal of de officier van justitie niet kan worden afgewacht, komt de bevoegdheid tot het geven van een machtiging toe aan de hulpofficier van justitie.",
    volledig: true,
    peildatum: null,
    url: wettenUrl(AWBI, "3"),
  },
  // ---------- Opiumwet ----------
  {
    id: "ow-2",
    wet: "Opiumwet",
    bwb: OW,
    artikel: "2",
    tekst:
      "Het is verboden een middel als bedoeld in de bij deze wet behorende lijst I dan wel aangewezen krachtens artikel 3a, vijfde lid: A. binnen of buiten het grondgebied van Nederland te brengen; B. te telen, te bereiden, te bewerken, te verwerken, te verkopen, af te leveren, te verstrekken of te vervoeren; C. aanwezig te hebben; D. te vervaardigen.",
    volledig: true,
    peildatum: "2026-09-17",
    url: wettenUrl(OW, "2"),
  },
  {
    id: "ow-3",
    wet: "Opiumwet",
    bwb: OW,
    artikel: "3",
    tekst:
      "Het is verboden een middel als bedoeld in de bij deze wet behorende lijst II dan wel aangewezen krachtens artikel 3a, vijfde lid: A. binnen of buiten het grondgebied van Nederland te brengen; B. te telen, te bereiden, te bewerken, te verwerken, te verkopen, af te leveren, te verstrekken of te vervoeren; C. aanwezig te hebben; D. te vervaardigen.",
    volledig: true,
    peildatum: "2026-09-17",
    url: wettenUrl(OW, "3"),
  },
  // ---------- Gemeentewet ----------
  {
    id: "gw-172-1",
    wet: "Gemeentewet",
    bwb: GW,
    artikel: "172",
    lid: "1",
    tekst: "De burgemeester is belast met de handhaving van de openbare orde.",
    volledig: true,
    peildatum: "2026-06-04",
    url: wettenUrl(GW, "172"),
  },
  {
    id: "gw-172-3",
    wet: "Gemeentewet",
    bwb: GW,
    artikel: "172",
    lid: "3",
    tekst:
      "De burgemeester is bevoegd bij verstoring van de openbare orde of bij ernstige vrees voor het ontstaan daarvan, de bevelen te geven die noodzakelijk te achten zijn voor de handhaving van de openbare orde.",
    volledig: true,
    peildatum: "2026-06-04",
    url: wettenUrl(GW, "172"),
  },
  {
    id: "gw-175-1",
    wet: "Gemeentewet",
    bwb: GW,
    artikel: "175",
    lid: "1",
    tekst:
      "In geval van oproerige beweging, van andere ernstige wanordelijkheden of van rampen, dan wel van ernstige vrees voor het ontstaan daarvan, is de burgemeester bevoegd alle bevelen te geven die hij ter handhaving van de openbare orde of ter […]",
    volledig: false,
    peildatum: "2026-06-04",
    url: wettenUrl(GW, "175"),
  },
  {
    id: "gw-175-2",
    wet: "Gemeentewet",
    bwb: GW,
    artikel: "175",
    lid: "2",
    tekst:
      "De burgemeester laat tot maatregelen van geweld niet overgaan dan na het doen van de nodige waarschuwing.",
    volledig: true,
    peildatum: "2013-07-01",
    url: wettenUrl(GW, "175"),
  },
  {
    id: "gw-176-1",
    wet: "Gemeentewet",
    bwb: GW,
    artikel: "176",
    lid: "1",
    tekst:
      "Wanneer een omstandigheid als bedoeld in artikel 175, eerste lid, zich voordoet, kan de burgemeester algemeen verbindende voorschriften geven die ter handhaving van de openbare orde of ter beperking van gevaar nodig zijn.",
    volledig: true,
    peildatum: "2026-10-01",
    url: wettenUrl(GW, "176"),
  },
  // ---------- Sv art. 56 ----------
  {
    id: "sv-56-1",
    wet: "Wetboek van Strafvordering",
    bwb: SV,
    artikel: "56",
    lid: "1",
    tekst:
      "De officier van justitie of de hulpofficier voor wie de verdachte wordt geleid of die zelf de verdachte heeft aangehouden, kan, bij het bestaan van ernstige bezwaren tegen deze, in het belang van het onderzoek bepalen dat deze aan zijn lichaam of kleding zal worden onderzocht. […]",
    volledig: false,
    peildatum: null,
    url: wettenUrl(SV, "56"),
  },
  // ---------- Wet wapens en munitie ----------
  {
    id: "ww-13-1",
    wet: "Wet wapens en munitie",
    bwb: WWM,
    artikel: "13",
    lid: "1",
    tekst:
      "Het is verboden een wapen van categorie I te vervaardigen, te transformeren, voor derden te herstellen, over te dragen, voorhanden te hebben, te dragen, te vervoeren, te doen binnenkomen of te doen uitgaan.",
    volledig: true,
    peildatum: "2026-07-01",
    url: wettenUrl(WWM, "13"),
  },
  {
    id: "ww-26-1",
    wet: "Wet wapens en munitie",
    bwb: WWM,
    artikel: "26",
    lid: "1",
    tekst: "Het is verboden een wapen of munitie van de categorieën II en III voorhanden te hebben.",
    volledig: true,
    peildatum: "2026-07-01",
    url: wettenUrl(WWM, "26"),
  },
  // ---------- Wegenverkeerswet 1994 ----------
  {
    id: "wvw-163-1",
    wet: "Wegenverkeerswet 1994",
    bwb: WVW,
    artikel: "163",
    lid: "1",
    tekst:
      "Bij verdenking dat de bestuurder van een voertuig heeft gehandeld in strijd met artikel 8, kan de opsporingsambtenaar hem bevelen zijn medewerking te verlenen aan een onderzoek als bedoeld in artikel 8, tweede lid, onderdeel a, en artikel 8 […]",
    volledig: false,
    peildatum: "2026-09-01",
    url: wettenUrl(WVW, "163"),
  },
  {
    id: "wvw-163-4",
    wet: "Wegenverkeerswet 1994",
    bwb: WVW,
    artikel: "163",
    lid: "4",
    tekst:
      "[…] indien de medewerking van de verdachte niet heeft geleid tot een voltooid ademonderzoek, kan de opsporingsambtenaar de verdachte vragen of hij zijn toestemming geeft tot het verrichten van een onderzoek als bedoeld in artikel 8, tweede lid, onderdeel b, en artikel 8, derde lid, onderdeel b. […]",
    volledig: false,
    peildatum: "2006-11-29",
    url: wettenUrl(WVW, "163"),
  },
  {
    id: "wvw-163-5",
    wet: "Wegenverkeerswet 1994",
    bwb: WVW,
    artikel: "163",
    lid: "5",
    tekst:
      "Indien de bestuurder zijn op grond van het vierde lid gevraagde toestemming niet verleent, kan de officier van justitie, een hulpofficier van justitie of een van de daartoe bij regeling van Onze Minister […] aangewezen […]",
    volledig: false,
    peildatum: "2019-07-01",
    url: wettenUrl(WVW, "163"),
  },
  // ---------- Wet op de identificatieplicht / Politiewet 2012 ----------
  {
    id: "wid-2",
    wet: "Wet op de identificatieplicht",
    bwb: WID,
    artikel: "2",
    tekst:
      "Een ieder die de leeftijd van veertien jaar heeft bereikt, is verplicht op de eerste vordering van een ambtenaar als bedoeld in artikel 8 van de Politiewet 2012 of artikel 6a van de Wet op de bijzondere opsporingsdiensten, een identiteitsbewijs […]",
    volledig: false,
    peildatum: null,
    url: wettenUrl(WID, "2"),
  },
  {
    id: "pw-8-1",
    wet: "Politiewet 2012",
    bwb: PW,
    artikel: "8",
    lid: "1",
    tekst:
      "Een ambtenaar van politie die is aangesteld voor de uitvoering van de politietaak, is bevoegd tot het vorderen van inzage van een identiteitsbewijs als bedoeld in artikel 1 van de Wet op de identificatieplicht van personen, voor zover dat […]",
    volledig: false,
    peildatum: "2026-06-12",
    url: wettenUrl(PW, "8"),
  },
];

export const UITSPRAKEN: BronUitspraak[] = [
  {
    ecli: "ECLI:NL:HR:2023:1264",
    instantie: "Hoge Raad",
    datum: "2023-09-19",
    samenvatting:
      "Doorzoeking van een voertuig op grond van art. 96b Sv terwijl er geen heterdaad of verdenking van een misdrijf als bedoeld in art. 67 lid 1 Sv was. Het hof sloot bewijs uit; de Hoge Raad vond dat onvoldoende gemotiveerd en overwoog dat bewijsuitsluiting een uitzondering is en afhangt van de factoren in art. 359a lid 2 Sv. Bij een inbreuk op de persoonlijke levenssfeer kan strafvermindering passender zijn.",
    url: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:HR:2023:1264",
  },
  {
    ecli: "ECLI:NL:HR:2015:4",
    instantie: "Hoge Raad",
    datum: "2015-01-06",
    samenvatting:
      "Zaak over de doorzoeking van de woning van een verdachte zonder voorafgaande machtiging van de rechter-commissaris of toestemming van de verdachte, na een Opiumwet-transactie. Onderwerpen: redelijk vermoeden van schuld (art. 27 Sv) en bewijsuitsluiting (art. 359a Sv).",
    url: "https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:HR:2015:4",
  },
];

export const getBron = (id: string) => BRONNEN.find((b) => b.id === id);
export const getUitspraak = (ecli: string) => UITSPRAKEN.find((u) => u.ecli === ecli);
