'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Search, AlertCircle } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for reports
const reports = [
  {
    id: 1,
    bookTitle: 'Lalka',
    reportedBy: 'Jan Kowalski',
    dateReported: '2023-06-15',
    issue: 'Błąd w nazwisku autora',
    status: 'Nowy',
  },
  {
    id: 2,
    bookTitle: 'Pan Tadeusz',
    reportedBy: 'Anna Nowak',
    dateReported: '2023-06-14',
    issue: 'Brakujące strony',
    status: 'W trakcie',
  },
  {
    id: 3,
    bookTitle: 'Quo Vadis',
    reportedBy: 'Piotr Wiśniewski',
    dateReported: '2023-06-13',
    issue: 'Niepoprawna data wydania',
    status: 'Rozwiązany',
  },
  {
    id: 4,
    bookTitle: 'Ferdydurke',
    reportedBy: 'Maria Dąbrowska',
    dateReported: '2023-06-12',
    issue: 'Błędna kategoria',
    status: 'Nowy',
  },
  {
    id: 5,
    bookTitle: 'Dziady',
    reportedBy: 'Krzysztof Krawczyk',
    dateReported: '2023-06-11',
    issue: 'Literówka w tytule',
    status: 'W trakcie',
  },
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredReports, setFilteredReports] = useState(reports);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterReports(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterReports(searchTerm, status);
  };

  const filterReports = (term: string, status: string) => {
    const filtered = reports.filter((report) => {
      const matchesTerm =
        report.bookTitle.toLowerCase().includes(term) ||
        report.reportedBy.toLowerCase().includes(term) ||
        report.issue.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || report.status === status;
      return matchesTerm && matchesStatus;
    });
    setFilteredReports(filtered);
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            Zgłoszenia
          </h1>
        </div>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              placeholder="Szukaj zgłoszeń..."
              value={searchTerm}
              onChange={handleSearch}
              className="max-w-sm text-black"
            />
          </div>
          <Select onValueChange={handleStatusFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtruj po statusie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              <SelectItem value="Nowy">Nowe</SelectItem>
              <SelectItem value="W trakcie">W trakcie</SelectItem>
              <SelectItem value="Rozwiązany">Rozwiązane</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-black">
                  Tytuł książki
                </TableHead>
                <TableHead className="text-black">Zgłaszający</TableHead>
                <TableHead className="text-black">Data zgłoszenia</TableHead>
                <TableHead className="text-black">Problem</TableHead>
                <TableHead className="text-black">Status</TableHead>
                <TableHead className="text-right text-black">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium text-black">
                    {report.bookTitle}
                  </TableCell>
                  <TableCell className="text-black">
                    {report.reportedBy}
                  </TableCell>
                  <TableCell className="text-black">
                    {report.dateReported}
                  </TableCell>
                  <TableCell className="text-black">{report.issue}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${
                        report.status === 'Nowy'
                          ? 'bg-blue-100 text-blue-800'
                          : report.status === 'W trakcie'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {report.status === 'Nowy' && (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {report.status}
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
                          Aktualizuj status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Usuń zgłoszenie
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
