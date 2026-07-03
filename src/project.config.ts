import { DateFormat } from '@/core/constants/dates';
import { withBaseUrl } from '@/core/lib/base-url';

// Some of this configs will be user decisions
export default {
  name: 'SeaTrack',
  version: 'beta',
  brand: {
    name: 'Dilato',
    logoSrc: withBaseUrl('logo.png'),
    fullLogoSrc: withBaseUrl('logo-full.png'),
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
    defaultRoute: '/app/transactions',
  },
} as const;
