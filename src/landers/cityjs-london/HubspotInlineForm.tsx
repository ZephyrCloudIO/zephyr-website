import { ArrowRight, Building2, Check, Mail, User } from 'lucide-react';
import { type FormEvent, useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HUBSPOT_PORTAL_ID = '46982563';
const HUBSPOT_FORM_ID = '3e3005ff-1815-464a-a765-a5f33d7cd3fe';
const FIELD_ORDER = ['firstname', 'lastname', 'email', 'company'] as const;

type FieldName = (typeof FIELD_ORDER)[number];
type FieldValues = Record<FieldName, string>;

type HubspotInlineFormProps = {
  mode?: 'compact' | 'hero';
};

export function HubspotInlineForm({ mode = 'compact' }: HubspotInlineFormProps) {
  const [values, setValues] = useState<FieldValues>({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
  });
  const [state, setState] = useState<'idle' | 'error' | 'submitting' | 'success'>('idle');
  const inputRefs = useRef<Partial<Record<FieldName, HTMLInputElement | null>>>({});
  const isHero = mode === 'hero';

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (state === 'submitting' || state === 'success') {
      return;
    }

    const trimmedValues = Object.fromEntries(FIELD_ORDER.map((field) => [field, values[field].trim()])) as FieldValues;
    const firstMissingField = FIELD_ORDER.find((field) => !trimmedValues[field]);

    if (firstMissingField) {
      setState('error');
      inputRefs.current[firstMissingField]?.focus();
      return;
    }

    if (!EMAIL_RE.test(trimmedValues.email)) {
      setState('error');
      inputRefs.current.email?.focus();
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
            fields: FIELD_ORDER.map((field) => ({ name: field, value: trimmedValues[field] })),
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

  const helperText =
    state === 'success' ? "You're in" : state === 'error' ? 'Add name, last name, company, valid work email' : '';

  const helperColor = state === 'success' ? 'text-emerald-400' : state === 'error' ? 'text-red-400' : 'text-[#7c3aed]';
  const isSuccess = state === 'success';
  const isSubmitting = state === 'submitting';
  const fieldBaseClass =
    'group relative min-w-0 rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition focus-within:border-[#7c3aed] focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_0_3px_rgba(124,58,237,0.14)]';
  const fieldHeightClass = isHero ? 'h-12' : 'h-10';
  const iconClass = isHero ? 'h-4 w-4' : 'h-3.5 w-3.5';
  const inputClass = isHero ? 'pl-10 pr-4 text-[15px] text-white' : 'pl-9 pr-3 text-sm text-white';

  return (
    <form onSubmit={handleSubmit} className={isHero ? 'w-full space-y-3' : 'w-full space-y-3 px-4 py-4 md:px-6'}>
      <p
        aria-live="polite"
        aria-atomic="true"
        className={`min-h-4 text-center text-[11px] font-medium leading-4 tracking-[0.01em] ${helperColor}`}
      >
        {helperText}
      </p>

      {isSuccess ? (
        <div
          className={`flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-[linear-gradient(180deg,rgba(16,185,129,0.18)_0%,rgba(5,46,22,0.24)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(16,185,129,0.12)] ${isHero ? 'min-h-12 px-4 py-3' : 'min-h-10 px-3 py-2'}`}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/16 text-emerald-300">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
          <div className="min-w-0 text-left">
            <div className="text-sm font-medium leading-4 text-white">Signed up</div>
            <div className="truncate text-[11px] leading-4 text-emerald-200/80">We&apos;ll reach out soon</div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={isHero ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-2'}>
            {[
              { name: 'firstname', label: 'First name', type: 'text', icon: User },
              { name: 'lastname', label: 'Last name', type: 'text', icon: User },
              { name: 'email', label: 'Work email', type: 'email', icon: Mail },
              { name: 'company', label: 'Company', type: 'text', icon: Building2 },
            ].map(({ name, label, type, icon: Icon }) => (
              <label key={name} className={`${fieldBaseClass} flex items-center ${fieldHeightClass}`}>
                <Icon
                  className={`pointer-events-none absolute left-3 text-white/35 transition group-focus-within:text-[#c4b5fd] ${iconClass}`}
                  aria-hidden="true"
                />
                <input
                  ref={(node) => {
                    inputRefs.current[name as FieldName] = node;
                  }}
                  type={type}
                  aria-label={label}
                  value={values[name as FieldName]}
                  onChange={(event) => {
                    setValues((current) => ({ ...current, [name]: event.target.value }));
                    if (state !== 'idle') {
                      setState('idle');
                    }
                  }}
                  placeholder={label}
                  className={`h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-white/30 ${inputClass}`}
                />
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#9f67ff] bg-[linear-gradient(180deg,#8b5cf6_0%,#6d28d9_100%)] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_24px_rgba(124,58,237,0.26)] transition hover:brightness-110 disabled:opacity-70 ${isHero ? 'h-12 px-5 text-[15px]' : 'h-10 px-3.5 text-sm'}`}
          >
            <span>{isSubmitting ? 'Submitting...' : 'Start now'}</span>
            <ArrowRight
              className={`transition ${isHero ? 'h-4 w-4' : 'h-3.5 w-3.5'} ${isSubmitting ? '' : 'group-hover:translate-x-0.5'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {isHero ? (
        <p className="text-center text-[12px] leading-5 text-[#737373]">
          No spam. Event follow-up and product updates only.
        </p>
      ) : null}
    </form>
  );
}
