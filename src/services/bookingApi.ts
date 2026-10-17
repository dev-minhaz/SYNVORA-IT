import { api, ApiResponse } from './api';
import { ConsultationBooking } from '../types';
import {
  getAvailableConsultationDates,
  getAvailableTimeSlotsForDate,
  saveConsultationBooking,
  getStoredBookings,
  AvailableDateOption,
  TimeSlotOption,
} from '../utils/bookingService';

export const bookingApi = {
  /**
   * Fetch available consultation dates (skips weekends and past dates)
   */
  async getAvailableDates(): Promise<AvailableDateOption[]> {
    const res: ApiResponse<AvailableDateOption[]> = await api.get('/consultations/available-dates');
    if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return getAvailableConsultationDates(20);
  },

  /**
   * Fetch dynamic UTC slots for a selected date
   */
  async getTimeSlotsForDate(isoDate: string): Promise<TimeSlotOption[]> {
    const res: ApiResponse<TimeSlotOption[]> = await api.get(`/consultations/slots?date=${isoDate}`);
    if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return getAvailableTimeSlotsForDate(isoDate);
  },

  /**
   * Register a technical consultation booking in UTC
   */
  async bookConsultation(booking: Omit<ConsultationBooking, 'createdAt'>): Promise<ConsultationBooking> {
    const res: ApiResponse<ConsultationBooking> = await api.post('/consultations', booking);
    if (res.success && res.data) {
      return res.data;
    }
    // Fallback: save to local persistent registry ensuring double-booking defense
    return saveConsultationBooking(booking);
  },

  /**
   * Get all registered bookings
   */
  async getAllBookings(): Promise<ConsultationBooking[]> {
    const res: ApiResponse<ConsultationBooking[]> = await api.get('/consultations');
    if (res.success && res.data && Array.isArray(res.data)) {
      return res.data;
    }
    return getStoredBookings();
  },
};
