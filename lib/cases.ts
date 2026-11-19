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
      "De dienstdoende officier van justitie is na meerdere pogingen telefonisch niet bereikbaar. De piket-rechter-commissaris is telefonisch wel bereikbaar, maar kan niet zelf op tijd ter plaatse zijn om de doorzoeking te verrichten. Kaya weigert toestemming voor betreding van zijn woning.",
    ],
    bijlage: {
      titel: "Meldkamerlogboek (fictief)",
      inhoud:
        "04.12 OvJ-piket gebeld: geen gehoor. 04.17 tweede poging: geen gehoor. 04.21 derde poging via meldkamer: geen gehoor. 04.23 RC-piket telefonisch bereikt: kan niet zelf tijdig ter plaatse komen. 04.22 verdachte weigert toestemming voor betreden woning. Bewoners zijn volgens het drugsteam thuis en alert.",
    },
    uitspraken: ["ECLI:NL:HR:2015:4"],
    aspecten: [
      {
        key: "grondslag",
        modelantwoord:
          "De bevoegdheid tot doorzoeking van een woning zonder toestemming ter inbeslagneming berust op art. 97 Sv (lid 1; voor de hulpofficier lid 3) en vereist een machtiging van de rechter-commissaris (lid 2). Een aparte machtiging op grond van art. 2 Awbi is dan niet nodig (art. 97 lid 4 Sv). Het feit zelf valt onder de Opiumwet (art. 2).",
        kernpunten: [
          {
            id: "c3-g1",
            label: "Art. 97 Sv (doorzoeking woning ter inbeslagneming)",
            patronen: ["\\b97\\b"],
            toelichting:
              "Art. 97 Sv regelt de doorzoeking van een woning zonder toestemming van de bewoner ter inbeslagneming.",
            bronIds: ["sv-97-1", "sv-97-2", "sv-97-3"],
          },
          {
            id: "c3-g2",
            label: "Awbi (machtiging binnentreden)",
            patronen: ["awbi", "algemene wet op het binnentreden", "binnentreden"],
            toelichting:
              "Voor het binnentreden in een woning zonder toestemming van de bewoner is op grond van art. 2 lid 1 Awbi in beginsel een schriftelijke machtiging vereist; art. 97 lid 4 Sv neemt dat vereiste weg voor de hulpofficier aan wie de rechter-commissaris machtiging heeft verleend.",
            bronIds: ["awbi-2-1", "sv-97-4"],
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
              "Art. 97 lid 1 Sv vereist dringende noodzakelijkheid en dat het optreden van de rechter-commissaris (die zelf de doorzoeking zou verrichten) niet kan worden afgewacht.",
            bronIds: ["sv-97-1"],
          },
        ],
      },
      {
        key: "bevoegd",
        modelantwoord:
          "De bevoegdheid ligt in eerste instantie bij de officier van justitie (lid 1). Kan ook zijn optreden niet worden afgewacht, dan komt de bevoegdheid tot doorzoeking toe aan de hulpofficier (art. 97 lid 3 Sv). Ook de hulpofficier heeft een machtiging van de rechter-commissaris nodig (lid 2, via lid 3 van overeenkomstige toepassing); die wordt zo mogelijk door tussenkomst van de OvJ gevraagd, hier dus rechtstreeks bij de piket-RC omdat de OvJ niet bereikbaar is.",
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
          {
            id: "c3-b3",
            label: "Machtiging van de rechter-commissaris vereist",
            patronen: ["machtiging.*(rechter|\\brc\\b)", "(rechter-commissaris|\\brc\\b).*machtiging"],
            toelichting:
              "Art. 97 lid 2 Sv: voor de doorzoeking is een machtiging van de rechter-commissaris nodig. Lid 3 verklaart lid 1 en 2 van overeenkomstige toepassing op de hulpofficier en bepaalt dat de machtiging zo mogelijk via de OvJ wordt gevraagd.",
            bronIds: ["sv-97-2", "sv-97-3"],
          },
        ],
      },
      {
        key: "vorm",
        modelantwoord:
          "Voor de doorzoeking is een met redenen omklede machtiging van de rechter-commissaris nodig (art. 97 lid 2 Sv). Heeft de rechter-commissaris de hulpofficier die machtiging verleend, dan is voor het binnentreden in de woning geen machtiging als bedoeld in art. 2 Awbi vereist (art. 97 lid 4 Sv). De algemene Awbi-regel (schriftelijke machtiging, zo mogelijk getoond; art. 2 lid 1) wordt hier dus door art. 97 lid 4 Sv gedekt. De Awbi-uitzondering van lid 3 (ernstig en onmiddellijk gevaar voor de veiligheid van personen of goederen) is voor gevaar van wegmaking van bewijs niet zonder meer aan de orde.",
        kernpunten: [
          {
            id: "c3-f1",
            label: "Machtiging RC (art. 97 lid 2); daarna geen Awbi-machtiging nodig (lid 4)",
            patronen: ["rechter-commissaris", "\\brc\\b", "lid 4", "geen (awbi-)?machtiging"],
            toelichting:
              "Art. 97 lid 2 Sv vereist een machtiging van de rechter-commissaris. Art. 97 lid 4 Sv: heeft de RC de hulpofficier machtiging verleend, dan is voor het binnentreden geen machtiging als bedoeld in art. 2 Awbi vereist (de algemene regel van art. 2 lid 1 Awbi).",
            bronIds: ["sv-97-2", "sv-97-4", "awbi-2-1"],
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
          "De dringende noodzakelijkheid vormt de kern van de afweging: er is concreet gevaar voor wegmaking, de OvJ is niet bereikbaar, de RC kan niet zelf tijdig optreden en er is geen lichter middel (toestemming is geweigerd). De machtiging van de RC blijft wel nodig en wordt telefonisch gevraagd. De doorzoeking blijft beperkt tot de plaatsen waar de voorraad vermoed wordt. Zonder de wettelijke voorwaarden dreigt een vormverzuim met mogelijk bewijsuitsluiting (art. 359a Sv).",
        kernpunten: [
          {
            id: "c3-p1",
            label: "Wegmaking / geen lichter middel",
            patronen: ["wegmaking", "wegmaken", "gevaar", "subsidiar", "lichter"],
            toelichting:
              "Subsidiariteit: er is geen lichter middel (toestemming geweigerd, OvJ niet bereikbaar, RC kan niet zelf tijdig optreden) bij concreet gevaar voor wegmaking.",
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
  {
    id: "c4-wwm-pistool",
    titel: "Pistool in de jaszak op het stationsplein",
    niveau: ["agent", "gemengd"],
    wetten: ["wwm", "sv"],
    vraag:
      "Welke bevoegdheden hebben de agenten bij Bakir en wat moet er daarna gebeuren? Werk de vijf aspecten uit.",
    situatie: [
      "Om 01.15 uur zien agenten Smit en De Vries op het stationsplein hoe Bakir een pistool uit zijn jaszak haalt en aan een vriend laat zien. De agenten lopen op hem af en nemen het pistool af. Het is een vuurwapen van categorie III. Bakir heeft geen verlof en kan ook geen ontheffing tonen.",
      "De agenten willen Bakir aanhouden en zijn kleding onderzoeken op meer wapens of munitie.",
    ],
    bijlage: {
      titel: "Aantekening agent Smit (fictief)",
      inhoud:
        "01.15 uur: pistool waargenomen in de hand van Bakir. 01.16 uur: pistool veiliggesteld. 01.17 uur: Bakir aangehouden. Geen toestemming gevraagd voor onderzoek aan kleding.",
    },
    uitspraken: [],
    aspecten: [
      {
        key: "grondslag",
        modelantwoord:
          "Het voorhanden hebben van een wapen van categorie III is verboden op grond van art. 26 lid 1 WWM (voor categorie I geldt art. 13 lid 1). De aanhouding op heterdaad berust op art. 53 Sv; het onderzoek aan de kleding van de aangehouden verdachte op art. 56 Sv (lid 4 voor de overige opsporingsambtenaren, lid 1 voor de OvJ en HOvJ).",
        kernpunten: [
          {
            id: "c4-g1",
            label: "Art. 26 lid 1 WWM (categorie II/III voorhanden hebben)",
            patronen: ["\\b26\\b", "wwm", "wet wapens"],
            toelichting:
              "Art. 26 lid 1 verbiedt het voorhanden hebben van een wapen of munitie van de categorieën II en III. Voor categorie I staat het verbod in art. 13 lid 1.",
            bronIds: ["ww-26-1", "ww-13-1"],
          },
          {
            id: "c4-g2",
            label: "Art. 53 Sv (aanhouding op heterdaad)",
            patronen: ["\\b53\\b"],
            toelichting: "De aanhouding bij ontdekking op heterdaad volgt uit art. 53 Sv.",
            bronIds: ["sv-53-2"],
          },
          {
            id: "c4-g3",
            label: "Art. 56 Sv (onderzoek aan kleding of lichaam)",
            patronen: ["\\b56\\b"],
            toelichting: "Een onderzoek aan kleding of lichaam van de aangehouden verdachte is geregeld in art. 56 Sv.",
            bronIds: ["sv-56-4", "sv-56-1"],
          },
        ],
      },
      {
        key: "verdenking",
        modelantwoord:
          "Er is ontdekking op heterdaad van een strafbaar feit: het voorhanden hebben van een pistool zonder verlof, waargenomen door de agenten zelf. Dat geeft ook een redelijk vermoeden van schuld (art. 27 Sv). Voor het onderzoek aan kleding zijn bovendien ernstige bezwaren vereist (art. 56 lid 1 en lid 4).",
        kernpunten: [
          {
            id: "c4-v1",
            label: "Heterdaad of redelijk vermoeden van schuld",
            patronen: ["heterdaad", "redelijk vermoeden", "\\b27\\b"],
            toelichting: "De agenten namen het strafbare feit zelf waar; dat is ontdekking op heterdaad.",
            bronIds: ["sv-53-2", "sv-27-1"],
          },
          {
            id: "c4-v2",
            label: "Ernstige bezwaren voor onderzoek aan kleding",
            patronen: ["ernstige bezwaren"],
            toelichting: "Art. 56 lid 4 Sv vereist ernstige bezwaren tegen de aangehouden verdachte; lid 1 noemt dat ook.",
            bronIds: ["sv-56-4", "sv-56-1"],
          },
        ],
      },
      {
        key: "bevoegd",
        modelantwoord:
          "De agent (opsporingsambtenaar) mag Bakir zelf aanhouden en brengt hem ten spoedigste over voor voorgeleiding aan de hulpofficier van justitie of de officier van justitie. De kleding van de aangehouden verdachte mag de agent (een van de overige opsporingsambtenaren) zelf onderzoeken zolang er ernstige bezwaren zijn (art. 56 lid 4). Daarnaast kan de officier van justitie of de hulpofficier bepalen dat de verdachte aan zijn lichaam of kleding wordt onderzocht (art. 56 lid 1).",
        kernpunten: [
          {
            id: "c4-b1",
            label: "Agent houdt zelf aan bij heterdaad",
            patronen: ["agent", "opsporingsambtenaar", "zelf"],
            toelichting: "Art. 53 Sv geeft de opsporingsambtenaar de bevoegdheid bij ontdekking op heterdaad.",
            bronIds: ["sv-53-2"],
          },
          {
            id: "c4-b2",
            label: "Agent mag de kleding van de aangehouden verdachte zelf onderzoeken (lid 4)",
            patronen: ["kleding", "kleeding", "fouille", "overige opsporingsambtenaren", "lid 4"],
            toelichting:
              "Art. 56 lid 4 Sv: de overige opsporingsambtenaren zijn bevoegd de aangehouden verdachte tegen wie ernstige bezwaren bestaan aan zijn kleding te onderzoeken.",
            bronIds: ["sv-56-4"],
          },
          {
            id: "c4-b3",
            label: "OvJ of HOvJ kan onderzoek aan lichaam of kleding bepalen (lid 1)",
            patronen: ["hulpofficier", "hovj", "officier van justitie", "\\bovj\\b"],
            toelichting:
              "Art. 56 lid 1 Sv noemt de officier van justitie of de hulpofficier, die in het belang van het onderzoek kunnen bepalen dat de verdachte aan zijn lichaam of kleding wordt onderzocht.",
            bronIds: ["sv-56-1"],
          },
        ],
      },
      {
        key: "vorm",
        modelantwoord:
          "De aanhouder brengt de verdachte ten spoedigste over naar de plaats voor verhoor ter voorgeleiding aan de hulpofficier of de officier van justitie (art. 53 lid 2 Sv). De kleding mag de agent zelf onderzoeken (art. 56 lid 4); voor een onderzoek aan het lichaam is een bepaling van de OvJ of HOvJ aan de orde (art. 56 lid 1).",
        kernpunten: [
          {
            id: "c4-f1",
            label: "Ten spoedigste overbrengen voor voorgeleiding",
            patronen: ["spoedig", "voorgeleid", "voorleid", "overbrengen", "overgebracht"],
            toelichting:
              "Art. 53 lid 2 Sv: de aanhouder brengt de verdachte ten spoedigste over naar de plaats voor verhoor ter voorgeleiding aan de HOvJ of OvJ.",
            bronIds: ["sv-53-2"],
          },
          {
            id: "c4-f2",
            label: "Agent beperkt zich tot kleding; lichaam via OvJ/HOvJ (lid 1)",
            patronen: ["lichaam", "bepal", "bevel", "opdracht", "hulpofficier", "hovj"],
            toelichting:
              "Art. 56 lid 4 geeft de agent de bevoegdheid voor de kleding. Voor onderzoek aan het lichaam noemt lid 1 de OvJ of HOvJ.",
            bronIds: ["sv-56-4", "sv-56-1"],
          },
        ],
      },
      {
        key: "proportionaliteit",
        modelantwoord:
          "Het onderzoek aan kleding of lichaam vereist ernstige bezwaren (lid 4) en, bij een bepaling van de OvJ of HOvJ, het belang van het onderzoek (lid 1); het mag niet verder gaan dan daarvoor nodig is.",
        kernpunten: [
          {
            id: "c4-p1",
            label: "In het belang van het onderzoek / niet verder dan nodig",
            patronen: ["belang van het onderzoek", "proportion", "subsidiar", "noodzak", "evenredig", "niet verder"],
            toelichting: "Art. 56 lid 1 koppelt het onderzoek aan het belang van het onderzoek; lid 4 aan ernstige bezwaren.",
            bronIds: ["sv-56-1", "sv-56-4"],
          },
        ],
      },
    ],
  },
  {
    id: "c5-wvw-alcohol",
    titel: "Slingerende bestuurder en bloedonderzoek",
    niveau: ["agent", "gemengd"],
    wetten: ["wvw", "sv"],
    vraag:
      "Welke bevelen mag de agent geven en wie mag een bevel tot bloedonderzoek geven als Mertens weigert? Werk de vijf aspecten uit.",
    situatie: [
      "Om 02.10 uur ziet agent Willems een auto slingeren over de weg. Hij stopt de auto. Bestuurder Mertens ruikt naar alcohol en praat onduidelijk. Er bestaat verdenking dat Mertens in strijd met art. 8 WVW heeft gehandeld.",
      "Willems beveelt Mertens mee te werken aan een ademonderzoek. Mertens blaast meerdere keren onvoldoende door, waardoor het ademonderzoek niet wordt voltooid. Daarna vraagt Willems om toestemming voor een bloedonderzoek. Mertens weigert.",
    ],
    bijlage: {
      titel: "Verloop (fictief)",
      inhoud:
        "02.10 auto gestopt. 02.14 bevel medewerking ademonderzoek. 02.20 drie pogingen, geen voltooid onderzoek. 02.24 toestemming bloedonderzoek gevraagd, geweigerd.",
    },
    uitspraken: [],
    aspecten: [
      {
        key: "grondslag",
        modelantwoord:
          "Art. 163 WVW 1994: lid 1 (bevel tot medewerking aan een ademonderzoek bij verdenking van overtreding van art. 8), lid 4 (toestemming vragen voor bloedonderzoek) en lid 5 (bevel bij weigering).",
        kernpunten: [
          {
            id: "c5-g1",
            label: "Art. 163 lid 1 WVW (bevel medewerking ademonderzoek)",
            patronen: ["\\b163\\b"],
            toelichting: "Art. 163 lid 1 WVW geeft de opsporingsambtenaar de bevoegdheid tot het bevel.",
            bronIds: ["wvw-163-1"],
          },
          {
            id: "c5-g2",
            label: "Art. 163 lid 4 en 5 WVW (bloedonderzoek)",
            patronen: ["lid 4", "vierde lid", "lid 5", "vijfde lid"],
            toelichting: "Lid 4 regelt de vraag om toestemming; lid 5 het bevel bij weigering.",
            bronIds: ["wvw-163-4", "wvw-163-5"],
          },
        ],
      },
      {
        key: "verdenking",
        modelantwoord:
          "Het bevel tot medewerking vereist verdenking dat de bestuurder in strijd met art. 8 WVW heeft gehandeld (rijden onder invloed).",
        kernpunten: [
          {
            id: "c5-v1",
            label: "Verdenking overtreding art. 8 WVW",
            patronen: ["verdenking", "vermoeden", "verdacht", "\\b8\\b"],
            toelichting: "Art. 163 lid 1 begint met: bij verdenking dat de bestuurder heeft gehandeld in strijd met art. 8.",
            bronIds: ["wvw-163-1"],
          },
        ],
      },
      {
        key: "bevoegd",
        modelantwoord:
          "De opsporingsambtenaar mag het bevel tot medewerking aan het ademonderzoek geven en om toestemming voor bloedonderzoek vragen. Bij weigering kan de officier van justitie, een hulpofficier van justitie of een daartoe aangewezen ambtenaar het bevel geven (lid 5).",
        kernpunten: [
          {
            id: "c5-b1",
            label: "Opsporingsambtenaar geeft bevel ademonderzoek",
            patronen: ["opsporingsambtenaar", "agent"],
            toelichting: "Art. 163 lid 1 noemt de opsporingsambtenaar.",
            bronIds: ["wvw-163-1"],
          },
          {
            id: "c5-b2",
            label: "Bevel na weigering: OvJ, HOvJ of aangewezen ambtenaar",
            patronen: ["hulpofficier", "hovj", "officier van justitie", "\\bovj\\b", "aangewezen"],
            toelichting: "Art. 163 lid 5 noemt de OvJ, de HOvJ of een daartoe aangewezen ambtenaar.",
            bronIds: ["wvw-163-5"],
          },
        ],
      },
      {
        key: "vorm",
        modelantwoord:
          "Eerst moet om toestemming voor het bloedonderzoek worden gevraagd (lid 4), en wel nadat de medewerking niet tot een voltooid ademonderzoek heeft geleid. Pas bij weigering kan het bevel van lid 5 worden gegeven.",
        kernpunten: [
          {
            id: "c5-f1",
            label: "Eerst toestemming vragen",
            patronen: ["toestemming"],
            toelichting: "Lid 4: de opsporingsambtenaar kan de verdachte vragen of hij toestemming geeft.",
            bronIds: ["wvw-163-4"],
          },
          {
            id: "c5-f2",
            label: "Ademonderzoek niet voltooid",
            patronen: ["niet voltooid", "niet (is )?(gelukt|voltooid)", "geen voltooid", "onvoldoende"],
            toelichting: "Lid 4: bij een niet voltooid ademonderzoek kan toestemming voor een bloedonderzoek worden gevraagd.",
            bronIds: ["wvw-163-4"],
          },
        ],
      },
      {
        key: "proportionaliteit",
        modelantwoord:
          "De volgorde is: eerst het minst ingrijpende middel (ademonderzoek), daarna toestemming vragen voor bloed, en pas bij weigering een bevel. Dat is de subsidiariteit in de wettelijke opbouw.",
        kernpunten: [
          {
            id: "c5-p1",
            label: "Minst ingrijpend eerst (adem, dan bloed)",
            patronen: ["subsidiar", "proportion", "lichter", "minst ingrijpend", "eerst .*adem", "adem.*eerst", "volgorde"],
            toelichting: "De opbouw van lid 1, 4 en 5 laat zien dat ingrijpender middelen pas later komen.",
            bronIds: ["wvw-163-1", "wvw-163-4"],
          },
        ],
      },
    ],
  },
  {
    id: "c6-wid-identiteitscontrole",
    titel: "Identiteitscontrole bij overlast op een hangplek",
    niveau: ["agent", "gemengd"],
    wetten: ["wid", "pw"],
    vraag:
      "Mogen de agenten Yusuf en Lotte om een identiteitsbewijs vragen en moeten zij dat tonen? Werk de vijf aspecten uit.",
    situatie: [
      "Na meldingen van overlast surveilleren agenten bij een hangplek. Zij vragen twee jongeren naar hun identiteitsbewijs: Yusuf (17) en Lotte (13). Yusuf zegt dat hij zijn bewijs niet laat zien. Lotte heeft geen bewijs bij zich.",
    ],
    bijlage: {
      titel: "Aantekening agent (fictief)",
      inhoud:
        "Doel van de vraag: vaststellen wie bij de overlast betrokken was. Yusuf (17) weigert. Lotte (13) heeft niets bij zich. Geen strafbaar feit waargenomen.",
    },
    uitspraken: [],
    aspecten: [
      {
        key: "grondslag",
        modelantwoord:
          "De toonplicht staat in art. 2 Wet op de identificatieplicht. De bevoegdheid van de politieambtenaar om inzage van een identiteitsbewijs te vorderen staat in art. 8 lid 1 Politiewet 2012.",
        kernpunten: [
          {
            id: "c6-g1",
            label: "Art. 2 Wid (toonplicht)",
            patronen: ["\\bwid\\b", "identificatieplicht", "\\b2\\b"],
            toelichting: "Art. 2 Wid verplicht ieder vanaf veertien jaar op de eerste vordering een identiteitsbewijs ter inzage aan te bieden.",
            bronIds: ["wid-2"],
          },
          {
            id: "c6-g2",
            label: "Art. 8 Politiewet 2012 (bevoegdheid vorderen)",
            patronen: ["politiewet", "\\bpw\\b", "\\b8\\b"],
            toelichting: "Art. 8 lid 1 Pw 2012 geeft de politieambtenaar de bevoegdheid tot het vorderen van inzage.",
            bronIds: ["pw-8-1"],
          },
        ],
      },
      {
        key: "verdenking",
        modelantwoord:
          "Er is geen verdenking van een strafbaar feit nodig. De vordering moet wel noodzakelijk zijn voor de uitoefening van de politietaak; de bron bevat de volledige voorwaarde.",
        kernpunten: [
          {
            id: "c6-v1",
            label: "Noodzakelijk voor de politietaak (geen verdenking vereist)",
            patronen: ["noodzak", "politietaak", "geen verdenking", "taak"],
            toelichting:
              "Art. 8 lid 1 Pw 2012 koppelt de vordering aan wat nodig is voor de uitoefening van de politietaak. De snapshot is een fragment: lees de volledige voorwaarde in de bron.",
            bronIds: ["pw-8-1"],
          },
        ],
      },
      {
        key: "bevoegd",
        modelantwoord:
          "Een ambtenaar van politie die is aangesteld voor de uitvoering van de politietaak (art. 8 lid 1 Pw 2012).",
        kernpunten: [
          {
            id: "c6-b1",
            label: "Politieambtenaar aangesteld voor de politietaak",
            patronen: ["politie", "agent", "ambtenaar"],
            toelichting: "Art. 8 lid 1 Pw 2012 noemt de ambtenaar van politie die is aangesteld voor de uitvoering van de politietaak.",
            bronIds: ["pw-8-1"],
          },
        ],
      },
      {
        key: "vorm",
        modelantwoord:
          "De plicht geldt vanaf veertien jaar en moet worden nagekomen op de eerste vordering. Lotte (13) valt buiten de toonplicht; Yusuf (17) valt eronder.",
        kernpunten: [
          {
            id: "c6-f1",
            label: "Leeftijdsgrens veertien jaar",
            patronen: ["\\b14\\b", "veertien"],
            toelichting: "Art. 2 Wid geldt voor een ieder die de leeftijd van veertien jaar heeft bereikt.",
            bronIds: ["wid-2"],
          },
          {
            id: "c6-f2",
            label: "Op de eerste vordering",
            patronen: ["eerste vordering", "op vordering", "vordering"],
            toelichting: "Het identiteitsbewijs moet op de eerste vordering ter inzage worden aangeboden.",
            bronIds: ["wid-2"],
          },
        ],
      },
      {
        key: "proportionaliteit",
        modelantwoord:
          "De vordering moet redelijk en noodzakelijk zijn voor de taak: hier is de vraag naar identiteit gekoppeld aan de overlastmeldingen. Bij een jongere onder veertien bestaat geen toonplicht.",
        kernpunten: [
          {
            id: "c6-p1",
            label: "Noodzaak en redelijkheid van de vordering",
            patronen: ["noodzak", "redelijk", "proportion", "subsidiar", "evenredig"],
            toelichting: "Art. 8 lid 1 Pw 2012 beperkt de vordering tot wat voor de taak nodig is.",
            bronIds: ["pw-8-1"],
          },
        ],
      },
    ],
  },
];

export const getCasus = (id: string) => CASUS_POOL.find((c) => c.id === id);
