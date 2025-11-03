# Timesheet Reminder Invite Generator

An application to generate a calendar invite (.ics file) for timesheet submission reminders. The invites are set for the 15th and last day of each month, automatically adjusting to the preceding Friday if the date falls on a weekend.

## Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS

---

## Prerequisites

Before you begin, you will need to have [Node.js](https://nodejs.org/) installed on your machine. This project uses `npm` (Node Package Manager) to manage dependencies and run scripts.

- **Install Node.js:**
  1. Go to the official Node.js website: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
  2. Download the installer for your operating system (Windows, macOS, etc.). The **LTS (Long Term Support)** version is recommended for most users.
  3. Run the installer and follow the on-screen prompts to complete the installation.
  4. To verify the installation, open your terminal or command prompt and run the following commands:
     ```bash
     node -v
     npm -v
     ```
     This should print the installed versions of Node.js and npm.

---

## Getting Started

Follow these steps to get the application running on your local machine.

### 1. Clone or Download the Project

First, ensure you have all the project files in a single folder on your computer.

### 2. Install Dependencies

Open your terminal or command prompt, navigate to the project's root directory, and run the following command to install all the required packages:

```bash
npm install
```

This command reads the `package.json` file and downloads the necessary libraries into a `node_modules` folder.

### 3. Run the Development Server

Once the installation is complete, you can start the local development server by running:

```bash
npm run dev
```

This will start the Vite development server. It will print a local URL in the terminal (usually `http://localhost:5173`). Open this URL in your web browser to see the application running.

The server supports Hot Module Replacement (HMR), meaning any changes you make to the source code will be reflected in the browser instantly without needing a full page reload.
