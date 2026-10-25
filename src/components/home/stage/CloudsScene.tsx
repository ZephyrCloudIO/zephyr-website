import akamai from '@/images/clouds/akamai_white.webp';
import aws from '@/images/clouds/aws_white.webp';
import cloudflare from '@/images/clouds/cloudflare_white.webp';
import fastly from '@/images/clouds/fastly_white.webp';
import zephyr from '@/images/logo-light.svg';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE_IN_OUT, FADE, SPRING_MARKER } from '../../motion/tokens';
import { useElementWidth } from './useElementWidth';

// Integrations as the dashboard offers them: the managed default ("Zephyr Cloud", on Cloudflare)
// or your own account on Cloudflare, AWS, Fastly or Akamai; Kubernetes on Enterprise.
export type CloudId = 'zephyr' | 'cloudflare' | 'aws' | 'fastly' | 'akamai';

export const CLOUDS: Record<CloudId, { name: string; logo: string; detail: string }> = {
  zephyr: { name: 'Zephyr Cloud', logo: zephyr, detail: 'managed, runs on Cloudflare' },
  cloudflare: { name: 'Cloudflare', logo: cloudflare, detail: 'Workers + KV, your account' },
  aws: { name: 'AWS', logo: aws, detail: 'CloudFront + Lambda@Edge' },
  fastly: { name: 'Fastly', logo: fastly, detail: 'Compute' },
  akamai: { name: 'Akamai', logo: akamai, detail: 'EdgeWorkers + EdgeKV' },
};

export type CloudEnvName = 'staging' | 'production' | 'production-eu';

export interface CloudEnv {
  env: CloudEnvName;
  cloud: CloudId;
  /** Build this environment serves; null right after a cloud switch, until the next build lands there. */
  n: number | null;
}

export interface CloudUpload {
  n: number;
  phase: 'upload' | 'done';
  /** Files each environment's edge was missing for this build. */
  files: Partial<Record<CloudEnvName, number>>;
}

const ROW_H = 76;
const ROW_GAP = 12;

function Logo({ cloud, className }: { cloud: CloudId; className?: string }) {
  return (
    <img
      src={CLOUDS[cloud].logo}
      alt=""
      height={20}
      className={cn('max-h-5 w-auto max-w-[3.5rem] object-contain', className)}
      loading="lazy"
      decoding="async"
    />
  );
}

