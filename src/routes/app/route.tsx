import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { NavigationProgress } from '@/core/components/navigation-progress';
import { SidebarInset, SidebarProvider } from '@/core/components/ui/sidebar';
import { AppHeader } from '@/layout/components/app-header';
import { AppSidebar } from '@/layout/components/app-sidebar';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ context: { auth }, location }) => {
    if (!auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
  },
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'layout:navigation.home',
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider
      className="bg-sidebar"
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <NavigationProgress />
      <AppSidebar className="animate-in fill-mode-backwards fade-in slide-in-from-left-10 duration-250 ease-out" />
      <SidebarInset className="h-[calc(100vh-1rem)] md:m-2 md:rounded-lg">
        <AppHeader className="animate-in fill-mode-backwards fade-in slide-in-from-top-10 duration-250 delay-250 ease-out" />
        <div className="grow p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
