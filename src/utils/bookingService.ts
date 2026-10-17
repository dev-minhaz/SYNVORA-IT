import { ConsultationBooking } from '../types';

export interface AvailableDateOption {
  isoDate: string; // "2026-10-13"
  displayDate: string; // "13 October 2026"
  fullLabel: string; // "13 October 2026 (Tuesday)"
  dayOfWeek: string; // "Tuesday"
}

export interface TimeSlotOption {
  time24: string; // "14:00"
  displayLabel: string; // "14:00 UTC (2:00 PM UTC)"
  isBooked: boolean;
  isPast: boolean;
}

const STORAGE_KEY = 'synvora_consultation_bookings_v1';

// Standard 24-hour UTC consultation slots
const BASE_UTC_SLOTS = [
  { time24: '08:00', label12: '8:00 AM' },
  { time24: '09:30', label12: '9:30 AM' },
  { time24: '11:00', label12: '11:00 AM' },
  { time24: '13:00', label12: '1:00 PM' },
  { time24: '14:30', label12: '2:30 PM' },
  { time24: '16:00', label12: '4:00 PM' },
  { time24: '17:30', label12: '5:30 PM' },
  { time24: '19:00', label12: '7:00 PM' },
];

/**
 * Format a Date object into internationally understandable "DD Month YYYY"
 * Example: "14 October 2026"
 */
export function formatInternationalDate(date: Date): string {
  const day = date.getUTCDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Generate a list of available upcoming consultation dates (excluding weekends)
 * Disables past dates.
 */
export function getAvailableConsultationDates(count = 20): AvailableDateOption[] {
  const dates: AvailableDateOption[] = [];
  
  // Use current UTC date
  const now = new Date();
  const current = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  let daysAdded = 0;
  let safety = 0;

  while (daysAdded < count && safety < 60) {
    safety++;
    const checkDate = new Date(current.getTime() + safety * 86400000);
    const dayOfWeek = checkDate.getUTCDay();

    // 0 = Sunday, 6 = Saturday -> Skip weekends
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const year = checkDate.getUTCFullYear();
      const monthStr = String(checkDate.getUTCMonth() + 1).padStart(2, '0');
      const dayStr = String(checkDate.getUTCDate()).padStart(2, '0');
      const isoDate = `${year}-${monthStr}-${dayStr}`;

      const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = weekdayNames[dayOfWeek];
      const displayDate = formatInternationalDate(checkDate);

      dates.push({
        isoDate,
        displayDate,
        fullLabel: `${displayDate} (${dayName})`,
        dayOfWeek: dayName,
      });
      daysAdded++;
    }
  }

  return dates;
}

/**
 * Retrieve all booked consultations from persistent storage
 */
export function getStoredBookings(): ConsultationBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Pre-seed an initial booked appointment to demonstrate double-booking defense
      const initialSeed: ConsultationBooking[] = [
        {
          name: 'Enterprise Client (Confidential)',
          email: 'partner@fintech-global.com',
          company: 'Fintech Global Partners',
          timezone: 'UTC',
          date: getAvailableConsultationDates(1)[0]?.isoDate || '2026-10-13',
          dateFormatted: getAvailableConsultationDates(1)[0]?.displayDate || '13 October 2026',
          timeSlot: '11:00',
          timeSlotUtcFormatted: '11:00 UTC (11:00 AM UTC)',
          isoUtcTimestamp: `${getAvailableConsultationDates(1)[0]?.isoDate || '2026-10-13'}T11:00:00.000Z`,
          topic: 'Architecture & Legacy System Modernization',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeed));
      return initialSeed;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Get dynamic time slots for a specific selected date
 * Disables slots that are already booked or in the past
 */
export function getAvailableTimeSlotsForDate(selectedIsoDate: string): TimeSlotOption[] {
  const bookings = getStoredBookings();
  const now = new Date();

  return BASE_UTC_SLOTS.map((slot) => {
    const isBooked = bookings.some(
      (b) => b.date === selectedIsoDate && b.timeSlot === slot.time24
    );

    // Check if slot has passed if date is today
    const [hours, minutes] = slot.time24.split(':').map(Number);
    const slotDateTime = new Date(`${selectedIsoDate}T${slot.time24}:00.000Z`);
    const isPast = slotDateTime.getTime() <= now.getTime();

    return {
      time24: slot.time24,
      displayLabel: `${slot.time24} UTC (${slot.label12} UTC)`,
      isBooked,
      isPast,
    };
  });
}

