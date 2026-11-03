# Design System — Sourav Food & Agro

## Product Context
- **What this is:** A B2B website for an agricultural food company founded in Maharashtra in 2013.
- **Who it's for:** Wholesale buyers, distributors, dealers, and business customers evaluating raisins, turmeric, jaggery, and rice.
- **Space/industry:** Premium agricultural food and export-oriented food production.
- **Project type:** Editorial marketing site with a procurement-oriented enquiry path.

## Aesthetic Direction
- **Direction:** Editorial-cinematic. Product photography carries the emotion; typography and agricultural linework carry the identity.
- **Decoration level:** Intentional. Grain, contour lines, and botanical marks support the photography without competing with it.
- **Mood:** Grounded, tactile, confident, and calm. The first impression should feel like a premium agricultural publication that becomes a practical business conversation.
- **Reference patterns:** Provenance storytelling, harvest-to-dispatch process journeys, and interactive product exploration. Do not copy another brand's palette, photography, or claims.

## Typography
- **Display/Hero:** Fraunces — optical serif with agricultural character and strong editorial scale.
- **Body:** Manrope — clear, contemporary, and readable in specifications and forms.
- **UI/Labels:** Manrope.
- **Loading:** `next/font`, with `display: swap`.
- **Scale:** Fluid display from 2.8rem to 6.5rem; section titles from 2.25rem to 4.5rem; body 1rem–1.125rem with 1.7 line height.

## Color
- **Approach:** Restrained. Forest green is the identity, amber is the single warm action accent, and stone carries text and surfaces.
- **Primary:** `#1A3D2B` forest-900 — navigation, primary actions, and deep storytelling surfaces.
- **Accent:** `#C4790A` amber-600 / `#D98E1A` amber-500 — enquiry actions and active indicators.
- **Neutrals:** Warm stone from `#FAFAF9` to `#1C1917`.
- **Semantic:** success `#15803D`, error `#DC2626`.
- **Dark surfaces:** Forest-950 photography scrims are for text contrast, not decorative gradients.

## Spacing
- **Base unit:** 4px.
- **Density:** Spacious on storytelling sections, compact inside forms and specifications.
- **Rhythm:** Alternate full-bleed imagery, inset editorial text, and textured proof sections. Do not stack identical cards.

## Layout
- **Approach:** Creative-editorial.
- **Grid:** Asymmetric two-column compositions on desktop; a single narrative column on small screens.
- **Max content width:** 80rem.
- **Border radius:** 4px controls, 16–24px media, pill actions. Avoid making every surface the same rounded card.

## Motion
- **Approach:** Intentional.
- **Micro:** 120–200ms for hover, focus, and pressed feedback.
- **Reveal:** 500–700ms, once, for first-viewport and section entrances.
- **Narrative:** Scroll-linked image and process changes on the homepage and quality journey only.
- **Constraints:** Animate transform and opacity. No WebGL, autoplay video, scroll-jacking, continuous text motion, or hover-only information.
- **Reduced motion:** Render the final composition immediately and keep state transitions short.

## Photography
- Use the current studio product images until authentic company photography is supplied.
- Do not invent founders, facilities, certificates, shipments, or process scenes.
- Future replacement slots are documented in `src/data/assets.ts`.
- Give every meaningful image factual alternative text. Decorative motifs are hidden from assistive technology.

## Decisions Log
| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-11-03 | Editorial-cinematic upgrade | Make the existing verified content more immersive without changing company facts or adding spectacle that harms performance. |
