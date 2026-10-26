---
title: Design system
summary: Tokens, type, layout, components and motion rules for the site, plus how the home page story works.
read_when:
  - building or restyling any page or component
  - adding motion, a home page beat, or a new stage scene
  - writing marketing copy that makes product claims
---

# Design system

The site is always dark. Brand colors stay black, violet `#7C3AED` and white; everything else is tuned around them.

## Color carries meaning

Use color for what something _is_, not for decoration.

| Token (CSS / Tailwind)               | Value         | Means                                                    |
| ------------------------------------ | ------------- | -------------------------------------------------------- |
| `--ze-released` / `released`         | `#7c3aed`     | What users are served; the primary action (one per view) |
| `--ze-released-ink` / `released-ink` | `#b69dff`     | Violet text on dark (contrast-safe)                      |
| `--ze-deployed` / `deployed`         | `#8a90a6`     | Deployed but not released; tags; structure               |
| `--ze-live` / `live`                 | `#34d399`     | Live status dots only                                    |
| `--ze-fault` / `fault`               | `#fb7185`     | A reported bad release only                              |
| `--ze-night` / `night`               | `#07080c`     | Page background                                          |
| `surface`, `surface-2`, `surface-3`  | `#0d0f15`...  | Cards, raised cards, hover/selected                      |
| `line`, `line-strong`                | ink @ 8%, 16% | Borders and dividers                                     |
| `ink`, `ink-muted`, `ink-faint`      | `#edeef3`...  | Primary, secondary, tertiary text                        |

Rules:

- No ambient glows, gradient blobs or circuit backgrounds. Depth comes from surfaces and borders.
- Don't use raw Tailwind palette colors (`neutral-*`, `violet-*`, `emerald-*`) in new code; use the tokens above.
- shadcn primitives (`src/components/ui`) read the same tokens through `--primary`, `--card`, `--border` and friends.

## Type

Fonts are self-hosted (the CSP blocks third-party stylesheets): Inter Variable with optical sizing, and Chivo Mono.

| Utility         | Use                                                                   |
| --------------- | --------------------------------------------------------------------- |
| `text-display`  | The one H1 per page                                                   |
| `text-headline` | Section H2s                                                           |
| `text-title`    | Card titles, H3s                                                      |
| `text-lead`     | Intro paragraph under a headline                                      |
| `text-ident`    | Literal product identifiers only: `production`, `#42`, URLs, commands |

- Eyebrows are sentence case in Inter (`text-sm text-ink-faint`), never uppercase mono.
- Headlines are sentence case and end with a period when they're a statement.
- Mono is reserved for things a user would type or see in the product. It encodes "this is real".

## Layout

- Page container: `mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10`. Reading-width pages (legal, articles) use `max-w-3xl`.
- Sections: `border-t border-line py-24 lg:py-32`, with an eyebrow + `text-headline` header and `mt-12`–`mt-16` before content.
- Cards: `rounded-2xl border border-line bg-surface/70 p-5`–`p-6`; hover raises the border to `line-strong`.
- Buttons: prefer `Button` from `src/components/ui/button.tsx` (`size="lg"` for page CTAs; `variant="outline"` for secondary, with `asChild` for links). Equivalent classes: primary `h-11 rounded-xl bg-released px-5 text-white hover:bg-[#8b4df5]`; secondary `border border-line-strong text-ink-muted hover:text-ink`.
- Commands: `CommandChip` (`src/components/home/CommandChip.tsx`), with `wrap` for long commands.
- External links: `target="_blank" rel="noopener"` (no `noreferrer`).
- Focus: global `:focus-visible` outline in `released-ink`; keep it visible.

## Motion

Motion explains the product; it isn't decoration.

- Vocabulary (`src/components/motion/tokens.ts`): markers move on springs (`SPRING_MARKER`), cards land with `SPRING_CARD`, panels fade (`FADE`), scenes and the camera ease (`SCENE`, `EASE_IN_OUT`). Nothing bounces for show.
- Scroll reveals: add `className="reveal"` (optionally `style={{ '--reveal-delay': '80ms' }}`). A pre-paint head script enables them only when JS runs, and `MotionReveal` falls back to visible, so text is never hidden for crawlers or no-JS visitors. Don't SSR text with `opacity: 0` through motion props.
- Respect `prefers-reduced-motion` everywhere: `useReducedMotion()` in components, and CSS media queries for keyframes.
- Loops only run while visible (`useInView`) and stop when a visitor takes over.

