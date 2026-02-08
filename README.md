# Californion

Open-source scheduling platform built with Next.js 14+, TypeScript, Prisma, and PostgreSQL.

## Features

- 🗓️ **Smart Scheduling** - Intelligent availability detection with timezone support
- 📅 **Event Types** - Create custom meeting types with flexible configurations
- 🔗 **Calendar Integration** - Connect Google Calendar, Outlook, and more
- 🎨 **Beautiful UI** - Minimalist, monochromatic design inspired by Cal.com
- ⚡ **High Performance** - Built with Next.js App Router and optimized for speed
- 🔐 **Secure Auth** - Magic links and OAuth with Auth.js

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Auth.js (NextAuth)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: TanStack Query
- **Validation**: Zod
- **Date/Time**: dayjs

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/californion.git
cd californion
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL and other configuration.

4. Generate Prisma client:
```bash
npm run db:generate
```

5. Run database migrations:
```bash
npm run db:migrate
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
californion/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
│   ├── availability.ts    # Availability calculation engine
│   ├── db.ts              # Prisma client
│   ├── utils.ts           # Helper functions
│   └── validations.ts     # Zod schemas
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## License

MIT

## Acknowledgments

Inspired by [Cal.com](https://cal.com) - The open source Calendly alternative.
