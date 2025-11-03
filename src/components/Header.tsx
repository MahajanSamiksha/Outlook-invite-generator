import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
        Timesheet Reminder Invite Generator
      </h1>
      <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
        Create a calendar file with reminders to submit your timesheet on time.
      </p>
    </header>
  );
};

export default Header;
