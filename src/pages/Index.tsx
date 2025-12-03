import { type ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Code2, Trophy, Video, Users, Zap } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { useAuth } from "@/context/AuthContext";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";
import Testimonials from "@/components/Testimonials";
import HeroDevice from "@/components/HeroDevice";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { useLandingStats } from "@/hooks/use-landing-stats";
import { trackLandingPageView } from "@/lib/landingPageService";

const Index = () => {
  const { user, role } = useAuth();
  const dashboardPath = role ? `/${role}-dashboard` : "/login";
  // const { data: stats, isLoading: statsLoading } = useLandingStats();
  const stats = null;
  const statsLoading = false;

  // Track page view
  useEffect(() => {
    // trackLandingPageView().catch(() => {
    //   // Fail silently
    // });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-b from-background via-background/95 to-secondary/20 pt-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse-slow [animation-delay:1.5s]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm animate-fade-in hover:bg-secondary/80 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-muted-foreground">New courses added weekly</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight animate-fade-in-up [animation-delay:200ms]">
              Master the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600 animate-gradient-x">
                Technology
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Join a community of ambitious learners. Master coding, design, and data science through interactive challenges and expert-led projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:600ms]">
              <Link to={user && role ? dashboardPath : "/signup"}>
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 hover:scale-105">
                  {user && role ? "Continue Learning" : "Start Learning Free"}
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full hover:bg-secondary/80 hover:text-foreground transition-all hover:-translate-y-1 hover:scale-105 border-2">
                  Explore Courses
                </Button>
              </Link>
            </div>

            <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-border/50 animate-fade-in-up [animation-delay:800ms]">
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">10k+</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">500+</div>
                <div className="text-sm text-muted-foreground">Video Courses</div>
              </div>
              <div className="group cursor-default">
                <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">100+</div>
                <div className="text-sm text-muted-foreground">Expert Mentors</div>
              </div>
            </div>

            {/* Hero Device Animation */}
            <div className="pt-16 animate-fade-in-up [animation-delay:1000ms]">
              <HeroDevice />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've crafted a learning experience that adapts to your needs and helps you achieve your goals faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Interactive Learning"
              description="Forget passive watching. Write code, solve problems, and build projects directly in your browser."
              delay="0"
            />
            <FeatureCard
              icon={<Code2 className="h-6 w-6" />}
              title="Real-world Projects"
              description="Build a portfolio that stands out. Work on projects that simulate real industry challenges."
              delay="100"
            />
            <FeatureCard
              icon={<Video className="h-6 w-6" />}
              title="Live Mentorship"
              description="Get unstuck quickly. Connect with expert mentors for code reviews and career guidance."
              delay="200"
            />
            <FeatureCard
              icon={<Trophy className="h-6 w-6" />}
              title="Gamified Progress"
              description="Stay motivated with streaks, badges, and leaderboards. Learning has never been this fun."
              delay="300"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Global Community"
              description="Connect with learners from around the world. Share knowledge, collaborate, and grow together."
              delay="400"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Career Paths"
              description="Follow structured learning paths designed to take you from beginner to job-ready professional."
              delay="500"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary/30 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard
              number={stats?.activeLearners ?? 10000}
              suffix="+"
              label="Active Learners"
              delay="0"
              isLoading={statsLoading}
            />
            <StatCard
              number={stats?.courses ?? 500}
              suffix="+"
              label="Courses"
              delay="100"
              isLoading={statsLoading}
            />
            <StatCard
              number={stats?.codingChallenges ?? 1000}
              suffix="+"
              label="Coding Challenges"
              delay="200"
              isLoading={statsLoading}
            />
            <StatCard
              number={stats?.expertInstructors ?? 50}
              suffix="+"
              label="Expert Instructors"
              delay="300"
              isLoading={statsLoading}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-blue-600/10 opacity-50 animate-pulse-slow" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners mastering technology with TechKnots today. Start for free, no credit card required.
          </p>
          <Link to="/signup">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 hover:scale-105">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};


const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: string;
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "group bg-card border border-border rounded-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 relative overflow-hidden",
        isInView ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="bg-primary/5 w-14 h-14 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-primary/30">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
      </div>
    </div>
  );
};

const StatCard = ({
  number,
  suffix = "",
  label,
  delay,
  isLoading = false
}: {
  number: number;
  suffix?: string;
  label: string;
  delay?: string;
  isLoading?: boolean;
}) => {
  const { ref, isInView } = useInView({ threshold: 0.5 });
  const count = useCountUp(number, 2000, isInView);

  return (
    <div
      ref={ref}
      className={cn(
        "group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-default relative overflow-hidden",
        isInView ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300 origin-left">
          {isLoading ? "..." : `${count.toLocaleString()}${suffix}`}
        </div>
        <div className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">{label}</div>
      </div>
    </div>
  );
};

export default Index;
