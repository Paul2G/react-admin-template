export const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBaseUrl(path: string) {
  const normalizedPath = path.replace(/^\//, '');

  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}
