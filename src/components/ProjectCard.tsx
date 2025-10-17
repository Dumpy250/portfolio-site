import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

export default function ProjectCard({ p }: { p: Project }) {
    return (
        <article className="group rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition">
            {p.image && (
                <div className="relative mb-3 overflow-hidden rounded-xl">
                    <Image
                        src={p.image}
                        alt={p.title}
                        width={1200}
                        height={630}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={false}
                    />
                </div>
            )}

            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-gray-300">{p.summary}</p>

            <ul className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                    <li
                        key={t}
                        className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-gray-200"
                    >
                        {t}
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex gap-3">
                <Link
                    href={`/projects/${p.slug}`}
                    className="text-sm underline underline-offset-4"
                >
                    Read case study →
                </Link>
                {p.links?.github && (
                    <a
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-300 hover:underline underline-offset-4"
                    >
                        GitHub
                    </a>
                )}
            </div>
        </article>
    );
}
