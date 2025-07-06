# Dev Container for Otaku.lt

This dev container provides a consistent development environment for the otaku.lt project.

## What's Included

### Base Environment
- **Node.js 20** with npm and yarn
- **TypeScript** support
- **Git** configuration
- **Docker-in-Docker** for advanced scenarios

### VS Code Extensions
- **Tailwind CSS IntelliSense** - Auto-completion for Tailwind classes
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **TypeScript** - Enhanced TypeScript support
- **GitHub Copilot** - AI-powered coding assistance
- **Path Intellisense** - Auto-completion for file paths
- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags

### Global Tools
- **Vercel CLI** - For deployment
- **@next/codemod** - Next.js migration tools
- **npm-check-updates** - Update dependencies

## Quick Start

1. **Open in VS Code**: Make sure you have the "Dev Containers" extension installed
2. **Reopen in Container**: VS Code should prompt you, or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
3. **Wait for setup**: The container will build and install dependencies automatically
4. **Start developing**: The dev server will start automatically on port 3000

## Ports
- **3000**: Next.js development server
- **3001**: Additional services (Storybook, etc.)

## Future Enhancements

The docker-compose.yml includes commented sections for:
- **PostgreSQL database** (for when you add dynamic content)
- **Redis** (for caching and sessions)
- **Additional microservices**

## Troubleshooting

### Container won't start
- **Volume mount error**: If you see errors about invalid characters in volume names, use the `devcontainer-simple.json` configuration instead
- **Rename config file**: `mv devcontainer-simple.json devcontainer.json` to use the simpler version
- Ensure Docker is running
- Try rebuilding: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

### Alternative Configuration
If the main configuration fails, there's a simplified version:
- Copy `devcontainer-simple.json` to `devcontainer.json`
- This version doesn't use volume mounts for node_modules (slightly slower but more reliable)

### Port conflicts
- Change ports in `.devcontainer/devcontainer.json` if needed
- Default ports: 3000, 3001

### Performance issues
- The main container uses volume mounts for `node_modules` to improve performance
- If having issues, use the simple configuration which doesn't use volume mounts
- On Windows, consider moving the project to the WSL2 filesystem

## Development Workflow

1. **Code changes** are automatically synced to the container
2. **Hot reload** works out of the box with Next.js
3. **Extensions** provide real-time linting and formatting
4. **Terminal** is available for running commands inside the container

Perfect for collaborative development and ensuring everyone has the same environment! 🚀
