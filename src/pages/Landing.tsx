import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, LayoutGrid, FileText, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const features = [
  {
    icon: Users,
    title: "Real-time collaboration",
    description: "Work together seamlessly with live cursors, instant updates, and threaded comments.",
  },
  {
    icon: LayoutGrid,
    title: "Flexible views",
    description: "Switch between list, board, and calendar views to match how you think.",
  },
  {
    icon: FileText,
    title: "Integrated notes & wiki",
    description: "Keep documentation alongside your tasks. No more context-switching between tools.",
  },
  {
    icon: CreditCard,
    title: "Simple subscriptions",
    description: "Transparent pricing that scales with your team. No per-seat surprises.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 glass">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-primary" />
            <span>Flowboard</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <Link to="/sign-in" className="hover:text-foreground transition-colors">Log in</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/sign-up">Start for free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative py-24 md:py-40 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              Now in public beta <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Focus on what matters.{" "}
            <span className="text-gradient">Collaborate without chaos.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            Task management, projects, and team wikis in one beautiful workspace.
            Built for small teams who move fast.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/sign-up">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <a href="#features">See how it works</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-24 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything your team needs
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Simple tools that work together beautifully, so you can stay focused on shipping.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="rounded-2xl bg-gradient-hero border border-border p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to get started?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
            Join thousands of teams already shipping faster with Flowboard.
          </p>
          <Button asChild size="lg" className="mt-8 text-base px-8">
            <Link to="/sign-up">
              Create your workspace <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container py-12 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <Zap className="h-5 w-5 text-primary" />
              Flowboard
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Task management for teams who value simplicity and speed.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-3">
              <p className="font-medium">Product</p>
              <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </div>
            <div className="space-y-3">
              <p className="font-medium">Account</p>
              <Link to="/sign-in" className="block text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
              <Link to="/sign-up" className="block text-muted-foreground hover:text-foreground transition-colors">Sign up</Link>
            </div>
          </div>
        </div>
        <div className="container pb-8">
          <p className="text-xs text-muted-foreground">© 2026 Flowboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
