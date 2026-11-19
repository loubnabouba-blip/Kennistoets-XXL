export type Niveau = "agent" | "hovj" | "gemengd";
export type AspectKey =
  | "grondslag"
  | "verdenking"
  | "bevoegd"
  | "vorm"
  | "proportionaliteit";

export const ASPECT_LABELS: Record<AspectKey, string> = {
  grondslag: "Wettelijke grondslag",
  verdenking: "Verdenking / criterium",
  bevoegd: "Bevoegde ambtenaar",
  vorm: "Vormvoorschriften",
  proportionaliteit: "Proportionaliteit & subsidiariteit",
};

export const ASPECT_INSTRUCTIES: Record<AspectKey, string> = {
  grondslag: "Noem de wetten en artikelen waarop de bevoegdheid berust.",
  verdenking: "Welk criterium moet vervuld zijn (bijv. heterdaad, redelijk vermoeden)?",
  bevoegd: "Wie is bevoegd om dit besluit te nemen of de handeling te verrichten?",
  vorm: "Welke vormvoorschriften, machtigingen of kennisgevingen gelden?",
  proportionaliteit: "Is de maatregel noodzakelijk, proportioneel en subsidiair?",
};

export const ALLE_ASPECTEN: AspectKey[] = [
  "grondslag",
  "verdenking",
  "bevoegd",
  "vorm",
  "proportionaliteit",
];

export type WetKey =
  | "sr"
  | "sv"
  | "awbi"
  | "pw"
  | "ambtsinstructie"
  | "gemw"
  | "apv"
  | "wom"
  | "opiumwet"
  | "wwm"
  | "wvw"
  | "wid"
  | "wth"
  | "alcoholwet"
  | "wet-dieren"
  | "wed";

export const WET_LABELS: Record<WetKey, { label: string; groep: string }> = {
  sr: { label: "Wetboek van Strafrecht (Sr)", groep: "Strafrecht & Strafvordering" },
  sv: { label: "Wetboek van Strafvordering (Sv)", groep: "Strafrecht & Strafvordering" },
  awbi: { label: "Algemene wet op het binnentreden (Awbi)", groep: "Strafrecht & Strafvordering" },
  pw: { label: "Politiewet 2012 (art. 3, 7)", groep: "Politie & Geweld" },
  ambtsinstructie: { label: "Ambtsinstructie voor de politie", groep: "Politie & Geweld" },
  gemw: { label: "Gemeentewet (art. 172 t/m 176b)", groep: "Openbare Orde & Bestuursrecht" },
  apv: { label: "Algemene Plaatselijke Verordening (APV)", groep: "Openbare Orde & Bestuursrecht" },
  wom: { label: "Wet openbare manifestaties (Wom)", groep: "Openbare Orde & Bestuursrecht" },
  opiumwet: { label: "Opiumwet (art. 2, 3, 9)", groep: "Bijzondere Wetten" },
  wwm: { label: "Wet wapens en munitie (WWM)", groep: "Bijzondere Wetten" },
  wvw: { label: "Wegenverkeerswet 1994 (WVW)", groep: "Bijzondere Wetten" },
  wid: { label: "Wet op de identificatieplicht (Wid)", groep: "Bijzondere Wetten" },
  wth: { label: "Wet tijdelijk huisverbod (Wth)", groep: "Bijzondere Wetten" },
  alcoholwet: { label: "Alcoholwet", groep: "Bijzondere Wetten" },
  "wet-dieren": { label: "Wet dieren", groep: "Bijzondere Wetten" },
  wed: { label: "Wet op de economische delicten / Milieu (WED)", groep: "Bijzondere Wetten" },
};

/** Een geverifieerde bronpassage (snapshot) uit wetten.overheid.nl. */
export interface BronArtikel {
  id: string;
  wet: string;
  bwb: string;
  artikel: string;
  lid?: string;
  tekst: string;
  /** false = alleen een deel van de tekst is gezien; de rest staat in de bron. */
  volledig: boolean;
  /** Datum van de wetsversie waarop de tekst is gecontroleerd (YYYY-MM-DD), of null als onbekend. */
  peildatum: string | null;
  url: string;
}

export interface BronUitspraak {
  ecli: string;
  instantie: string;
  datum: string;
  /** Eigen samenvatting op basis van gecontroleerde bron; géén citaat. */
  samenvatting: string;
  url: string;
}

export interface Kernpunt {
  id: string;
  label: string;
  /** Reguliere expressies (case-insensitive); het kernpunt telt als aanwezig zodra er één matcht. */
  patronen: string[];
  toelichting: string;
  bronIds: string[];
}

export interface AspectModel {
  key: AspectKey;
  modelantwoord: string;
  kernpunten: Kernpunt[];
}

export interface Casus {
  id: string;
  titel: string;
  niveau: Niveau[];
  wetten: WetKey[];
  vraag: string;
  situatie: string[];
  bijlage?: { titel: string; inhoud: string };
  aspecten: AspectModel[];
  uitspraken: string[];
}

export type Vraagvorm = "open" | "meerkeuze" | "mix";

export interface MCVraag {
  vraag: string;
  opties: { id: string; tekst: string }[];
  juist: string;
  uitleg: string;
  bronIds: string[];
}

export interface ToetsConfig {
  vraagvorm?: Vraagvorm;
  niveau: Niveau;
  wetten: WetKey[];
  aantal: number;
  focus: "alle" | "vorm" | "proportionaliteit";
  casusIds?: string[];
}

export interface AspectResultaat {
  modus?: "open" | "mc";
  gekozen?: string;
  key: AspectKey;
  antwoord: string;
  gehaald: string[];
  gemist: string[];
  score: number;
}

export interface CasusResultaat {
  casusId: string;
  aspecten: AspectResultaat[];
}
