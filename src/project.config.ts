import { DateFormat } from '@/core/constants/dates';

// Some of this configs will be user decisions
export default {
  name: 'React admin',
  version: 'v1.0.0',
  brand: {
    name: 'Paul2g.dev',
    logoSrc: '/logo.svg',
  },
  time: {
    timeZone: 'America/Tijuana',
    dateTimeFormat: `${DateFormat.INT_ABBR} hh:mm A`,
    dateFormat: DateFormat.INT_ABBR,
  },
  money: {
    currency: 'USD',
  },
  baseApi: {
    url: import.meta.env?.VITE_BASE_API_URL,
    path: '/api',
  },
  router: {
    defaultRoute: '/app/dashboard',
  },
} as const;
