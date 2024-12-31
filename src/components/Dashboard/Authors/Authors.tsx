'use client';

import React, { useState, useEffect } from 'react';
import {
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
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
import { ScrollArea } from '@/components/ui/scroll-area';
import AuthorService from '../Authors/services/AuthorsService';
import { AddAuthorDialog } from './components/AddAuthorDialog/AddAuthorDialog';

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  yearOfBirth: number;
  isRemoved: boolean;
}

interface AuthorsResponse {
  itemsCount: number;
  pageNumber: number;
  pageSize: number;
  items: Author[];
}

export default function Authors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchAuthors();
  }, [pageNumber, pageSize]);

  const fetchAuthors = () => {
    AuthorService.getAuthors({ pageNumber, pageSize })
      .then((data: AuthorsResponse) => {
        setAuthors(data.items);
        setFilteredAuthors(data.items);
        setTotalItems(data.itemsCount);
      })
      .catch((error) => {
        console.error('Failed to fetch authors:', error);
      });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(term) ||
        author.lastName.toLowerCase().includes(term) ||
        author.country.toLowerCase().includes(term),
    );
    setFilteredAuthors(filtered);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < Math.ceil(totalItems / pageSize)) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleAuthorAdded = () => {
    fetchAuthors();
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold text-black md:text-3xl">Autorzy</h1>
          <AddAuthorDialog onAuthorAdded={handleAuthorAdded} />
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
                <TableHead className="text-black">Kraj</TableHead>
                <TableHead className="text-black">Rok urodzenia</TableHead>
                <TableHead className="text-right text-black">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuthors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-medium text-black">
                    {author.firstName}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {author.lastName}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {author.country}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {author.yearOfBirth}
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
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(pageNumber - 1) * pageSize + 1} to{' '}
            {Math.min(pageNumber * pageSize, totalItems)} of {totalItems}{' '}
            authors
          </p>
          <div className="flex items-center space-x-2 text-black">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Poprzednia strona
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={pageNumber >= Math.ceil(totalItems / pageSize)}
            >
              Następna strona
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
