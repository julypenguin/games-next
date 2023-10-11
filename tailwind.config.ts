import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        red: {
          archery: "#FE5B45"
        },
        gray: {
          general: "#EAEAEA"
        }
      },
      width: {
        "100px": "100px",
        "200px": "200px",
        "300px": "300px",
        "400px": "400px",
        "500px": "500px",
      },
      height: {
        "100px": "100px",
        "200px": "200px",
        "300px": "300px",
        "400px": "400px",
        "500px": "500px",
      },
      zIndex: {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        100: "100",
      },
      borderRadius: {
        muzzle: '50% 50% 50% 50% / 30% 30% 70% 70%'
      },
      boxShadow: {
        halo: '0 0 35px'
      },
      keyframes: {
        moving: {
          '0%': { transform: 'translate(-200px)' },
          '100%': { transform: 'translate(200px)' },
        },
        headBob: {
          "0%": { transform: 'translateX(-15px) translateY(45px)' },
          "10%": { transform: 'translateX(-15px) translateY(45px)' },
          "30%": { transform: 'translateX(0) translateY(0)' },
          "75%": { transform: 'translateX(0) translateY(0)' },
          "90%": { transform: 'translateX(-15px) translateY(45px)' },
          "100%": { transform: 'translateX(-15px) translateY(45px)' },
        },
        eyeBlink: {
          "0%": { transform: 'scaleY(0)' },
          "10%": { transform: 'scaleY(0)' },
          "15%": { transform: 'scaleY(1)' },
          "48%": { transform: 'scaleY(1)' },
          "50%": { transform: 'scaleY(0)' },
          "52%": { transform: 'scaleY(1)' },
          "90%": { transform: 'scaleY(1)' },
          "95%": { transform: 'scaleY(0)' },
          "100%": { transform: 'scaleY(0)' },
        },
        lookAround: {
          "0%": { transform: 'translate(0)' },
          "35%": { transform: 'translate(0)' },
          "45%": { transform: 'translate(75%, 40%)' },
          "55%": { transform: 'translate(75%, 40%)' },
          "65%": { transform: 'translate(-35%, 40%)' },
          "100%": { transform: 'translate(-35%, 40%)' },
        },
        tailSwish: {
          "0%": { transform: 'rotate(0deg)' },
          "15%": { transform: 'rotate(0deg)' },
          "25%": { transform: 'rotate(5deg)' },
          "40%": { transform: 'rotate(-5deg)' },
          "50%": { transform: 'rotate(5deg)' },
          "60%": { transform: 'rotate(-5deg)' },
          "100%": { transform: 'rotate(0deg)' },
        },
        purr: {
          "0%": { left: '-6px' },
          "20%": { left: '0px' },
          "40%": { left: '-6px' },
          "60%": { left: '0px' },
          "80%": { left: '-6px' },
          "100%": { left: '0px' },
        },
        falling: {
          '0%': { opacity: '0', transform: 'translate(100px, 0)' },
          '70%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translate(0px, 200px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
