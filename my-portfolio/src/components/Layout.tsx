import { type ReactNode } from "react";

import Header from "./Header";

interface LayoutProps {
  theme: string;
  toggleTheme: () => void;
  children: ReactNode;
}

/**
 * There used to be a custom cursor here: a blend-mode dot eased toward the
 * pointer on a rAF loop, with the real cursor hidden behind it. It is gone.
 *
 * A DOM element cannot keep up with the pointer. The system cursor is drawn
 * by the compositor at the device's sample rate, while anything we position
 * in JavaScript moves once per animation frame, a frame after the event that
 * told us where the pointer went. Even snapped straight to clientX/clientY it
 * trails on a fast flick, and the easing made that lag deliberate. The native
 * cursor is the only one that is never late.
 */
const Layout: React.FC<LayoutProps> = ({ theme, toggleTheme, children }) => {
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      {children}
    </>
  );
};

export default Layout;
