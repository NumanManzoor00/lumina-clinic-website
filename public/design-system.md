# Lumina Clinic design system

## Visual direction
A quiet healthcare interface with translucent glass panels layered over mint, pale blue and lilac light. Maintain readable content while making background color visible through surfaces. The dark theme uses deep green/blue foundations and mint actions.

## Tokens
| Token | Light | Dark |
| --- | --- | --- |
| Primary text | `#173f3b` | `#e0f2ed` |
| Secondary text | `#627974` | `#adc6bf` |
| Accent | `#176859` | `#9ddbc6` |
| Main action | Deep teal gradient, white text | Mint gradient, dark green text |
| Glass | Translucent white gradient | Translucent green/blue gradient |
| Border | Frosted white at medium opacity | Pale mint at low opacity |

## Glass material
- Main surfaces: translucent gradient, approximately 15–45% white in light mode.
- Backdrop filter: 28px blur and 155% saturation; header 32px blur.
- Thin frosted border, inset top highlight, diffuse outer shadow.
- Colored gradients and fixed orbs sit behind surfaces to make transparency visible.
- Light-theme fallback surfaces become opaque when backdrop-filter is unsupported.
- Keep photos opaque; use glass for the surrounding frame, badges and overlay cards.

## Type and spacing
Manrope headings, DM Sans body. Arabic and Chinese fall back to available system glyph fonts. Body line height is 1.6, descriptive text 1.9. Desktop hero scales up to 76px; mobile hero is approximately 59px. Secondary page titles scale to 39px on mobile. Arabic headings remove negative letter spacing and increase line height.

Content width is approximately 1216–1250px. Cards use 19–25px radii, controls 9–12px, pill badges full rounding. Base component padding is 24–32px. Three-column doctor/service grids become single columns on phones. Forms move from a two-column layout to one column. The preference bar remains above the main navigation.

## Components and behavior
- Shared translucent navigation with active page indication and mobile menu.
- Persistent language selector and light/dark toggle; accessible names and pressed state.
- Doctor image and name are links to a full profile. Each image displays a profile affordance.
- Service cards select a stable service ID through URL parameters.
- Booking fields have visible labels, native input types and required validation.
- Time buttons expose `aria-pressed`; selected buttons use a filled accent.
- Loading, empty, confirmation, network error and cancellation confirmation states are distinct.
- Appointment cards display localized dates and PKT times.

## Motion and interaction
Cards lift approximately 6px on hover. Images scale slightly within a clipped frame. Buttons use a 450ms sliding gradient color fill, reversing direction in RTL, plus short shadow transitions. Focus receives the same color treatment. Disabled buttons do not activate the slide. Keyboard focus uses a visible outline. Hover is supplemental: all functions use real links, buttons or form controls. Reduced-motion preferences disable animation and transitions.

## Halo hover material
The shared `HaloHover` client component decorates buttons, action links, navigation items, glass cards/panels, profile facts, step cards and the language control. A masked pseudo-element draws a thin light ring without covering content or intercepting clicks. On fine pointers the light follows the cursor using CSS custom properties updated at most once per animation frame. The same position is applied to enclosing glass surfaces, including the navbar.

Keyboard focus activates the halo while retaining the existing visible outline. Dark mode uses brighter mint light. Reduced-motion users receive a static halo and no pointer tracking. Touch users do not receive sticky hover animation. New appointment cards and confirmation panels are registered through a child-list observer. All listeners, observers and scheduled frames are cleaned up on unmount.

The supplied HaloProgress demo did not include its component implementation. This hover treatment is a matching halo-style interpretation, not an imported progress indicator. Existing sliding color fills remain on action buttons.

## Expandable controls
The language control is a custom glass disclosure with a translated accessible label, expanded state, selected-state checkmark, arrow-key navigation, Escape/outside-click closing, and trigger focus restoration on selection. Its panel uses a 400ms height/opacity/scale transition based on the supplied open/close demo. It is inert and hidden from assistive technology while closed.

Mobile navigation uses the same opening treatment. Theme changes animate the sun/moon icon; booking, profile, confirmation and cancel panels enter with a short scale/slide fade. Buttons lift on hover and compress on press. Navbar and language layers have explicit stacking order so open options stay above page cards. Existing halo and sliding-color materials are retained. Reduced-motion settings disable panel/icon animations.

