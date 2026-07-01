import { properties } from '@/data/properties';

export default async function sitemap() {
  const baseUrl = 'https://gharstay.com'; // Change to production domain

  // Base routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/pricing',
    '/properties',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic property detail routes
  const propertyRoutes = properties.map((p) => ({
    url: `${baseUrl}/properties/${p.id}`,
    lastModified: p.postedDate || new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...propertyRoutes];
}
