import { ArrowRight, Check, Mail } from 'lucide-react';
import { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HUBSPOT_PORTAL_ID = '46982563';
const HUBSPOT_FORM_ID = 'f1595bbd-95a2-4ee1-b7db-c8071152dc5b';

export function HubspotInlineForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'submitting' | 'success'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (state === 'submitting' || state === 'success') {
      return;
    }

    if (!EMAIL_RE.test(email.trim())) {
      setState('error');
      inputRef.current?.focus();
      return;
    }

    setState('submitting');

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ name: 'email', value: email.trim() }],
          }),
        },
      );

      if (!response.ok) {
        throw new Error('HubSpot submission failed');
      }

      setState('success');
    } catch {
      setState('error');
    }
  }

  const helperText = state === 'success' ? "You're in" : state === 'error' ? 'Please check your email' : '';

  const helperColor = state === 'success' ? 'text-emerald-400' : state === 'error' ? 'text-red-400' : 'text-[#7c3aed]';
  const isSuccess = state === 'success';
  const isSubmitting = state === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="flex h-full w-full flex-col justify-center gap-2 px-4 py-4 md:px-6">
      <p className={`min-h-4 text-center text-[11px] font-medium leading-4 tracking-[0.01em] ${helperColor}`}>
        {helperText}
      </p>

      {isSuccess ? (
        <div className="flex h-10 items-center gap-3 rounded-xl border border-emerald-400/30 bg-[linear-gradient(180deg,rgba(16,185,129,0.18)_0%,rgba(5,46,22,0.24)_100%)] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(16,185,129,0.12)]">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/16 text-emerald-300">
            <Check className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 text-left">
            <div className="text-sm font-medium leading-4 text-white">Signed up</div>
            <div className="truncate text-[11px] leading-4 text-emerald-200/80">We&apos;ll reach out soon</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="group relative flex h-10 min-w-0 flex-1 items-center rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition focus-within:border-[#7c3aed] focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_3px_rgba(124,58,237,0.14)]">
            <Mail className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-white/35 transition group-focus-within:text-[#c4b5fd]" />
            <input
              ref={inputRef}
              type="email"
              aria-label="Work email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (state !== 'idle') {
                  setState('idle');
                }
              }}
              placeholder="Work email"
              className="h-full min-w-0 flex-1 bg-transparent pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-[#9f67ff] bg-[linear-gradient(180deg,#8b5cf6_0%,#6d28d9_100%)] px-3.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_24px_rgba(124,58,237,0.26)] transition hover:brightness-110 disabled:opacity-70"
          >
            <span>{isSubmitting ? 'Submitting...' : 'Start now'}</span>
            <ArrowRight className={`h-3.5 w-3.5 transition ${isSubmitting ? '' : 'group-hover:translate-x-0.5'}`} />
          </button>
        </div>
      )}
    </form>
  );
}
