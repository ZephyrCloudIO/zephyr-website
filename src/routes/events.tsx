import { pastEvents, upcomingEvents, type Event, type EventResource, type EventType } from '@/data/events';
import { cn } from '@/lib/utils';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
  Globe,
  Link as LinkIcon,
  MapPin,
  Presentation,
  Sparkles,
  Users,
  Video,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useState, type CSSProperties, type ReactNode } from 'react';

export const Route = createFileRoute('/events')({
  component: EventsPage,
});

type Filter = 'all' | EventType;

const TYPE_META: Record<EventType, { label: string; icon: LucideIcon }> = {
  conference: { label: 'Conference', icon: Globe },
  webinar: { label: 'Webinar', icon: Zap },
  meetup: { label: 'Meetup', icon: Users },
  workshop: { label: 'Workshop', icon: Sparkles },
};

const FILTERS: { value: Filter; label: string; icon?: LucideIcon }[] = [
  { value: 'all', label: 'All events' },
  { value: 'conference', label: 'Conferences', icon: Globe },
  { value: 'webinar', label: 'Webinars', icon: Zap },
  { value: 'meetup', label: 'Meetups', icon: Users },
  { value: 'workshop', label: 'Workshops', icon: Sparkles },
];

const RESOURCE_ICONS: Record<string, LucideIcon> = {
  FileText,
  Video,
  Presentation,
  Link: LinkIcon,
};

const container = 'mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10';
const primaryButton =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-released px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night';
const secondaryButton =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line-strong px-5 text-[0.9375rem] text-ink-muted transition-colors hover:border-deployed/60 hover:text-ink';
const textLink = 'inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink';

// Handles ranges like "September 2-4, 2025" (start date) and month-only dates like "December 2024".
function parseEventDate(dateStr: string): Date {
  const cleanedDate = dateStr.replace(/(\d+)-\d+,/, '$1,');
  if (/^[A-Za-z]+ \d{4}$/.test(cleanedDate)) {
    return new Date(`${cleanedDate} 1`);
  }
  return new Date(cleanedDate);
}

