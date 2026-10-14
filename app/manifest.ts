import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LearnYorubaEasily',
    short_name: 'LearnYoruba',
    description: 'Learn Yorùbá with confidence — interactive classes, flashcards, and community.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f6f0',
    theme_color: '#19352b',
    icons: [
      {
        src: '/logo.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}
