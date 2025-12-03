import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Github, Twitter, Linkedin, Instagram, Mail, Send } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const Footer = () => {
    const { ref, isInView } = useInView({ threshold: 0.1 });

    return (
        <footer ref={ref} className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-50" />

            <div className="container mx-auto px-4">
                {/* Newsletter Section */}
                <div className={cn(
                    "mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-primary/5 p-8 rounded-2xl border border-primary/10 transition-all duration-700 delay-100",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">Stay ahead of the curve</h3>
                        <p className="text-muted-foreground">
                            Get the latest tech trends, coding tips, and course updates delivered to your inbox.
                        </p>
                    </div>
                    <form className="flex gap-2 w-full max-w-md lg:ml-auto group" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 bg-background border-primary/20 focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <Button type="submit" className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                            Subscribe <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className={cn(
                        "lg:col-span-2 space-y-6 transition-all duration-700 delay-200",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}>
                        <Link to="/" className="flex items-center gap-2 group inline-flex">
                            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <Code2 className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold text-foreground tracking-tight">TechKnots</span>
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                            Empowering the next generation of tech leaders through accessible, high-quality education. Join our community and start building your future today.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
                            <SocialLink href="https://github.com" icon={<Github className="h-5 w-5" />} label="GitHub" />
                            <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
                            <SocialLink href="https://instagram.com" icon={<Instagram className="h-5 w-5" />} label="Instagram" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className={cn(
                        "transition-all duration-700 delay-300",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}>
                        <h3 className="font-semibold text-foreground mb-6">Platform</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/courses">Browse Courses</FooterLink>
                            <FooterLink to="/challenges">Coding Challenges</FooterLink>
                            <FooterLink to="/mentors">Find a Mentor</FooterLink>
                            <FooterLink to="/pricing">Pricing</FooterLink>
                            <FooterLink to="/roadmap">Learning Roadmap</FooterLink>
                        </ul>
                    </div>

                    <div className={cn(
                        "transition-all duration-700 delay-400",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}>
                        <h3 className="font-semibold text-foreground mb-6">Company</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/about">About Us</FooterLink>
                            <FooterLink to="/careers">Careers</FooterLink>
                            <FooterLink to="/blog">Blog</FooterLink>
                            <FooterLink to="/contact">Contact</FooterLink>
                            <FooterLink to="/partners">Partners</FooterLink>
                        </ul>
                    </div>

                    <div className={cn(
                        "transition-all duration-700 delay-500",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}>
                        <h3 className="font-semibold text-foreground mb-6">Legal</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/terms">Terms of Service</FooterLink>
                            <FooterLink to="/privacy">Privacy Policy</FooterLink>
                            <FooterLink to="/cookies">Cookie Policy</FooterLink>
                            <FooterLink to="/accessibility">Accessibility</FooterLink>
                        </ul>
                    </div>
                </div>

                <div className={cn(
                    "border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground transition-all duration-700 delay-700",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}>
                    <p>© {new Date().getFullYear()} TechKnots. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                        <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <li>
        <Link
            to={to}
            className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
        >
            {children}
        </Link>
    </li>
);

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-secondary/50 p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:rotate-6"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;
