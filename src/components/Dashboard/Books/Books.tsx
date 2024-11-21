'use client';

import React, { useState } from 'react';
import {
  MoreHorizontal,
  Plus,
  Search,
  Eye,
  ThumbsUp,
  Globe,
  Lock,
} from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for books
const books = [
  {
    id: 1,
    userId: 1,
    userName: 'Jan Kowalski',
    titleId: 1,
    titleName: 'Lalka',
    category: 'Powieść',
    bookPointId: 1,
    bookPointName: 'Biblioteka Główna',
    createDate: '2023-06-15',
    updateDate: '2023-06-16',
    description: 'Klasyczna polska powieść o miłości i społeczeństwie',
    imageId: 1,
    visibility: 'Public',
    authors: ['Bolesław Prus'],
    likes: 120,
  },
  {
    id: 2,
    userId: 2,
    userName: 'Anna Nowak',
    titleId: 2,
    titleName: 'Pan Tadeusz',
    category: 'Epopeja',
    bookPointId: 2,
    bookPointName: 'Filia nr 1',
    createDate: '2023-06-14',
    updateDate: null,
    description: 'Narodowy poemat epicki Adama Mickiewicza',
    imageId: 2,
    visibility: 'Private',
    authors: ['Adam Mickiewicz'],
    likes: 150,
  },
  {
    id: 3,
    userId: 3,
    userName: 'Marek Wiśniewski',
    titleId: 3,
    titleName: 'Quo Vadis',
    category: 'Powieść historyczna',
    bookPointId: 1,
    bookPointName: 'Biblioteka Główna',
    createDate: '2023-06-13',
    updateDate: '2023-06-14',
    description: 'Powieść historyczna o starożytnym Rzymie',
    imageId: 3,
    visibility: 'Public',
    authors: ['Henryk Sienkiewicz'],
    likes: 140,
  },
];

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = books.filter(
      (book) =>
        book.titleName.toLowerCase().includes(term) ||
        book.authors.some((author) => author.toLowerCase().includes(term)) ||
        book.category.toLowerCase().includes(term),
    );
    setFilteredBooks(filtered);
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold text-black md:text-3xl">Książki</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Dodaj książkę
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-black">
                  Dodaj nową książkę
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Wprowadź dane nowej książki tutaj. Kliknij „zapisz", gdy
                  skończysz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right text-black">
                    Tytuł
                  </Label>
                  <Input id="title" className="col-span-3 text-black" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right text-black">
                    Autor
                  </Label>
                  <Input id="author" className="col-span-3 text-black" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right text-black">
                    Kategoria
                  </Label>
                  <Input id="category" className="col-span-3 text-black" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bookPoint" className="text-right text-black">
                    Punkt książki
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3 text-black">
                      <SelectValue placeholder="Wybierz punkt książki" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Biblioteka Główna</SelectItem>
                      <SelectItem value="2">Filia nr 1</SelectItem>
                      <SelectItem value="3">Filia nr 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="description"
                    className="text-right text-black"
                  >
                    Opis
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3 text-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="visibility" className="text-right text-black">
                    Widoczność
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3 text-black">
                      <SelectValue placeholder="Wybierz widoczność" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Publiczna</SelectItem>
                      <SelectItem value="Private">Prywatna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Zapisz książkę</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Szukaj książek..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm text-black"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-black">Tytuł</TableHead>
                <TableHead className="text-black">Autor</TableHead>
                <TableHead className="text-black">Kategoria</TableHead>
                <TableHead className="text-black">Punkt książki</TableHead>
                <TableHead className="text-black">Widoczność</TableHead>
                <TableHead className="text-black">Polubienia</TableHead>
                <TableHead className="text-right text-black">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium text-black">
                    {book.titleName}
                  </TableCell>
                  <TableCell className="text-black">
                    {book.authors.join(', ')}
                  </TableCell>
                  <TableCell className="text-black">{book.category}</TableCell>
                  <TableCell className="text-black">
                    {book.bookPointName}
                  </TableCell>
                  <TableCell>
                    {book.visibility === 'Public' ? (
                      <Globe className="h-4 w-4 text-green-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-yellow-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-black">
                      <ThumbsUp className="mr-1 h-4 w-4 text-gray-500" />
                      {book.likes}
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
                          Edytuj książkę
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Usuń książkę
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
