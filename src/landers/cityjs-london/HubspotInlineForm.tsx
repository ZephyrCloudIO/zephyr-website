import { ArrowRight, Check, Mail, User } from 'lucide-react';
import { type FormEvent, useState } from 'react';

const HUBSPOT_PORTAL_ID = '46982563';

const HUBSPOT_FORM_ID = '138e92a5-c5b1-428f-98a4-3df4915c25a1';
const DOMAIN_SECOND_LEVEL_SUFFIXES = new Set(['ac', 'co', 'com', 'edu', 'gov', 'net', 'org']);
const INPUT_FIELDS = ['fullName', 'email'] as const;

type InputFieldName = (typeof INPUT_FIELDS)[number];
type FormValues = Record<InputFieldName, string>;

type HubspotInlineFormProps = {
  mode?: 'compact' | 'hero';
};

export function HubspotInlineForm({ mode = 'compact' }: HubspotInlineFormProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
  });
  const [state, setState] = useState<'idle' | 'error' | 'submitting' | 'success'>('idle');
  const [errorText, setErrorText] = useState('');
  const isHero = mode === 'hero';

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (state === 'submitting' || state === 'success') {
      return;
    }

    const fullName = values.fullName.trim();
    const email = values.email.trim();
    const { firstName, lastName } = splitFullName(fullName);

    const domain = getEmailDomain(email);

    setState('submitting');
    setErrorText('');

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: firstName },
              { name: 'lastname', value: lastName },
              { name: 'email', value: email },
              { name: 'company', value: deriveCompanyFromDomain(domain) },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error('HubSpot submission failed');
      }

      setState('success');
    } catch {
      setState('error');
      setErrorText('Something went wrong. Try again.');
    }
  }

  const helperText = state === 'success' ? "You're in" : state === 'error' ? errorText : '';
  const helperColor = state === 'success' ? 'text-emerald-400' : state === 'error' ? 'text-red-400' : 'text-[#8a8a8a]';
  const isSuccess = state === 'success';
  const isSubmitting = state === 'submitting';
  const fieldBaseClass =
    'group relative min-w-0 rounded-xl border border-white/10 bg-[#141414] transition focus-within:border-[#006aff] focus-within:shadow-[0_0_0_3px_rgba(0,106,255,0.18)]';
  const fieldHeightClass = isHero ? 'h-12' : 'h-10';
  const iconClass = isHero ? 'h-4 w-4' : 'h-3.5 w-3.5';
  const inputClass = isHero ? 'pl-10 pr-4 text-[15px] text-white' : 'pl-9 pr-3 text-sm text-white';

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={isHero ? 'w-full space-y-4' : 'w-full space-y-3 px-4 py-4 md:px-6'}
    >
      {helperText && (
        <p
          aria-live="polite"
          aria-atomic="true"
          className={`text-center text-[11px] font-medium leading-4 tracking-[0.01em] ${helperColor}`}
        >
          {helperText}
        </p>
      )}

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
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-[1.15fr_1fr]">
            {[
              { name: 'fullName', label: 'Full name', type: 'text', icon: User },
              { name: 'email', label: 'Work email', type: 'email', icon: Mail },
            ].map(({ name, label, type, icon: Icon }) => (
              <label key={name} className={`${fieldBaseClass} flex items-center ${fieldHeightClass}`}>
                <Icon
                  className={`pointer-events-none absolute left-3 text-white/35 transition group-focus-within:text-[#8dc0ff] ${iconClass}`}
                  aria-hidden="true"
                />
                <input
                  type={type}
                  aria-label={label}
                  value={values[name as InputFieldName]}
                  onChange={(event) => {
                    setValues((current) => ({ ...current, [name]: event.target.value }));
                    if (state !== 'idle') {
                      setState('idle');
                    }
                    if (errorText) {
                      setErrorText('');
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
            className={`group inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#7c3aed] bg-[#7c3aed] font-medium text-white shadow-[0_10px_24px_rgba(124,58,237,0.26)] transition hover:bg-[#8b5cf6] disabled:opacity-70 ${isHero ? 'h-12 px-5 text-[15px]' : 'h-10 px-3.5 text-sm'}`}
          >
            <span>{isSubmitting ? 'Submitting...' : 'Start now'}</span>
            <ArrowRight
              className={`transition ${isHero ? 'h-4 w-4' : 'h-3.5 w-3.5'} ${isSubmitting ? '' : 'group-hover:translate-x-0.5'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </form>
  );
}

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
}

function getEmailDomain(email: string) {
  return email.toLowerCase().split('@')[1] ?? '';
}

function deriveCompanyFromDomain(domain: string) {
  const labels = domain.split('.').filter(Boolean);

  if (labels.length === 0) {
    return '';
  }

  let stem = labels.length === 1 ? labels[0] : (labels[labels.length - 2] ?? labels[0]);

  if (labels.length >= 3) {
    const tld = labels[labels.length - 1] ?? '';
    const secondLevel = labels[labels.length - 2] ?? '';
    if (tld.length === 2 && DOMAIN_SECOND_LEVEL_SUFFIXES.has(secondLevel)) {
      stem = labels[labels.length - 3] ?? stem;
    }
  }

  return stem
    .split(/[-_]/)
    .filter(Boolean)
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
