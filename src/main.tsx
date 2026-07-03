import {
  createBrowserHistory,
  createHashHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import '@/styles/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { TooltipProvider } from '@/core/components/ui/tooltip';
import { appBasePath } from '@/core/lib/base-url';
import i18n from '@/i18n';
import { AppRouteError } from '@/layout/components/app-route-error';
import { ThemeProvider } from '@/layout/contexts/theme-provider';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();
const useBrowserHistory = import.meta.env.VITE_BROWSER_HISTORY === 'true';
const history = useBrowserHistory
  ? createBrowserHistory()
  : createHashHistory();

// Set up a Router instance
const router = createRouter({
  history: history,
  routeTree,
  ...(useBrowserHistory && appBasePath ? { basepath: appBasePath } : {}),
  context: {
    queryClient,
    auth: undefined!,
    i18n: undefined!,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultErrorComponent: AppRouteError,
  defaultNotFoundComponent: () => <AppRouteError />,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
function ContextualizedApp() {
  const { i18n } = useTranslation();

  return <RouterProvider router={router} context={{ queryClient, i18n }} />;
}

// Render the app
const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ContextualizedApp />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>,
  );
}
