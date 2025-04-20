# Confluence 2.0 Frontend

A Next.js 15.3 application for document collaboration and knowledge management, replicating core features of Atlassian Confluence.

## Tech Stack

- **Framework**: Next.js 15.3
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Integration**: Custom API client
- **Form Handling**: React Hook Form + Zod
- **Animations**: Framer Motion

## Project Structure

```
/
├── .github/           # GitHub Actions workflows
├── .husky/            # Husky git hooks
├── .vscode/           # VSCode settings
├── public/            # Static assets
├── src/               # Source code
│   ├── app/           # App router pages and layouts
│   ├── components/    # Reusable components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── layouts/   # Layout components
│   │   ├── forms/     # Form-related components
│   │   └── common/    # Common components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and libraries
│   ├── providers/     # Context providers
│   ├── services/      # API services and data fetching
│   ├── store/         # State management (if needed)
│   ├── styles/        # Global styles and Tailwind imports
│   └── types/         # TypeScript type definitions
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Git ignore file
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Development Setup

### Prerequisites

- Node.js 20.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chiru720/confluence2-frontend.git
   cd confluence2-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3333/api/v1
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run format` - Format code with Prettier

## Connecting to Backend

The frontend connects to the backend API using the API client in `src/services/api-client.ts`. The base URL is configured through the `NEXT_PUBLIC_API_URL` environment variable.

## Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches (e.g., `feature/auth`, `feature/editor`)
- `bugfix/*` - Bug fix branches
- `release/*` - Release preparation branches

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or updating tests
- `chore:` - Changes to build process or auxiliary tools

## Code Quality and Testing

- Run linting: `npm run lint`
- Run type checking: `npm run typecheck`
- Run tests: `npm test`

## Deployment

The application can be deployed to various platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

## License

[MIT](LICENSE)
