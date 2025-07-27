To build a **reusable and scalable Next.js project structure** with **TanStack Query (React Query)** for data fetching, here's a recommended setup tailored for maintainability, modularity, and performance.

---

## 🧱 Recommended Project Structure

```bash
my-nextjs-project/
│
├── public/                  # Static assets (images, fonts, etc.)
├── styles/                 # Global styles (CSS/SCSS)
├── app/                    # App Router (Next.js 13+)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── (auth)/             # Route group for auth pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   ├── dashboard/          # Protected route
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   ├── api/                # API routes
│   │   ├── users/route.ts
│
├── components/             # Reusable UI components
│   ├── ui/                 # Buttons, cards, etc.
│   ├── forms/              # Form components
│   ├── layouts/            # Header, Footer, Sidebar
│
├── hooks/                  # Custom React hooks
│   ├── useUser.ts
│   ├── useAuth.ts
│
├── lib/                    # Utility functions and API clients
│   ├── apiClient.ts        # Axios or fetch wrapper
│   ├── queryClient.ts      # TanStack Query client setup
│   ├── utils.ts
│
├── context/                # React Contexts (if needed)
│   ├── AuthContext.tsx
│
├── services/               # External API integrations
│   ├── userService.ts
│
├── types/                  # TypeScript types
│   ├── user.ts
│   ├── api.ts
│
├── middleware.ts           # Next.js middleware (auth, logging)
├── next.config.js          # Next.js config
├── tsconfig.json           # TypeScript config
├── .eslintrc.json          # ESLint config
├── .prettierrc             # Prettier config
├── package.json
```

---

## 🔗 TanStack Query Integration

### 1. **Setup Query Client**

```ts
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();
```

### 2. **Provider Setup**

```tsx
// app/layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

export default function RootLayout({ children }) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
```

### 3. **Fetching Data**

```ts
// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/userService';

export const useUsers = () => {
	return useQuery(['users'], getUsers);
};
```

---

## ✅ Best Practices

- **Modularize by feature**: Group related components, hooks, and services.
- **Use route groups**: `(admin)`, `(auth)` for logical separation without affecting URLs.
- **Colocate files**: Keep `page.tsx`, `layout.tsx`, and `loading.tsx` together per route.
- **Use TanStack Query for caching, retries, and background updates.**
- **Use `lib/` for shared logic** like API clients, query config, and utilities.

---