function sortEventsByDate(events: Event[], ascending: boolean) {
  return [...events].sort((a, b) => {
    const dateA = parseEventDate(a.date).getTime();
    const dateB = parseEventDate(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

const eventKey = (event: Event) => `${event.title}-${event.date}`;

function resourceIcon(resource: EventResource): LucideIcon {
  if (typeof resource.icon === 'string') return RESOURCE_ICONS[resource.icon] ?? LinkIcon;
  return resource.icon ?? LinkIcon;
}

function TypeTag({ type }: { type: EventType }) {
  const { label, icon: Icon } = TYPE_META[type];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-ink-muted">
      <Icon className="size-3.5 text-deployed" aria-hidden />
      {label}
    </span>
  );
}

function MetaRow({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <Icon className="mt-[0.2em] size-4 shrink-0 text-ink-faint" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function EventMeta({ event, attendeesLabel = 'attendees' }: { event: Event; attendeesLabel?: string }) {
  return (
    <ul className="m-0 list-none space-y-2 p-0 text-sm text-ink-muted">
      <MetaRow icon={CalendarDays}>
        {event.date}
        {event.time ? (
          <>
            <span className="text-ink-faint"> · </span>
            {event.time} {event.timezone}
          </>
        ) : null}
      </MetaRow>
      <MetaRow icon={MapPin}>
        {event.location}
        {event.timezone && !event.time ? <span className="text-ink-faint"> · {event.timezone}</span> : null}
      </MetaRow>
      {event.attendees ? (
        <MetaRow icon={Users}>
          {event.attendees}+ {attendeesLabel}
        </MetaRow>
      ) : null}
    </ul>
  );
}

function EventLinks({ event }: { event: Event }) {
  if (!event.isPast && event.link) {
    return (
      <a href={event.link} target="_blank" rel="noopener" className={textLink}>
        {event.ctaText || 'Register now'}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    );
  }

  if (!event.isPast || !event.resources?.length) return null;

  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
      {event.resources.map((resource) => {
        const Icon = resourceIcon(resource);
        return (
          <li key={resource.link}>
            {resource.external ? (
              <a href={resource.link} target="_blank" rel="noopener" className={textLink}>
                <Icon className="size-4 text-ink-faint" aria-hidden />
                {resource.text}
              </a>
            ) : (
              <Link to={resource.link} className={textLink}>
                <Icon className="size-4 text-ink-faint" aria-hidden />
                {resource.text}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function EventCard({ event }: { event: Event }) {
  const hasLinks = (!event.isPast && Boolean(event.link)) || (event.isPast && Boolean(event.resources?.length));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-line-strong">
      <div className="flex items-center justify-between gap-3">
        <TypeTag type={event.type} />
        {event.isPast ? <span className="text-xs text-ink-faint">Past</span> : null}
      </div>

      <h3 className="text-title mt-5 mb-4 text-ink">{event.title}</h3>
      <EventMeta event={event} />

      <p className="mt-4 mb-0 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-muted">{event.description}</p>

      {event.speakers?.length ? (
        <div className="mt-5">
          <p className="m-0 text-xs text-ink-faint">Speakers</p>
          <p className="m-0 mt-1 text-sm text-ink-muted">{event.speakers.join(', ')}</p>
        </div>
      ) : null}

      {hasLinks ? (
        <div className="mt-auto pt-6">
          <div className="border-t border-line pt-4">
            <EventLinks event={event} />
          </div>
        </div>
      ) : null}
    </article>
  );
}

function EventGrid({ events }: { events: Event[] }) {
  return (
    <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event, i) => (
        <li key={eventKey(event)} className="reveal" style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}

function EventSection({ id, title, events }: { id: string; title: string; events: Event[] }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-24 lg:py-32">
      <div className={container}>
        <div className="reveal">
          <p className="mb-3 text-sm text-ink-faint">
            {events.length} {events.length === 1 ? 'event' : 'events'}
          </p>
          <h2 id={id} className="text-headline m-0 text-ink">
            {title}
          </h2>
        </div>
        <EventGrid events={events} />
      </div>
    </section>
  );
}

function FeaturedEvent({ event }: { event: Event }) {
  return (
    <section aria-labelledby="featured-event-title" className="border-t border-line py-24 lg:py-32">
      <div className={container}>
        <div className="reveal grid items-center gap-10 rounded-2xl border border-line bg-surface/70 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="m-0 text-sm text-ink-faint">Featured event</p>
              <TypeTag type={event.type} />
            </div>
            <h2 id="featured-event-title" className="text-headline mt-5 mb-6 text-ink">
              {event.title}
            </h2>
            <EventMeta event={event} attendeesLabel="expected attendees" />
            <p className="mt-6 mb-0 text-[0.9375rem] leading-relaxed text-ink-muted">{event.description}</p>

            {event.speakers?.length ? (
              <div className="mt-6">
                <p className="m-0 text-xs text-ink-faint">Featured speakers</p>
                <p className="m-0 mt-1 text-ink">{event.speakers.join(', ')}</p>
              </div>
            ) : null}

            {event.link ? (
              <a href={event.link} target="_blank" rel="noopener" className={cn(primaryButton, 'mt-8')}>
                {event.ctaText || 'Register now'}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>

          {event.thumbnail ? (
            <img
              src={event.thumbnail}
              alt={event.title}
              className="aspect-video w-full rounded-xl border border-line object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function EventsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const matches = (event: Event) => filter === 'all' || event.type === filter;

  const featuredEvent = upcomingEvents.find((e) => e.featured);
  // Upcoming: closest first, featured shown separately. Past: most recent first.
  const filteredUpcoming = sortEventsByDate(
    upcomingEvents.filter((e) => !e.featured && matches(e)),
    true,
  );
  const filteredPast = sortEventsByDate(pastEvents.filter(matches), false);
  const activeFilter = FILTERS.find((f) => f.value === filter);

  return (
    <>
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className={container}>
          <div className="max-w-3xl">
            <p className="mb-6 text-sm text-ink-faint">Events</p>
            <h1 className="text-display m-0 text-ink">Build, ship, connect.</h1>
            <p className="text-lead mt-7 mb-0 max-w-[36rem] text-ink-muted">
              Join our Zephyr Cloud community at conferences, workshops, and meetups worldwide.
            </p>
          </div>

          <div role="group" aria-label="Filter events by type" className="mt-10 flex flex-wrap gap-1.5">
            {FILTERS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={cn(
                  'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-released-ink',
                  filter === value
                    ? 'border-line-strong bg-surface-2 text-ink'
                    : 'border-line text-ink-muted hover:border-line-strong hover:text-ink',
                )}
              >
                {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredEvent ? <FeaturedEvent event={featuredEvent} /> : null}

      {filteredUpcoming.length > 0 ? (
        <EventSection id="upcoming-events-title" title="Upcoming events" events={filteredUpcoming} />
      ) : null}

      {filteredPast.length > 0 ? (
        <EventSection id="past-events-title" title="Past events" events={filteredPast} />
      ) : null}

      {filteredUpcoming.length === 0 && filteredPast.length === 0 ? (
        <section className="border-t border-line py-16 lg:py-20">
          <div className={container}>
            <p className="m-0 text-ink-muted">
              {filter === 'all' || !activeFilter ? 'No events yet.' : `No ${activeFilter.label.toLowerCase()} yet.`}{' '}
              {filter === 'all' ? null : (
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-muted"
                >
                  Show all events
                </button>
              )}
            </p>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="host-event-title" className="border-t border-line py-24 lg:py-32">
        <div className={container}>
          <div className="reveal flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="host-event-title" className="text-headline m-0 text-ink">
                Host a Zephyr event
              </h2>
              <p className="text-lead mt-5 mb-0 text-ink-muted">
                Want to bring the power of runtime updates and Module Federation to your team? We offer custom
                workshops, speaking engagements, and acceleration weeks tailored to your needs.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a href="mailto:inbound@zephyr-cloud.io" className={primaryButton}>
                Contact our events team
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <Link to="/blog/sgws-case-study" className={secondaryButton}>
                See Acceleration Week success
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
