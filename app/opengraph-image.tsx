import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LearnYorubaEasily - Learn Yorùbá with confidence'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f8f6f0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '30px solid #19352b',
          borderBottom: '30px solid #bd674b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: '#19352b',
            color: '#f8f6f0',
            fontSize: '48px',
            fontWeight: 'bold',
          }}>
            LY
          </div>
          <h1 style={{
            fontSize: '96px',
            color: '#19352b',
            margin: 0,
            letterSpacing: '-0.03em',
            fontWeight: 'normal',
          }}>
            LearnYoruba<span style={{ color: '#bd674b' }}>Easily</span>
          </h1>
        </div>
        <p style={{
          fontSize: '42px',
          color: '#19352b',
          opacity: 0.7,
          marginTop: '60px',
          fontWeight: '500',
        }}>
          Practical, engaging Yorùbá classes for everyone.
        </p>
      </div>
    ),
    { ...size }
  )
}
