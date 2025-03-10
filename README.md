# Talent Assistant

A modern talent search and management application built with React, TypeScript, and Vite.

## Features

- AI-powered candidate search
- Talent pool management
- PDF profile generation
- Real-time skill matching
- Match score calculation
- Interactive UI components

## Quick Start

### Using Bolt (Recommended)

1. Open the project in Bolt
2. Share your Bolt workspace URL with team members
3. Team members can join and collaborate in real-time

### Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update values if needed

4. Start the development server:
```bash
npm run dev
```

## Technology Stack

- React 18.3.1
- TypeScript
- Vite
- Tailwind CSS
- @react-pdf/renderer
- Lucide React

For detailed information about the technology stack, see [TECH_STACK.md](TECH_STACK.md).

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── views/         # Page components
└── main.tsx       # Application entry point
```

## Environment Variables

Required environment variables:

```
VITE_SEARCH_WEB_SCRAPING_API_URL=
VITE_SEARCH_TALENT_POOL_API_URL=
```

Copy `.env.example` to `.env` and update the values.

## Collaboration

### Using Bolt

1. Share your Bolt workspace URL with team members
2. Team members can:
   - Join the workspace
   - Edit code in real-time
   - Preview changes instantly
   - Use the integrated terminal
   - Access all development features

Benefits of using Bolt:
- No local setup required
- Instant collaboration
- Consistent development environment
- Real-time preview
- Built-in version control

### Using Git

For traditional Git-based collaboration, see our [Contributing Guide](CONTRIBUTING.md).

## License

MIT