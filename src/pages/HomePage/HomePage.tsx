'use client';

import { useState, useEffect, useRef } from 'react';
import { Book, BookOpen, Download, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer/Footer';
import { LogoSvg } from '@/components/Logo/Logo';
import { TeamMemberCard } from '@/components/TeamMemberCard/TeamMemberCard';
import { teamMembers } from '@/data/teamMembers';
import { steps } from '@/data/steps';
import { features } from '@/data/features';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { ReactNode } from 'react';

const navItems = [
  { id: 'home', label: 'Strona główna' },
  { id: 'app', label: 'Aplikacja' },
  { id: 'how-to', label: 'Jak to działa' },
  { id: 'team', label: 'Zespół' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } },
};

interface AnimatedSectionProps {
  children: ReactNode;
  id: string;
}

const AnimatedSection = ({ children, id }: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerChildren}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <main className="relative min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Book className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MatchBook</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden font-bold md:flex md:items-center md:space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-sm font-medium transition-colors hover:text-primary lg:text-base ${
                      activeSection === item.id ? 'text-primary' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <ThemeToggle />
                <Button>Pobierz aplikację</Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center space-x-4 md:hidden">
                <ThemeToggle />
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
              <div className="space-y-1 px-4 pb-3 pt-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 text-base font-medium hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4">
                  <Button className="w-full">Pobierz aplikację</Button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <AnimatedSection id="home">
          <div className="relative min-h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="src\assets\img\book_big.png"
                alt="Tło główne"
                className="kenburns-top h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95" />
            </div>
            <div className="container relative mx-auto min-h-screen px-4 py-16 md:py-24 lg:py-64">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <motion.div className="space-y-8" variants={fadeInUp}>
                  <motion.div className="space-y-4" variants={fadeInUp}>
                    <motion.h1
                      className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                      variants={fadeInUp}
                    >
                      Odkryj Swoją Następną{' '}
                      <span className="text-primary">Idealną Książkę</span>
                    </motion.h1>
                    <motion.p
                      className="max-w-[600px] text-lg md:text-xl"
                      variants={fadeInUp}
                    >
                      MatchBook pomoże Ci wymieniać się książkami z innymi
                      osobami na podstawie Twoich zainteresowań i preferencji.
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap gap-4"
                    variants={fadeInUp}
                  >
                    <Button size="lg" className="animate-float gap-2">
                      <Download className="h-5 w-5" /> Rozpocznij
                    </Button>
                    <a href="#how-to">
                      <Button size="lg" variant="secondary" className="gap-2">
                        <BookOpen className="h-5 w-5" /> Jak to działa
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="relative mx-auto aspect-[3/4] w-full max-w-[500px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <LogoSvg />
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection id="app">
          <div className="skewed-top skewed-bottom bg-background">
            <div className="container mx-auto px-4 py-24">
              <motion.div className="mb-12 text-center" variants={fadeInUp}>
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  variants={fadeInUp}
                >
                  Dlaczego MatchBook?
                </motion.h2>
                <motion.p
                  className="mt-4 animate-pulse text-lg text-muted-foreground"
                  variants={fadeInUp}
                >
                  Odkryj funkcje, które sprawią, że znalezienie następnej
                  książki będzie niezwykle proste
                </motion.p>
              </motion.div>

              <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerChildren}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                    variants={fadeInUp}
                  >
                    <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* App Showcase Section */}
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary to-primary-foreground py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
            {/* Add decorative stars */}
            <div className="absolute left-1/4 top-12 h-2 w-2 animate-pulse bg-white" />
            <div className="absolute right-1/3 top-24 h-2 w-2 animate-pulse bg-white" />
            <div className="absolute bottom-32 left-1/3 h-2 w-2 animate-pulse bg-white" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="mb-16 text-center text-white">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Wiele możliwości
              </h2>
              <p className="mt-4 animate-pulse text-lg text-white/80 md:text-xl">
                Odkryj wszystkie funkcje naszej aplikacji
              </p>
            </div>

            <div className="relative mx-auto max-w-6xl">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`transform transition-all duration-500 hover:scale-105 ${
                      i % 2 === 0 ? 'translate-y-8' : '-translate-y-8'
                    }`}
                  >
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/test-5dXmeJr4tZVqPCRgm1urUdNZk4cPXJ.png"
                      alt={`Screen ${i + 1}`}
                      width={400}
                      height={800}
                      className="rounded-2xl shadow-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <AnimatedSection id="how-to">
          <div className="skewed-top bg-background py-24">
            <div className="container mx-auto px-4">
              <motion.div className="mb-12 text-center" variants={fadeInUp}>
                <motion.h2
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                  variants={fadeInUp}
                >
                  Jak korzystać z MatchBook
                </motion.h2>
                <motion.p
                  className="mt-4 animate-pulse text-lg text-muted-foreground"
                  variants={fadeInUp}
                >
                  Rozpocznij w kilku prostych krokach
                </motion.p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                <motion.div className="space-y-8" variants={staggerChildren}>
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      variants={fadeInUp}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="relative mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-xl"
                  variants={fadeInUp}
                >
                  <video className="h-full w-full object-cover" controls>
                    <source src="#" type="video/mp4" />
                    Twoja przeglądarka nie wspiera odtwarzania wideo.
                  </video>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection id="team">
          <div className="bg-secondary/30 py-24">
            <div className="container mx-auto px-4">
              <motion.div className="mb-16 text-center" variants={fadeInUp}>
                <motion.h2
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                  variants={fadeInUp}
                >
                  Poznaj Nasz Zespół
                </motion.h2>
                <motion.p
                  className="mt-4 animate-pulse text-lg text-muted-foreground"
                  variants={fadeInUp}
                >
                  Pasjonaci książek i technologii, którzy stoją za MatchBook
                </motion.p>
              </motion.div>

              <motion.div
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerChildren}
              >
                {teamMembers.map((member, index) => (
                  <motion.div key={member.name} variants={fadeInUp}>
                    <TeamMemberCard
                      {...member}
                      animationDelay={`${index * 0.2}s`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="mt-16 text-center" variants={fadeInUp}>
                <Button size="lg" variant="outline" className="animate-bounce">
                  Dołącz do Nas
                </Button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
