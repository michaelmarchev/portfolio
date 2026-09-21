import Link from "next/link";
import { nav, site } from "@/content/site";
import { Container } from "./Container";
import { asset } from "@/lib/utils";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <Container wide className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-h3 max-w-[22ch] text-fg">{site.closingLine}</p>
            <a
              href={`mailto:${site.email}`}
              className="u-link mt-4 inline-block text-[0.95rem] text-fg-2"
            >
              {site.email}
            </a>
            <p className="u-meta mt-4 text-fg-4">{site.location}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="u-meta mb-4 text-fg-4">Pages</h2>
            <ul className="m-0 list-none space-y-2 p-0">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="u-link text-[0.9rem] text-fg-2">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="u-meta mb-4 text-fg-4">Elsewhere</h2>
            <ul className="m-0 list-none space-y-2 p-0">
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="u-link text-[0.9rem] text-fg-2"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={asset(site.resume)} download className="u-link text-[0.9rem] text-fg-2">
                  {site.resumeLabel}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="u-link text-[0.9rem] text-fg-2">
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-meta text-fg-4">
            © {year} Michael Marchev. All rights reserved.
          </p>
          <p className="u-meta text-fg-4">
            Boston, MA · Designed and built for physical engineering work
          </p>
        </div>
      </Container>
    </footer>
  );
}
