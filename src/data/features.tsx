import { BookOpen, Users, MapPin, MessageSquare } from 'lucide-react';

export const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Bogaty wybór książek',
    description:
      'Przeglądaj setki tytułów z różnych gatunków i znajdź coś idealnego dla siebie.',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Książki blisko Ciebie',
    description:
      'Otrzymuj propozycje książek dostępnych w Twojej okolicy, dopasowane na podstawie ustawionych preferencji.',
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Czat z użytkownikami',
    description:
      'Po dopasowaniu możesz rozmawiać z innymi użytkownikami i ustalać szczegóły wymiany.',
  },
  //   {
  //     icon: <Users className="h-6 w-6" />,
  //     title: 'Darmowe bookpointy',
  //     description:
  //       'Odbieraj darmowe książki w dedykowanych punktach wymiany i odkrywaj nowe tytuły bez opłat.',
  //   },
];
