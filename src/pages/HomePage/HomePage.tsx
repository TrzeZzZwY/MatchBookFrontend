'use client';

import { useState, useEffect, useRef } from 'react';
import { Book, BookOpen, Download, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Footer } from '@/components/Footer/Footer';
import { LogoSvg } from '@/components/Logo/Logo';
import { TeamMemberCard } from '@/components/TeamMemberCard/TeamMemberCard';
import { teamMembers } from '@/data/teamMembers';
import { steps } from '@/data/steps';
import { features } from '@/data/features';

const navItems = [
  { id: 'home', label: 'Strona główna' },
  { id: 'app', label: 'Aplikacja' },
  { id: 'how-to', label: 'Jak to działa' },
  { id: 'team', label: 'Zespół' },
];

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
        <section
          id="home"
          ref={(el) => (sectionRefs.current['home'] = el)}
          className="relative min-h-screen w-full overflow-hidden"
        >
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
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Odkryj Swoją Następną{' '}
                    <span className="text-primary">Idealną Książkę</span>
                  </h1>
                  <p className="max-w-[600px] text-lg md:text-xl">
                    MatchBook pomoże Ci wymieniać się książkami z innymi osobami
                    na podstawie Twoich zainteresowań i preferencji.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="animate-float gap-2">
                    <Download className="h-5 w-5" /> Rozpocznij
                  </Button>
                  <a href="#how-to">
                    <Button size="lg" variant="secondary" className="gap-2">
                      <BookOpen className="h-5 w-5" /> Jak to działa
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[500px]">
                <LogoSvg />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="app"
          ref={(el) => (sectionRefs.current['app'] = el)}
          className="skewed-top skewed-bottom bg-background"
        >
          <div className="container mx-auto px-4 py-24">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Dlaczego MatchBook?
              </h2>
              <p className="mt-4 animate-pulse text-lg text-muted-foreground">
                Odkryj funkcje, które sprawią, że znalezienie następnej książki
                będzie niezwykle proste
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
        <section
          id="how-to"
          ref={(el) => (sectionRefs.current['how-to'] = el)}
          className="skewed-top bg-background py-24"
        >
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Jak korzystać z MatchBook
              </h2>
              <p className="mt-4 animate-pulse text-lg text-muted-foreground">
                Rozpocznij w kilku prostych krokach
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-xl">
                <video
                  className="h-full w-full object-cover"
                  //   poster="/placeholder.svg?height=400&width=600"
                  controls
                >
                  <source src="#" type="video/mp4" />
                  Twoja przeglądarka nie wspiera odtwarzania wideo.
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          ref={(el) => (sectionRefs.current['team'] = el)}
          className="bg-secondary/30 py-24"
        >
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Poznaj Nasz Zespół
              </h2>
              <p className="mt-4 animate-pulse text-lg text-muted-foreground">
                Pasjonaci książek i technologii, którzy stoją za MatchBook
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.name}
                  {...member}
                  animationDelay={`${index * 0.2}s`}
                />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" variant="outline" className="animate-bounce">
                Dołącz do Nas
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
