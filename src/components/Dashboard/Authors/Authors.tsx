'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Plus, Search, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for authors
const authors = [
  {
    id: 1,
    name: 'Henryk',
    surname: 'Sienkiewicz',
    books: [
      { id: 1, title: 'Quo Vadis' },
      { id: 2, title: 'Krzyżacy' },
      { id: 3, title: 'Potop' },
    ],
  },
  {
    id: 2,
    name: 'Wisława',
    surname: 'Szymborska',
    books: [
      { id: 4, title: 'Wołanie do Yeti' },
      { id: 5, title: 'Sto pociech' },
    ],
  },
  {
    id: 3,
    name: 'Stanisław',
    surname: 'Lem',
    books: [
      { id: 6, title: 'Solaris' },
      { id: 7, title: 'Cyberiada' },
      { id: 8, title: 'Bajki robotów' },
      { id: 9, title: 'Opowieści o pilocie Pirxie' },
    ],
  },
];

export default function Authors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState(authors);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = authors.filter(
      (author) =>
        author.name.toLowerCase().includes(term) ||
        author.surname.toLowerCase().includes(term),
    );
    setFilteredAuthors(filtered);
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold text-black md:text-3xl">Autorzy</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Dodaj autora
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-black">
                  Dodaj nowego autora
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Wprowadź dane nowego autora tutaj. Kliknij „zapisz", gdy
                  skończysz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-black">
                    Imię
                  </Label>
                  <Input id="name" className="col-span-3 text-black" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="surname" className="text-right text-black">
                    Nazwisko
                  </Label>
                  <Input id="surname" className="col-span-3 text-black" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Zapisz autora</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Szukaj autorów..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm text-black"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-black">Imię</TableHead>
                <TableHead className="w-[200px] text-black">Nazwisko</TableHead>
                <TableHead className="text-black">Książki</TableHead>
                <TableHead className="text-right text-black">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuthors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-medium text-black">
                    {author.name}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {author.surname}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-black">
                      <Book className="mr-1 h-4 w-4 text-gray-500" />
                      {author.books.length}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Otwórz menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="text-black">
                          Akcje
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="text-black">
                          Wyświetl szczegóły
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-black">
                          Edytuj autora
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Usuń autora
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  );
}
