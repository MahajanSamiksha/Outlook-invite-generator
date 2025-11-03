
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import EventCard from './components/EventCard';
import { getTimesheetDates, generateIcsContent } from './services/calendarService';
import { TimesheetEvent } from './types';

const App: React.FC = () => {
  const [events, setEvents] = useState<TimesheetEvent[]>([]);

  const handleGenerateEvents = useCallback(() => {
    const dates = getTimesheetDates();
    setEvents(dates);
  }, []);

  const handleDownloadIcs = useCallback(() => {
    if (events.length === 0) return;

    const icsContent = generateIcsContent(events);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'timesheet-reminders.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [events]);

  const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 font-sans">
      <main className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8">
          <Header />

          <div className="mt-8 text-center">
            {events.length > 0 ? (
              <button
                onClick={handleDownloadIcs}
                className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                <DownloadIcon />
                Download .ics File
              </button>
            ) : (
              <button
                onClick={handleGenerateEvents}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Generate Reminder Dates
              </button>
            )}
          </div>
          
          {events.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
                Upcoming Reminder Dates
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
              <p className="text-xs text-center mt-4 text-slate-500 dark:text-slate-400">
                Dates falling on a weekend are automatically adjusted to the preceding Friday.
              </p>
            </div>
          ) : (
             <div className="mt-8 text-center text-slate-500 dark:text-slate-400 p-6 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
              <p>Click the button above to generate reminder dates for the next 12 months.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
