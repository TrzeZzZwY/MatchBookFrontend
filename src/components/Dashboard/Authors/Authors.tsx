'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import AuthorService from '../Authors/services/AuthorsService';
import { AddAuthorDialog } from './components/AddAuthorDialog/AddAuthorDialog';
import { EditAuthorDialog } from './components/EditAuthorDialog/EditAuthorDialog';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

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
  totalItemsCount: number;
  pageNumber: number;
  pageSize: number;
  items: Author[];
}

export default function Authors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<number | null>(null);
  const [showRemoved, setShowRemoved] = useState(false);
  const { toast } = useToast();

  const fetchAuthors = useCallback(() => {
    AuthorService.getAuthors({
      showRemoved,
      pageSize,
      pageNumber,
      authorName: searchTerm,
    })
      .then((data: AuthorsResponse) => {
        setAuthors(data.items);
        setTotalItems(data.totalItemsCount);
      })
      .catch((error) => {
        console.error('Failed to fetch authors:', error);
        toast({
          variant: 'destructive',
          title: 'Błąd',
          description: 'Nie udało się pobrać listy autorów.',
        });
      });
  }, [showRemoved, pageSize, pageNumber, searchTerm, toast]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchAuthors();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchAuthors]);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setPageNumber(1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleAuthorAdded = () => {
    fetchAuthors();
    toast({
      title: 'Sukces',
      description: 'Autor został dodany pomyślnie.',
    });
  };

  const handleEditAuthor = (author: Author) => {
    setEditingAuthor(author);
  };

  const handleAuthorUpdated = () => {
    fetchAuthors();
    setEditingAuthor(null);
    toast({
      title: 'Sukces',
      description: 'Dane autora zostały zaktualizowane pomyślnie.',
    });
  };

  const handleDeleteAuthor = (author: Author) => {
    setAuthorToDelete(author.id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteAuthor = async () => {
    if (authorToDelete) {
      setIsDeleting(true);
      try {
        await AuthorService.deleteAuthor(authorToDelete);
        fetchAuthors();
        toast({
          title: 'Sukces',
          description: 'Autor został usunięty pomyślnie.',
        });
      } catch (error) {
        console.error('Failed to delete author:', error);
        toast({
          variant: 'destructive',
          title: 'Błąd',
          description: 'Nie udało się usunąć autora.',
        });
      } finally {
        setIsDeleting(false);
        setDeleteConfirmOpen(false);
        setAuthorToDelete(null);
      }
    }
  };

  return (
    <ScrollArea className="h-full bg-background text-foreground">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Autorzy
          </h1>
          <AddAuthorDialog onAuthorAdded={handleAuthorAdded} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Szukaj autorów..."
              value={searchTerm}
              onChange={handleSearch}
              className="max-w-sm text-foreground"
            />
          </div>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wybierz rozmiar strony" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 na stronę</SelectItem>
              <SelectItem value="25">25 na stronę</SelectItem>
              <SelectItem value="50">50 na stronę</SelectItem>
              <SelectItem value="100">100 na stronę</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2 text-foreground">
            <Checkbox
              id="showRemoved"
              checked={showRemoved}
              onCheckedChange={(checked) => setShowRemoved(checked as boolean)}
            />
            <label
              htmlFor="showRemoved"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pokaż usunięte rekordy
            </label>
          </div>
        </div>
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-foreground">
                  Imię
                </TableHead>
                <TableHead className="w-[200px] text-foreground">
                  Nazwisko
                </TableHead>
                <TableHead className="text-foreground">Kraj</TableHead>
                <TableHead className="text-foreground">Rok urodzenia</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-right text-foreground">
                  Akcje
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell className="font-medium text-foreground">
                    {author.firstName}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {author.lastName}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {author.country}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {author.yearOfBirth}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        author.isRemoved == false
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {author.isRemoved ? 'Usunięty' : 'Aktywny'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {author.isRemoved == false ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Otwórz menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="text-foreground">
                            Akcje
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditAuthor(author)}
                            className="text-foreground"
                          >
                            Edytuj autora
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteAuthor(author)}
                            className="text-red-600"
                          >
                            Usuń autora
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Zakres {(pageNumber - 1) * pageSize + 1} -{' '}
            {Math.min(pageNumber * pageSize, totalItems)} spośród {totalItems}{' '}
            autorów
          </p>
          <div className="flex items-center space-x-2 text-foreground">
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
              disabled={pageNumber * pageSize >= totalItems}
            >
              Następna strona
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {editingAuthor && (
        <EditAuthorDialog
          author={editingAuthor}
          isOpen={!!editingAuthor}
          onClose={() => setEditingAuthor(null)}
          onAuthorUpdated={handleAuthorUpdated}
        />
      )}
      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteAuthor}
        title="Potwierdzenie usunięcia"
        description={`Czy na pewno chcesz usunąć autora ${
          authorToDelete
            ? `${authors.find((a) => a.id === authorToDelete)?.firstName} ${
                authors.find((a) => a.id === authorToDelete)?.lastName
              }`
            : ''
        }?`}
        confirmLabel="Usuń"
        cancelLabel="Anuluj"
        isProcessing={isDeleting}
      />
      <Toaster />
    </ScrollArea>
  );
}