/**
 * Save and validate booking, enforcing no double booking
 */
export function saveConsultationBooking(booking: Omit<ConsultationBooking, 'createdAt'>): ConsultationBooking {
  const existing = getStoredBookings();

  // 1. Double-booking check
  const isSlotTaken = existing.some(
    (b) => b.date === booking.date && b.timeSlot === booking.timeSlot
  );

  if (isSlotTaken) {
    throw new Error(
      `The time slot ${booking.timeSlot} UTC on ${booking.dateFormatted} has already been reserved by another client. Please select an available slot.`
    );
  }

  // 2. Duplicate booking by identical email on same day/slot
  const isDuplicate = existing.some(
    (b) =>
      b.email.toLowerCase() === booking.email.toLowerCase() &&
      b.date === booking.date &&
      b.timeSlot === booking.timeSlot
  );

  if (isDuplicate) {
    throw new Error('You have already reserved this consultation slot.');
  }

  const record: ConsultationBooking = {
    ...booking,
    createdAt: new Date().toISOString(),
  };

  const updated = [...existing, record];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to persist consultation booking to storage', err);
  }

  return record;
}

/**
 * Generate standard .ics calendar invitation string with UTC timestamp
 */
export function createIcsCalendarContent(booking: ConsultationBooking): string {
  // Convert date and time24 to YYYYMMDDTHHMMSSZ format
  const dateCompact = booking.date.replace(/-/g, '');
  const timeCompact = booking.timeSlot.replace(/:/g, '') + '00';
  const startUtc = `${dateCompact}T${timeCompact}Z`;

  // 30-minute duration
  const [h, m] = booking.timeSlot.split(':').map(Number);
  const endMinutes = m + 30;
  const endHours = h + Math.floor(endMinutes / 60);
  const endMFinal = endMinutes % 60;
  const endTimeStr = `${String(endHours).padStart(2, '0')}${String(endMFinal).padStart(2, '0')}00`;
  const endUtc = `${dateCompact}T${endTimeStr}Z`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Synvora IT//Global Technical Consultation//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${booking.date}_${booking.timeSlot}_synvora_${Date.now()}@synvorait.com
DTSTAMP:${dateCompact}T${timeCompact}Z
DTSTART:${startUtc}
DTEND:${endUtc}
SUMMARY:Synvora IT Technical Discovery Consultation: ${booking.topic}
DESCRIPTION:30-minute technical scope review and architectural roadmapping session with Synvora IT senior engineering team.\\n\\nGlobal Time Standard: ${booking.timeSlotUtcFormatted}\\nClient Name: ${booking.name}\\nClient Email: ${booking.email}\\nPlatform: Google Meet (Video conference link active upon start)
LOCATION:Google Meet / Remote Video
STATUS:CONFIRMED
ORGANIZER;CN="Synvora IT Engineering":mailto:consultations@synvorait.com
ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN="${booking.name}":mailto:${booking.email}
END:VEVENT
END:VCALENDAR`;
}

/**
 * Generate Google Calendar direct URL with exact UTC timestamp
 */
export function createGoogleCalendarUrl(booking: ConsultationBooking): string {
  const dateCompact = booking.date.replace(/-/g, '');
  const timeCompact = booking.timeSlot.replace(/:/g, '') + '00';
  const startUtc = `${dateCompact}T${timeCompact}Z`;

  const [h, m] = booking.timeSlot.split(':').map(Number);
  const endMinutes = m + 30;
  const endHours = h + Math.floor(endMinutes / 60);
  const endMFinal = endMinutes % 60;
  const endTimeStr = `${String(endHours).padStart(2, '0')}${String(endMFinal).padStart(2, '0')}00`;
  const endUtc = `${dateCompact}T${endTimeStr}Z`;

  const title = encodeURIComponent(`Synvora IT Consultation: ${booking.topic}`);
  const details = encodeURIComponent(
    `30-minute technical discovery session with Synvora IT senior engineering team.\nAll consultation times are scheduled strictly in UTC.\nConfirmed Time: ${booking.timeSlotUtcFormatted}\nClient: ${booking.name} (${booking.email})`
  );
  const location = encodeURIComponent('Google Meet / Video Conference');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}&ctz=UTC`;
}
