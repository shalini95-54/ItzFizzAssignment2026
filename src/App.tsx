import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const secondImgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Initial Load Animation - Cinematic Fade In with 3D Flip
    const tl = gsap.timeline();
    
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      gsap.set(headlineRef.current, { perspective: 1000 });
      
      tl.fromTo(chars, {
        y: 100,
        z: -100,
        rotateX: -90,
        opacity: 0,
        filter: 'blur(15px)',
      }, {
        y: 0,
        z: 0,
        rotateX: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        stagger: 0.08,
        ease: 'back.out(1.2)',
      });
    }

    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-item');
      tl.fromTo(stats, {
        y: 40,
        opacity: 0,
        filter: 'blur(10px)',
      }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        stagger: 0.15,
        ease: 'power3.out',
      }, "-=1.4");
    }

    if (carContainerRef.current && glowRef.current) {
      tl.fromTo(carContainerRef.current, {
        scale: 0.8,
        y: 50,
        opacity: 0,
        filter: 'brightness(0.2) contrast(1.5)',
      }, {
        scale: 1,
        y: 0,
        opacity: 1,
        filter: 'brightness(1) contrast(1)',
        duration: 2.5,
        ease: 'power3.out',
      }, "-=1.8");

      tl.fromTo(glowRef.current, {
        opacity: 0,
        scale: 0.3,
      }, {
        opacity: 0.6,
        scale: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, "-=2.2");

      // Continuous floating animation for the car
      gsap.to(carContainerRef.current, {
        y: '+=15',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.5
      });
    }

    // Scroll-based Animation - 4K Cinematic Depth
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Slower, smoother scrub for premium feel
      }
    });

    // Car drives "through" the screen
    scrollTl.to(carRef.current, {
      scale: 5, // Extreme scale for 3D effect
      y: '50vh',
      ease: 'power2.inOut',
    }, 0);

    // Glow intensifies as car gets closer
    scrollTl.to(glowRef.current, {
      scale: 4,
      opacity: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.4)', // Shifts to brighter blue
      ease: 'power2.inOut',
    }, 0);

    // Headline splits up and blurs out (Depth of Field effect)
    scrollTl.to(headlineRef.current, {
      y: '-50vh',
      z: 200,
      opacity: 0,
      scale: 1.2,
      filter: 'blur(25px)',
      ease: 'power2.inOut',
    }, 0);

    // Stats drop down and blur out
    scrollTl.to(statsRef.current, {
      y: '40vh',
      opacity: 0,
      scale: 0.8,
      filter: 'blur(20px)',
      ease: 'power2.inOut',
    }, 0);

    // Darken the scene for the next content
    scrollTl.to(overlayRef.current, {
      opacity: 1,
      ease: 'power2.inOut',
    }, 0.2);

    // Parallax reveal of the second image
    scrollTl.fromTo(secondImgRef.current, {
      scale: 1.5,
      opacity: 0,
      y: '20vh',
    }, {
      scale: 1.05,
      opacity: 0.4,
      y: '0vh',
      ease: 'power2.out',
    }, 0.3);

    // Cinematic reveal of the second section text
    scrollTl.fromTo(contentRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 100,
      filter: 'blur(20px)',
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      ease: 'power2.out',
    }, 0.4);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black text-white font-sans selection:bg-white selection:text-black overflow-clip">
      
      {/* Film Grain Overlay for Cinematic Texture */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-screen" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Sticky Hero Section */}
      <div ref={heroRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 perspective-[1200px]">
        
        {/* Background Ambient Glow */}
        <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* Headline */}
        <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-9xl font-black tracking-[0.15em] md:tracking-[0.25em] text-center mb-8 uppercase flex flex-wrap justify-center z-30 mt-24 leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          {'WELCOME ITZFIZZ'.split('').map((char, i) => (
            <span key={i} className={`char inline-block ${char === ' ' ? 'w-4 md:w-8' : ''}`}>
              {char}
            </span>
          ))}
        </h1>

        {/* Main Visual Element (Car) - Using a striking 4K aggressive supercar */}
        <div ref={carContainerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-10 pointer-events-none mt-20">
          <img 
            ref={carRef}
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=100&w=3840&auto=format&fit=crop" 
            alt="Aggressive Supercar" 
            className="w-full h-auto object-cover opacity-100 mix-blend-lighten origin-center will-change-transform"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Vignette & Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-15 pointer-events-none opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-15 pointer-events-none"></div>

        {/* Darkening Overlay for Scroll Transition */}
        <div ref={overlayRef} className="absolute inset-0 bg-black z-25 pointer-events-none opacity-0"></div>

        {/* Second Image Background (Revealed on Scroll) */}
        <div className="absolute inset-0 z-26 pointer-events-none overflow-hidden flex items-center justify-center">
          <img 
            ref={secondImgRef}
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=100&w=3840&auto=format&fit=crop"
            alt="Engine Details"
            className="w-full h-full object-cover opacity-0 mix-blend-screen"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-12 md:gap-40 z-20 mt-auto mb-16 md:mb-24">
          <div className="stat-item flex flex-col items-center">
            <div className="text-6xl md:text-8xl font-light text-white mb-2 tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">99<span className="text-4xl text-zinc-500">%</span></div>
            <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-[0.4em] font-medium">Performance</div>
          </div>
          <div className="stat-item flex flex-col items-center">
            <div className="text-6xl md:text-8xl font-light text-white mb-2 tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">1.2<span className="text-4xl text-zinc-500">s</span></div>
            <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-[0.4em] font-medium">0-60 mph</div>
          </div>
          <div className="stat-item flex flex-col items-center">
            <div className="text-6xl md:text-8xl font-light text-white mb-2 tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">800<span className="text-4xl text-zinc-500">hp</span></div>
            <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-[0.4em] font-medium">Max Power</div>
          </div>
        </div>

        {/* Content that appears on scroll */}
        <div ref={contentRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none opacity-0">
          <div className="max-w-4xl text-center px-6">
            <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-2xl">
              PURE ADRENALINE.
            </h2>
            <p className="text-2xl md:text-3xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
              Experience the pinnacle of automotive engineering where every curve and line is designed for absolute performance.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
