import { Star, Quote } from "lucide-react";
import { useTestimonials, useFeaturedTestimonial } from "@/hooks/use-testimonials";
import { cn } from "@/lib/utils";

// Fallback testimonials if backend fails
const fallbackTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?u=1",
    content: "TechKnots completely transformed my career. The interactive challenges made learning React so much more engaging than just watching videos.",
    rating: 5,
    createdAt: new Date() as any,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Data Scientist",
    image: "https://i.pravatar.cc/150?u=2",
    content: "The structured learning paths helped me go from zero to hero in Python. The mentorship feature is a game-changer!",
    rating: 5,
    createdAt: new Date() as any,
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "UX Designer",
    image: "https://i.pravatar.cc/150?u=3",
    content: "I love the community aspect. Collaborating with other learners on real-world projects gave me the confidence to apply for jobs.",
    rating: 5,
    createdAt: new Date() as any,
  },
  {
    id: "4",
    name: "David Wilson",
    role: "Full Stack Dev",
    image: "https://i.pravatar.cc/150?u=4",
    content: "The best platform for learning web development. The projects are challenging but rewarding, and the feedback is instant.",
    rating: 5,
    createdAt: new Date() as any,
  },
  {
    id: "5",
    name: "Jessica Brown",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?u=5",
    content: "Understanding the technical side of things has made me a better PM. TechKnots explains complex concepts simply.",
    rating: 5,
    createdAt: new Date() as any,
  },
  {
    id: "6",
    name: "Chris Martinez",
    role: "Mobile Developer",
    image: "https://i.pravatar.cc/150?u=6",
    content: "From Swift to React Native, the mobile dev courses are top-notch. I published my first app thanks to this platform.",
    rating: 5,
    createdAt: new Date() as any,
  },
];

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const { data: featuredTestimonial } = useFeaturedTestimonial();

  // Use backend data or fallback
  const allTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const featured = featuredTestimonial || allTestimonials[0];
  const supportingTestimonials = allTestimonials.filter((t) => t.id !== featured?.id);

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:40px_40px] opacity-60" />
        <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[160px] animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.5em] text-primary/80 font-bold">Community Voices</p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Trusted by learners who <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">ship real work</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Mentors, designers, and developers rely on TechKnots to stay sharp. Here's how they describe the experience.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            {featured && <FeaturedTestimonial testimonial={featured} allTestimonials={allTestimonials} />}

            {supportingTestimonials.length > 0 && (
              <div className="relative h-[600px] overflow-hidden mask-gradient-y">
                {/* Vertical Marquee Column 1 */}
                <div className="absolute top-0 left-0 w-[48%] animate-marquee-vertical hover:[animation-play-state:paused]">
                  <div className="flex flex-col gap-6 pb-6">
                    {[...supportingTestimonials, ...supportingTestimonials].filter((_, i) => i % 2 === 0).map((testimonial, index) => (
                      <SupportingTestimonial key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
                    ))}
                  </div>
                </div>

                {/* Vertical Marquee Column 2 (Reverse) */}
                <div className="absolute top-0 right-0 w-[48%] animate-marquee-vertical-reverse hover:[animation-play-state:paused]">
                  <div className="flex flex-col gap-6 pb-6">
                    {[...supportingTestimonials, ...supportingTestimonials].filter((_, i) => i % 2 !== 0).map((testimonial, index) => (
                      <SupportingTestimonial key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const FeaturedTestimonial = ({ testimonial, allTestimonials }: { testimonial: typeof fallbackTestimonials[0]; allTestimonials: typeof fallbackTestimonials }) => (
  <article className="relative h-full min-h-[500px] rounded-[40px] border border-border/80 bg-card p-10 shadow-2xl shadow-primary/10 overflow-hidden group hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

    <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-4 border-background shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{testimonial.name}</p>
            <p className="text-base text-muted-foreground font-medium">{testimonial.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 w-fit px-3 py-1 rounded-full">
          <Quote className="w-4 h-4 fill-current" />
          Featured Story
        </div>

        <p className="text-2xl leading-relaxed text-foreground font-medium">
          "{testimonial.content}"
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 p-4 bg-secondary/30 rounded-2xl border border-border/50">
          <StarCluster />
          <div className="w-px h-8 bg-border" />
          <div>
            <p className="text-2xl font-bold text-foreground">4.9/5</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Average rating</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {allTestimonials.slice(0, 4).map((person) => (
              <img
                key={person.id}
                src={person.image}
                alt={person.name}
                className="w-10 h-10 rounded-full border-2 border-card object-cover ring-2 ring-background"
              />
            ))}
          </div>
          <p className="text-sm font-medium text-muted-foreground">Join <span className="text-foreground font-bold">10k+</span> others</p>
        </div>
      </div>
    </div>
  </article>
);

const SupportingTestimonial = ({ testimonial, index }: { testimonial: typeof fallbackTestimonials[0]; index: number }) => (
  <article
    className="relative rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 group cursor-default"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground transition-colors">
      "{testimonial.content}"
    </p>
    <div className="flex gap-0.5">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  </article>
);

const StarCluster = () => (
  <div className="flex gap-1 text-primary">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-current text-primary" />
    ))}
  </div>
);

export default Testimonials;