/** Miniature of the product view it zoomed out of. */
function ProductBlock({ pulse }: { pulse: boolean }) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-[#0a0c11] p-2.5 transition-colors duration-500',
        pulse ? 'border-deployed/70' : 'border-line-strong',
      )}
    >
      <p className="m-0 mb-2 text-ident text-[0.6875rem] text-ink-muted">shop.acme</p>
      <div className="grid gap-1.5">
        <div className="flex h-6 items-center justify-between rounded-md border border-line-strong bg-surface px-1.5">
          <span className="text-ident text-[0.5625rem] text-ink-faint">shell</span>
          <span className="size-1.5 rounded-full bg-released" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {['checkout', 'catalog', 'search'].map((id) => (
            <div
              key={id}
              className="flex h-9 flex-col justify-between rounded-md border border-line-strong bg-surface p-1"
            >
              <span className="truncate text-ident text-[0.5rem] text-ink-faint">{id}</span>
              <span className="size-1.5 rounded-full bg-released" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CloudsSceneProps {
  envs: CloudEnv[];
  upload: CloudUpload | null;
  /** Environment whose cloud setting just changed. */
  switched: CloudEnvName | null;
  focus: 'deploy' | 'release' | 'switch';
}

/** One build fans out to every environment's edge; each environment releases on its own. */
export function CloudsScene({ envs, upload, switched, focus }: CloudsSceneProps) {
  const reduce = useReducedMotion();
  const [gutterRef, gutterW] = useElementWidth<HTMLDivElement>(96);
  const listH = envs.length * ROW_H + (envs.length - 1) * ROW_GAP;
  const centers = envs.map((_, i) => i * (ROW_H + ROW_GAP) + ROW_H / 2);
  const uploading = upload?.phase === 'upload';

  return (
    <div className="@container flex h-full flex-col gap-3">
      <div className="rounded-2xl border border-line-strong bg-[#0a0c11]/60 p-4">
        <p className="m-0 mb-4 text-ident text-[0.6875rem] text-ink-faint">
          <span className="text-ink-muted">shop.acme</span> · 3 environments on 3 clouds
        </p>

        <div className="grid grid-cols-1 gap-3 @md:grid-cols-[minmax(0,9.5rem)_minmax(2.5rem,1fr)_minmax(0,15rem)] @md:items-center @md:gap-0">
          <ProductBlock pulse={uploading} />

          <div ref={gutterRef} aria-hidden className="hidden w-full @md:block" style={{ height: listH }}>
            <svg width={gutterW} height={listH} viewBox={`0 0 ${gutterW} ${listH}`} className="block overflow-visible">
              {centers.map((y, i) => {
                // Real pixels (measured width) so pathLength draws each beam all the way to its edge.
                const d = `M 0 ${listH / 2} C ${gutterW * 0.55} ${listH / 2}, ${gutterW * 0.45} ${y}, ${gutterW} ${y}`;
                const hot = Boolean(upload && upload.files[envs[i].env] !== undefined);
                return (
                  <g key={envs[i].env}>
                    <path d={d} fill="none" stroke="var(--ze-line-strong)" strokeWidth={1} />
                    {hot ? (
                      <motion.path
                        key={`${upload?.n}-${envs[i].cloud}`}
                        d={d}
                        fill="none"
                        stroke="var(--ze-deployed)"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        initial={reduce ? false : { pathLength: 0, opacity: 1 }}
                        animate={{ pathLength: 1, opacity: uploading ? 1 : 0.35 }}
                        transition={{
                          pathLength: { duration: 1.1, ease: EASE_IN_OUT, delay: i * 0.08 },
                          opacity: FADE,
                        }}
                      />
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>

          <ul className="m-0 grid list-none p-0" style={{ gap: ROW_GAP }}>
            {envs.map((row) => {
              const files = upload?.files[row.env];
              return (
                <li
                  key={row.env}
                  className={cn(
                    'relative flex flex-col justify-center rounded-xl border bg-surface/80 px-3 transition-colors duration-300',
                    switched === row.env ? 'border-ink/60' : 'border-line-strong',
                  )}
                  style={{ height: ROW_H }}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={row.cloud}
                        className="flex w-14 shrink-0 items-center justify-center"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
                        transition={FADE}
                      >
                        <Logo cloud={row.cloud} />
                      </motion.span>
                    </AnimatePresence>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate text-[0.8125rem] text-ink">{CLOUDS[row.cloud].name}</p>
                      <p className="m-0 truncate text-ident text-[0.6875rem] text-ink-faint">{row.env}</p>
                    </div>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={row.n ?? 'none'}
                        className={cn(
                          'shrink-0 rounded-md border px-1.5 py-0.5 text-ident text-[0.6875rem]',
                          row.n === null
                            ? 'border-line-strong text-ink-faint'
                            : 'border-released/80 bg-released/[0.14] text-released-ink',
                        )}
                        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.7 }}
                        transition={SPRING_MARKER}
                      >
                        {row.n === null ? 'next build' : `#${row.n}`}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="m-0 mt-1 min-h-4 pl-[4.125rem] text-[0.6875rem] text-ink-faint">
                    {upload && files !== undefined ? (
                      uploading ? (
                        <span className="motion-safe:animate-pulse">
                          uploading {files} {files === 1 ? 'file' : 'files'}…
                        </span>
                      ) : (
                        <span className="text-deployed">#{upload.n} is on this edge</span>
                      )
                    ) : switched === row.env ? (
                      <span className="text-ink-muted">cloud changed in settings</span>
                    ) : (
                      CLOUDS[row.cloud].detail
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={cn(
          'rounded-xl border border-line bg-surface/60 px-3.5 py-3 transition-opacity duration-500',
          focus === 'deploy' && 'opacity-70',
        )}
      >
        <p className="m-0 mb-2.5 text-[0.6875rem] text-ink-faint">Point any environment at</p>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-3 p-0">
          {(Object.keys(CLOUDS) as CloudId[]).map((id) => (
            <li key={id} className="flex items-center gap-2 text-xs text-ink-muted">
              <Logo cloud={id} className="max-h-4 max-w-[2.75rem] opacity-80" />
              {CLOUDS[id].name}
            </li>
          ))}
          <li className="text-xs text-ink-faint">Kubernetes on Enterprise</li>
        </ul>
      </div>

      <p className="m-0 px-1 text-[0.6875rem] leading-snug text-ink-faint">
        Releases reach users as fast as each edge’s cache allows.
      </p>
    </div>
  );
}
