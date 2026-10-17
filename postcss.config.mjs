// Run Tailwind in both Next.js bundlers. A Turbopack-only loader leaves
// webpack builds without generated utilities, preflight, or @apply rules.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
