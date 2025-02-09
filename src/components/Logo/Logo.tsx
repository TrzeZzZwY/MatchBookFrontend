import { BookOpen } from 'lucide-react';

export function LogoSvg() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div className="relative h-[500px] w-64 md:h-[600px] md:w-80">
        {/* Phone frame */}
        <div className="absolute inset-0 rounded-[3rem] bg-secondary shadow-xl">
          <div className="absolute inset-1 rounded-[2.75rem] bg-background"></div>
          {/* Power button */}
          <div className="absolute right-0 top-24 h-12 w-1 rounded-l-md bg-muted"></div>
          {/* Volume buttons */}
          <div className="absolute left-0 top-32 h-16 w-1 rounded-r-md bg-muted"></div>
          <div className="absolute left-0 top-52 h-16 w-1 rounded-r-md bg-muted"></div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-3 flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-foreground">
          <div className="relative h-32 w-32 md:h-48 md:w-48">
            <div className="animate-page-turn absolute inset-0">
              <BookOpen
                className="h-full w-full text-background"
                strokeWidth={1.5}
              />
            </div>
            <div className="animate-page-turn animation-delay-300 absolute inset-0">
              <BookOpen
                className="h-full w-full text-background opacity-70"
                strokeWidth={1.5}
              />
            </div>
            <div className="animate-page-turn animation-delay-600 absolute inset-0">
              <BookOpen
                className="h-full w-full text-background opacity-40"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 transform rounded-b-2xl bg-secondary"></div>
      </div>

      <h2 className="mt-8 text-4xl font-bold">
        <span className="text-foreground">Match</span>
        <span className="text-primary">Book</span>
      </h2>
    </div>
  );
}
