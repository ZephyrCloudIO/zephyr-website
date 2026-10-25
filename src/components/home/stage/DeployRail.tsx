import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FADE, SPRING_CARD } from '../../motion/tokens';
import { environmentHost, personName, YOU, type Version } from './model';
import { ReleaseMarker } from './ReleaseMarker';
import type { RailEvent } from './useDeployRail';
import { VersionCard } from './VersionCard';

const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect;

const CARD_GAP = 10;
const GAP_SLOT = 26;
const CARD_H = 76;
const ENV_ROW = 36;
const TAG_ROW = 30;

type Slot = { kind: 'version'; version: Version } | { kind: 'gap' };

/** Newest builds, plus the released build pinned on the left if it has scrolled off. */
function visibleSlots(versions: Version[], production: number, count: number): Slot[] {
  const tail = versions.slice(-count);
  if (tail.some((v) => v.n === production)) return tail.map((version) => ({ kind: 'version', version }));
  const released = versions.find((v) => v.n === production);
  const rest = versions.slice(-(count - 1)).map((version) => ({ kind: 'version' as const, version }));
  return released ? [{ kind: 'version', version: released }, { kind: 'gap' }, ...rest] : rest;
}

interface DeployRailProps {
  versions: Version[];
  production: number;
  /** Who last released; rides on the environment marker. */
  releasedBy?: string;
  /** A tag that follows builds on its own (e.g. `latest`, `ai`). Hidden when null. */
  tag?: { label: string; n: number | null } | null;
  lastEvent?: RailEvent | null;
  onRelease?: (n: number) => void;
  interactive?: boolean;
  dim?: boolean;
  faultN?: number | null;
  slots?: number;
  environment?: string;
  /** Width assumed until the track is measured. Must fit the container, or the SSR layout overflows it. */
  initialWidth?: number;
  className?: string;
}