## Organic card material
All clinic content cards use a shared `organic-card` class with softly asymmetric 30/18px corners. Hover gently reverses the corner pattern. Doctor imagery zooms within its clipped frame, service icons soften and rotate slightly, and text links open their arrow spacing. Directory/profile/appointment cards have a restrained cursor tilt capped at 1.6 degrees plus a 5px lift, sharing the existing delegated pointer loop rather than adding listeners per card.

Form, summary, confirmation and quick-book panels receive the corner/highlight treatment while their input controls remain stationary. RTL mirrors the corner shape. Reduced motion disables tilt, image scaling and transitions. Touch interactions retain the base material without pointer tilt. The supplied OrganicCardSmall snippet did not include its implementation, so this is an organic-style interpretation adapted to the clinic, preserving content and navigation.

## Dithered hero visual
The hero includes a configurable `HeroDithering` canvas behind its clinic photograph, using violet dots and mint/blue glass lighting. The dotted wave uses an ordered 4×4 Bayer threshold pattern with a five-pixel cell grid. It is decorative, never covers the clinic headline or action buttons, and reserves its entire layout footprint before loading.

Animation is capped at 20 draws per second, pauses when the tab is hidden or the visual leaves the viewport, and becomes static under reduced-motion preferences. A translated pause/play control is provided. Theme changes repaint the palette. RTL mirrors the photograph and control. All canvas observers, media listeners and animation frames are cleaned up. The original demo omitted its implementation; this is an adapted canvas interpretation, not a dependency on an unavailable shader component.

## Navbar control alignment
The header uses a three-column grid with a centered navigation group and consistent 44px action controls. Hover changes color, glow and background position without translating labels, icons or buttons. All navigation labels use the same font weight to avoid width changes. Long translated labels collapse into the mobile menu below 960px. The mobile header keeps the logo, booking action and menu button in fixed grid tracks, with compact sizing below 420px. Language/theme controls share a 40px height. RTL reverses the color slide while preserving alignment.

## Footer and three-dimensional brand mark
The footer uses one translucent organic shell with a booking call to action, prominent sculpted brand symbol, four information groups, and a quiet lower bar. Desktop columns become two columns on tablets and a stacked brand/CTA layout on phones. Labels remain translated in all four supported languages. Real navigation and documentation links are provided without fabricated social profiles or contact details.

`lumina-logo-3d.svg` extends the existing teal medical-cross identity with gradient bevels, a visible extruded side face, inset highlights, and a soft grounded shadow. `LogoMark` reuses this scalable vector in the navbar and footer; the larger footer version is 112px. This is a 3D-style vector illustration, not a WebGL model. Pointer hover gently straightens the symbol; reduced-motion settings disable the movement.

## Text containment and navigation cleanup
All content grids use shrinkable tracks and text-bearing flex children use zero minimum widths. Primary buttons wrap inside their containers; their text and icon are separate flex items. Long email addresses, names and translated labels wrap within appointment, profile and footer panels. Mobile headings scale with viewport width. Fixed overlays are constrained to their parent width.

Navbar links are plain text with a short active/hover underline. Card borders and halo pseudo-elements are explicitly disabled on these links; keyboard focus remains visible. Existing halo/sliding effects remain on actual action buttons and content cards. Visitor-facing storage jargon has been replaced with short demo explanations in every language.

## RTL
The document sets `dir=rtl` for Arabic. Text follows RTL flow, selected directional arrows are mirrored, floating overlays move to the opposite side, appointment dividers and spacing reverse, and mobile action margins are corrected. Brand lettering remains LTR. CSS media queries maintain the same primary task order.

## Content rules
Every profile and credential is illustrative and labeled accordingly. No fabricated reviews, real-world booking confirmations, or email delivery claims. Use sample details in the demo. All primary interface copy has four language equivalents.

## Review checklist
Check keyboard access, focus visibility, form errors, dark text readability, RTL panel flow, long translated labels, and 375/768/1440px layouts in a browser. Automated builds are not a substitute for browser visual verification.
