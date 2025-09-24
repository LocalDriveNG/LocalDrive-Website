// src/types/tailwind.d.ts
import 'tailwindcss/tailwind.css'

declare module 'tailwindcss/colors' {
  interface Color {
    'trust-badge': string
    'neutral-50': string
    'neutral-100': string
    'neutral-200': string
    'neutral-800': string
  }
}

declare module 'tailwindcss/tailwind-config' {
  interface Config {
    theme: {
      extend: {
        colors: {
          'trust-badge': string
          'neutral-50': string
          'neutral-100': string
          'neutral-200': string
          'neutral-800': string
        }
        backgroundImage: {
          'hero-gradient': string
        }
        boxShadow: {
          'brand': string
          'brand-lg': string
        }
      }
    }
  }
}