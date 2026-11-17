// Public presentation data only: the captured demonstration uses fictional records.
// Original captures and separate detail crops are never composited or substituted.
const base = "/projects/reservation-capture";
export const reservationDemoLabel = "Local demonstration with fictional data";
export const reservationEmailChange = {
  studentId: "900002",
  before: "taylor.sample-at-example.invalid",
  after: "taylor.sample@example.invalid",
} as const;

export const reservationSteps = [
  {
    id: 1,
    label: "Choose the CSV",
    caption: "Import student records from the Students screen.",
    detail: "The Import CSV control opens the file chooser. Selecting a file starts the import immediately.",
    original: `${base}/originals/native-01-import-control.png`,
    crop: `${base}/derived/01-import-control.png`,
    width: 1162,
    height: 188,
    alt: "Detail crop of the empty Students screen and its Import CSV control",
  },
  {
    id: 2,
    label: "Read validation feedback",
    caption: "One student imported; the second row was skipped because its email was invalid.",
    detail: "The native alert reports 1 added, 1 skipped and identifies Student ID 900002: Invalid email address. The alert overlays the preceding table state; the table has not refreshed yet.",
    original: `${base}/originals/native-02-validation-feedback.png`,
    crop: `${base}/derived/02-validation-feedback.png`,
    width: 462,
    height: 299,
    alt: "Detail crop of the native import alert: 1 added, 1 skipped; Student ID 900002 has an invalid email address",
  },
  {
    id: 4,
    label: "Correct and reimport",
    caption: "Corrected row imported; existing student skipped.",
    detail: "Reimporting the complete corrected CSV adds Taylor. The native alert reports 1 added, 1 skipped because Alex’s Student ID 900001 already exists. It still overlays the preceding table state, not the final refreshed table.",
    original: `${base}/originals/native-04-corrected-reimport-feedback.png`,
    crop: `${base}/derived/04-corrected-reimport-feedback.png`,
    width: 462,
    height: 299,
    alt: "Detail crop of the native reimport alert: 1 added, 1 skipped; Student ID 900001 already exists",
  },
  {
    id: 5,
    label: "Inspect the result",
    caption: "Both fictional student records are now present.",
    detail: "After the alert is dismissed and the table refreshes, the Students screen shows Alex Demo (900001) and Taylor Sample (900002), including Taylor’s corrected email.",
    original: `${base}/originals/native-05-final-records.png`,
    crop: `${base}/derived/05-final-records.png`,
    width: 1162,
    height: 340,
    alt: "Detail crop of the final Students table showing fictional Alex Demo and Taylor Sample records with corrected email",
  },
] as const;
export type ReservationStepId = (typeof reservationSteps)[number]["id"];
export type ReservationStep = (typeof reservationSteps)[number];

export function getReservationStep(id: ReservationStepId): ReservationStep {
  return reservationSteps.find((step) => step.id === id)!;
}

export function moveReservationStep(id: ReservationStepId, direction: "previous" | "next"): ReservationStepId {
  const index = reservationSteps.findIndex((step) => step.id === id);
  const next = Math.max(0, Math.min(reservationSteps.length - 1, index + (direction === "next" ? 1 : -1)));
  return reservationSteps[next].id;
}

export const reservationOverview = {
  original: `${base}/originals/inventory-top.png`,
  width: 1346,
  height: 905,
  caption: "Inventory overview with 20 fictional equipment items; the first rows are shown here.",
  alt: "Inventory page with cameras, lenses and equipment details; the footer reports 20 fictional items",
} as const;
export const reservationOriginalSize = { width: 1456, height: 986 } as const;
export const reservationCsvFiles = {
  before: `${base}/fixtures/students-before.csv`,
  corrected: `${base}/fixtures/students-corrected.csv`,
} as const;
