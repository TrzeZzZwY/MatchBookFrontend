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
import BookService from './services/BooksService';
import { EditBookDialog } from './components/EditBookDialog/EditBookDialog';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { AddBookDialog } from './components/AddBookDialog/AddBookDialog';

interface Book {
  id: number;
  title: string;
  isRemoved: boolean;
  authors: Author[];
}

interface Author {
  firstName: string;
  lastName: string;
  id: number;
}

interface BooksResponse {
  itemsCount: number;
  totalItemsCount: number;
  pageNumber: number;
  pageSize: number;
  items: Book[];
}

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const [showRemoved, setShowRemoved] = useState(false);
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBooks = useCallback(() => {
    BookService.getBooks({
      showRemoved,
      pageSize,
      pageNumber,
      title: searchTerm,
    })
      .then((data: BooksResponse) => {
        setBooks(data.items);
        setTotalItems(data.totalItemsCount);
      })
      .catch((error) => {
        console.error('Failed to fetch books:', error);
        toast({
          variant: 'destructive',
          title: 'Błąd',
          description: 'Nie udało się pobrać listy książek.',
        });
      });
  }, [showRemoved, pageSize, pageNumber, searchTerm, toast]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchBooks]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setPageNumber(1);
  };

  const handleBookAdded = () => {
    fetchBooks();
    toast({
      title: 'Sukces',
      description: 'Książka została dodana pomyślnie.',
    });
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book.id);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteBook = async () => {
    if (bookToDelete) {
      setIsDeleting(true);
      try {
        await BookService.deleteBook(bookToDelete);
        fetchBooks();
        toast({
          title: 'Sukces',
          description: 'Książka została usunięta pomyślnie.',
        });
      } catch (error) {
        console.error('Failed to delete book:', error);
        toast({
          variant: 'destructive',
          title: 'Błąd',
          description: 'Nie udało się usunąć książki.',
        });
      } finally {
        setIsDeleting(false);
        setDeleteConfirmOpen(false);
        setBookToDelete(null);
      }
    }
  };

  return (
    <ScrollArea className="h-full bg-background text-foreground">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Książki
          </h1>
          <AddBookDialog onBookAdded={handleBookAdded} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Szukaj książek..."
              value={searchTerm}
              onChange={handleSearch}
              className="max-w-sm"
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
                <TableHead className="text-foreground">Tytuł</TableHead>
                <TableHead className="text-foreground">Autorzy</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-right text-foreground">
                  Akcje
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium text-foreground">
                    {book.title}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {book.authors
                      .map((author) => `${author.firstName} ${author.lastName}`)
                      .join(', ')}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        book.isRemoved
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}
                    >
                      {book.isRemoved ? 'Usunięty' : 'Aktywny'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {book.isRemoved == false ? (
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
                            onClick={() => handleEditBook(book)}
                            className="text-foreground"
                          >
                            Edytuj książkę
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteBook(book)}
                            className="text-red-600"
                          >
                            Usuń książkę
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
          <p className="text-sm text-gray-500">
            Zakres {(pageNumber - 1) * pageSize + 1}-
            {Math.min(pageNumber * pageSize, totalItems)} spośród {totalItems}{' '}
            użytkowników
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[...Array(5)].map((_, index) => {
              const pageNum = pageNumber - 2 + index;
              if (pageNum > 0 && pageNum <= Math.ceil(totalItems / pageSize)) {
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === pageNumber ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPageNumber(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              }
              return null;
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPageNumber((prev) =>
                  Math.min(prev + 1, Math.ceil(totalItems / pageSize)),
                )
              }
              disabled={pageNumber * pageSize >= totalItems}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <EditBookDialog
        book={editingBook}
        onClose={() => setEditingBook(null)}
        fetchBooks={fetchBooks}
      />
      <Toaster />
      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteBook}
        isProcessing={isDeleting}
        title="Czy na pewno chcesz usunąć tę książkę?"
        description="Ta akcja jest nieodwracalna."
      />
    </ScrollArea>
  );
}
