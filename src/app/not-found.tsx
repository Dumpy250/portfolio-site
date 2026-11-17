import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell not-found">
      <p className="eyebrow">404 / Wrong turn</p>
      <h1>
        Nothing built here.
        <br />
        Not yet, anyway.
      </h1>
      <p>This page doesn’t exist. The projects are a better place to start.</p>
      <Link className="text-link" href="/projects">
        Back to the work ↗
      </Link>
    </section>
  );
}
