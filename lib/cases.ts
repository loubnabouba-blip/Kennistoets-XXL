import type { Casus } from "./types";

/**
 * Prototype-casuïstiek. Fictieve feiten; alle juridische kernpunten verwijzen naar
 * gecontroleerde bronpassages in lib/sources.ts.
 * Patronen zijn regex-strings (case-insensitive). Een kernpunt telt zodra één patroon matcht.
 */
export const CASUS_POOL: Casus[] = [
  {
    id: "c1-opiumwet-voertuig",
    titel: "Zakje wit poeder bij een geparkeerde auto",
    niveau: ["agent", "gemengd"],
    wetten: ["opiumwet", "sv"],
    vraag:
      "Mogen de agenten de auto van Aydin doorzoeken? Werk de vijf aspecten uit.",
    situatie: [
      "Agenten Jansen en Bakker surveilleren om 23.40 uur op een bedrijventerrein. Zij zien een personenauto met draaiende motor staan. Een voorbijganger staat bij het open raam aan de bestuurderszijde en krijgt van bestuurder Aydin een klein zakje, waarna hij geld overhandigt.",
      "Als de agenten naderen, laat de voorbijganger het zakje vallen. Een drugssneltest op het opgeraapte poeder reageert positief op cocaïne. Aydin wordt aangehouden. De agenten willen daarna het interieur en de kofferbak van de auto doorzoeken. De auto heeft geen woongedeelte.",
    ],
    bijlage: {
      titel: "Aantekening agent Jansen (fictief)",
      inhoud:
        "23.41 uur: overhandiging zakje tegen geld waargenomen vanaf 15 meter. 23.42 uur: zakje gevallen, sneltest positief cocaïne. 23.44 uur: Aydin staande gehouden en aangehouden. Geen toestemming gevraagd voor doorzoeking.",
    },
    uitspraken: ["ECLI:NL:HR:2023:1264"],
    aspecten: [
      {
        key: "grondslag",
        modelantwoord:
          "Het verhandelen van cocaïne (lijst I) is verboden op grond van art. 2 onder B Opiumwet. De doorzoeking van het voertuig berust op art. 96b lid 1 Sv; de aanhouding op heterdaad op art. 53 Sv.",
        kernpunten: [
          {
            id: "c1-g1",
            label: "Art. 2 Opiumwet (lijst I, afleveren/verkopen)",
            patronen: ["opiumwet", "\\bart(ikel|\\.)?\\s*2\\b.*(ow|opium)", "\\bow\\b"],
            toelichting:
              "Cocaïne staat op lijst I; art. 2 onder B verbiedt onder meer verkopen en afleveren. Controleer lijst I in de bron.",
            bronIds: ["ow-2"],
          },
          {
            id: "c1-g2",
            label: "Art. 96b Sv (doorzoeken vervoermiddel)",
            patronen: ["96\\s?b"],
            toelichting:
              "De bevoegdheid om een vervoermiddel te doorzoeken ter inbeslagneming staat in art. 96b lid 1 Sv.",
            bronIds: ["sv-96b-1"],
          },
          {
            id: "c1-g3",
            label: "Art. 53 Sv (aanhouding bij heterdaad)",
            patronen: ["\\b53\\b"],
            toelichting:
              "De aanhouding bij ontdekking op heterdaad volgt uit art. 53 Sv.",
            bronIds: ["sv-53-2"],
          },
        ],
      },
      {
        key: "verdenking",
        modelantwoord:
          "Er is sprake van ontdekking op heterdaad van een strafbaar feit (afleveren van cocaïne tegen betaling, waargenomen en bevestigd door de sneltest). Daarmee is aan art. 96b lid 1 Sv voldaan; daarnaast bestaat een redelijk vermoeden van schuld (art. 27 Sv).",
        kernpunten: [
          {
            id: "c1-v1",
            label: "Heterdaad",
            patronen: ["heterdaad"],
            toelichting:
              "Art. 96b lid 1 Sv vereist ontdekking op heterdaad of verdenking van een misdrijf als bedoeld in art. 67 lid 1 Sv.",
            bronIds: ["sv-96b-1"],
          },
          {
            id: "c1-v2",
            label: "Redelijk vermoeden van schuld (art. 27 Sv)",
            patronen: ["redelijk vermoeden", "\\b27\\b", "verdacht"],
            toelichting:
              "Wie als verdachte wordt aangemerkt, volgt uit art. 27 Sv: een redelijk vermoeden van schuld, gebaseerd op feiten en omstandigheden.",
            bronIds: ["sv-27-1"],
          },
        ],
      },
      {
        key: "bevoegd",
        modelantwoord:
          "De opsporingsambtenaar (de agent) is zelf bevoegd; art. 96b lid 1 Sv noemt de opsporingsambtenaar. Een machtiging van de officier van justitie is niet nodig.",
        kernpunten: [
          {
            id: "c1-b1",
            label: "Opsporingsambtenaar is zelf bevoegd",
            patronen: ["opsporingsambtenaar", "agent", "zelf"],
            toelichting:
              "Art. 96b lid 1 Sv kent de bevoegdheid rechtstreeks toe aan de opsporingsambtenaar.",
            bronIds: ["sv-96b-1"],
          },
          {
            id: "c1-b2",
            label: "Geen machtiging officier van justitie nodig",
            patronen: ["geen (schriftelijke )?machtiging", "zonder machtiging", "niet nodig", "niet vereist"],
            toelichting:
              "Voor het doorzoeken van een vervoermiddel (buiten het woongedeelte) noemt art. 96b lid 1 Sv geen machtigingsvereiste.",
            bronIds: ["sv-96b-1"],
          },
        ],
      },
      {
        key: "vorm",
        modelantwoord:
          "De doorzoeking is toegestaan zonder toestemming van de bewoner, maar niet voor een woongedeelte van het vervoermiddel. Hier is geen woongedeelte, dus dat beperkt de doorzoeking niet. De doorzoeking geschiedt ter inbeslagneming; de agenten mogen zich toegang tot de auto verschaffen.",
        kernpunten: [
          {
            id: "c1-f1",
            label: "Woongedeelte uitgezonderd",
            patronen: ["woongedeelte", "geen woning", "geen woon", "woon"],
            toelichting:
              "Art. 96b lid 1 Sv sluit het woongedeelte van een vervoermiddel uit zonder toestemming van de bewoner.",
            bronIds: ["sv-96b-1"],
          },
          {
            id: "c1-f2",
            label: "Doel: inbeslagneming; toegang verschaffen",
            patronen: ["inbeslag", "toegang"],
            toelichting:
              "De doorzoeking dient ter inbeslagneming en omvat het zich toegang verschaffen tot het vervoermiddel.",
            bronIds: ["sv-96b-1"],
          },
        ],
      },
      {
        key: "proportionaliteit",
        modelantwoord:
          "De doorzoeking moet gericht zijn op voor inbeslagneming vatbare voorwerpen en niet verder gaan dan nodig. Een doorzoeking zonder de wettelijke voorwaarden kan een vormverzuim opleveren met mogelijk bewijsuitsluiting (art. 359a Sv), al is dat volgens de Hoge Raad een uitzondering.",
        kernpunten: [
          {
            id: "c1-p1",
            label: "Doorzoeking beperkt tot wat nodig is",
            patronen: ["proportion", "subsidiar", "evenredig", "noodzak", "niet verder"],
            toelichting:
              "De bevoegdheid is gekoppeld aan inbeslagneming; de uitoefening moet daarop gericht zijn.",
            bronIds: ["sv-96b-1"],
          },
          {
            id: "c1-p2",
            label: "Gevolg bij onrechtmatigheid: art. 359a Sv",
            patronen: ["359a", "bewijsuitsluiting", "vormverzuim"],
            toelichting:
              "De Hoge Raad (2023) overwoog dat bewijsuitsluiting bij onrechtmatige doorzoeking niet automatisch volgt.",
            bronIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "c2-gemeentewet-noodbevel",
    titel: "Ernstige wanordelijkheden na een voetbalwedstrijd",
    niveau: ["agent", "gemengd"],
    wetten: ["gemw"],
    vraag:
      "Op welke bevoegdheid kan de burgemeester zich beroepen en wat is de rol van de politie? Werk de vijf aspecten uit.",
    situatie: [
      "Na afloop van een voetbalderby ontstaan in het stadscentrum ernstige wanordelijkheden: supporters gooien met vuurwerk en fietsen, winkelruiten sneuvelen en er is een concreet risico dat de situatie escaleert. De driehoek (burgemeester, officier van justitie, politiechef) overlegt telefonisch.",
      "De burgemeester wil dat een groep van circa 300 supporters het plein verlaat en een tijdelijk voorschrift dat verblijf op het plein verbiedt. Hij vraagt de politie dit uit te voeren, zo nodig met geweldsmiddelen.",
    ],
    bijlage: {
      titel: "Concept-bevel burgemeester (fictief)",
      inhoud:
        "Bevel: groepen personen op het Stationsplein dienen het plein onmiddellijk te verlaten. Waarschuwing wordt via de omroepwagen gegeven. De politie voert het bevel uit onder het gezag van de burgemeester.",
    },
    uitspraken: [],
    aspecten: [
      {
        key: "grondslag",
        modelantwoord:
          "De burgemeester is belast met de handhaving van de openbare orde (art. 172 lid 1 Gemeentewet) en kan bij verstoring bevelen geven (art. 172 lid 3). Bij ernstige wanordelijkheden geldt het noodbevel van art. 175 lid 1; voor algemeen verbindende voorschriften de noodverordening van art. 176 lid 1.",
        kernpunten: [
          {
            id: "c2-g1",
            label: "Art. 172 Gemeentewet (handhaving openbare orde)",
            patronen: ["\\b172\\b"],
            toelichting:
              "Art. 172 lid 1 maakt de burgemeester verantwoordelijk voor de handhaving van de openbare orde; lid 3 geeft hem de bevelsbevoegdheid.",
            bronIds: ["gw-172-1", "gw-172-3"],
          },
          {
            id: "c2-g2",
            label: "Art. 175 Gemeentewet (noodbevel)",
            patronen: ["\\b175\\b", "noodbevel"],
            toelichting:
              "Het noodbevel is een bevel bij oproerige beweging of andere ernstige wanordelijkheden.",
            bronIds: ["gw-175-1"],
          },
          {
            id: "c2-g3",
            label: "Art. 176 Gemeentewet (noodverordening) voor algemene voorschriften",
            patronen: ["\\b176\\b", "noodverordening"],
            toelichting:
              "Een algemeen verbindend voorschrift (zoals een verblijfsverbod voor het plein) vergt de noodverordening van art. 176.",
            bronIds: ["gw-176-1"],
          },
        ],
      },
      {
        key: "verdenking",
        modelantwoord:
          "Het criterium is geen verdenking van een strafbaar feit, maar de omstandigheid: oproerige beweging, andere ernstige wanordelijkheden of rampen, dan wel ernstige vrees voor het ontstaan daarvan (art. 175 lid 1). Hier zijn ernstige wanordelijkheden aan de orde.",
        kernpunten: [
          {
            id: "c2-v1",
            label: "Ernstige wanordelijkheden / ernstige vrees",
            patronen: ["ernstige wanordelijk", "oproerige", "ernstige vrees", "wanordelijkhe"],
            toelichting:
              "Art. 175 lid 1 noemt als criterium oproerige beweging, andere ernstige wanordelijkheden of rampen, dan wel ernstige vrees voor het ontstaan daarvan.",
            bronIds: ["gw-175-1"],
          },
        ],
      },
      {
        key: "bevoegd",
        modelantwoord:
          "De burgemeester is bevoegd. De politie voert het bevel uit onder zijn gezag; de agent beslist dus niet zelf over het noodbevel of de noodverordening.",
        kernpunten: [
          {
            id: "c2-b1",
            label: "Burgemeester is bevoegd",
            patronen: ["burgemeester"],
            toelichting:
              "Zowel art. 172 als art. 175 en 176 Gemeentewet kennen de bevoegdheid toe aan de burgemeester.",
            bronIds: ["gw-172-1", "gw-175-1"],
          },
          {
            id: "c2-b2",
            label: "Politie voert uit",
            patronen: ["politie (voert|handhaaft)", "uitvoer", "voert (het )?uit", "gezag"],
            toelichting:
              "De politie voert het bevel uit; de bevoegdheid om het te geven ligt bij de burgemeester.",
            bronIds: [],
          },
        ],
      },
      {
        key: "vorm",
        modelantwoord:
          "Voordat maatregelen van geweld worden genomen, moet de nodige waarschuwing zijn gegeven (art. 175 lid 2). Een algemeen verbindend voorschrift loopt via de noodverordening (art. 176).",
        kernpunten: [
          {
            id: "c2-f1",
            label: "Nodige waarschuwing vóór geweld",
            patronen: ["waarschuw"],
            toelichting:
              "Art. 175 lid 2: de burgemeester laat tot maatregelen van geweld niet overgaan dan na het doen van de nodige waarschuwing.",
            bronIds: ["gw-175-2"],
          },
        ],
      },
      {
        key: "proportionaliteit",
        modelantwoord:
          "De bevelen moeten noodzakelijk zijn voor de handhaving van de openbare orde of beperking van gevaar (art. 172 lid 3; art. 175 lid 1; art. 176 lid 1). Geweld alleen als lichtere middelen, zoals een waarschuwing, niet volstaan.",
        kernpunten: [
          {
            id: "c2-p1",
            label: "Noodzakelijk voor handhaving openbare orde / beperking gevaar",
            patronen: ["noodzak", "nodig", "proportion", "subsidiar", "evenredig"],
            toelichting:
              "De wettekst bindt de bevelen aan wat nodig of noodzakelijk is voor de handhaving van de openbare orde of beperking van gevaar.",
            bronIds: ["gw-172-3", "gw-176-1"],
          },
        ],
      },
    ],
  },
  {
    id: "c3-hovj-woning-doorzoeking",
    titel: "HOvJ: doorzoeking woning bij niet bereikbare officier van justitie",
    niveau: ["hovj", "gemengd"],
    wetten: ["sv", "awbi", "opiumwet"],
    vraag:
      "Mag u als hulpofficier van justitie de woning van Kaya doorzoeken? Werk de vijf aspecten uit.",
    situatie: [
      "U bent hulpofficier van justitie (HOvJ). Om 04.10 uur meldt het drugsteam dat Kaya is aangehouden op heterdaad bij de overdracht van 2 kilo cocaïne in een auto. Kaya zegt dat de rest van de partij in zijn woning ligt. Er is concreet gevaar dat familieleden de voorraad wegmaken zodra zij horen van de aanhouding.",
      "De dienstdoende officier van justitie is na meerdere pogingen telefonisch niet bereikbaar. De rechter-commissaris kan zo snel niet worden gehaald. Kaya weigert toestemming voor betreding van zijn woning.",
    ],
    bijlage: {
      titel: "Meldkamerlogboek (fictief)",
      inhoud:
        "04.12 OvJ-piket gebeld: geen gehoor. 04.17 tweede poging: geen gehoor. 04.21 derde poging via meldkamer: geen gehoor. 04.22 verdachte weigert toestemming voor betreden woning. Bewoners zijn volgens het drugsteam thuis en alert.",
    },
    uitspraken: ["ECLI:NL:HR:2015:4"],
    aspecten: [
      {
        key: "grondslag",
        modelantwoord:
          "De bevoegdheid tot doorzoeking van een woning zonder toestemming ter inbeslagneming berust op art. 97 Sv; voor het binnentreden is een machtiging vereist op grond van art. 2 Awbi. Het feit zelf valt onder de Opiumwet (art. 2).",
        kernpunten: [
          {
            id: "c3-g1",
            label: "Art. 97 Sv (doorzoeking woning ter inbeslagneming)",
            patronen: ["\\b97\\b"],
            toelichting:
              "Art. 97 Sv regelt de doorzoeking van een woning zonder toestemming van de bewoner ter inbeslagneming.",
            bronIds: ["sv-97-1", "sv-97-3"],
          },
          {
            id: "c3-g2",
            label: "Awbi (machtiging binnentreden)",
            patronen: ["awbi", "algemene wet op het binnentreden", "binnentreden"],
            toelichting:
              "Voor het binnentreden in een woning zonder toestemming van de bewoner is op grond van art. 2 Awbi een schriftelijke machtiging vereist.",
            bronIds: ["awbi-2-1"],
          },
          {
            id: "c3-g3",
            label: "Opiumwet (art. 2)",
            patronen: ["opiumwet", "\\bart(ikel|\\.)?\\s*2\\b.*(ow|opium)", "\\bow\\b"],
            toelichting:
              "Het aanwezig hebben en verhandelen van lijst I-middelen valt onder art. 2 Opiumwet.",
            bronIds: ["ow-2"],
          },
        ],
      },
      {
        key: "verdenking",
        modelantwoord:
          "Er is ontdekking op heterdaad van een strafbaar feit. Daarnaast is vereist dat sprake is van dringende noodzakelijkheid en dat het optreden van de rechter-commissaris niet kan worden afgewacht.",
        kernpunten: [
          {
            id: "c3-v1",
            label: "Heterdaad (of verdenking misdrijf art. 67 lid 1)",
            patronen: ["heterdaad", "\\b67\\b"],
            toelichting:
              "Art. 97 lid 1 Sv geldt bij ontdekking op heterdaad of verdenking van een misdrijf als bedoeld in art. 67 lid 1 Sv.",
            bronIds: ["sv-97-1"],
          },
          {
            id: "c3-v2",
            label: "Dringende noodzakelijkheid; RC niet af te wachten",
            patronen: ["dringende noodzak", "rechter-commissaris.*(niet|afgewacht)", "\\brc\\b.*(niet|afgewacht)"],
            toelichting:
              "Art. 97 lid 1 Sv vereist dringende noodzakelijkheid en dat het optreden van de rechter-commissaris niet kan worden afgewacht.",
            bronIds: ["sv-97-1"],
          },
        ],
      },
      {
        key: "bevoegd",
        modelantwoord:
          "De bevoegdheid ligt in eerste instantie bij de officier van justitie. Kan ook zijn optreden niet worden afgewacht, dan komt de bevoegdheid tot doorzoeking toe aan de hulpofficier (art. 97 lid 3 Sv). De HOvJ mag dus optreden, maar alleen omdat de OvJ aantoonbaar niet bereikbaar is.",
        kernpunten: [
          {
            id: "c3-b1",
            label: "HOvJ bevoegd als OvJ niet kan worden afgewacht (lid 3)",
            patronen: ["hulpofficier", "hovj"],
            toelichting:
              "Art. 97 lid 3 Sv: kan ook het optreden van de officier van justitie niet worden afgewacht, dan komt de bevoegdheid tot doorzoeking toe aan de hulpofficier.",
            bronIds: ["sv-97-3"],
          },
          {
            id: "c3-b2",
            label: "Voorwaarde: OvJ niet bereikbaar / niet af te wachten",
            patronen: ["(officier|ovj).*(niet|afgewacht|bereik)", "niet (kan )?(worden )?afgewacht", "niet bereikbaar"],
            toelichting:
              "De bevoegdheid van de HOvJ is subsidiair aan die van de OvJ; leg vast hoe vaak u hebt geprobeerd te bellen.",
            bronIds: ["sv-97-3"],
          },
        ],
      },
      {
        key: "vorm",
        modelantwoord:
          "Zonder toestemming van de bewoner is voor het binnentreden een schriftelijke machtiging vereist (art. 2 lid 1 Awbi), die zo mogelijk wordt getoond. De uitzondering in lid 3 betreft ernstig en onmiddellijk gevaar voor de veiligheid van personen of goederen; gevaar voor wegmaking van bewijs valt daar niet zonder meer onder. Bij dringende noodzakelijkheid kan de HOvJ de machtiging geven als de OvJ niet kan worden afgewacht.",
        kernpunten: [
          {
            id: "c3-f1",
            label: "Schriftelijke machtiging (Awbi)",
            patronen: ["schriftelijke machtiging", "machtiging"],
            toelichting:
              "Art. 2 lid 1 Awbi: voor het binnentreden zonder toestemming is een schriftelijke machtiging vereist; zo mogelijk wordt zij getoond.",
            bronIds: ["awbi-2-1", "awbi-hovj"],
          },
          {
            id: "c3-f2",
            label: "Zonder toestemming van de bewoner",
            patronen: ["zonder toestemming", "geen toestemming", "weigert"],
            toelichting:
              "Art. 97 Sv gaat over doorzoeking van een woning zonder toestemming van de bewoner; met toestemming gelden andere regels.",
            bronIds: ["sv-97-1"],
          },
          {
            id: "c3-f3",
            label: "Uitzondering Awbi lid 3 is hier niet zonder meer van toepassing",
            patronen: ["lid 3", "ernstig en onmiddellijk gevaar", "uitzondering"],
            toelichting:
              "Art. 2 lid 3 Awbi vereist ernstig en onmiddellijk gevaar voor de veiligheid van personen of goederen; toets of dat hier speelt.",
            bronIds: ["awbi-2-3"],
          },
        ],
      },
      {
        key: "proportionaliteit",
        modelantwoord:
          "De dringende noodzakelijkheid vormt de kern van de afweging: er is concreet gevaar voor wegmaking, geen mogelijkheid om de OvJ of RC tijdig te bereiken en er is geen lichter middel (toestemming is geweigerd). De doorzoeking blijft beperkt tot de plaatsen waar de voorraad vermoed wordt. Zonder de wettelijke voorwaarden dreigt een vormverzuim met mogelijk bewijsuitsluiting (art. 359a Sv).",
        kernpunten: [
          {
            id: "c3-p1",
            label: "Wegmaking / geen lichter middel",
            patronen: ["wegmaking", "wegmaken", "gevaar", "subsidiar", "lichter"],
            toelichting:
              "Subsidiariteit: er is geen lichter middel (toestemming geweigerd, OvJ en RC niet tijdig bereikbaar) bij concreet gevaar voor wegmaking.",
            bronIds: ["sv-97-1"],
          },
          {
            id: "c3-p2",
            label: "Proportionaliteit: beperkt tot wat nodig is",
            patronen: ["proportion", "evenredig", "beperkt", "niet verder", "noodzak"],
            toelichting:
              "De doorzoeking moet gericht zijn op inbeslagneming en niet verder gaan dan nodig.",
            bronIds: ["sv-97-1"],
          },
        ],
      },
    ],
  },
];

export const getCasus = (id: string) => CASUS_POOL.find((c) => c.id === id);
