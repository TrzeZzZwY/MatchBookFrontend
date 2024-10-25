'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
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

// Mockowane dane użytkowników
const users = [
  {
    id: 1,
    name: 'Alicja Kowalska',
    email: 'alicja@example.com',
    role: 'Użytkownik',
    status: 'Aktywny',
  },
  {
    id: 2,
    name: 'Jan Nowak',
    email: 'jan@example.com',
    role: 'Admin',
    status: 'Aktywny',
  },
  {
    id: 3,
    name: 'Karol Wiśniewski',
    email: 'karol@example.com',
    role: 'Użytkownik',
    status: 'Nieaktywny',
  },
  {
    id: 4,
    name: 'Diana Kwiatkowska',
    email: 'diana@example.com',
    role: 'Użytkownik',
    status: 'Aktywny',
  },
  {
    id: 5,
    name: 'Michał Mazur',
    email: 'michal@example.com',
    role: 'Użytkownik',
    status: 'Aktywny',
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="space-y-6 p-6 text-black">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Użytkownicy</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Dodaj użytkownika
            </Button>
          </DialogTrigger>
          <DialogContent className="text-black sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Dodaj nowego użytkownika</DialogTitle>
              <DialogDescription>
                Wprowadź dane nowego użytkownika tutaj. Kliknij „zapisz”, gdy
                skończysz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Imię
                </Label>
                <Input id="name" className="col-span-3 text-black" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" className="col-span-3 text-black" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Rola
                </Label>
                <Input id="role" className="col-span-3 text-black" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Zapisz użytkownika</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
            <TableHead>Email</TableHead>
            <TableHead>Rola</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    user.status === 'Aktywny'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status}
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
