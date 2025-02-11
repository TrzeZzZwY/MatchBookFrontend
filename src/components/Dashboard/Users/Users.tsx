'use client';

import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Search } from 'lucide-react';
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
import UserService from './services/UsersService';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    region: string;
    status: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserService.getUsers();
        setUsers(data.items);
        setFilteredUsers(data.items);
      } catch (err) {
        setError('Nie udało się załadować listy użytkowników.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term),
      ),
    );
  };

  if (loading) return <p>Ładowanie użytkowników...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6 p-6 text-black">
      <h1 className="text-3xl font-bold">Użytkownicy</h1>
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          placeholder="Szukaj użytkowników..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm text-black"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Imię</TableHead>
            <TableHead>Nazwisko</TableHead>
            <TableHead>Data urodzenia</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>
                {new Date(user.birthDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.region}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    user.status === 'Aktywny'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status || 'Nieznany'}
                </span>
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
                    <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                    <DropdownMenuItem>Wyświetl szczegóły</DropdownMenuItem>
                    <DropdownMenuItem>Edytuj użytkownika</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Usuń użytkownika
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
