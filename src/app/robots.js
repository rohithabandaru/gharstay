export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/owner/', '/tenant/dashboard/'],
    },
    sitemap: 'https://gharstay.com/sitemap.xml',
  };
}
