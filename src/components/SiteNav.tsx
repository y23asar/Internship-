import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Loader2, Search, Menu, ChevronDown, X, Brain, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const SiteNav = () => {
  const { user, role, loading, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const exploreTimeout = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToDashboard = () => {
    if (role) {
      navigate(`/${role}-dashboard`);
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const exploreCategories = [
    { name: "Web Development", path: "/courses/web-dev" },
    { name: "Data Science", path: "/courses/data-science" },
    { name: "Mobile Development", path: "/courses/mobile-dev" },
    { name: "Cloud Computing", path: "/courses/cloud" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled || isSearchOpen
            ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8 transition-opacity duration-300">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                TechKnots
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <div
                onMouseEnter={() => setIsExploreOpen(true)}
                onMouseLeave={() => setIsExploreOpen(false)}
              >
                <DropdownMenu open={isExploreOpen} onOpenChange={setIsExploreOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="gap-1 font-medium hover:bg-primary/5 data-[state=open]:bg-primary/5"
                    >
                      Explore <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 p-2 animate-fade-in-up mt-2"
                    sideOffset={0}
                  >
                    {/* Web Development */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="cursor-pointer rounded-md focus:bg-primary/10 focus:text-primary">
                        <span className="flex items-center gap-2">
                          <Code2 className="h-4 w-4" />
                          Web Development
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-2">
                        <DropdownMenuItem asChild>
                          <Link to="/courses/web/react" className="cursor-pointer">React Mastery</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/courses/web/nextjs" className="cursor-pointer">Next.js & Server Components</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/courses/web/typescript" className="cursor-pointer">TypeScript for Pros</Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Data Science */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="cursor-pointer rounded-md focus:bg-primary/10 focus:text-primary">
                        <span className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Data Science
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-2">
                        <DropdownMenuItem asChild>
                          <Link to="/courses/data/python" className="cursor-pointer">Python Data Structures</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/courses/data/ml" className="cursor-pointer">Machine Learning with Python</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/courses/data/sql" className="cursor-pointer">SQL Database Fundamentals</Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Mobile Development */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="cursor-pointer rounded-md focus:bg-primary/10 focus:text-primary">
                        <span className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Mobile Dev
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="p-2">
                        <DropdownMenuItem asChild>
                          <Link to="/courses/mobile/react-native" className="cursor-pointer">React Native</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/courses/mobile/flutter" className="cursor-pointer">Flutter Basics</Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-primary/10 focus:text-primary">
                      <Link to="/courses">
                        Browse All Categories
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link to="/courses">
                <Button variant="ghost" className="font-medium hover:bg-primary/5">Courses</Button>
              </Link>
              <Link to="/challenges">
                <Button variant="ghost" className="font-medium hover:bg-primary/5">Challenges</Button>
              </Link>
            </div>
          </div>

          {/* Search and Auth Container */}
          <div className="flex items-center gap-3 relative">
            {/* Search Bar Container */}
            <div className="relative flex items-center">
              <form
                onSubmit={handleSearch}
                className={cn(
                  "absolute right-12 top-1/2 -translate-y-1/2 origin-right transition-all duration-500 ease-out",
                  isSearchOpen
                    ? "opacity-100 scale-100 pointer-events-auto w-[min(320px,calc(100vw-220px))]"
                    : "opacity-0 scale-95 pointer-events-none w-0"
                )}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-9 h-10 bg-background/95 backdrop-blur-md border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm rounded-full shadow-lg w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus={isSearchOpen}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Search Suggestions */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-fade-in-up origin-top min-w-[240px]">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
                        {searchQuery ? "Suggestions" : "Popular Searches"}
                      </div>
                      {(searchQuery
                        ? ["React for Beginners", "Advanced Python", "Data Science Fundamentals", "Machine Learning 101", "Web Design Mastery"].filter((s) =>
                          s.toLowerCase().includes(searchQuery.toLowerCase()),
                        )
                        : ["React for Beginners", "Advanced Python", "Data Science Fundamentals"]
                      ).map((suggestion) => (
                        <div
                          key={suggestion}
                          className="px-3 py-2 hover:bg-secondary/50 rounded-lg cursor-pointer transition-colors flex items-center gap-2 text-sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchQuery(suggestion);
                          }}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setIsSearchOpen(false);
                            navigate(`/courses?search=${encodeURIComponent(suggestion)}`);
                          }}
                        >
                          <Search className="h-3 w-3 text-muted-foreground" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full hover:bg-secondary transition-all duration-300",
                  isSearchOpen ? "text-primary bg-primary/10 shadow-lg shadow-primary/20" : "",
                )}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Auth Buttons - Always Visible */}
            <div className="flex items-center gap-3">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : user && role ? (
                <div className="hidden md:flex items-center gap-3">
                  <Button variant="secondary" onClick={goToDashboard} size="sm" className="rounded-full">
                    Dashboard
                  </Button>
                  <Button variant="ghost" onClick={handleLogout} size="sm" className="rounded-full">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="rounded-full">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-full transition-all hover:-translate-y-0.5">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Explore</h3>
                      {exploreCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-lg hover:bg-secondary/50"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex flex-col gap-2">
                      <Link to="/courses" className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-lg hover:bg-secondary/50">
                        All Courses
                      </Link>
                      <Link to="/challenges" className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-lg hover:bg-secondary/50">
                        Challenges
                      </Link>
                      <Link to="/mentors" className="text-lg font-medium hover:text-primary transition-colors p-2 rounded-lg hover:bg-secondary/50">
                        Mentorship
                      </Link>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex flex-col gap-3">
                      {user && role ? (
                        <>
                          <Button onClick={goToDashboard} className="w-full rounded-full">Dashboard</Button>
                          <Button variant="outline" onClick={handleLogout} className="w-full rounded-full">Sign Out</Button>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="w-full">
                            <Button variant="outline" className="w-full rounded-full">Sign In</Button>
                          </Link>
                          <Link to="/signup" className="w-full">
                            <Button className="w-full rounded-full">Get Started</Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav >
    </>
  );
};

export default SiteNav;
