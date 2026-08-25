**Source visual truth**

- Desktop capture: `.design-reference/source-desktop-00.png`
- Mobile capture: `.design-reference/source-mobile-top-00.png`
- Interaction captures: `.design-reference/source-desktop-protocol-open.png`, `.design-reference/source-desktop-quickstart-codex.png`, `.design-reference/source-desktop-routing-cost.png`, `.design-reference/source-desktop-live-anthropic.png`, `.design-reference/source-desktop-faq-open.png`, `.design-reference/source-mobile-menu-open.png`

**Implementation evidence**

- Desktop detail pass: `.design-reference/implementation-desktop-detail-normalized.png`
- Mobile detail pass: `.design-reference/implementation-mobile-detail-normalized.png`
- Mobile menu: `.design-reference/implementation-mobile-detail-menu.png`
- GSAP title frames: `.design-reference/implementation-title-gsap-frame-1.png`, `.design-reference/implementation-title-gsap-frame-2.png`
- Mobile GSAP title: `.design-reference/implementation-mobile-gsap-title-normalized.png`
- Combined comparisons: `.design-reference/qa-desktop-detail-side-by-side.png`, `.design-reference/qa-mobile-detail-side-by-side.png`
- Focused title comparison: `.design-reference/qa-mobile-gsap-title-side-by-side.png`
- Logo source/implementation comparison: `.design-reference/qa-logo-source-implementation-side-by-side.jpg`
- Logo page captures: `.design-reference/implementation-logo-suxin-top.png`, `.design-reference/implementation-logo-suxin-footer.png`

**Viewport and normalization**

- Desktop source: 1440 x 900 CSS px, DPR 1; source capture 1440 x 900 px.
- Desktop implementation: verified at 1440 x 900 CSS px; the in-app stage capture was normalized back to 1440 x 900 for the combined comparison.
- Mobile source: 390 x 844 CSS px, DPR 1; source capture 390 x 844 px.
- Mobile implementation: verified by browser read-back at 390 x 844 CSS px with no horizontal overflow. The in-app browser returned a 433 x 938 stage capture with the 390 x 844 page scaled inside it; the page region was cropped and normalized to 390 x 844 before comparison.
- State: Chinese landing page, page top, OpenAI protocol selected, mobile navigation closed.

**Full-view comparison evidence**

- Desktop: 76 px navigation, 900 px hero, pill at approximately y=120, title at approximately y=169, centered CTA/endpoint controls, model/client nodes, animated route paths, orange/blue hero field, and content width follow the source. The suxin brand and new-api destinations are intentional product substitutions.
- Mobile: fixed 58 px navigation, 390 px overflow-free content, hero pill/title/actions/endpoint order, animated title wrapping, compact route diagram, warm gradient crop, and six-item mobile menu follow the source.

**Focused region comparison evidence**

- Hero controls were checked at matched mobile CSS dimensions. Implementation read-back: pill y=316 px, title y=383 px, actions y=498 px, endpoint y=574 px.
- The revised GSAP title was checked at 390 x 844 CSS px: 39.975 px font size, 43.173 px line height, -0.48 px letter spacing, fixed 92 px title box, exactly two lines per frame, and zero horizontal overflow. The CTA and endpoint remain fixed at y=418 and y=477 while the title changes.
- Pricing cards, quick-start code area, routing tabs, discount filters/chart, ranking cards, FAQ accordion, footer, and final image banner were inspected in the browser during the long-page pass.
- Source assets are local files; no target-site asset is hotlinked.

**Required fidelity surfaces**

- Fonts and typography: Space Grotesk source font is bundled locally; PingFang/Microsoft YaHei/system fallbacks preserve CJK rendering. Display scale, heavy weight, tight leading, and mono data labels match the source hierarchy.
- Spacing and layout rhythm: desktop three-column card grids and mobile single-column stacks preserve the source's square cards, dashed dividers, wide section spacing, and fixed navigation. Browser read-back confirmed no mobile horizontal overflow.
- Colors and visual tokens: warm `#faf9f4` base, near-black ink, orange accent, blue/orange hero gradient, subtle borders, and restrained surfaces map to the source.
- Image quality and asset fidelity: the captured hero, payment, and closing artwork plus source font remain local at original quality. The supplied suxin logo is now isolated as optimized black and white transparent PNG assets.
- Logo replacement: the user-supplied 1254 x 1254 transparent PNG was alpha-cropped without redrawing, padded to a square, and downsampled to a sharp 512 x 512 transparent asset. A white-alpha-preserving variant is used on the dark footer background.
- Copy and content: visual structure follows the source while TeamoRouter copy, URLs, API key naming, and destinations are replaced with suxin/new-api equivalents.
- Icons: source model/client icons, key image, gift badge, overlapping trust avatars, Bolt mark, logo mark, and source-equivalent navigation icons are used locally. No target-site asset is hotlinked.

