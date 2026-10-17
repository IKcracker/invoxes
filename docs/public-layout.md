# Public layout widths

The public website keeps its Manrope / Instrument Serif typography and forest / ivory palette. PublicShell owns page frames through a scoped CSS module; the CRM is intentionally unaffected.

## Width policy

| Surface | Maximum content width |
| --- | --- |
| Navigation, footer, homepage sections, service pages, About | 1120px (70rem) |
| Calculator input/results workspace | 1008px (63rem) |
| Contact page | 1024px (64rem) |
| FAQ reading column | 760px (47.5rem) |
| Application form | 736px (46rem) |
| Homepage enquiry panel | 496px (31rem) |
| Body-copy measure | 65ch |

All frames use 20-32px fluid side gutters. Background bands may extend across the viewport; their contents may not. Header, footer and broad content use the same frame. Narrow page introductions match their own form/reading column. Do not add another 1320px container inside PublicShell.

## Page composition

- Finance catalogue and product detail pages use a restrained dark introduction.
- About uses an editorial introduction.
- Calculator, application, FAQ and Contact use compact light introductions without redundant application/calculator buttons.
- Homepage hero and section headings have smaller responsive scales.
- Mobile navigation is used below 1120px to avoid compressing desktop links.
- Process cards use one column on phones, two on tablets and four only when there is sufficient desktop space.
- Enquiry fields use one column inside the bounded homepage panel; small application review tables also stack.

## Scope and migration

`components/public-shell.module.css` controls existing page-frame boundaries with scoped, direct-child selectors. It does not alter calculator formulas, form validation/storage, product data, CRM tables or route destinations. The legacy homepage has two in-flow sections (`services`, `why-us`) and three full-bleed bands (hero, process, contact); preserve those semantic boundaries when editing it. New public page types should declare an explicit width policy here rather than copying a numeric maximum from another page.

## Verification for this revision

- TSX transpilation: no syntax diagnostics.
- CSS parsed successfully with PostCSS.
- 64 isolated Chromium layout-fixture checks passed: 8 public page compositions at 320, 375, 768, 1024, 1120, 1280, 1440 and 1920px.
- Checks covered frame caps, intro/content alignment, horizontal page overflow, header overlap, homepage form width, and the native desktop dropdown.
- Inspected calculator desktop and homepage mobile fixture screenshots.

These are isolated layout checks using the new shared shell/CSS and representative existing page structures, installed Tailwind 4.1.10, fallback fonts, and mocked React/Next dependencies. They are **not** an actual Next.js build, React hydration test, or full application/browser acceptance test. The environment could not resolve github.com for cloning and did not contain the repository's Next.js dependencies.

Before merging, run `npm ci`, `npm run build`, `npm run lint` and test the real preview with Manrope loaded. Verify the mobile menu and Escape focus return, all product links, calculator modes, application steps and both browser-local CRM intake lists. No changes to main or production are included.
