import { createFileRoute, redirect } from '@tanstack/react-router';

import projectConfig from '@/project.config';

export const Route = createFileRoute('/app/')({
  beforeLoad: () => {
    throw redirect({
      to: projectConfig.router.defaultRoute,
    });
  },
});
