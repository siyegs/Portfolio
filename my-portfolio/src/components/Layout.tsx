import { useRef, useEffect, useState, type ReactNode } from "react";

import Header from "./Header";

interface LayoutProps {
  theme: string;
  toggleTheme: () => void;
  children: ReactNode;
  hoveredName?: string | null;
}

const Layout: React.FC<LayoutProps> = ({
  theme,
  toggleTheme,
  children,
  hoveredName,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /**
   * The cursor follows on a rAF loop rather than straight off the mousemove.
   *
   * Two reasons. Writing `style.left/top` on every event is a layout write per
   * mouse sample, which on a high-polling mouse is several forced reflows per
   * frame; translate3d only touches the compositor. And easing toward the
   * pointer instead of snapping to it gives the trail its weight while capping
   * the work at one write per frame no matter how fast the samples arrive.
   */
  useEffect(() => {
    if (!finePointer) return;
    const node = cursorRef.current;
    if (!node) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const track = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const render = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", track, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", track);
      cancelAnimationFrame(frame);
    };
  }, [finePointer]);

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      {finePointer && (
        <div ref={cursorRef} className={`cursor ${hoveredName ? "hovered" : ""}`} />
      )}

      {children}
    </>
  );
};

export default Layout;
