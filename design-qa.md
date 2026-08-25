**Source visual truth**

- Desktop capture: `.design-reference/source-desktop-00.png`
- Mobile capture: `.design-reference/source-mobile-top-00.png`
- Interaction captures: `.design-reference/source-desktop-protocol-open.png`, `.design-reference/source-desktop-quickstart-codex.png`, `.design-reference/source-desktop-routing-cost.png`, `.design-reference/source-desktop-live-anthropic.png`, `.design-reference/source-desktop-faq-open.png`, `.design-reference/source-mobile-menu-open.png`

**Implementation evidence**

- Desktop: `.design-reference/implementation-desktop-00.png`
- Mobile: `.design-reference/implementation-mobile-top-390x844.png`
- Normalized mobile: `.design-reference/implementation-mobile-normalized.png`
- Combined comparisons: `.design-reference/qa-desktop-side-by-side.png`, `.design-reference/qa-mobile-side-by-side.png`

**Viewport and normalization**

- Desktop source: 1440 x 900 CSS px, DPR 1; source capture 1440 x 900 px.
- Desktop implementation: browser-rendered at the desktop surface; raw capture 1422 x 800 px and normalized to 1440 x 900 for the combined comparison.
- Mobile source: 390 x 844 CSS px, DPR 1; source capture 390 x 844 px.
- Mobile implementation: verified by browser read-back at 390 x 844 CSS px with no horizontal overflow. The in-app browser returned a 433 x 938 stage capture with the 390 x 844 page scaled inside it; the page region was cropped and normalized to 390 x 844 before comparison.
- State: Chinese landing page, page top, OpenAI protocol selected, mobile navigation closed.

**Full-view comparison evidence**

- Desktop: navigation height, centered hero composition, warm paper background, orange/blue hero field, dark/light CTA pairing, endpoint control, square border language, and content width follow the source. The suxin brand and new-api destinations are intentional product substitutions.
- Mobile: fixed 58 px navigation, 390 px overflow-free content, hero pill/title/actions/endpoint order, title wrapping, warm gradient crop, and mobile menu behavior follow the source.

**Focused region comparison evidence**

- Hero controls were checked at matched mobile CSS dimensions. Implementation read-back: pill y=316 px, title y=383 px, actions y=498 px, endpoint y=574 px.
- Pricing cards, quick-start code area, routing tabs, discount filters/chart, ranking cards, FAQ accordion, footer, and final image banner were inspected in the browser during the long-page pass.
- Source assets are local files; no target-site asset is hotlinked.

**Required fidelity surfaces**

- Fonts and typography: Space Grotesk source font is bundled locally; PingFang/Microsoft YaHei/system fallbacks preserve CJK rendering. Display scale, heavy weight, tight leading, and mono data labels match the source hierarchy.
- Spacing and layout rhythm: desktop three-column card grids and mobile single-column stacks preserve the source's square cards, dashed dividers, wide section spacing, and fixed navigation. Browser read-back confirmed no mobile horizontal overflow.
- Colors and visual tokens: warm `#faf9f4` base, near-black ink, orange accent, blue/orange hero gradient, subtle borders, and restrained surfaces map to the source.
- Image quality and asset fidelity: the captured hero, payment, and closing artwork plus source font and logo mark are copied locally at original quality. The logo mark remains isolated for the planned later brand replacement.
- Copy and content: visual structure follows the source while TeamoRouter copy, URLs, API key naming, and destinations are replaced with suxin/new-api equivalents.
- Icons: the source logo mark is used locally. Controls that do not require a visual icon are text-labelled; no emoji or placeholder artwork is used.

**Interaction and runtime checks**

- Tested: mobile menu open/close, protocol dropdown and Base URL update, quick-start method/language tabs, code copy handler, routing tabs, provider filtering, model search/list selection, discount chart update, and FAQ accordion.
- Browser console errors/warnings: none.
- Static validation: `git diff --check` passed.

**Findings**

- No actionable P0, P1, or P2 mismatch remains.

**Follow-up polish**

- [P3] Replace `assets/teamo-style/logo-mark.svg` when the final suxin logo is ready; the layout already isolates the mark from the wordmark.

**Comparison history**

- Pass 1 found mobile quick-start content expanding the document width from 433 to 506 CSS px. Added explicit mobile overflow containment and `min-width: 0` for quick-start children.
- Pass 2 browser read-back confirmed document width equals viewport width at the mobile breakpoint, with all primary interactions working and no console errors.

final result: passed
