import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useId } from 'react';
import { FADE, SPRING_CARD, SPRING_MARKER } from '../../motion/tokens';
import { Avatar } from './Avatar';
import { personName, type Version } from './model';
import type { AuditEntry, EnvironmentName, RemoteApp, RemoteId } from './useProduct';

const CHIP_W = 34;
const CHIP_GAP = 5;
const GAP_W = 12;
const PILL_HALF = 34;

type ChipSlot = { kind: 'version'; version: Version } | { kind: 'gap' };

/** Newest three builds, keeping the loaded one in view if it has scrolled off. */
function chipSlots(versions: Version[], loaded: number): ChipSlot[] {
  const tail = versions.slice(-3);
  if (tail.some((v) => v.n === loaded)) return tail.map((version) => ({ kind: 'version', version }));
  const held = versions.find((v) => v.n === loaded);
  const rest = versions.slice(-2).map((version) => ({ kind: 'version' as const, version }));
  return held ? [{ kind: 'version', version: held }, { kind: 'gap' }, ...rest] : rest;
}

function VersionChips({ app, environment, active }: { app: RemoteApp; environment: EnvironmentName; active: boolean }) {
  const reduce = useReducedMotion();
  const loaded = app[environment];
  const slots = chipSlots(app.versions, loaded);
  const index = slots.findIndex((s) => s.kind === 'version' && s.version.n === loaded);
  const width = (slot: ChipSlot) => (slot.kind === 'gap' ? GAP_W : CHIP_W);
  const offsets = slots.map((_, i) => slots.slice(0, i).reduce((x, s) => x + width(s) + CHIP_GAP, 0));
  // The pill is wider than a chip; keep it inside the tile when it sits on the first one.
  const markerX = Math.max(PILL_HALF, index >= 0 ? offsets[index] + CHIP_W / 2 : 0);
  const rowWidth = offsets[offsets.length - 1] + width(slots[slots.length - 1]);

  return (
    <div className="relative h-[3.4rem] shrink-0" style={{ width: rowWidth }}>
      <div className="relative h-7">
        <AnimatePresence initial={false}>
          {slots.map((slot, i) =>
            slot.kind === 'gap' ? (
              <motion.span
                key="gap"
                aria-hidden
                className="absolute top-0 flex h-7 w-3 items-center justify-center text-[10px] text-ink-faint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: offsets[i] }}
                exit={{ opacity: 0 }}
                transition={reduce ? { duration: 0 } : FADE}
              >
                ···
              </motion.span>
            ) : (
              <motion.span
                key={slot.version.n}
                className={cn(
                  'absolute top-0 flex h-7 items-center justify-center rounded-md border text-ident text-[0.6875rem] transition-colors duration-300',
                  slot.version.n === loaded
                    ? 'border-released/80 bg-released/[0.14] text-released-ink'
                    : 'border-line-strong bg-surface text-ink-muted',
                )}
                style={{ width: CHIP_W }}
                initial={reduce ? false : { opacity: 0, x: offsets[i] + 14, y: -10 }}
                animate={{ opacity: 1, x: offsets[i], y: 0 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: offsets[i] - 14 }}
                transition={reduce ? { duration: 0 } : SPRING_CARD}
              >
                #{slot.version.n}
              </motion.span>
            ),
          )}
        </AnimatePresence>
        {active ? (
          <span
            className="absolute -top-1 -right-1 size-1.5 rounded-full bg-live motion-safe:animate-ping"
            aria-hidden
          />
        ) : null}
      </div>
      <motion.span
        className="absolute top-8 left-0 -translate-x-1/2 rounded-full bg-released px-1.5 py-0.5 text-ident text-[0.625rem] leading-none whitespace-nowrap text-white"
        initial={false}
        animate={{ x: markerX }}
        transition={reduce ? { duration: 0 } : SPRING_MARKER}
      >
        {environment}
      </motion.span>
    </div>
  );
}

function RemoteTile({
  app,
  environment,
  active,
  blocked,
  wide = false,
}: {
  app: RemoteApp;
  environment: EnvironmentName;
  active: boolean;
  blocked: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative h-full rounded-xl border bg-surface/70 px-3 pt-2.5 pb-1.5 transition-colors duration-300',
        blocked ? 'border-ink/60' : active ? 'border-deployed/60' : 'border-line-strong',
        wide && '@md:flex @md:items-start @md:justify-between @md:gap-4',
      )}
    >
      <AnimatePresence>
        {blocked ? (
          <motion.span
            className="absolute -top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-ink/40 bg-night px-2 py-0.5 text-[0.625rem] whitespace-nowrap text-ink-muted"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={FADE}
          >
            <Lock className="size-2.5" aria-hidden />
            production: members only
          </motion.span>
        ) : null}
      </AnimatePresence>
      <div className="mb-2 flex min-w-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="m-0 truncate text-ident text-[0.8125rem] text-ink">{app.id}</p>
          <p className="m-0 text-[0.6875rem] text-ink-faint">{app.team}</p>
        </div>
        <span className="flex shrink-0 -space-x-1" aria-label={`Owned by ${app.owners.map(personName).join(', ')}`}>
          {app.owners.map((id) => (
            <Avatar key={id} id={id} size={16} className="ring-2 ring-surface" />
          ))}
        </span>
      </div>
      <VersionChips app={app} environment={environment} active={active} />
    </div>
  );
}

