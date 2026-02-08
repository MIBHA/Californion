# Californion - Project Structure

## Directory Tree

```
californion/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 auth/
│   │   │   └── 📁 [...nextauth]/
│   │   │       └── route.ts         # Auth.js handlers
│   │   ├── 📁 availability/
│   │   │   └── route.ts             # Availability calculation API
│   │   └── 📁 bookings/
│   │       └── route.ts             # Booking management API
│   │
│   ├── 📁 dashboard/                # Protected Dashboard
│   │   ├── layout.tsx               # Dashboard shell with auth
│   │   └── page.tsx                 # Dashboard home
│   │
│   ├── 📁 [username]/               # Dynamic public routes
│   │   └── 📁 [slug]/
│   │       └── page.tsx             # Public booking page
│   │
│   ├── globals.css                  # Global styles & design tokens
│   ├── layout.tsx                   # Root layout with providers
│   └── page.tsx                     # Landing page
│
├── 📁 components/                   # React Components
│   ├── 📁 booking/
│   │   └── booking-calendar.tsx     # Interactive calendar widget
│   │
│   ├── 📁 dashboard/
│   │   ├── sidebar.tsx              # Navigation sidebar
│   │   └── topbar.tsx               # Top navigation bar
│   │
│   ├── 📁 ui/                       # Reusable UI primitives
│   │   ├── button.tsx               # Button component
│   │   ├── input.tsx                # Input component
│   │   └── label.tsx                # Label component
│   │
│   └── providers.tsx                # React Query provider
│
├── 📁 lib/                          # Core Utilities
│   ├── availability.ts              # ⭐ Availability algorithm
│   ├── auth.ts                      # Auth.js configuration
│   ├── db.ts                        # Prisma client singleton
│   ├── utils.ts                     # Helper functions
│   └── validations.ts               # Zod schemas
│
├── 📁 prisma/                       # Database
│   └── schema.prisma                # ⭐ Database schema
│
├── 📁 types/                        # TypeScript Types
│   └── next-auth.d.ts               # Auth type extensions
│
├── 📄 .env.example                  # Environment template
├── 📄 .gitignore                    # Git ignore rules
├── 📄 .prettierrc.js                # Code formatting
├── 📄 next.config.js                # Next.js config
├── 📄 package.json                  # Dependencies
├── 📄 postcss.config.js             # PostCSS config
├── 📄 README.md                     # Documentation
├── 📄 tailwind.config.ts            # Tailwind config
└── 📄 tsconfig.json                 # TypeScript config
```

## Key Files

### ⭐ Core Algorithm
- **lib/availability.ts** - Sophisticated availability calculation with timezone support

### ⭐ Database Schema
- **prisma/schema.prisma** - Complete data model for scheduling platform

### 🔐 Authentication
- **lib/auth.ts** - Auth.js configuration with Google, GitHub, Email providers

### 🎨 Design System
- **app/globals.css** - Monochromatic color palette and design tokens
- **tailwind.config.ts** - Custom Tailwind configuration

### 📡 API Endpoints
- **app/api/availability/route.ts** - GET available time slots
- **app/api/bookings/route.ts** - POST/GET bookings

### 🖥️ User Interfaces
- **app/dashboard/page.tsx** - Dashboard home with stats
- **app/[username]/[slug]/page.tsx** - Public booking page
- **components/booking/booking-calendar.tsx** - Interactive calendar

## File Count Summary

- **Total Files**: 25+
- **TypeScript Files**: 20+
- **Configuration Files**: 5
- **Documentation**: 2 (README.md + this file)
