/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        gray: {
          css: {
            '--tw-prose-invert-body': theme('colors.gray[200]'),
            '--tw-prose-invert-bullets': theme('colors.gray[700]'),
            '--tw-prose-invert-th-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-pre-code': theme('colors.gray[200]')
          }
        },
        neutral: {
          css: {
            '--tw-prose-invert-body': theme('colors.neutral[200]'),
            '--tw-prose-invert-bullets': theme('colors.neutral[700]'),
            '--tw-prose-invert-th-borders': theme('colors.neutral[700]'),
            '--tw-prose-invert-pre-code': theme('colors.neutral[200]')
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
