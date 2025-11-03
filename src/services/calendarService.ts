import { TimesheetEvent } from '../types';

/**
 * Adjusts a date to the preceding Friday if it falls on a weekend.
 * @param date - The date to adjust.
 * @returns The adjusted date.
 */
const adjustForWeekend = (date: Date): Date => {
  const day = date.getDay();
  if (day === 6) { // Saturday
    date.setDate(date.getDate() - 1);
  } else if (day === 0) { // Sunday
    date.setDate(date.getDate() - 2);
  }
  return date;
};

/**
 * Generates the timesheet reminder dates for the next 12 months.
 * @returns An array of TimesheetEvent objects.
 */
export const getTimesheetDates = (): TimesheetEvent[] => {
  const events: TimesheetEvent[] = [];
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    // Correctly calculate year and month for each iteration to handle year rollovers
    const currentMonthDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth(); // 0-indexed

    // 15th of the month
    let fifteenth = new Date(year, month, 15);
    fifteenth = adjustForWeekend(fifteenth);
    events.push({
      date: fifteenth.toISOString().split('T')[0],
      description: '15th of the month reminder',
    });

    // Last day of the month
    let lastDay = new Date(year, month + 1, 0); // Day 0 of next month is last day of current
    lastDay = adjustForWeekend(lastDay);
    events.push({
      date: lastDay.toISOString().split('T')[0],
      description: 'End of month reminder',
    });
  }
  return events;
};


/**
 * Generates the content for an .ics file from a list of events.
 * This version creates updatable events for a specific time slot (1 PM - 2 PM local time).
 * It uses stable UIDs to allow calendar clients to update existing events instead of creating duplicates.
 * @param events - An array of TimesheetEvent objects.
 * @returns A string containing the .ics file content.
 */
export const generateIcsContent = (events: TimesheetEvent[]): string => {
  const formatDate = (date: string): string => {
    return date.replace(/-/g, '');
  };

  const dtstamp = new Date().toISOString().replace(/[-:.]/g, '') + 'Z';
  const summary = 'Reminder: Submit Timesheet';
  const description = 'Timesheet time! Submit your Time Journals on HCL to save yourself from approval requests and USP ticket chaos!';

  const eventStrings = events.map((event) => {
    // Create a stable UID based on the logical event (e.g., mid-month reminder for July 2024).
    // This allows calendar clients like Outlook to update the event on re-import, preventing duplicates.
    const eventDateObj = new Date(event.date);
    const year = eventDateObj.getUTCFullYear();
    const month = eventDateObj.getUTCMonth() + 1; // getUTCMonth is 0-indexed

    const type = event.description.includes('15th') ? '15' : 'last-day';
    const uid = `timesheet-reminder-${year}-${month}-${type}@timesheet.reminder.app`;

    const eventDateString = formatDate(event.date);
    const startDateString = `${eventDateString}T130000`; // 1 PM in local (floating) time
    const endDateString = `${eventDateString}T140000`;   // 2 PM in local (floating) time

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${startDateString}`,
      `DTEND:${endDateString}`,
      // SEQUENCE indicates an update. A timestamp ensures it always increases on regeneration.
      `SEQUENCE:${Math.floor(Date.now() / 1000)}`,
      `SUMMARY:${summary} - ${event.description.includes('15th') ? 'Mid-Month' : 'End of Month'}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT'
    ].join('\r\n');
  });

  const icsString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TimesheetReminderApp//EN',
    'METHOD:PUBLISH', // This tells the calendar client to publish/update these events.
    ...eventStrings,
    'END:VCALENDAR'
  ].join('\r\n');

  return icsString;
};