## Home page story

`src/components/home/story/HomeStory.tsx` is a scrollytelling layout: copy beats scroll on the left, and one `Stage` stays pinned on the right (desktop) and switches with the beat crossing the viewport center.

Below `lg`, each chapter gets one inline `Stage` instead of one per beat. Its beats become tabs (`StepTabs`) that auto-advance while the figure is on screen (each step's `dwell`), stop for good once the visitor picks a tab or plays with the demo, and never run under reduced motion. The step copy stacks in one grid cell (`.story-panels` in `src/index.css`), so switching steps never moves the page; without JS every step shows in order and the tabs are hidden. Each chapter's figure starts at a later `epoch`, so consecutive figures don't open on the same builds.

- Beats and levels live in `src/components/home/stage/Stage.tsx` (`BeatId`, `BEAT_LEVEL`). The camera only pulls back: level 0–1 is one app, 2 the product (`ProductScene`), 3 clouds (`CloudsScene`), 4 the full stack (`StackScene`). Views zoom about `FOCAL` points so each one reads as part of the next.
- Each beat has a script in the director effect: cancellable sleeps (`useSequencer`), state changes on the rail (`useDeployRail`) or product (`useProduct`), and a coherent static state for reduced motion and SSR.
- To add a beat: add the id to `BeatId` and `BEAT_LEVEL`, give it a script and panel, and add a step (label, dwell, copy) to its chapter in `CHAPTERS` in `HomeStory.tsx`.
- Layout rules for phones: anything a stage measures (`DeployRail`, `useElementWidth`) must start from a width that fits a phone, because the server-rendered layout is what iOS Safari sizes the page from. The layout wrapper clips horizontal overflow (`overflow-x: clip`, never `hidden`, which breaks sticky).
- Demo data mirrors real shapes: `<app>.<project>.<org>#<buildId>`, version, tag (`t-<tag>-…`) and environment hosts, and the plugin's `ZEPHYR` log format. Numbers are illustrative and labelled "example output".

## Release path film and figures

`src/components/release-path/` holds the companion pieces for the "Build-time checks aren't enough" post: a captioned, silent film (`film/ReleasePathFilm.tsx`) and two static figures (`SnapshotFigure`, `LifecycleFigure`). They share `AppVersionCard` (one app at one numbered version), `SnapshotFrame` (a lockable frame around the versions that run together) and `AcceptanceChip` (`Unmerged` → `Review` → `Accepted`).

- `film/timeline.ts` is the edit list: three cuts (1:30, 0:30, 0:15), each a list of timed cues. The frame at any time is every cue up to it applied in order, so playback, chapter jumps and scrubbing land on the same picture. Change copy in `CAPTIONS`, timing in the cues. The blog embeds the 0:30 cut; the other two are rendered to video from the same file.
- Three ideas stay on screen once the snapshot is named, each on its own clock: composition (the frame), exposure (the `ordinary users` pointer on the track) and acceptance (the chip). Full traffic can sit next to `Unmerged`; don't tie the chip to the pointer.
- Rollback is the pointer moving back to the previous snapshot. Alternate paths ("If a check fails") are tagged, then the main path resumes with a `cut` cue.
- "Snapshot" is an informal word for a set of versions held still, not a product noun. Don't label the frame Project, Environment or Tag. Percentages and outcome numbers are illustrative, and outcome cards never collapse "composition held" and "intended outcome" into one success tile.
- The stage is decorative (`aria-hidden`); the film's text alternative is its screen-reader transcript. It autoplays only while on screen, never under reduced motion, and `data-paused` freezes its CSS loops like the home stage.

## Claims

The code in the product repos is the source of truth for what the site says.

- Say what the code does: "no rebuild, no re-upload" rather than "instant"; releases "reach users as fast as each edge's cache allows".
- Mark integrations their own READMEs call WIP or beta (Rolldown, Vinext) as beta.
- Don't list providers or features that aren't implemented (no Vercel, Azure or GCP until they ship).
- Research or not-yet-available pages carry a clear "Research preview" label.
- Pricing plan lists are business copy owned by the team and stay as written unless they change them.
