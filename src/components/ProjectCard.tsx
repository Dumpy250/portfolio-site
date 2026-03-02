import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

export default function ProjectCard({ p }: { p: Project }) {
    return (
        <article className="group rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition">
            {p.image ? (
                <div className="relative mb-3 overflow-hidden rounded-xl">
                    {p.badgeText ? (
                        <span className="pointer-events-none absolute right-2 top-2 z-10 max-w-[calc(100%-1rem)] rounded-md border border-white/15 bg-black/35 px-2 py-1 text-right text-[10px] text-gray-300 backdrop-blur-sm sm:text-[11px]">
                            {p.badgeText}
                        </span>
                    ) : null}
                    <Image
                        src={p.image}
                        alt={p.title}
                        width={1200}
                        height={630}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={false}
                    />
                </div>
            ) : null}

            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-gray-300">{p.summary}</p>

            <ul className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((item) => (
                    <li
                        key={item}
                        className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-gray-200"
                    >
                        {item}
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
                {p.links?.demo ? (
                    <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-300 hover:underline underline-offset-4"
                    >
                        Live Demo
                    </a>
                ) : null}
                {p.links?.github ? (
                    <a
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-300 hover:underline underline-offset-4"
                    >
                        GitHub
                    </a>
                ) : null}
            </div>
        </article>
    );
}