**Interaction and runtime checks**

- Tested: mobile menu open/close; exact top-navigation labels and href read-back; protocol dropdown and Base URL update; GSAP 3.15 title timeline with both title frames; reduced-motion branch; animated route canvas and seven route nodes; quick-start method/language tabs; code copy handler; routing tabs; provider filtering; model search/list selection; discount chart update; and five FAQ accordions.
- Scroll reveal pass: locally bundled ScrollTrigger 3.15 registers 12 major section timelines. Browser read-back verified every section reached `entered`/`entered-back`, off-screen sections reached `left`/`reset`, and pricing replayed to full opacity with an identity transform after reverse scrolling.
- Motion performance: section timelines animate only opacity and transforms, stagger small target groups, release `will-change` after completion, refresh after fonts/load, and provide a no-motion path for `prefers-reduced-motion`.
- Browser console errors/warnings: none.
- Static validation: `git diff --check` passed.

**Findings**

- No actionable P0, P1, or P2 mismatch remains.

**Follow-up polish**

- No remaining animation or logo follow-up is required for the current scope.

**Comparison history**

- Pass 1 found mobile quick-start content expanding the document width from 433 to 506 CSS px. Added explicit mobile overflow containment and `min-width: 0` for quick-start children.
- Pass 2 browser read-back confirmed document width equals viewport width at the mobile breakpoint, with all primary interactions working and no console errors.
- Detail pass 3 restored the source navigation labels and mapped them to working suxin/new-api destinations; replaced the simplified hero chips with source icons and an animated canvas route diagram; added trust avatars, the Bolt mark, the gift badge, and source-level copy.
- Detail pass 4 compared source and implementation at 1440 x 900 and 390 x 844. Browser read-back confirmed zero horizontal overflow, seven loaded route nodes, a valid OpenClaw asset, title-frame rotation, protocol switching, and routing-tab state updates.
- Title pass 5 found the selected hero heading too wide, with overly tight tracking and a basic timer-based transition. Replaced it with a locally bundled GSAP 3.15 timeline, reduced desktop tracking from roughly -2 px to -0.6 px, constrained desktop width to 405-444 px, and fixed the title box height so downstream controls do not move.
- Title pass 6 verified both exact source title strings appear during a 5.6-second observation window. Focused mobile comparison confirmed two-line wrapping for both frames, stable CTA/endpoint positions, and zero overflow; no actionable P0/P1/P2 title finding remains.
- Logo pass 7 replaced the previous mark in the navigation, routing hub, footer, and favicon. Browser read-back confirmed all three visible logo instances load at 512 x 512 natural resolution, the navigation renders at 25 x 25, the hub at 31 x 31, the footer at 27 x 27, and no image is broken.
- Motion pass 8 added a dedicated ScrollTrigger timeline to all 12 post-hero sections. Desktop browser traversal verified title-first/card-second rhythm, enter/leave/back-scroll replay behavior, no horizontal overflow, and a local ScrollTrigger 3.15 runtime. The existing hero title timeline remains independent so its two-frame loop is not restarted by page scrolling.
- Navigation pass 9 removed only the visible `suxin` wordmark beside the top-left logo. Browser read-back confirmed the navigation brand contains no text span, the logo remains loaded and linked to the page top, the footer wordmark is unchanged, and there is no horizontal overflow.
- GitHub Pages pass 10 added an explicit document-relative base so the same static build resolves assets correctly both at `/token-api/` and at a future custom-domain root. A parent-directory server simulation loaded the page at `/token-api/` with GSAP 3.15, ScrollTrigger 3.15, all 12 reveal groups, all images, fonts, scripts, and artwork present; no broken image or horizontal overflow was detected.
- Internationalization pass 11 added IP-country language selection plus a real six-language menu for Simplified Chinese, Traditional Chinese, English, Japanese, Russian, and Hindi. Browser checks switched through all six complete page translations with zero overflow, verified English/Russian/Hindi contain no residual Han text outside the intentionally untranslated code sample, and confirmed protocol selection, provider filtering, route tabs, active integration instructions, title animation, and persistent manual selection remain functional. A fresh-origin Pages-path test resolved the current public IP country as `US`, selected English from the IP mapping, loaded every local asset, and kept all 12 ScrollTrigger groups active.

final result: passed
