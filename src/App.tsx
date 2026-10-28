import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useCallback, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Cursor } from './components/Cursor';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Navbar } from './components/Navbar';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Preloader } from './components/Preloader';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { Showreel } from './components/Showreel';
import { Statement } from './components/Statement';
import { Toolkit } from './components/Toolkit';
import { siteConfig } from './data/siteConfig';

const INTRO_KEY = 'spoidu:intro-seen';

/** The intro card plays once per session, and never with reduced motion or a deep link. */
function shouldShowIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.location.hash) return false;
    if (sessionStorage.getItem(INTRO_KEY)) return false;
  } catch {
    // Storage can be unavailable (private mode); showing the intro is harmless.
  }
  return true;
}

export default function App() {
  const [intro, setIntro] = useState(shouldShowIntro);
  const finishIntro = useCallback(() => {
    setIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Ignore — the intro will simply play again next time.
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="skip-link">
        Skip to {siteConfig.brand.name} work
      </a>
      <AnimatePresence>{intro && <Preloader onDone={finishIntro} />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero ready={!intro} />
        <Marquee />
        <Statement />
        <PortfolioGrid />
        <Showreel />
        <Services />
        <About />
        <Toolkit />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </MotionConfig>
  );
}
