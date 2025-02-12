'use client';

import { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import UserBookItemsService, {
  type UserBookItem,
  type User,
} from './service/UserBookItemsService';
import { Toaster } from '@/components/ui/toaster';

export default function UserBookItemsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userBookItems, setUserBookItems] = useState<UserBookItem[]>([]);
  const [users, setUsers] = useState<{ [key: number]: User }>({});
  const [error, setError] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchUserBookItems = UserBookItemsService.getUserBookItems({
      pageSize,
      pageNumber,
      title: searchTerm,
    });

    fetchUserBookItems
      .then((data) => {
        setUserBookItems(data.items);
        setTotalItems(data.totalItemsCount);

        data.items.forEach((item) => {
          if (item.userId && !users[item.userId]) {
            UserBookItemsService.getUserDetails(item.userId)
              .then((userData) => {
                setUsers((prev) => ({ ...prev, [item.userId]: userData }));
              })
              .catch(() => setError('Błąd pobierania danych użytkownika.'));
          }
        });
      })
      .catch(() => setError('Nie udało się załadować książek użytkowników.'));

    return () => fetchUserBookItems.cancel();
  }, [searchTerm, pageNumber, pageSize, users]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6 p-6 text-foreground">
      <h1 className="text-3xl font-bold">Książki użytkowników</h1>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Szukaj tytułu książki..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Label>Liczba pozycji na stronę</Label>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            setPageSize(Number(value));
            setPageNumber(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wybierz ilość" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 na stronę</SelectItem>
            <SelectItem value="10">10 na stronę</SelectItem>
            <SelectItem value="20">20 na stronę</SelectItem>
            <SelectItem value="50">50 na stronę</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tytuł</TableHead>
            <TableHead>Autorzy</TableHead>
            <TableHead>Użytkownik</TableHead>
            <TableHead>Status książki</TableHead>
            <TableHead>Opis</TableHead>
            <TableHead>Okładka</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userBookItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.bookReference.title}</TableCell>
              <TableCell>
                {item.bookReference.authors
                  .map((a) => `${a.firstName} ${a.lastName}`)
                  .join(', ')}
              </TableCell>
              <TableCell>
                {users[item.userId]
                  ? `${users[item.userId].firstName} ${
                      users[item.userId].lastName
                    }`
                  : 'Ładowanie...'}
              </TableCell>
              <TableCell>
                <Badge>{item.status}</Badge>
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                {item.imageId ? (
                  <img
                    src={`http://localhost:8100/api/UserBookItem/image/${item.imageId}`}
                    alt={item.bookReference.title}
                    className="h-16 w-12 rounded object-cover"
                    loading="lazy"
                  />
                ) : (
                  'Brak okładki'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Zakres {(pageNumber - 1) * pageSize + 1}-
          {Math.min(pageNumber * pageSize, totalItems)} spośród {totalItems}{' '}
          książek
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

      <Toaster />
    </div>
  );
}
