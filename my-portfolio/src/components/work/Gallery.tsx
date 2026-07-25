import type { Tone } from "../../lib/work";
import { MetaLabel, Plate, Reveal } from "./primitives";

/**
 * Extra screens for a project.
 *
 * projectsData has carried `slideshowImages` since the ERP was added, but the
 * detail page never rendered them, so those screenshots shipped in the bundle
 * and were never shown. They are laid out as numbered plates.
 */
export default function Gallery({
  images,
  title,
  tone: t,
}: {
  images: string[];
  title: string;
  tone: Tone;
}) {
  return (
    <section>
      <div className={`flex items-baseline justify-between border-b pb-3 ${t.rule}`}>
        <MetaLabel className={t.faint}>Screens</MetaLabel>
        <MetaLabel className={`tnum ${t.faint}`}>
          {String(images.length).padStart(2, "0")}
        </MetaLabel>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3 md:gap-6">
        {images.map((src, i) => (
          <Reveal key={src} delay={i * 0.08}>
            <figure>
              <Plate
                src={src}
                alt={`${title} - screen ${i + 1}`}
                tone={t}
                ratio="aspect-[16/10]"
              />
              <figcaption className="mt-2.5">
                <MetaLabel className={`tnum ${t.faint}`}>
                  {String(i + 1).padStart(2, "0")}
                </MetaLabel>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
