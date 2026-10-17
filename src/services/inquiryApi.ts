import { api, ApiResponse } from './api';
import { ContactFormData } from '../types';

export interface InquirySubmissionResult {
  id: string;
  referenceNumber: string;
  receivedAt: string;
  isBackendConnected: boolean;
}

const LOCAL_INQUIRIES_KEY = 'synvora_lead_inquiries_queue';

export const inquiryApi = {
  /**
   * Submit client project brief or contact inquiry.
   * Dispatches to /inquiries endpoint if backend available,
   * otherwise stores in client queue with clear development mode status.
   */
  async submitInquiry(formData: ContactFormData): Promise<InquirySubmissionResult> {
    const referenceNumber = `SYN-${Math.floor(100000 + Math.random() * 900000)}`;
    const receivedAt = new Date().toISOString();

    const payload = {
      ...formData,
      referenceNumber,
      receivedAt,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };

    // Attempt real backend call
    const res: ApiResponse<InquirySubmissionResult> = await api.post('/inquiries', payload);

    if (res.success && res.data) {
      return {
        ...res.data,
        isBackendConnected: true,
      };
    }

    // Fallback: Queue in localStorage for production webhook syncing
    try {
      const existingRaw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      list.push(payload);
      localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Could not cache inquiry to local storage', e);
    }

    return {
      id: `local-${Date.now()}`,
      referenceNumber,
      receivedAt,
      isBackendConnected: false,
    };
  },

  /**
   * Retrieve queued inquiries (for admin / developer inspection)
   */
  getQueuedInquiries(): ContactFormData[] {
    try {
      const raw = localStorage.getItem(LOCAL_INQUIRIES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
};
