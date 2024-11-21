'use client';

import React, { useState } from 'react';
import {
  MoreHorizontal,
  Plus,
  Search,
  MapPin,
  Book,
  Calendar,
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

// Mock data for book points
const bookPoints = [
  {
    id: 1,
    lat: 52.2297,
    long: 21.0122,
    regionId: 1,
    regionName: 'Mazowieckie',
    capacity: 20,
    createDate: '2023-01-15',
    updateDate: '2023-06-01',
    booksCount: 4,
  },
  {
    id: 2,
    lat: 50.0647,
    long: 19.945,
    regionId: 2,
    regionName: 'Małopolskie',
    capacity: 10,
    createDate: '2023-02-20',
    updateDate: null,
    booksCount: 4,
  },
  {
    id: 3,
    lat: 53.1325,
    long: 23.1688,
    regionId: 3,
    regionName: 'Podlaskie',
    capacity: 5,
    createDate: '2023-03-10',
    updateDate: '2023-05-15',
    booksCount: 2,
  },
];

export default function BookPoints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookPoints, setFilteredBookPoints] = useState(bookPoints);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = bookPoints.filter(
      (bookPoint) =>
        bookPoint.regionName.toLowerCase().includes(term) ||
        bookPoint.id.toString().includes(term),
    );
    setFilteredBookPoints(filtered);
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            Punkty Książek
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Dodaj punkt książek
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-black">
                  Dodaj nowy punkt książek
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Wprowadź dane nowego punktu książek tutaj. Kliknij „zapisz",
                  gdy skończysz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lat" className="text-right text-black">
                    Szerokość
                  </Label>
                  <Input
                    id="lat"
                    type="number"
                    step="0.0001"
                    className="col-span-3 text-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="long" className="text-right text-black">
                    Długość
                  </Label>
                  <Input
                    id="long"
                    type="number"
                    step="0.0001"
                    className="col-span-3 text-black"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="region" className="text-right text-black">
                    Region
                  </Label>
                  <Input id="region" className="col-span-3 text-black" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right text-black">
                    Pojemność
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    className="col-span-3 text-black"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Zapisz punkt książek</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            placeholder="Szukaj punktów książek..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm text-black"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-black">ID</TableHead>
                <TableHead className="text-black">Lokalizacja</TableHead>
                <TableHead className="text-black">Region</TableHead>
                <TableHead className="text-black">Pojemność</TableHead>
                <TableHead className="text-black">Liczba książek</TableHead>
                <TableHead className="text-black">Data utworzenia</TableHead>
                <TableHead className="text-right text-black">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookPoints.map((bookPoint) => (
                <TableRow key={bookPoint.id}>
                  <TableCell className="font-medium text-black">
                    {bookPoint.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-black">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      {bookPoint.lat.toFixed(4)}, {bookPoint.long.toFixed(4)}
                    </div>
                  </TableCell>
                  <TableCell className="text-black">
                    {bookPoint.regionName}
                  </TableCell>
                  <TableCell className="text-black">
                    {bookPoint.capacity}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-black">
                      <Book className="mr-2 h-4 w-4 text-gray-500" />
                      {bookPoint.booksCount} / {bookPoint.capacity}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-black">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      {bookPoint.createDate}
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
                          Edytuj punkt
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Usuń punkt
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
