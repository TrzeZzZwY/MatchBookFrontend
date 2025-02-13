'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CaseActionService, {
  type CaseActionDetail,
} from '../../services/CaseActionService';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import type React from 'react';

interface CaseActionDetailDialogProps {
  caseId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onCaseUpdated: () => void;
}

export function CaseActionDetailDialog({
  caseId,
  isOpen,
  onClose,
  onCaseUpdated,
}: CaseActionDetailDialogProps) {
  const [caseDetail, setCaseDetail] = useState<CaseActionDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (caseId && isOpen) {
      fetchCaseDetail();
    }
  });

  const fetchCaseDetail = () => {
    if (caseId) {
      CaseActionService.getCaseActionDetail(caseId)
        .then((data) => {
          setCaseDetail(data);
          setError(null);
        })
        .catch((err) => {
          setError('Nie udało się załadować szczegółów sprawy.');
          console.error(err);
        });
    }
  };

  const handleAssign = async () => {
    if (!caseId) return;
    setIsAssigning(true);
    try {
      await CaseActionService.assignCase(caseId);
      toast({
        title: 'Sukces',
        description: 'Sprawa została przypisana pomyślnie.',
      });
      fetchCaseDetail();
      onCaseUpdated();
    } catch (error) {
      console.error('Nie udało się przypisać sprawy:', error);
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: 'Nie udało się przypisać sprawy.',
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleApprove = async () => {
    if (!caseId) return;
    setIsApproving(true);
    try {
      await CaseActionService.approveCase(caseId);
      toast({
        title: 'Sukces',
        description: 'Sprawa została zatwierdzona pomyślnie.',
      });
      fetchCaseDetail();
      onCaseUpdated();
    } catch (error) {
      console.error('Nie udało się zatwierdzić sprawy:', error);
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: 'Nie udało się zatwierdzić sprawy.',
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!caseId) return;
    setIsRejecting(true);
    try {
      await CaseActionService.rejectCase(caseId);
      toast({
        title: 'Sukces',
        description: 'Sprawa została odrzucona pomyślnie.',
      });
      fetchCaseDetail();
      onCaseUpdated();
    } catch (error) {
      console.error('Nie udało się odrzucić sprawy:', error);
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: 'Nie udało się odrzucić sprawy.',
      });
    } finally {
      setIsRejecting(false);
    }
  };

  const renderActionButtons = () => {
    if (!caseDetail) return null;

    if (caseDetail.caseStatus === 'Closed') {
      return null;
    }

    if (!caseDetail.reviewerId) {
      return (
        <Button
          onClick={handleAssign}
          disabled={isAssigning}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isAssigning ? 'Przypisywanie...' : 'Przypisz do mnie'}
        </Button>
      );
    }

    if (caseDetail.caseStatus === 'INREVIEW') {
      return (
        <div className="flex w-full gap-2">
          <Button
            onClick={handleApprove}
            disabled={isApproving}
            variant="secondary"
            className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
          >
            {isApproving ? 'Zatwierdzanie...' : 'Zatwierdź'}
          </Button>
          <Button
            onClick={handleReject}
            disabled={isRejecting}
            variant="destructive"
            className="flex-1"
          >
            {isRejecting ? 'Odrzucanie...' : 'Odrzuć'}
          </Button>
        </div>
      );
    }

    return null;
  };

  const DetailRow = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-foreground">{value}</span>
      </div>
    </div>
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'INREVIEW':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] flex-col bg-background text-foreground sm:h-auto sm:max-w-[500px]">
        <DialogHeader className="flex-none">
          <DialogTitle>Szczegóły akcji sprawy</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Szczegółowe informacje o wybranej akcji sprawy.
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <p className="text-destructive">{error}</p>
        ) : caseDetail ? (
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            <div className="space-y-2">
              <DetailRow label="ID sprawy" value={caseDetail.caseId} />
              <DetailRow label="ID użytkownika" value={caseDetail.userId} />
              <DetailRow
                label="Status"
                value={caseDetail.caseStatus}
                icon={getStatusIcon(caseDetail.caseStatus)}
              />
              <DetailRow label="Typ" value={caseDetail.caseType} />
              <DetailRow label="Typ raportu" value={caseDetail.reportType} />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-purple-500">
                Szczegóły raportu
              </h3>
              <DetailRow label="Notatka" value={caseDetail.reportNote} />
              <DetailRow
                label="ID przypisanego admina"
                value={caseDetail.reviewerId || '-'}
              />
              <DetailRow label="Item ID" value={caseDetail.itemId || '-'} />
            </div>

            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium text-purple-500">
                Kluczowe wartości
              </h3>
              {Object.entries(caseDetail.keyValues).map(([key, value]) => (
                <DetailRow key={key} label={key} value={value} />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            Ładowanie...
          </div>
        )}
        <DialogFooter className="mt-4 gap-4">
          {renderActionButtons()}
          <Button onClick={onClose} variant="outline" className="w-full">
            Zamknij
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
