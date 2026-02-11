import { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HUBSPOT_PORTAL_ID = '46982563';
const HUBSPOT_FORM_ID = 'f1595bbd-95a2-4ee1-b7db-c8071152dc5b';

export function SignupForm() {
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
      onSubmit={handleSubmit}
      className="flex w-full max-w-[560px] shrink-0 flex-col gap-2.5 md:w-auto md:max-w-none"
    >
      <p className="px-1 text-left text-[13px] font-medium leading-5 transition-colors duration-200 md:pr-3 md:text-right">
        {isError ? (
          <span className="text-red-400">Please check your email</span>
        ) : (
          <span className="shimmer-text">Now in early access</span>
        )}
      </p>

      <div
        className={`relative flex items-center gap-2.5 rounded-full border py-1.5 pl-4 pr-1.5 transition-all duration-500 sm:gap-3 sm:pl-5 ${
          isSuccess
            ? 'border-white/20 bg-black/50'
            : isError
              ? 'border-red-400/60 bg-red-950/20'
              : focused
                ? 'border-[#008CFF] bg-black/50'
                : 'border-white/20 bg-black/50'
        } ${shaking ? 'animate-shake' : ''}`}
        style={focused && !isError && !isSuccess ? { boxShadow: '0px 0px 4px rgba(0, 166, 255, 0.45)' } : undefined}
      >
        <div className="relative h-4 w-4 shrink-0">
          <svg
            className={`absolute inset-0 h-4 w-4 text-white transition-opacity duration-300 ${isSuccess ? 'opacity-0' : 'opacity-100'}`}
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
          ref={inputRef}
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder="Work email"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`min-w-0 flex-1 bg-transparent text-sm font-medium text-white placeholder-white/40 outline-none transition-opacity duration-500 sm:text-[13px] ${isSuccess ? 'opacity-0' : 'opacity-100'}`}
        />

        <button
          type="submit"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          disabled={state === 'submitting'}
          className={`h-9 shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold text-white transition-all duration-500 sm:px-4 sm:text-[13px] ${isSuccess ? 'pointer-events-none opacity-0' : 'opacity-100'} ${state === 'submitting' ? 'opacity-70' : ''}`}
          style={{
            background: `linear-gradient(177.57deg, rgba(255,255,255,0.48) 2.04%, rgba(255,255,255,0) 68.68%), ${hovered ? '#0084FF' : '#006AFF'}`,
            backgroundBlendMode: 'overlay, normal',
            boxShadow: isSuccess
              ? 'none'
              : '0px 2px 4px -1.5px rgba(9,9,11,0.16), 0px 0px 0px 1px rgba(32,0,60,0.6), inset 0px -2px 3px rgba(46,220,255,0.35), inset 0px 1px 0px rgba(255,255,255,0.2)',
          }}
        >
          {state === 'submitting' ? 'Signing up...' : 'Sign up'}
        </button>

        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ${
            isSuccess ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <svg
            className="h-4 w-4 shrink-0 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="text-[13px] font-medium text-emerald-400">Signed up</span>
        </div>
      </div>
    </form>
  );
}
