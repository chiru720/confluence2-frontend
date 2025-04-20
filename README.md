# Confluence 2.0 Frontend

A Next.js 15.3 application for document collaboration and knowledge management, replicating core features of Atlassian Confluence.

## Tech Stack

- **Framework**: Next.js 15.3
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context + Hooks (or Zustand for more complex state)
- **Form Handling**: React Hook Form + Zod
- **API Integration**: Custom hooks with Fetch API or Axios

## Project Structure

This project follows the recommended Next.js 15.3 App Router structure as outlined in our organization's coding standards:

```
/
├── .github/           # GitHub Actions workflows
├── .husky/            # Husky git hooks
├── .vscode/           # VSCode settings
├── public/            # Static assets
├── src/               # Source code
│   ├── app/           # App router pages and layouts
│   ├── components/    # Reusable components
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

- Node.js 18.17.0 or later
- npm or yarn or pnpm
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
   # or
   pnpm install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3333/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

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

## Contributing

1. Create a feature branch from `develop`
2. Make your changes following the project's coding standards
3. Add tests for your changes
4. Update documentation if necessary
5. Submit a pull request to `develop`

## Deployment

The application is configured for deployment on Vercel. Each push to `main` will trigger an automatic deployment to production.

## License

This project is proprietary and confidential.