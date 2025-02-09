import { Book, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MatchBook</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Odkryj swoją następną idealną książkę dzięki naszej aplikacji
              rekomendującej książki zasilanej przez AI.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Produkt</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Funkcje
                  </a>
                </li>
                <li>
                  <a
                    href="#how-to"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Jak to działa
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cennik
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Firma</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/about-us"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    O nas
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Kariera
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Kontakt</h4>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://github.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} MatchBook. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
