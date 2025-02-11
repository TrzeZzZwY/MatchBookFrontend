'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface ChangeStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newStatus: string) => void;
  currentStatus: string;
}

export default function ChangeStatusDialog({
  isOpen,
  onClose,
  onSubmit,
  currentStatus,
}: ChangeStatusDialogProps) {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (newStatus === 'Removed') {
      setShowConfirm(true);
      return;
    }
    setIsProcessing(true);
    onSubmit(newStatus);
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    onSubmit(newStatus);
    setIsProcessing(false);
    setShowConfirm(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Zmień status książki</DialogTitle>
            <DialogDescription>Wybierz nowy status książki.</DialogDescription>
          </DialogHeader>
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ActivePublic">ActivePublic</SelectItem>
              <SelectItem value="ActivePrivate">ActivePrivate</SelectItem>
              <SelectItem value="Disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Anuluj
            </Button>
            <Button onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? 'Przetwarzanie...' : 'Zapisz'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showConfirm && (
        <ConfirmationDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
          title="Potwierdź zmianę statusu"
          description="Czy na pewno chcesz ustawić status 'Removed'? Ta operacja jest nieodwracalna."
          confirmLabel="Tak, ustaw jako Removed"
          cancelLabel="Anuluj"
        />
      )}
    </>
  );
}
