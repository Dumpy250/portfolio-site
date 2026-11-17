import Image from "next/image";
import ReservationImport from "@/components/ReservationImport";
import {
  reservationCsvFiles,
  reservationDemoLabel,
  reservationEmailChange,
  reservationOverview,
} from "@/lib/reservation-import";

function HighlightedEmail({ value, token }: { value: string; token: string }) {
  const index = value.indexOf(token);
  if (index < 0) return <code>{value}</code>;
  return <code>{value.slice(0, index)}<mark>{token}</mark>{value.slice(index + token.length)}</code>;
}

export default function ReservationWalkthrough({ contributions = [] }: { contributions?: readonly string[] }) {
  return (
    <div className="reservation-case-content">
      <figure className="case-image reservation-overview">
        <Image unoptimized src={reservationOverview.original} alt={reservationOverview.alt} width={reservationOverview.width} height={reservationOverview.height} sizes="(max-width: 850px) 95vw, 850px" />
        <figcaption className="notice">{reservationDemoLabel}. {reservationOverview.caption}{" "}
          <a className="text-link" href={reservationOverview.original} target="_blank" rel="noreferrer">View full screenshot ↗</a>
        </figcaption>
      </figure>
      <section aria-labelledby="reservation-walkthrough-title" className="reservation-walkthrough">
        <h2 id="reservation-walkthrough-title">My contribution: CSV imports</h2>
        {contributions.length ? <ul className="reservation-contributions">{contributions.map((item) => <li key={item}>{item}</li>)}</ul> : null}
        <p>This recorded example shows a partial student import: valid records are added while invalid rows are reported and skipped.</p>
        <ReservationImport />
        <div className="reservation-csv-change" aria-labelledby="reservation-csv-title">
          <h3 id="reservation-csv-title">The CSV correction</h3>
          <p>Only one CSV field changed: the email for Student ID <code>{reservationEmailChange.studentId}</code>. Reimporting the corrected file adds that student and skips the existing student ID.</p>
          <dl>
            <div><dt>Before</dt><dd><HighlightedEmail value={reservationEmailChange.before} token="-at-" /></dd></div>
            <div><dt>After</dt><dd><HighlightedEmail value={reservationEmailChange.after} token="@" /></dd></div>
          </dl>
          <div className="reservation-actions">
            <a className="text-link" href={reservationCsvFiles.before} download>Download fictional CSV · before</a>
            <a className="text-link" href={reservationCsvFiles.corrected} download>Download fictional CSV · corrected</a>
          </div>
        </div>
        <details>
          <summary>Supporting capture: the first imported record</summary>
          <p>After the first alert was dismissed, the table showed Alex Demo before the corrected reimport.</p>
          <a className="text-link" href="/projects/reservation-capture/originals/native-03-partial-import-record.png" target="_blank" rel="noreferrer">View supporting full screenshot ↗</a>
        </details>
      </section>
    </div>
  );
}
