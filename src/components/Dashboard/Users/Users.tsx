'use client';

import { useEffect, useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import UserService, { type User } from './services/UsersService';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import UserBooksCell from './components/UserBooksCell/UserBooksCell';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Pagination states
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = UserService.getUsers({
      pageSize,
      pageNumber,
      fullName: searchTerm,
      status: statusFilter === 'ALL' ? undefined : statusFilter,
    });

    fetchUsers
      .then((data) => {
        setUsers(data.items);
        setTotalItems(data.itemsCount);
      })
      .catch(() => setError('Nie udało się załadować listy użytkowników.'));

    return () => fetchUsers.cancel();
  }, [searchTerm, statusFilter, pageNumber, pageSize]);

  const handleChangeStatus = (
    userId: number,
    status: 'ACTIVE' | 'REMOVED' | 'BANED',
  ) => {
    setIsProcessing(true);
    const updateStatusPromise = UserService.updateStatus(userId, status);
    updateStatusPromise
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status } : user,
          ),
        );
      })
      .catch(() => alert('Błąd przy zmianie statusu.'))
      .finally(() => setIsProcessing(false));
  };

  const handleConfirmRemove = (user: User) => {
    setSelectedUser(user);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveUser = () => {
    if (selectedUser) {
      handleChangeStatus(selectedUser.id, 'REMOVED');
      setConfirmDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handlePreviousPage = () =>
    setPageNumber((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setPageNumber((prev) => (prev * pageSize < totalItems ? prev + 1 : prev));

  const renderStatusBadge = (status: 'ACTIVE' | 'BANED' | 'REMOVED') => {
    const statusConfig = {
      ACTIVE: {
        label: 'Aktywny',
        className: 'bg-green-500 hover:bg-green-600',
      },
      BANED: {
        label: 'Zbanowany',
        className: 'bg-yellow-500 hover:bg-yellow-600',
      },
      REMOVED: {
        label: 'Usunięty',
        className: 'bg-red-500 hover:bg-red-600',
      },
    };

    const { label, className } = statusConfig[status] || {
      label: status,
      className: 'bg-gray-500 hover:bg-gray-600',
    };

    return <Badge className={className}>{label}</Badge>;
  };

  if (error) return <p className="text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="space-y-6 p-6 text-foreground">
      <h1 className="text-3xl font-bold">Użytkownicy</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Szukaj użytkowników..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Label htmlFor="status-filter">Status</Label>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setPageNumber(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wybierz status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Wszystkie</SelectItem>
            <SelectItem value="ACTIVE">Aktywny</SelectItem>
            <SelectItem value="REMOVED">Usunięty</SelectItem>
            <SelectItem value="BANED">Zbanowany</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            setPageSize(Number(value));
            setPageNumber(1);
          }}
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
            <TableHead>Książki użytkownika</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>
                {new Date(user.birthDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.region}</TableCell>
              <TableCell>{renderStatusBadge(user.status)}</TableCell>
              <TableCell>
                <UserBooksCell userId={user.id} />
              </TableCell>
              <TableCell className="text-right">
                {user.status !== 'REMOVED' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleChangeStatus(user.id, 'BANED')}
                      >
                        Zbanuj użytkownika
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleChangeStatus(user.id, 'ACTIVE')}
                      >
                        Aktywuj użytkownika
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleConfirmRemove(user)}
                      >
                        Usuń użytkownika
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {(pageNumber - 1) * pageSize + 1}-
          {Math.min(pageNumber * pageSize, totalItems)} of {totalItems} items
        </p>
        <div className="flex items-center space-x-2">
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
      <ConfirmationDialog
        isOpen={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmRemoveUser}
        title="Potwierdzenie usunięcia"
        description={`Czy na pewno chcesz usunąć użytkownika ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
        confirmLabel="Usuń"
        cancelLabel="Anuluj"
        isProcessing={isProcessing}
      />
    </div>
  );
}
