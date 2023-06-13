/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html','node_modules/preline/dist/*.js',],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
      },
      boxShadow: {
        "custom" : '0 0 4px rgb(0 0 0 / 0.1), 0 6px 24px rgb(98 191 109 / 0.2)'
      },
      backgroundImage: {
        'hero-bg': "url('/img/Hero\ bg-01.png')",
        'platform-bg' :"url('/img/Platform-bg.png')",
        'footer-texture': "url('/img/footer-texture.png')",
        'customer-bg':"url('/img/Customers-bg.png')",
        'teamspace-bg':"url('/img/Teamspaces-bg.png')"
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        cabinetGrotesk: "'Cabinet Grotesk', san-serif",
      }
    }
  }
}
