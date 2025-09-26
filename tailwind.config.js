/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* warm earth tone with transparency */
        input: 'var(--color-input)', /* pure white */
        ring: 'var(--color-ring)', /* warm earth tone */
        background: 'var(--color-background)', /* soft cream */
        foreground: 'var(--color-foreground)', /* near-black with warm undertones */
        primary: {
          DEFAULT: 'var(--color-primary)', /* warm earth tone */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* lighter complement */
          foreground: 'var(--color-secondary-foreground)' /* near-black with warm undertones */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* subdued terracotta */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* lighter complement */
          foreground: 'var(--color-muted-foreground)' /* muted brown */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* rich brown */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* pure white */
          foreground: 'var(--color-popover-foreground)' /* near-black with warm undertones */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* pure white */
          foreground: 'var(--color-card-foreground)' /* near-black with warm undertones */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* muted sage green */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* warm amber */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* subdued terracotta */
          foreground: 'var(--color-error-foreground)' /* white */
        }
      },
      fontFamily: {
        'heading': ['Crimson Text', 'serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Lato', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'responsive-body': 'clamp(1rem, 2.5vw, 1.25rem)'
      },
      borderRadius: {
        'sacred': '8px'
      },
      spacing: {
        'sacred': '2rem'
      },
      boxShadow: {
        'sacred': '0 2px 8px rgba(139, 125, 107, 0.15)',
        'sacred-sm': '0 2px 4px rgba(139, 125, 107, 0.15)',
        'sacred-lg': '0 4px 12px rgba(139, 125, 107, 0.15)',
        'medallion': '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'sacred-gradient': 'linear-gradient(135deg, #F5F1E8 0%, #EDE7D3 100%)'
      },
      transitionDuration: {
        'reverent': '200ms',
        'contemplative': '300ms'
      },
      transitionTimingFunction: {
        'reverent': 'ease-out',
        'contemplative': 'ease-in-out'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}