import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HUBSPOT_PORTAL_ID = '46982563';
const HUBSPOT_FORM_ID = 'f1595bbd-95a2-4ee1-b7db-c8071152dc5b';
const webMcpFormAttributes: Record<string, string> = {
  'tool-name': 'request_early_access',
  'tool-description': 'Submit a work email to request Zephyr Cloud early access.',
};
const webMcpInputAttributes: Record<string, string> = {
  'tool-param-description': 'Work email for the user requesting Zephyr Cloud early access.',
};

export function SignupForm() {
  const emailFieldId = 'signup-work-email';
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'submitting' | 'success'>('idle');
  const [shaking, setShaking] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'success' || state === 'submitting') return;

    if (!EMAIL_RE.test(email.trim())) {
      setState('error');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      inputRef.current?.focus();
      return;
    }

    setState('submitting');
    inputRef.current?.blur();

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ name: 'email', value: email.trim() }],
          }),
        },
      );

      if (res.ok) {
        setState('success');
      } else {
        setState('error');
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }
    } catch {
      setState('error');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }

  const isError = state === 'error';
  const isSuccess = state === 'success';

  return (
    <form
      {...webMcpFormAttributes}
      onSubmit={handleSubmit}
      className="flex w-full max-w-[560px] shrink-0 flex-col gap-2.5 md:w-auto md:max-w-none"
    >
      <label htmlFor={emailFieldId} className="sr-only">
        Work email
      </label>
      <p className="m-0 px-1 text-left text-[0.8125rem] leading-5 font-medium transition-colors duration-200 md:pr-3 md:text-right">
        {isError ? (
          <span className="text-fault">Please check your email</span>
        ) : (
          <span className="shimmer-text">Now in early access</span>
        )}
      </p>

      <div
        className={cn(
          'relative flex items-center gap-2.5 rounded-xl border py-1.5 pr-1.5 pl-4 backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 sm:gap-3',
          isSuccess
            ? 'border-line-strong bg-night/70'
            : isError
              ? 'border-fault/60 bg-fault/10'
              : focused
                ? 'border-released-ink/70 bg-night/70 ring-2 ring-released/25'
                : 'border-line-strong bg-night/70',
          shaking && 'animate-shake',
        )}
      >
        <div className="relative h-4 w-4 shrink-0">
          <svg
            className={cn(
              'absolute inset-0 h-4 w-4 text-ink-faint transition-opacity duration-300',
              isSuccess ? 'opacity-0' : 'opacity-100',
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <input
          {...webMcpInputAttributes}
          ref={inputRef}
          id={emailFieldId}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder="Work email"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-sm font-medium text-ink outline-none transition-opacity duration-500 placeholder:text-ink-faint sm:text-[0.8125rem]',
            isSuccess ? 'opacity-0' : 'opacity-100',
          )}
        />

        <button
          type="submit"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          disabled={state === 'submitting'}
          className={cn(
            'h-9 shrink-0 rounded-lg px-3.5 text-xs font-medium whitespace-nowrap text-white transition-[background-color,opacity] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night sm:px-4 sm:text-[0.8125rem]',
            hovered ? 'bg-[#8b4df5]' : 'bg-released',
            isSuccess ? 'pointer-events-none opacity-0' : 'opacity-100',
            state === 'submitting' && 'opacity-70',
          )}
        >
          {state === 'submitting' ? 'Signing up...' : 'Sign up'}
        </button>

        <div
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500',
            isSuccess ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
          )}
        >
          <svg
            className="h-4 w-4 shrink-0 text-live"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="text-[0.8125rem] font-medium text-ink">Signed up</span>
        </div>
      </div>
    </form>
  );
}
