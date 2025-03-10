# Contributing Guide

## Collaboration Options

### Option 1: Using Bolt (Recommended)

1. Get the Bolt workspace URL from your team lead
2. Open the URL in your browser
3. Start collaborating immediately with:
   - Real-time code editing
   - Live preview
   - Integrated terminal
   - Built-in version control

### Option 2: Traditional Git Workflow

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values if needed

4. Start the development server:
```bash
npm run dev
```

## Development Workflow

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:
```bash
git add .
git commit -m "feat: add your feature description"
```

3. Push your changes:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

## Commit Message Guidelines

Follow the Conventional Commits specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Code Style

- Use TypeScript for all new files
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write unit tests for new features

## Project Structure

- `/src/components` - Reusable UI components
- `/src/views` - Page components
- `/src/components/layout` - Layout components
- `/src/components/candidates` - Candidate-related components
- `/src/components/home` - Home page components

## Testing

Run tests before submitting a PR:
```bash
npm run test
```

## Need Help?

- Check the existing issues
- Create a new issue for bugs or feature requests
- Ask questions in pull requests or issues
- Ask your team lead for Bolt workspace access