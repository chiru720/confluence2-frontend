# Confluence 2.0 Frontend

This is the frontend repository for Confluence 2.0, a collaborative document management system built with Next.js.

## Tech Stack

- **Framework**: Next.js 15.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **API Integration**: Custom API client

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd conf-2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following:
```
NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/public` - Static assets
- `/src` - Source code
  - `/components` - Reusable UI components
    - `/ui` - shadcn/ui components
    - `/layouts` - Layout components
    - `/forms` - Form-related components
    - `/common` - Common components
  - `/hooks` - Custom React hooks
  - `/services` - API services and data fetching
  - `/types` - TypeScript type definitions
  - `/lib` - Utility functions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run format` - Format code with Prettier

## Connecting to Backend

The frontend connects to the backend API using the API client in `src/services/api-client.ts`. The base URL is configured through the `NEXT_PUBLIC_API_URL` environment variable.

## Deployment

The application can be deployed to various platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

## License

[MIT](LICENSE)
