'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Book, Users, FileText, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookService from '@/components/Dashboard/Books/services/BooksService';
import AuthorService from '@/components/Dashboard/Authors/services/AuthorsService';
import UsersService from '@/components/Dashboard/Users/services/UsersService';
import UserBookItemService from '@/components/Dashboard/UserBookItems/services/UserBookItemsService';
import CaseActionService from '@/components/Dashboard/Reports/services/CaseActionService';

export default function Dashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUserBooks, setTotalUserBooks] = useState(0);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [openReports, setOpenReports] = useState(0);
  const [verifyingReports, setVerifyingReports] = useState(0);
  const [chartData, setChartData] = useState<{ name: string; total: number }[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await BookService.getBooks();
        setTotalBooks(booksResponse.totalItemsCount);

        const authorsResponse = await AuthorService.getAuthors();
        setTotalAuthors(authorsResponse.totalItemsCount);

        const userBooksResponse = await UserBookItemService.getUserBookItems();
        setTotalUserBooks(userBooksResponse.totalItemsCount);

        const usersResponse = await UsersService.getUsers();
        setTotalUsers(usersResponse.totalItemsCount);

        const reportsOpenResponse = await CaseActionService.getCaseActions({
          caseStatus: 'OPEN',
        });
        setOpenReports(reportsOpenResponse.totalItemsCount);

        const reportsVeryfyingResponse = await CaseActionService.getCaseActions(
          { caseStatus: 'INREVIEW' },
        );
        setVerifyingReports(reportsVeryfyingResponse.totalItemsCount);

        // Fetch data for the chart
        const chartData = await fetchChartData();
        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchChartData = async () => {
    const months = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date);
    }

    const chartData = await Promise.all(
      months.map(async (date) => {
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const response = await UserBookItemService.getUserBookItems({
          startDate: date.toISOString(),
          endDate: endDate.toISOString(),
        });
        return {
          name: date.toLocaleString('pl-PL', { month: 'short' }),
          total: response.totalItemsCount,
        };
      }),
    );

    return chartData;
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Statystyki</h2>
        </div>
        <Tabs defaultValue="books" className="space-y-4">
          <TabsList>
            <TabsTrigger value="books">Książki</TabsTrigger>
            <TabsTrigger value="users">Użytkownicy</TabsTrigger>
            <TabsTrigger value="authors">Autorzy</TabsTrigger>
            <TabsTrigger value="reports">Zgłoszenia</TabsTrigger>
          </TabsList>
          <TabsContent value="books" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Liczba Książek
                  </CardTitle>
                  <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalBooks}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Liczba Książek Użytkowników
                  </CardTitle>
                  <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUserBooks}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Liczba Użytkowników
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="authors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Liczba Autorów
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalAuthors}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Liczba Otwartych Zgłoszeń
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{openReports}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Liczba Zgłoszeń w Trakcie Weryfikacji
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{verifyingReports}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <Card>
          <CardHeader>
            <CardTitle>Przegląd Wystawionych Książek</CardTitle>
            <CardDescription>
              Liczba wystawionych książek w ciągu ostatnich 6 miesięcy
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
