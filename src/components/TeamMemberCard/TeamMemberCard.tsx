interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  animationDelay: string;
}

export function TeamMemberCard({
  name,
  role,
  image,
  bio,
  animationDelay,
}: TeamMemberCardProps) {
  return (
    <div
      className="group relative animate-float overflow-hidden rounded-lg bg-background p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{ animationDelay }}
    >
      <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg">
        <img
          src={image || '/placeholder.svg'}
          alt={name}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-sm text-primary">{role}</p>
      <p className="mt-2 text-muted-foreground">{bio}</p>
      <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-gradient-to-r from-primary to-primary-foreground transition-transform duration-300 group-hover:scale-x-100"></div>
    </div>
  );
}
