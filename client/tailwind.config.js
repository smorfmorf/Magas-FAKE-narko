/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                heartbeat: {
                    '0%': { transform: 'scale(1)' },
                    '14%': { transform: 'scale(0.7)' },
                    '28%': { transform: 'scale(1)' },
                    '42%': { transform: 'scale(1.3)' },
                    '70%': { transform: 'scale(1)' },
                },
                category: {
                    '0%': { transform: 'scale(1)' },
                    '20%': { transform: 'scale(0.7)' },
                    '30%': { transform: 'scale(0.8)' },
                    '50%': { transform: 'scale(0.9)' },
                    '80%': { transform: 'scale(1)' },
                },
            },
            animation: {
                heartbeat: 'heartbeat 1s linear infinite',
                category: 'category 0.6s linear',
            },
        },
        screens: {
            sm: { min: '440px', max: '767px' },
            // => @media (min-width: 640px and max-width: 767px) { ... }

            md: { min: '768px', max: '1023px' },
            // => @media (min-width: 768px and max-width: 1023px) { ... }

            lg: { min: '1024px', max: '1279px' },
            // => @media (min-width: 1024px and max-width: 1279px) { ... }

            xl: { min: '1280px', max: '1535px' },
            // => @media (min-width: 1280px and max-width: 1535px) { ... }

            all: { min: '440px', max: '1535px' },

            '2xl': { min: '1536px' },
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [],
};
