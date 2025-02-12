'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import CaseActionService, {
  type CaseAction,
} from './services/CaseActionService';
import { CaseActionDetailDialog } from './components/CaseActionDetailDialog/CaseActionDetailDialog';
import { Toaster } from '@/components/ui/toaster';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CaseActionsPage() {
  const [caseActions, setCaseActions] = useState<CaseAction[]>([]);
  const [error, setError] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    caseStatus: '',
    caseType: '',
  });

  const fetchCaseActions = useCallback(() => {
    const fetchPromise = CaseActionService.getCaseActions({
      pageSize,
      pageNumber,
      ...filters,
    });

    fetchPromise
      .then((data) => {
        setCaseActions(data.items);
        setTotalItems(data.totalItemsCount);
      })
      .catch(() => setError('Failed to load case actions.'));

    return fetchPromise;
  }, [pageSize, pageNumber, filters]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCaseActions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchCaseActions]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPageNumber(1);
  };

  const handleCaseClick = (caseId: number) => {
    setSelectedCaseId(caseId);
    setIsDetailDialogOpen(true);
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ScrollArea className="h-full bg-background text-foreground">
      <div className="space-y-6 p-4 md:p-6">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Case Actions
        </h1>

        <div className="flex items-center space-x-4">
          <Select
            value={filters.caseType}
            onValueChange={(value) => handleFilterChange('caseType', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUTHOR">Author</SelectItem>
              <SelectItem value="BOOK">Book</SelectItem>
              <SelectItem value="USERITEM">User Item</SelectItem>
              <SelectItem value="USER">User</SelectItem>
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
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="25">25 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Report Type</TableHead>
                <TableHead>Reviewer ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseActions.map((caseAction) => (
                <TableRow key={caseAction.caseId}>
                  <TableCell>{caseAction.caseId}</TableCell>
                  <TableCell>{caseAction.userId}</TableCell>
                  <TableCell>
                    <Badge>{caseAction.caseStatus}</Badge>
                  </TableCell>
                  <TableCell>{caseAction.caseType}</TableCell>
                  <TableCell>{caseAction.reportType}</TableCell>
                  <TableCell>{caseAction.reviewerId || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCaseClick(caseAction.caseId)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(pageNumber - 1) * pageSize + 1}-
            {Math.min(pageNumber * pageSize, totalItems)} of {totalItems} case
            actions
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

      <CaseActionDetailDialog
        caseId={selectedCaseId}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onCaseUpdated={fetchCaseActions}
      />

      <Toaster />
    </ScrollArea>
  );
}
