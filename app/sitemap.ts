import type { MetadataRoute } from 'next'

const BASE_URL = 'https://learnyorubaeasily.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/classes',
    '/practice',
    '/shop',
    '/about',
    '/faq',
    '/contact',
    '/register',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/classes' ? 0.9 : route === '/register' ? 0.9 : 0.7,
  }))
}
