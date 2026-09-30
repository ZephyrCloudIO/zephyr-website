import WordmarkLight from '@/images/wordmark-light.svg';
import { cn } from '@/lib/utils';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { FADE } from '../../motion/tokens';
import { CTA } from '../model';
import { FilmStage } from './FilmStage';
import { SSR_WIDTH, stageLayout } from './layout';
import {
  CAPTIONS,
  captionsOf,
  chapterAt,
  cueIndexAt,
  CUTS,
  formatTime,
  stateAt,
  type Cut,
  type CutId,
} from './timeline';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** How dark the stage gets around a cut: a quick dip in, a slower lift out. */
function dipAt(cut: Cut, t: number) {
  let dip = 0;
  for (const cue of cut.cues) {
    if (!cue.cut) continue;
    const d = t - cue.at;
    if (d >= -0.18 && d < 0) dip = Math.max(dip, (d + 0.18) / 0.18);
    else if (d >= 0 && d <= 0.45) dip = Math.max(dip, 1 - d / 0.45);
  }
  return dip;
}

function sentences(caption: string): string[] {
  return caption.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()) ?? [];
}

type Phase = 'poster' | 'running' | 'ended';

interface ReleasePathFilmProps {
  /** Which edit to play. The blog embeds the 0:30 cut. */
  cut?: CutId;
  /**
   * Play, pause and chapter controls. Off only when rendering the film to video: then it starts on its first
   * frame instead of the poster, and plays without waiting to be scrolled into view.
   */
  controls?: boolean;
  className?: string;
}

/**
 * The companion film for "Build-time checks aren't enough": composition, exposure and acceptance
 * as three markers on one stage. Silent and captioned. Plays only while on screen, and never under
 * reduced motion unless the visitor presses play.
 */
