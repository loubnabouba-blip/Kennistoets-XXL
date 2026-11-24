import type { AspectKey, MCVraag, Vraagvorm } from "./types";

/**
 * Meerkeuzevragen per casus en aspect. Elk antwoord (juist én fout) is gebaseerd op de
 * gecontroleerde bronpassages in lib/sources.ts. Verwijs via bronIds naar de bewijstekst.
 */
const q = (vraag: string, juist: string, fout: string[], uitleg: string, bronIds: string[]): MCVraag => ({
  vraag,
  opties: [{ id: "j", tekst: juist }, ...fout.map((t, i) => ({ id: `f${i + 1}`, tekst: t }))],
  juist: "j",
  uitleg,
  bronIds,
});

export const MC: Record<string, Partial<Record<AspectKey, MCVraag>>> = {
  "c1-opiumwet-voertuig": {
    grondslag: q(
      "Op welke bepaling berust de bevoegdheid om de auto ter inbeslagneming te doorzoeken?",
      "Art. 96b lid 1 Sv",
      ["Art. 97 Sv", "Art. 56 Sv", "Art. 2 Opiumwet"],
      "Art. 96b lid 1 Sv geeft de opsporingsambtenaar de bevoegdheid een vervoermiddel te doorzoeken. Art. 97 gaat over plaatsen zoals een woning, art. 56 over het onderzoek aan kleding of lichaam en art. 2 Opiumwet bevat het verbod, geen bevoegdheid.",
      ["sv-96b-1"]
    ),
    verdenking: q(
      "Welke situatie is vereist voor deze doorzoeking?",
      "Ontdekking op heterdaad van een strafbaar feit, of verdenking van een misdrijf als bedoeld in art. 67 lid 1 Sv",
      ["Toestemming van de bestuurder", "Een machtiging van de rechter-commissaris", "Een bevel van de burgemeester"],
      "Art. 96b lid 1 Sv noemt ontdekking op heterdaad of verdenking van een misdrijf als bedoeld in art. 67 lid 1. Een machtiging of toestemming wordt niet genoemd.",
      ["sv-96b-1"]
    ),
    bevoegd: q(
      "Wie is bevoegd om het voertuig te doorzoeken?",
      "De opsporingsambtenaar",
      ["Alleen de officier van justitie", "Alleen de hulpofficier van justitie", "De rechter-commissaris"],
      "Art. 96b lid 1 Sv kent de bevoegdheid rechtstreeks toe aan de opsporingsambtenaar.",
      ["sv-96b-1"]
    ),
    vorm: q(
      "Wat geldt voor het woongedeelte van een vervoermiddel?",
      "Zonder toestemming van de bewoner mag het woongedeelte niet op grond van art. 96b worden doorzocht",
      [
        "Het woongedeelte mag onder dezelfde voorwaarden zonder toestemming worden doorzocht",
        "Een vervoermiddel mag nooit zonder toestemming van de bestuurder worden doorzocht",
      ],
      "Art. 96b lid 1 sluit het woongedeelte zonder toestemming van de bewoner uit. Hier is geen woongedeelte, dus dat beperkt de doorzoeking niet.",
      ["sv-96b-1"]
    ),
    proportionaliteit: q(
      "Wat kan het gevolg zijn als een doorzoeking zonder de wettelijke voorwaarden is verricht?",
      "Bewijsuitsluiting is mogelijk (art. 359a Sv), maar alleen in bepaalde gevallen en na weging van de factoren van lid 2",
      ["Het bewijs wordt altijd automatisch uitgesloten", "Er kan nooit een gevolg aan verbonden worden"],
      "Art. 359a Sv: bewijsuitsluiting is een mogelijk rechtsgevolg van een vormverzuim. De Hoge Raad overwoog in 2023 dat het alleen in bepaalde gevallen aan de orde kan zijn; of daartoe grond bestaat, volgt uit de factoren van art. 359a lid 2 Sv.",
      []
    ),
  },
  "c2-gemeentewet-noodbevel": {
    grondslag: q(
      "Op welke bepaling berust het noodbevel?",
      "Art. 175 lid 1 Gemeentewet",
      ["Art. 176 lid 1 Gemeentewet", "Art. 172 lid 1 Gemeentewet", "Art. 53 Sv"],
      "Het noodbevel staat in art. 175. Art. 176 regelt de noodverordening (algemeen verbindende voorschriften). Art. 172 lid 1 maakt de burgemeester verantwoordelijk voor de handhaving van de openbare orde.",
      ["gw-175-1", "gw-176-1", "gw-172-1"]
    ),
    verdenking: q(
      "Welk criterium geldt voor het noodbevel?",
      "Oproerige beweging, andere ernstige wanordelijkheden of rampen, dan wel ernstige vrees voor het ontstaan daarvan",
      ["Redelijk vermoeden van schuld (art. 27 Sv)", "Ontdekking op heterdaad van een strafbaar feit"],
      "Het criterium van art. 175 lid 1 is een omstandigheid, geen verdenking van een strafbaar feit.",
      ["gw-175-1"]
    ),
    bevoegd: q(
      "Wie is bevoegd het noodbevel te geven?",
      "De burgemeester",
      ["De korpschef", "De officier van justitie", "De hulpofficier van justitie"],
      "Art. 175 kent de bevoegdheid toe aan de burgemeester. De politie voert het bevel uit.",
      ["gw-175-1"]
    ),
    vorm: q(
      "Wat moet gebeuren voordat tot maatregelen van geweld wordt overgegaan?",
      "De nodige waarschuwing",
      ["Een schriftelijke machtiging van de rechter", "Toestemming van de gemeenteraad"],
      "Art. 175 lid 2: de burgemeester laat tot maatregelen van geweld niet overgaan dan na het doen van de nodige waarschuwing.",
      ["gw-175-2"]
    ),
    proportionaliteit: q(
      "Waaraan zijn algemeen verbindende voorschriften op grond van art. 176 gebonden?",
      "Ze moeten ter handhaving van de openbare orde of ter beperking van gevaar nodig zijn",
      ["Ze mogen alles bevatten wat de burgemeester wenselijk vindt", "Ze gelden alleen als de politie erom vraagt"],
      "Art. 176 lid 1 bindt de voorschriften aan wat nodig is voor de handhaving van de openbare orde of de beperking van gevaar.",
      ["gw-176-1"]
    ),
  },
  "c3-hovj-woning-doorzoeking": {
    grondslag: q(
      "Op welk artikel berust de doorzoeking van een woning zonder toestemming ter inbeslagneming bij heterdaad?",
      "Art. 97 Sv",
      ["Art. 96b Sv", "Art. 56 Sv", "Art. 53 Sv"],
      "Art. 97 Sv regelt de doorzoeking van een woning. Art. 96b gaat over vervoermiddelen, art. 56 over lichaam en kleding en art. 53 over het overbrengen van een aangehouden verdachte.",
      ["sv-97-1"]
    ),
    verdenking: q(
      "Welke voorwaarden gelden volgens art. 97 lid 1 Sv?",
      "Heterdaad of verdenking van een misdrijf uit art. 67 lid 1, dringende noodzakelijkheid, en het optreden van de rechter-commissaris kan niet worden afgewacht",
      [
        "Alleen een vermoeden dat er ergens in de woning een strafbaar feit is gepleegd",
        "Dat de bewoner toestemming geeft",
        "Alleen dat de verdachte in de woning woont",
      ],
      "Art. 97 lid 1 vereist dringende noodzakelijkheid en dat de rechter-commissaris niet kan worden afgewacht.",
      ["sv-97-1"]
    ),
    bevoegd: q(
      "Wie mag doorzoeken als ook het optreden van de officier van justitie niet kan worden afgewacht?",
      "De hulpofficier van justitie",
      ["Iedere agent", "De burgemeester", "Niemand: er moet gewacht worden op de rechter-commissaris"],
      "Art. 97 lid 3 Sv: kan ook het optreden van de officier van justitie niet worden afgewacht, dan komt de bevoegdheid toe aan de hulpofficier. Ook de hulpofficier heeft wel een machtiging van de rechter-commissaris nodig (lid 2 en 3).",
      ["sv-97-2", "sv-97-3"]
    ),
    vorm: q(
      "Wat is vereist voordat de hulpofficier een woning zonder toestemming van de bewoner ter inbeslagneming mag doorzoeken (art. 97 Sv)?",
      "Een machtiging van de rechter-commissaris (met redenen omkleed)",
      ["Alleen een mondelinge toestemming van een collega", "Bij heterdaad geen enkele machtiging", "Een bevel van de burgemeester"],
      "Art. 97 lid 2 Sv vereist een met redenen omklede machtiging van de rechter-commissaris; lid 3 verklaart dit van overeenkomstige toepassing op de hulpofficier. Met die machtiging is volgens lid 4 geen Awbi-machtiging meer nodig voor het binnentreden.",
      ["sv-97-2", "sv-97-3", "sv-97-4"]
    ),
    proportionaliteit: q(
      "Waarom is hier aan de dringende noodzakelijkheid en subsidiariteit voldaan?",
      "Er is concreet gevaar dat de voorraad wordt weggemaakt, de OvJ is niet bereikbaar, de RC kan niet zelf tijdig optreden en toestemming is geweigerd",
      ["Omdat het nacht is", "Omdat de verdachte een bekende van de politie is", "Omdat het om een grote partij gaat"],
      "De kern is dat er geen lichter middel is: gevaar voor wegmaking, OvJ niet bereikbaar, de RC kan niet zelf tijdig optreden en toestemming is geweigerd. De machtiging van de RC blijft wel vereist.",
      ["sv-97-1"]
    ),
  },
  "c4-wwm-pistool": {
    grondslag: q(
      "Welk artikel verbiedt het voorhanden hebben van een wapen van categorie III?",
      "Art. 26 lid 1 WWM",
      ["Art. 13 lid 1 WWM", "Art. 2 Opiumwet", "Art. 96b Sv"],
      "Art. 26 lid 1 WWM verbiedt het voorhanden hebben van een wapen of munitie van categorie II en III. Art. 13 lid 1 geldt voor categorie I.",
      ["ww-26-1", "ww-13-1"]
    ),
    verdenking: q(
      "Op welke grond mogen de agenten Bakir aanhouden?",
      "Ontdekking op heterdaad van een strafbaar feit",
      ["Alleen met een bevel van de hulpofficier", "Alleen na een veroordeling", "Alleen met toestemming van Bakir"],
      "De agenten namen het strafbare feit zelf waar. Dat is ontdekking op heterdaad (art. 53 Sv).",
      ["sv-53-2"]
    ),
    bevoegd: q(
      "Wie mag de kleding van een aangehouden verdachte tegen wie ernstige bezwaren bestaan onderzoeken (art. 56 lid 4 Sv)?",
      "De overige opsporingsambtenaren, dus ook de agent zelf",
      ["Alleen de officier van justitie", "Alleen de rechter-commissaris", "Alleen na een bevel van de burgemeester"],
      "Art. 56 lid 4 Sv: de overige opsporingsambtenaren zijn bevoegd de aangehouden verdachte tegen wie ernstige bezwaren bestaan aan zijn kleding te onderzoeken. Lid 1 geeft daarnaast de OvJ en de HOvJ de bevoegdheid te bepalen dat de verdachte aan zijn lichaam of kleding wordt onderzocht.",
      ["sv-56-4", "sv-56-1"]
    ),
    vorm: q(
      "Wat moet de aanhouder daarna doen (art. 53 lid 2 Sv)?",
      "De verdachte ten spoedigste overbrengen naar de plaats voor verhoor, ter voorgeleiding aan de hulpofficier of de officier van justitie",
      [
        "De verdachte meteen laten gaan als het wapen is afgenomen",
        "De verdachte rechtstreeks voorgeleiden aan de rechter-commissaris",
        "Wachten tot de volgende ochtend",
      ],
      "Art. 53 lid 2: ten spoedigste overbrengen voor voorgeleiding aan de HOvJ of de OvJ.",
      ["sv-53-2"]
    ),
    proportionaliteit: q(
      "Welke voorwaarde geldt voor het onderzoek aan de kleding van een aangehouden verdachte (art. 56 Sv)?",
      "Er moeten ernstige bezwaren tegen de verdachte bestaan",
      ["Elke verdachte kan altijd worden onderzocht", "Alleen met toestemming van de verdachte", "Alleen als de verdachte gewelddadig is"],
      "Art. 56 lid 4 vereist ernstige bezwaren tegen de aangehouden verdachte. Lid 1 noemt dat ook en voegt voor een bepaling van de OvJ of HOvJ het belang van het onderzoek toe.",
      ["sv-56-4", "sv-56-1"]
    ),
  },
  "c5-wvw-alcohol": {
    grondslag: q(
      "Welke bepaling geeft de opsporingsambtenaar het bevel om mee te werken aan een ademonderzoek?",
      "Art. 163 lid 1 WVW 1994",
      ["Art. 8 WVW 1994", "Art. 163 lid 5 WVW 1994", "Art. 56 Sv"],
      "Art. 163 lid 1 geeft het bevel. Art. 8 bevat het verbod. Lid 5 betreft het bevel tot bloedonderzoek na weigering.",
      ["wvw-163-1", "wvw-163-5"]
    ),
    verdenking: q(
      "Wat is vereist voor het bevel tot medewerking aan het ademonderzoek?",
      "Verdenking dat de bestuurder in strijd met art. 8 heeft gehandeld",
      ["Dat de bestuurder een ongeval heeft veroorzaakt", "Dat de bestuurder op heterdaad is betrapt op een misdrijf", "Een veroordeling"],
      "Art. 163 lid 1 begint met: bij verdenking dat de bestuurder heeft gehandeld in strijd met art. 8.",
      ["wvw-163-1"]
    ),
    bevoegd: q(
      "Wie kan het bevel tot bloedonderzoek geven als de bestuurder zijn toestemming weigert?",
      "De officier van justitie, een hulpofficier van justitie of een daartoe aangewezen ambtenaar",
      ["Iedere agent", "De burgemeester", "De bestuurder zelf"],
      "Art. 163 lid 5 noemt de officier van justitie, een hulpofficier van justitie of een daartoe aangewezen ambtenaar.",
      ["wvw-163-5"]
    ),
    vorm: q(
      "Wat is de juiste volgorde?",
      "Eerst ademonderzoek; is dat niet voltooid, dan om toestemming voor bloedonderzoek vragen; bij weigering volgt het bevel",
      [
        "Direct een bloedonderzoek afdwingen zonder toestemming te vragen",
        "Eerst het bevel tot bloedonderzoek, daarna het ademonderzoek",
        "Alleen bloedonderzoek, nooit ademonderzoek",
      ],
      "Art. 163 lid 1, 4 en 5: eerst ademonderzoek, dan toestemming vragen (lid 4), pas bij weigering het bevel (lid 5).",
      ["wvw-163-1", "wvw-163-4", "wvw-163-5"]
    ),
    proportionaliteit: q(
      "Welk uitgangspunt zit in de opbouw van art. 163?",
      "Eerst het minst ingrijpende middel; ingrijpender middelen pas als dat niet lukt",
      ["Altijd direct het zwaarste middel", "De verdachte kiest welk onderzoek plaatsvindt", "De agent kiest vrij welk middel hij gebruikt"],
      "De volgorde adem, dan toestemming voor bloed, dan bevel laat de subsidiariteit zien.",
      ["wvw-163-1", "wvw-163-4"]
    ),
  },
  "c6-wid-identiteitscontrole": {
    grondslag: q(
      "Welke wet verplicht tot het tonen van een identiteitsbewijs op eerste vordering?",
      "Art. 2 Wet op de identificatieplicht",
      ["Art. 8 Politiewet 2012 legt de toonplicht op", "Art. 96b Sv", "Art. 26 WWM"],
      "Art. 2 Wid legt de plicht op. Art. 8 Politiewet 2012 geeft de politieambtenaar de bevoegdheid om inzage te vorderen.",
      ["wid-2", "pw-8-1"]
    ),
    verdenking: q(
      "Is voor het vorderen van inzage van een identiteitsbewijs een verdenking van een strafbaar feit nodig?",
      "Nee, de vordering moet noodzakelijk zijn voor de uitoefening van de politietaak",
      ["Ja, altijd", "Ja, alleen bij heterdaad", "Nee, de agent mag dit volledig vrij doen"],
      "Art. 8 lid 1 Pw 2012 koppelt de vordering aan wat nodig is voor de politietaak.",
      ["pw-8-1"]
    ),
    bevoegd: q(
      "Wie is bevoegd inzage van een identiteitsbewijs te vorderen?",
      "Een ambtenaar van politie die is aangesteld voor de uitvoering van de politietaak",
      ["Alleen de hulpofficier van justitie", "Alleen de burgemeester", "Iedere burger"],
      "Art. 8 lid 1 Pw 2012 noemt de ambtenaar van politie die is aangesteld voor de uitvoering van de politietaak.",
      ["pw-8-1"]
    ),
    vorm: q(
      "Wie moet op de eerste vordering een identiteitsbewijs tonen?",
      "Een ieder van veertien jaar en ouder (Yusuf wel, Lotte van 13 niet)",
      ["Een ieder van twaalf jaar en ouder", "Alleen volwassenen van achttien jaar en ouder", "Alleen verdachten"],
      "Art. 2 Wid: een ieder die de leeftijd van veertien jaar heeft bereikt, op de eerste vordering.",
      ["wid-2"]
    ),
    proportionaliteit: q(
      "Waaraan is de vordering gebonden?",
      "Ze moet noodzakelijk zijn voor de uitoefening van de politietaak",
      ["Ze mag willekeurig worden gedaan", "Ze mag alleen bij verdenking van een misdrijf", "Ze is nooit toegestaan"],
      "Art. 8 lid 1 Pw 2012 beperkt de vordering tot wat voor de taak nodig is.",
      ["pw-8-1"]
    ),
  },
  "c7-alcoholwet-park": {
    grondslag: q(
      "Welke bepaling verbiedt een 16-jarige om in het park alcoholhoudende drank aanwezig te hebben?",
      "Art. 45 lid 1 Alcoholwet",
      ["Art. 20 lid 1 Alcoholwet (verstrekken door een verkoper)", "Art. 2 Opiumwet", "Art. 172 Gemeentewet"],
      "Art. 45 lid 1 Alcoholwet verbiedt personen onder de 18 jaar alcoholhoudende drank aanwezig te hebben in voor publiek toegankelijke plaatsen. Art. 20 is het verbod voor wie alcohol verstrekt.",
      ["alcw-45-1"]
    ),
    verdenking: q(
      "Waarop berust hier de verdenking van Daan?",
      "Op een redelijk vermoeden van schuld aan een overtreding (art. 27 Sv), hier door eigen waarneming van de agenten",
      ["Op een melding van de meldkamer, zonder eigen waarneming", "Op ernstige bezwaren zoals bij aanhouding van een misdrijf", "Op het feit dat hij minderjarig is, ook zonder alcohol"],
      "Art. 27 lid 1 Sv: een redelijk vermoeden van schuld uit feiten of omstandigheden. De agenten zien het blikje zelf.",
      ["sv-27-1"]
    ),
    bevoegd: q(
      "Wie is bevoegd inzage van het identiteitsbewijs van Daan te vorderen?",
      "Iedere ambtenaar van politie aangesteld voor de uitvoering van de politietaak, dus ook de agent zelf",
      ["Alleen een hulpofficier van justitie", "Alleen de officier van justitie", "Alleen de burgemeester"],
      "Art. 8 lid 1 Pw 2012: de ambtenaar van politie die is aangesteld voor de uitvoering van de politietaak.",
      ["pw-8-1"]
    ),
    vorm: q(
      "Moet Daan (16) op de eerste vordering een identiteitsbewijs tonen?",
      "Ja, de toonplicht geldt vanaf veertien jaar (art. 2 Wid)",
      ["Nee, alleen volwassenen van achttien jaar en ouder", "Nee, tenzij hij is aangehouden", "Ja, maar pas na een bevel van de officier van justitie"],
      "Art. 2 Wid: een ieder die de leeftijd van veertien jaar heeft bereikt, op de eerste vordering.",
      ["wid-2"]
    ),
    proportionaliteit: q(
      "Wat past het best bij de ernst van dit feit en Daans medewerking?",
      "Hem aanspreken, zijn identiteit vaststellen en het feit vastleggen; aanhouding is niet nodig",
      ["Hem direct aanhouden en overbrengen naar het bureau", "Niets doen, want alcohol in een park is toegestaan", "Zijn woning doorzoeken naar meer alcohol"],
      "Kies het lichtste middel dat het doel bereikt (subsidiariteit en proportionaliteit). Aanhouding is een zwaardere inbreuk en hier niet nodig.",
      ["pw-8-1"]
    ),
  },
};

/** Welke aspecten bij 'mix' als meerkeuze worden gesteld: de kennisvragen. De rest blijft open. */
const MIX_MC: AspectKey[] = ["grondslag", "verdenking", "bevoegd"];

export function modusVoor(vorm: Vraagvorm | undefined, casusId: string, key: AspectKey): "open" | "mc" {
  const heeftMc = !!MC[casusId]?.[key];
  if (!heeftMc) return "open";
  if (vorm === "meerkeuze") return "mc";
  if (vorm === "mix") return MIX_MC.includes(key) ? "mc" : "open";
  return "open";
}

/** Deterministische volgorde per vraag, zodat de opties niet bij elke render springen. */
export function schud<T extends { id: string }>(opties: T[], seed: string): T[] {
  const sleutel = (id: string) => {
    let h = 5381;
    for (const c of seed + id) h = ((h << 5) + h + c.charCodeAt(0)) | 0;
    return h;
  };
  return [...opties].sort((a, b) => sleutel(a.id) - sleutel(b.id));
}
