import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import type { Tone } from "../../lib/work";

export interface Preview {
  src: string;
  alt: string;
  caption: string;
}

/**
 * The image plate that trails the cursor across the work index.
 *
 * The index itself is typographic, so this is where the work is actually seen
 * on a desktop. It is mounted only for fine pointers: on touch there is no
 * hover state to drive it, and those visitors get the inline plate on each row
 * instead. The listener is attached on mount rather than on first hover so the
 * springs have already settled under the cursor by the time a plate appears.
 */
export default function HoverPreview({
  preview,
  tone,
}: {
  preview: Preview | null;
  tone: Tone;
}) {
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 240, damping: 28, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!finePointer) return;
    const track = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", track, { passive: true });
    return () => window.removeEventListener("mousemove", track);
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
    >
      <AnimatePresence>
        {preview && (
          <motion.figure
            key={preview.src}
            initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.92, rotate: -1 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className={`-translate-x-1/2 -translate-y-1/2 border ${tone.rule} ${
              tone.isDark ? "bg-[#101013]" : "bg-white"
            } w-[21rem] shadow-2xl`}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={preview.src}
                alt={preview.alt}
                className="h-full w-full object-contain p-3"
              />
            </div>
            <figcaption
              className={`meta-label border-t px-3 py-2 ${tone.rule} ${tone.dim}`}
            >
              {preview.caption}
            </figcaption>
          </motion.figure>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
