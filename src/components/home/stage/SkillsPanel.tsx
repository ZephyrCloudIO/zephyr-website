import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import { Panel } from './Panel';

// Skill names and coverage from the Zephyr Skills announcement; receipt fields
// from the create-zephyr-apps agent skill (success, template, failures, ...).
const ROWS: { kind: 'cmd' | 'out' | 'json'; text: string; note?: string }[] = [
  { kind: 'cmd', text: 'npx skills add https://github.com/ZephyrCloudIO/skills' },
  { kind: 'out', text: '✓ zephyr-core', note: 'with-zephyr setup, versions, tags, environments' },
  { kind: 'out', text: '✓ zephyr-module-federation', note: 'remotes, zephyr:dependencies, workspace:*' },
  { kind: 'cmd', text: 'npx create-zephyr-apps@latest ./apps/search --template react-rsbuild --no-git --json' },
  { kind: 'json', text: '{ "success": true, "template": "react-rsbuild", "failures": [] }' },
];

export const SKILLS_STEPS = ROWS.length;

/** What an agent runs to learn Zephyr, and the receipt it can verify. */
export function SkillsPanel({ step, className }: { step: number; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Panel title="search-agent · ~/acme" aside="example output" className={className}>
      <div className="grid gap-1.5 text-ident text-[0.76rem] leading-[1.55]">
        {ROWS.slice(0, step).map((row, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            className={cn('min-w-0', row.kind === 'cmd' && i > 0 && 'mt-2.5')}
          >
            {row.kind === 'cmd' ? (
              <p className="m-0 flex gap-2 text-ink">
                <span className="text-ink-faint">$</span>
                <span>{row.text}</span>
              </p>
            ) : row.kind === 'out' ? (
              <p className="m-0 flex min-w-0 gap-3 pl-4">
                <span className="shrink-0 text-ink-muted">{row.text}</span>
                <span className="truncate font-sans text-xs text-ink-faint">{row.note}</span>
              </p>
            ) : (
              <p className="m-0 truncate pl-4 text-deployed">{row.text}</p>
            )}
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}
