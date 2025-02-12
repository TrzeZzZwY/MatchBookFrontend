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
          setError('Failed to load case details.');
          console.error(err);
        });
    }
  };

  const handleAssign = async () => {
    if (!caseId) return;
    setIsAssigning(true);
    try {
      await CaseActionService.assignCase(caseId);
      toast({ title: 'Success', description: 'Case assigned successfully.' });
      fetchCaseDetail();
      onCaseUpdated();
    } catch (error) {
      console.error('Failed to assign case:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to assign case.',
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
      toast({ title: 'Success', description: 'Case approved successfully.' });
      fetchCaseDetail();
      onCaseUpdated();
    } catch (error) {
      console.error('Failed to approve case:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to approve case.',
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
      toast({ title: 'Success', description: 'Case rejected successfully.' });
      fetchCaseDetail();
      onCaseUpdated();
    } catch (error) {
      console.error('Failed to reject case:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to reject case.',
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
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isAssigning ? 'Assigning...' : 'Assign to Me'}
        </Button>
      );
    }

    if (caseDetail.caseStatus === 'INREVIEW') {
      return (
        <div className="flex w-full gap-2">
          <Button
            onClick={handleApprove}
            disabled={isApproving}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            {isApproving ? 'Approving...' : 'Approve'}
          </Button>
          <Button
            onClick={handleReject}
            disabled={isRejecting}
            variant="destructive"
            className="flex-1"
          >
            {isRejecting ? 'Rejecting...' : 'Reject'}
          </Button>
        </div>
      );
    }

    return null;
  };

  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-gray-800 bg-[#0A0A0B] text-white">
        <DialogHeader className="space-y-1">
          <DialogTitle>Case Action Details</DialogTitle>
          <DialogDescription className="text-gray-400">
            Detailed information about the selected case action.
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : caseDetail ? (
          <div className="space-y-1 py-2">
            <DetailRow label="Case ID" value={caseDetail.caseId} />
            <DetailRow label="User ID" value={caseDetail.userId} />
            <DetailRow label="Status" value={caseDetail.caseStatus} />
            <DetailRow label="Type" value={caseDetail.caseType} />
            <DetailRow label="Report Type" value={caseDetail.reportType} />
            <DetailRow label="Report Note" value={caseDetail.reportNote} />
            <DetailRow
              label="Reviewer ID"
              value={caseDetail.reviewerId || 'N/A'}
            />
            <DetailRow label="Item ID" value={caseDetail.itemId || 'N/A'} />

            {Object.entries(caseDetail.keyValues).map(([key, value]) => (
              <DetailRow key={key} label={key} value={value} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400">Loading...</div>
        )}
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {renderActionButtons()}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-gray-800"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
