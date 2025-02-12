import RequestService from '@/common/RequestService';
import CancelablePromise from '@/common/CancelablePromise';

export interface CaseAction {
  caseId: number;
  userId: number;
  caseStatus: string;
  caseType: string;
  reportType: string;
  reviewerId: number | null;
}

export interface CaseActionDetail extends CaseAction {
  itemId: number;
  reportNote: string;
  keyValues: {
    [key: string]: string;
  };
}

export interface CaseActionResponse {
  itemsCount: number;
  totalItemsCount: number;
  pageNumber: number;
  pageSize: number;
  items: CaseAction[];
}

const CaseActionService = {
  getCaseActions({
    pageSize = 50,
    pageNumber = 1,
    caseStatus = '',
    caseType = '',
    userId = undefined,
  } = {}) {
    const promise = RequestService.get('report', '/api/CaseAction', {
      pageSize,
      pageNumber,
      caseStatus: caseStatus || undefined,
      caseType: caseType || undefined,
      userId,
    }).then((response) => {
      if (response.status === 200) {
        return response.data as CaseActionResponse;
      } else {
        throw new Error('Error fetching case actions.');
      }
    });
    return CancelablePromise(promise);
  },

  getCaseActionDetail(caseId: number) {
    const promise = RequestService.get(
      'report',
      `/api/CaseAction/${caseId}`,
    ).then((response) => {
      if (response.status === 200) {
        return response.data as CaseActionDetail;
      } else {
        throw new Error('Error fetching case action details.');
      }
    });
    return CancelablePromise(promise);
  },

  assignCase(caseId: number) {
    const promise = RequestService.put(
      'report',
      `/api/CaseAction/${caseId}/Assign`,
    ).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error assigning case action.');
      }
    });
    return CancelablePromise(promise);
  },

  approveCase(caseId: number) {
    const promise = RequestService.put(
      'report',
      `/api/CaseAction/${caseId}/Approve`,
    ).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error approving case action.');
      }
    });
    return CancelablePromise(promise);
  },

  rejectCase(caseId: number) {
    const promise = RequestService.put(
      'report',
      `/api/CaseAction/${caseId}/Reject`,
    ).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Error rejecting case action.');
      }
    });
    return CancelablePromise(promise);
  },
};

export default CaseActionService;
