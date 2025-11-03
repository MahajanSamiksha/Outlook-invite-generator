import React from 'react';
import { TimesheetEvent } from '../types';

interface EventCardProps {
  event: TimesheetEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg flex items-center justify-between shadow-sm">
      <div>
        <p className="font-semibold text-slate-800 dark:text-slate-100">{formattedDate}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{event.description}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
};

export default EventCard;