export function ReleasePathFilm({ cut: cutId = '30', controls = true, className }: ReleasePathFilmProps) {
  const cut = CUTS[cutId];
  const startAt = controls ? cut.poster : 0;
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const onScreen = controls ? inView : true;

  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  const [frame, setFrame] = useState(() => stateAt(cut, startAt));
  const [chapter, setChapter] = useState(() => chapterAt(cut, startAt));
  const [phase, setPhase] = useState<Phase>('poster');
  const [userPaused, setUserPaused] = useState(false);
  /** Jump instead of animating: first paint, cuts, seeks and resizes. */
  const [instant, setInstant] = useState(true);
  const [width, setWidth] = useState(SSR_WIDTH);
  const [measured, setMeasured] = useState(false);

  const time = useRef(startAt);
  const cueIndex = useRef(cueIndexAt(cut, startAt));
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const clock = useRef<HTMLSpanElement>(null);
  const dip = useRef<HTMLDivElement>(null);
  const manualDip = useRef<number | null>(null);

  const layout = useMemo(() => stageLayout(width), [width]);
  const active = phase === 'running' && !userPaused;
  const playing = active && onScreen && measured;
  const still = instant || reduce === true;

  /** Progress, clock and dip are painted straight to the DOM every frame; React only renders on cues. */
  const paint = useCallback(
    (t: number) => {
      cut.chapters.forEach((item, i) => {
        const end = cut.chapters[i + 1]?.at ?? cut.duration;
        const progress = Math.min(1, Math.max(0, (t - item.at) / (end - item.at)));
        const el = fills.current[i];
        if (el) el.style.transform = `scaleX(${progress})`;
      });
      const text = clock.current?.firstChild;
      if (text) text.nodeValue = `${formatTime(t)} / ${formatTime(cut.duration)}`;
      if (dip.current) {
        let manual = 0;
        if (manualDip.current !== null) {
          manual = Math.max(0, 1 - (performance.now() - manualDip.current) / 450);
          if (manual === 0) manualDip.current = null;
        }
        dip.current.style.opacity = reduceRef.current ? '0' : String(Math.max(dipAt(cut, t), manual));
      }
    },
    [cut],
  );

  const seek = useCallback(
    (t: number, withDip = false) => {
      time.current = t;
      cueIndex.current = cueIndexAt(cut, t);
      setInstant(true);
      setFrame(stateAt(cut, t));
      setChapter(chapterAt(cut, t));
      if (withDip) manualDip.current = performance.now();
      requestAnimationFrame(() => paint(t));
    },
    [cut, paint],
  );

  useIsoLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // Hidden stages measure 0; keep the last real width.
    const measure = () => {
      if (el.clientWidth <= 0) return;
      setWidth(el.clientWidth);
      setInstant(true);
    };
    measure();
    setMeasured(true);
    paint(time.current);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [paint]);

  // Snap first, then animate from there on.
  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant, frame, width]);

  // Autoplay from the top the first time the film is on screen.
  useEffect(() => {
    if (phase !== 'poster' || reduce !== false || !measured || !onScreen || userPaused) return;
    seek(0, true);
    setPhase('running');
  }, [phase, reduce, measured, onScreen, userPaused, seek]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Clamp so a background tab doesn't skip beats when it comes back.
      const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      const t = Math.min(cut.duration, time.current + dt);
      time.current = t;
      const index = cueIndexAt(cut, t);
      if (index !== cueIndex.current) {
        const crossed = cut.cues.slice(cueIndex.current + 1, index + 1);
        cueIndex.current = index;
        if (crossed.some((cue) => cue.cut)) setInstant(true);
        setFrame(stateAt(cut, t));
      }
      setChapter(chapterAt(cut, t));
      paint(t);
      if (t >= cut.duration) {
        setPhase('ended');
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, cut, paint]);

  const toggle = () => {
    if (phase !== 'running') {
      seek(0, true);
      setPhase('running');
      setUserPaused(false);
      return;
    }
    setUserPaused((paused) => !paused);
  };

  /** A click lands where it was made inside the chapter; a keyboard press starts the chapter. */
  const selectChapter = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    const item = cut.chapters[index];
    const end = cut.chapters[index + 1]?.at ?? cut.duration;
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = event.detail === 0 ? 0 : Math.min(0.999, Math.max(0, (event.clientX - rect.left) / rect.width));
    seek(item.at + fraction * (end - item.at));
    if (phase !== 'running') setPhase('running');
  };

  const captions = useMemo(() => captionsOf(cut), [cut]);
  const lines = sentences(frame.caption);
  const ended = frame.scene === 'end';
  const lastChapter = cut.chapters.length - 1;

  return (
    <figure
      ref={rootRef}
      className={cn(
        'relative mt-0 mr-0 mb-12 ml-[calc(50%_-_min(50vw,32rem))] w-[min(100vw,64rem)] px-5 sm:px-8 lg:mb-14',
        className,
      )}
    >
      <div
        role="group"
        aria-roledescription="film"
        aria-label="Film: Build-time checks aren’t enough"
        data-paused={!playing || undefined}
      >
        <div className="film-body" data-measured={measured || undefined}>
          <div ref={stageRef} className="relative">
            <div aria-hidden translate="no" className="select-none">
              <FilmStage state={frame} layout={layout} still={still} />
            </div>
            <div ref={dip} aria-hidden className="pointer-events-none absolute inset-0 bg-night opacity-0" />
            <motion.div
              className={cn(
                'absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center',
                !ended && 'pointer-events-none',
              )}
              initial={false}
              animate={{ opacity: ended ? 1 : 0 }}
              transition={still ? { duration: 0 } : { ...FADE, duration: 0.6 }}
              inert={!ended}
              aria-hidden={!ended}
            >
              <img
                src={WordmarkLight}
                alt="Zephyr Cloud"
                width={175}
                height={31}
                className="h-auto w-[150px] sm:w-[175px]"
              />
              <p className="m-0 text-[1.625rem] leading-[1.1] font-semibold tracking-[-0.025em] text-balance text-ink sm:text-[2.5rem]">
                {CAPTIONS.end}
              </p>
              <a
                href={CTA.href}
                className="inline-flex h-10 items-center rounded-xl border border-line-strong px-4 text-sm text-ink-muted transition-colors hover:border-deployed/60 hover:text-ink"
              >
                {CTA.label}
              </a>
            </motion.div>
          </div>

          <div className="flex min-h-[4.25rem] items-start px-1 pt-1 sm:min-h-[5.25rem] sm:px-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={lines[0] ?? 'none'}
                className="m-0 text-[1.25rem] leading-[1.2] font-semibold tracking-[-0.02em] text-balance text-ink sm:text-[1.75rem]"
                initial={still ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={still ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -4, transition: FADE }}
                transition={FADE}
              >
                {lines.map((line, i) => (
                  <motion.span
                    key={`${i}-${line}`}
                    initial={still || i === 0 ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={FADE}
                  >
                    {i > 0 ? ' ' : ''}
                    {line}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {controls ? (
          <div className="flex items-center gap-3 px-1 pt-2 sm:gap-4 sm:px-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={active ? 'Pause film' : phase === 'ended' ? 'Replay film' : 'Play film'}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-deployed/60 focus-visible:ring-2 focus-visible:ring-released-ink"
            >
              {active ? (
                <Pause className="size-3.5" aria-hidden />
              ) : phase === 'ended' ? (
                <RotateCcw className="size-3.5" aria-hidden />
              ) : (
                <Play className="size-3.5 translate-x-px" aria-hidden />
              )}
            </button>
            <div role="group" aria-label="Chapters" className="flex min-w-0 flex-1 items-center gap-[3px]">
              {cut.chapters.map((item, i) => {
                const end = cut.chapters[i + 1]?.at ?? cut.duration;
                const progress = Math.min(1, Math.max(0, (time.current - item.at) / (end - item.at)));
                return (
                  <button
                    key={item.at}
                    type="button"
                    onClick={(event) => selectChapter(i, event)}
                    aria-label={`${formatTime(item.at)} ${item.label}`}
                    aria-current={i === chapter ? 'step' : undefined}
                    title={item.label}
                    data-at={item.at}
                    data-end={end}
                    className="group flex h-7 min-w-0 basis-0 items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-released-ink"
                    style={{ flexGrow: end - item.at }}
                  >
                    <span className="block h-[3px] w-full overflow-hidden rounded-full bg-line-strong transition-colors group-hover:bg-deployed/60">
                      <span
                        ref={(el) => {
                          fills.current[i] = el;
                        }}
                        className="block h-full w-full origin-left bg-ink"
                        style={{ transform: `scaleX(${progress})` }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="hidden w-28 shrink-0 truncate text-xs text-ink-faint md:block">
              {cut.chapters[chapter]?.label}
            </span>
            <span ref={clock} className="shrink-0 text-ident text-[0.75rem] text-ink-faint tabular-nums">
              {`${formatTime(time.current)} / ${formatTime(cut.duration)}`}
            </span>
          </div>
        ) : null}
      </div>

      {/* The stage is decorative, so this is the film's text alternative: captions plus what's on screen. */}
      <figcaption className="sr-only">
        <p>Transcript. The film is silent; the captions are its only words.</p>
        <ol>
          {cut.chapters.map((item, i) => {
            const end = cut.chapters[i + 1]?.at ?? cut.duration;
            const inChapter = captions.filter((c) => c.at >= item.at && c.at < end);
            const caption = inChapter[inChapter.length - 1]?.text ?? (i === lastChapter ? CAPTIONS.end : null);
            return (
              <li key={item.at}>
                {formatTime(item.at)}. {caption ? `${caption} ` : ''}
                {item.describe}
              </li>
            );
          })}
        </ol>
      </figcaption>
    </figure>
  );
}