function EnvironmentSwitch({
  value,
  onChange,
}: {
  value: EnvironmentName;
  onChange?: (value: EnvironmentName) => void;
}) {
  const reduce = useReducedMotion();
  const switchId = useId();
  return (
    <div
      role="radiogroup"
      aria-label="Environment"
      className="relative flex rounded-full border border-line-strong p-0.5"
    >
      {(['staging', 'production'] as const).map((env) => (
        <button
          key={env}
          type="button"
          role="radio"
          aria-checked={value === env}
          onClick={() => onChange?.(env)}
          className="relative rounded-full px-2.5 py-1 text-ident text-[0.6875rem] outline-none focus-visible:ring-2 focus-visible:ring-released-ink"
        >
          {value === env ? (
            <motion.span
              layoutId={`env-switch-${switchId}`}
              className="absolute inset-0 rounded-full bg-released"
              transition={reduce ? { duration: 0 } : SPRING_MARKER}
            />
          ) : null}
          <span className={cn('relative', value === env ? 'text-white' : 'text-ink-faint')}>{env}</span>
        </button>
      ))}
    </div>
  );
}

interface ProductSceneProps {
  shell: RemoteApp;
  remotes: RemoteApp[];
  environment: EnvironmentName;
  onEnvironment?: (value: EnvironmentName) => void;
  audit: AuditEntry[];
  active: RemoteId | null;
  blocked: RemoteId | null;
  focus: 'split' | 'environments' | 'guardrails';
}

/** One product, many owners: the shell loads each remote at the version its environment points to. */
export function ProductScene({
  shell,
  remotes,
  environment,
  onEnvironment,
  audit,
  active,
  blocked,
  focus,
}: ProductSceneProps) {
  const reduce = useReducedMotion();

  return (
    <div className="@container flex h-full flex-col gap-3">
      <div className="rounded-2xl border border-line-strong bg-[#0a0c11] p-3">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="m-0 text-ident text-ink-faint">
            <span className="text-ink-muted">shop.acme</span> · one product
          </p>
          <EnvironmentSwitch value={environment} onChange={onEnvironment} />
        </div>
        {/* Phones: a 2 x 2 grid of equal tiles. Wider: the shell spans the top, its three remotes below. */}
        <div className="grid grid-cols-1 gap-2.5 @min-[20.5rem]:grid-cols-2 @md:grid-cols-3">
          <div className="@md:col-span-3">
            <RemoteTile app={shell} environment={environment} active={active === 'shell'} blocked={false} wide />
          </div>
          {remotes.map((app) => (
            <RemoteTile
              key={app.id}
              app={app}
              environment={environment}
              active={active === app.id}
              blocked={blocked === app.id}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          'rounded-xl border border-line bg-surface/60 px-3.5 py-3 transition-opacity duration-500',
          focus === 'split' && 'opacity-60',
        )}
      >
        <p className="m-0 mb-2 text-ident text-[0.6875rem] text-ink-faint">shell.shop.acme@{environment} loads</p>
        <ul className="m-0 grid list-none gap-1 p-0 text-ident text-[0.72rem]">
          {remotes.map((app) => (
            <li key={app.id} className="flex min-w-0 items-center gap-3">
              <span className="w-16 shrink-0 text-ink-muted">{app.id}</span>
              <span className="min-w-0 flex-1 truncate text-ink-faint">
                zephyr:{app.id}.shop.acme@{environment}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${environment}-${app[environment]}`}
                  className="shrink-0 text-released-ink"
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -4 }}
                  transition={FADE}
                >
                  #{app[environment]}
                </motion.span>
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          'rounded-xl border border-line bg-surface/60 px-3.5 py-3 transition-opacity duration-500',
          focus !== 'guardrails' && 'opacity-60',
        )}
      >
        <p className="m-0 mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-ink-faint">
          <span className="flex items-center gap-1.5 text-ink-muted">
            <Lock className="size-3" aria-hidden />
            <span className="text-ident">production</span> is protected: members only
          </span>
          <span>Roles: owner, admin, editor, viewer</span>
        </p>
        <ul className="m-0 grid list-none gap-1.5 p-0" aria-label="Audit log">
          <AnimatePresence initial={false}>
            {audit.map((entry) => (
              <motion.li
                key={entry.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={FADE}
                className="flex min-w-0 items-center gap-2 text-[0.75rem] text-ink-muted"
              >
                <Avatar id={entry.who} size={16} />
                <span className="truncate">
                  <span className="text-ink">{personName(entry.who)}</span> {entry.text}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