export function DeployRail({
  versions,
  production,
  releasedBy,
  tag = null,
  lastEvent,
  onRelease,
  interactive = false,
  dim = false,
  faultN,
  slots = 4,
  environment = 'production',
  initialWidth = 320,
  className,
}: DeployRailProps) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);
  // SSR guesses the width; the first real measurement snaps into place instead of animating.
  const [measured, setMeasured] = useState(false);

  useIsoLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Hidden tracks (display: none) measure 0; keep the last real width instead.
    const measure = () => {
      if (el.clientWidth > 0) setWidth(el.clientWidth);
    };
    measure();
    const frame = requestAnimationFrame(() => setMeasured(true));
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const still = reduce || !measured;

  // Narrow rails (phones) show one fewer build so cards stay legible.
  const slotCount = width < 420 ? Math.min(slots, 3) : slots;

  const layout = useMemo(() => {
    const items = visibleSlots(versions, production, slotCount);
    const hasGap = items.some((item) => item.kind === 'gap');
    const cardCount = items.filter((item) => item.kind === 'version').length;
    const cardW = Math.max(64, (width - (items.length - 1) * CARD_GAP - (hasGap ? GAP_SLOT : 0)) / cardCount);
    let x = 0;
    const placed = items.map((item) => {
      const w = item.kind === 'gap' ? GAP_SLOT : cardW;
      const entry = { ...item, x, w };
      x += w + CARD_GAP;
      return entry;
    });
    const centerOf = (n: number) => {
      const hit = placed.find((p) => p.kind === 'version' && p.version.n === n);
      return hit ? hit.x + hit.w / 2 : null;
    };
    const cards = placed.filter(
      (p): p is (typeof placed)[number] & { kind: 'version'; version: Version } => p.kind === 'version',
    );
    return { placed, cards, cardW, centerOf };
  }, [versions, production, slotCount, width]);

  const productionX = layout.centerOf(production) ?? 0;
  const tagX = tag && tag.n !== null ? layout.centerOf(tag.n) : null;
  const showTag = tagX !== null;
  const firstX = layout.cards[0] ? layout.cards[0].x + layout.cards[0].w / 2 : 0;
  const lastCard = layout.cards[layout.cards.length - 1];
  const lastX = lastCard ? lastCard.x + lastCard.w / 2 : 0;

  const nearestTo = (x: number) =>
    layout.cards.reduce((best, card) =>
      Math.abs(card.x + card.w / 2 - x) < Math.abs(best.x + best.w / 2 - x) ? card : best,
    );

  const step = (direction: -1 | 1 | 'first' | 'last') => {
    if (!onRelease || layout.cards.length === 0) return;
    const index = layout.cards.findIndex((c) => c.version.n === production);
    const target =
      direction === 'first'
        ? layout.cards[0]
        : direction === 'last'
          ? layout.cards[layout.cards.length - 1]
          : layout.cards[Math.min(layout.cards.length - 1, Math.max(0, index + direction))];
    onRelease(target.version.n);
  };

  // The tag row is always reserved so the rail never shifts when a tag appears.
  const markerArea = ENV_ROW + TAG_ROW;
  const status = describe(lastEvent, production, environment);

  return (
    <div className={cn('relative', className)}>
      <div ref={trackRef} className="relative" style={{ height: markerArea + CARD_H }}>
        <ReleaseMarker
          className={showTag ? undefined : 'top-[14px]'}
          instant={still}
          label={environment}
          actor={releasedBy}
          targetX={productionX}
          dragRange={interactive && onRelease ? { min: firstX, max: lastX } : undefined}
          onDropAt={(x) => onRelease?.(nearestTo(x).version.n)}
          onStep={interactive ? step : undefined}
          valueText={`${environment} serves build #${production}`}
        />

        <AnimatePresence initial={false}>
          {tag && tagX !== null ? (
            <motion.div
              key={tag.label}
              className="absolute left-0"
              style={{ top: ENV_ROW }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE}
            >
              <ReleaseMarker label={tag.label} variant="tag" targetX={tagX} instant={still} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="absolute inset-x-0" style={{ top: markerArea, height: CARD_H }}>
          <AnimatePresence initial={false}>
            {layout.placed.map((slot) =>
              slot.kind === 'gap' ? (
                <motion.div
                  key="gap"
                  className="absolute top-0 flex h-full items-center justify-center text-ident text-ink-faint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: slot.x, width: slot.w }}
                  exit={{ opacity: 0 }}
                  transition={still ? { duration: 0 } : FADE}
                  aria-hidden
                >
                  ···
                </motion.div>
              ) : (
                <motion.div
                  key={slot.version.n}
                  className="absolute top-0 h-full"
                  initial={still ? false : { opacity: 0, x: slot.x + 24, y: -44, scale: 0.94, width: slot.w }}
                  animate={{ opacity: 1, x: slot.x, y: 0, scale: 1, width: slot.w }}
                  exit={
                    reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: slot.x - 28, scale: 0.96 }
                  }
                  transition={still ? { duration: 0 } : SPRING_CARD}
                >
                  <VersionCard
                    version={slot.version}
                    released={slot.version.n === production}
                    fault={slot.version.n === faultN}
                    dim={dim}
                    environment={environment}
                    onRelease={interactive && onRelease ? () => onRelease(slot.version.n) : undefined}
                  />
                </motion.div>
              ),
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex min-h-11 flex-col gap-1">
        <p className="flex min-w-0 items-center gap-2 text-ident text-ink-muted">
          <span className="truncate">{environmentHost(environment)}</span>
          <span aria-hidden className="text-ink-faint">
            →
          </span>
          <span className="shrink-0 text-released-ink">#{production}</span>
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={status.key}
            className={cn('text-sm', status.tone === 'fault' ? 'text-fault' : 'text-ink-faint')}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -4 }}
            transition={FADE}
          >
            {status.text}
          </motion.p>
        </AnimatePresence>
        {/* Announce only what the visitor did; autoplay would otherwise narrate endlessly. */}
        <p className="sr-only" aria-live="polite">
          {lastEvent?.by === YOU ? status.text : ''}
        </p>
      </div>
    </div>
  );
}

interface RailStatus {
  key: string;
  tone: 'muted' | 'fault';
  text: string;
}

function describe(event: RailEvent | null | undefined, production: number, environment: string): RailStatus {
  if (!event) {
    return { key: 'idle', tone: 'muted', text: `Every build stays live at its own URL.` };
  }
  const who = personName(event.by);
  if (event.type === 'reported') {
    return { key: `f${event.n}`, tone: 'fault', text: `${who} reported #${event.n}: ${event.note}.` };
  }
  if (event.type === 'deployed') {
    return {
      key: `d${event.n}`,
      tone: 'muted',
      text: `${who} deployed #${event.n} from ${event.branch}. ${environment} still serves #${production}.`,
    };
  }
  return {
    key: `r${event.n}-${event.from}`,
    tone: 'muted',
    text: event.rollback
      ? `${who} rolled back to #${event.n}. No rebuild, no re-upload.`
      : `${who} released #${event.n} to ${environment}. No rebuild, no re-upload.`,
  };
}
