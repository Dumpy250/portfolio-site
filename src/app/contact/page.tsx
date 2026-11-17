import type { Metadata } from "next";
import CopyEmailButton from "@/components/CopyEmailButton";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Cameron Basham about software engineering opportunities and project conversations.",
};
export default function ContactPage() {
  return (
    <>
      <header className="shell page-head">
        <p className="eyebrow">Contact / Start a conversation</p>
        <h1>
          Let’s find out
          <br />
          what we could build.
        </h1>
        <p>
          For software engineering opportunities, questions about a project, or
          a conversation about working together, email is the best place to
          start.
        </p>
      </header>
      <section className="shell contact-layout" aria-label="Contact methods">
        <p className="eyebrow">Email</p>
        <a
          className="email-link"
          href="mailto:Cameron250taylor@outlook.com?subject=Software%20engineering%20opportunity"
        >
          Cameron250taylor@outlook.com ↗
        </a>
        <CopyEmailButton email="Cameron250taylor@outlook.com" />
        <div className="contact-options">
          <a
            className="text-link"
            href="https://github.com/Dumpy250"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className="text-link"
            href="https://www.linkedin.com/in/cameron-basham"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            className="text-link"
            href="/resume.pdf"
            download="Cameron-Basham-General-Software-Resume.pdf"
          >
            Download résumé ↗
          </a>
        </div>
        <p style={{ marginTop: 45, maxWidth: 600 }}>
          Based in Michigan. Completing my software engineering degree, with
          graduation expected in December 2026.
        </p>
      </section>
    </>
  );
}
