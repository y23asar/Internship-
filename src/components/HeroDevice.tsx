import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Brain, Code2, Trophy, Users2, Sparkles, Rocket, Globe, Zap, Layout } from "lucide-react";

type BezelFeature = {
  id: string;
  title: string;
  description: string;
  Icon: typeof Code2;
  angle: number;
  tags: string[];
  accent: string;
};

const bezelFeatures: BezelFeature[] = [
  {
    id: "craft",
    title: "Craft Real Projects",
    description: "Tackle production-ready builds with mentor feedback.",
    Icon: Code2,
    angle: 270, // Top
    tags: ["Studio briefs", "Code reviews"],
    accent: "from-primary/40 via-primary/5 to-transparent",
  },
  {
    id: "global",
    title: "Global Reach",
    description: "Connect with developers from over 100 countries.",
    Icon: Globe,
    angle: 315,
    tags: ["Networking", "Community"],
    accent: "from-blue-400/30 via-blue-200/20 to-transparent",
  },
  {
    id: "mentor",
    title: "Circle Mentorship",
    description: "Join rotating mentor circles that track your goals.",
    Icon: Users2,
    angle: 0, // Right
    tags: ["Live cohorts", "Career nudges"],
    accent: "from-emerald-400/30 via-emerald-200/20 to-transparent",
  },
  {
    id: "fast",
    title: "Fast Track",
    description: "Accelerated learning paths for experienced devs.",
    Icon: Zap,
    angle: 45,
    tags: ["Advanced", "Speed"],
    accent: "from-yellow-400/30 via-yellow-200/20 to-transparent",
  },
  {
    id: "ai",
    title: "Adaptive Intelligence",
    description: "Smart recommendations surface the next best lesson.",
    Icon: Brain,
    angle: 90, // Bottom
    tags: ["Progress radar", "Adaptive paths"],
    accent: "from-sky-400/30 via-sky-200/20 to-transparent",
  },
  {
    id: "deploy",
    title: "Deploy Anywhere",
    description: "Learn to deploy to AWS, Vercel, and more.",
    Icon: Rocket,
    angle: 135,
    tags: ["DevOps", "CI/CD"],
    accent: "from-red-400/30 via-red-200/20 to-transparent",
  },
  {
    id: "impact",
    title: "Impact & Rewards",
    description: "Gamified streaks and scholarship points.",
    Icon: Trophy,
    angle: 180, // Left
    tags: ["Scholarship points", "Hiring readiness"],
    accent: "from-amber-400/30 via-amber-200/20 to-transparent",
  },
  {
    id: "design",
    title: "Design Systems",
    description: "Master modern UI/UX principles and tools.",
    Icon: Layout,
    angle: 225,
    tags: ["Figma", "Tailwind"],
    accent: "from-purple-400/30 via-purple-200/20 to-transparent",
  },
];

const ICON_SIZE = 64; // 16 * 4 = 64px
const DEVICE_SIZE = 400; // Base size in pixels
const RING_RADIUS = DEVICE_SIZE / 2 - ICON_SIZE / 2 - 20; // Distance from center to icon center

const HeroDevice = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ringRotation, setRingRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeFeature = useMemo(() => bezelFeatures.find((feature) => feature.id === activeId), [activeId]);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRingRotation((prev) => (prev + 0.2) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Click outside to reset
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (activeId) {
          setActiveId(null);
          setAutoRotate(true);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeId]);

  const handleFeatureSelect = (feature: BezelFeature) => {
    setActiveId(feature.id);
    setAutoRotate(false);

    // Calculate rotation needed to bring this feature to the Top (270 degrees)
    const currentRotation = ringRotation % 360;
    const targetRotation = 270 - feature.angle;
    
    // Find the shortest path
    const diff = ((targetRotation - currentRotation + 540) % 360) - 180;
    setRingRotation(currentRotation + diff);
  };

  // Convert angle to radians and calculate x, y position
  const getIconPosition = (angle: number) => {
    const radians = ((angle + ringRotation) * Math.PI) / 180;
    const x = Math.cos(radians) * RING_RADIUS;
    const y = Math.sin(radians) * RING_RADIUS;
    return { x, y };
  };

  return (
    <div className="relative w-full py-10" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 blur-3xl opacity-50 pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto overflow-visible">
        {/* Left Side: Description */}
        <div className={cn("order-2 lg:order-1 transition-all duration-500", activeFeature ? "opacity-100 translate-x-0" : "opacity-50 lg:opacity-0 lg:-translate-x-10 pointer-events-none")}>
          {activeFeature ? (
            <DescriptionPanel feature={activeFeature} />
          ) : (
            <div className="hidden lg:block text-center lg:text-left space-y-4">
              <h3 className="text-3xl font-bold text-muted-foreground/30">Select a feature</h3>
              <p className="text-muted-foreground/30">Click on the icons to explore the platform.</p>
            </div>
          )}
        </div>

        {/* Right Side: The Bezel */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center overflow-visible p-12">
          {/* Main Device Container - Centered with flexbox */}
          <div 
            className="relative flex items-center justify-center"
            style={{ 
              width: `${DEVICE_SIZE}px`, 
              height: `${DEVICE_SIZE}px`,
              minWidth: `${DEVICE_SIZE}px`,
              minHeight: `${DEVICE_SIZE}px`,
              aspectRatio: '1 / 1'
            }}
          >
            {/* Central Glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />

            {/* Outer Ring Background */}
            <div className="absolute inset-0 rounded-full border border-primary/10 bg-background/40 backdrop-blur-md shadow-2xl" style={{ borderRadius: '50%' }} />

            {/* Rotating Icons */}
            {bezelFeatures.map((feature) => {
              const isActive = activeId === feature.id;
              const { x, y } = getIconPosition(feature.angle);
              
              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureSelect(feature)}
                  className={cn(
                    "absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2 z-20",
                    isActive
                      ? "bg-background border-primary shadow-[0_0_30px_rgba(16,185,129,0.4)] z-50"
                      : "bg-background/80 border-border hover:border-primary/50"
                  )}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 1s cubic-bezier(0.23, 1, 0.32, 1), top 1s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <feature.Icon className={cn("w-6 h-6 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
                  )}
                </button>
              );
            })}

            {/* Center Content */}
            <div className="absolute inset-[25%] rounded-full bg-background/80 backdrop-blur-xl border border-white/10 shadow-inner flex flex-col items-center justify-center text-center p-4 z-10" style={{ borderRadius: '50%' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 rounded-full" style={{ borderRadius: '50%' }} />
              {activeFeature ? (
                <div className="relative z-10 animate-fade-in">
                  <activeFeature.Icon className="w-12 h-12 text-primary mx-auto mb-2" />
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Selected</div>
                </div>
              ) : (
                <div className="relative z-10">
                  <Sparkles className="w-10 h-10 text-primary/50 mx-auto mb-2 animate-pulse" />
                  <div className="text-sm font-medium text-muted-foreground">Explore</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DescriptionPanel = ({ feature }: { feature: BezelFeature }) => (
  <div className="bg-card/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl animate-fade-in-up">
    <div className="flex items-center gap-4 mb-6">
      <div className={cn("p-3 rounded-2xl bg-gradient-to-br", feature.accent)}>
        <feature.Icon className="w-8 h-8 text-foreground" />
      </div>
      <h3 className="text-3xl font-bold">{feature.title}</h3>
    </div>
    <p className="text-lg text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
    <div className="flex flex-wrap gap-2">
      {feature.tags.map(tag => (
        <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default HeroDevice;
