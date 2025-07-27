# Padre Gino's Pizza

A React pizza ordering application built with modern tools and maintainable architecture.

## Tech Stack

- **React 19** with Vite
- **TanStack Router** for routing
- **TanStack React Query** for data fetching
- **Vitest** for testing (including browser tests with Playwright)
- **React Compiler** (babel-plugin-react-compiler)

## Features

- Pizza ordering system with cart functionality
- Order history viewing
- Contact form
- Pizza of the day feature
- Responsive design

## Project Structure

The codebase follows a feature-based architecture for improved maintainability:

```
src/
├── app/                    # App-level configuration
│   ├── App.jsx            # Main app component
│   ├── ErrorBoundary.jsx  # Error handling
│   └── routeTree.gen.ts   # Generated route tree
├── shared/                 # Shared utilities & configs
│   ├── api/               # Centralized API functions
│   │   ├── client.js      # Base API client
│   │   ├── pizzas.js      # Pizza-related APIs
│   │   ├── orders.js      # Order-related APIs
│   │   └── contact.js     # Contact APIs
│   ├── hooks/             # Reusable hooks
│   │   ├── useOrder.js
│   │   └── usePizzaOfTheDay.js
│   ├── contexts/          # React contexts
│   │   └── contexts.js    # Cart context
│   ├── config/            # Configuration constants
│   │   └── constants.js   # App constants
│   └── utils/             # Utility functions
│       └── formatting.js  # Price formatting
├── features/              # Feature-based organization
│   ├── cart/              # Cart functionality
│   │   ├── components/
│   │   └── __tests__/
│   ├── pizzas/            # Pizza-related components
│   │   ├── components/
│   │   └── __tests__/
│   ├── orders/            # Order management
│   └── contact/           # Contact functionality
├── layouts/               # Layout components
│   ├── Header.jsx
│   └── Modal.jsx
└── pages/                 # Route components
    ├── __root.jsx
    ├── index.lazy.jsx
    ├── order.lazy.jsx
    ├── past.lazy.jsx
    └── contact.lazy.jsx
```

## Key Architecture Benefits

- **Domain-driven** organization by features
- **Clear separation** of concerns
- **Consolidated API** structure with shared client
- **Co-located tests** with components
- **Scalable** structure for growth
- **Consistent** naming and organization

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Testing

The project includes comprehensive testing:

- **Unit tests** with Vitest
- **Browser tests** with Playwright
- **Component snapshots**
- **API and hook testing**
- **Coverage reporting**

## API

The app connects to a separate API server. Start the API server with:

```bash
npm run api
```