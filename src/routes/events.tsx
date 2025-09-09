import { Event, pastEvents, upcomingEvents } from '@/data/events';
import { cn } from '@/lib/utils';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  CalendarDays,
  Clock,
  FileText,
  Globe,
  Link as LinkIcon,
  MapPin,
  Presentation,
  Sparkles,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/events')({
  component: EventsPage,
});

function EventCard({ event }: { event: Event }) {
  const typeConfig = {
    conference: { bg: 'bg-emerald-900/20', border: 'border-emerald-700/50', text: 'text-emerald-400', icon: Globe },
    webinar: { bg: 'bg-blue-900/20', border: 'border-blue-700/50', text: 'text-blue-400', icon: Zap },
    meetup: { bg: 'bg-violet-900/20', border: 'border-violet-700/50', text: 'text-violet-400', icon: Users },
    workshop: { bg: 'bg-red-900/20', border: 'border-red-700/50', text: 'text-red-400', icon: Sparkles },
  };

  const config = typeConfig[event.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl p-6 transition-all duration-300',
        'bg-gradient-to-br from-neutral-900 to-neutral-900/50',
        'border border-neutral-800 hover:border-neutral-700',
        'hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1',
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium',
              config.bg,
              config.border,
              config.text,
            )}
          >
            <Icon size={14} />
            <span>{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
          </div>
          {event.isPast && <span className="text-xs text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded">Past</span>}
        </div>

        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <CalendarDays size={14} className="text-neutral-500" />
            <span>{event.date}</span>
            {event.time && (
              <>
                <span className="text-neutral-600">•</span>
                <Clock size={14} className="text-neutral-500" />
                <span>
                  {event.time} {event.timezone}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <MapPin size={14} className="text-neutral-500" />
            <span>{event.location}</span>
            {event.timezone && !event.time && (
              <>
                <span className="text-neutral-600">•</span>
                <span className="text-xs">{event.timezone}</span>
              </>
            )}
          </div>
          {event.attendees && (
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Users size={14} className="text-neutral-500" />
              <span>{event.attendees}+ attendees</span>
            </div>
          )}
        </div>

        <p className="text-neutral-300 mb-4 line-clamp-3">{event.description}</p>

        {event.speakers && event.speakers.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-neutral-500 mb-1">Speakers</p>
            <p className="text-sm text-neutral-300">{event.speakers.join(', ')}</p>
          </div>
        )}

        {event.link && !event.isPast && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-sm"
          >
            {event.ctaText || 'Register now'}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}

        {event.isPast && event.resources && event.resources.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {event.resources.map((resource, index) => {
              const iconMap: Record<string, any> = {
                FileText: FileText,
                Video: Video,
                Presentation: Presentation,
                Link: LinkIcon,
              };
              const IconComponent = typeof resource.icon === 'string' ? iconMap[resource.icon] || LinkIcon : LinkIcon;

              if (resource.external) {
                return (
                  <a
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
                  >
                    <IconComponent size={16} />
                    <span>{resource.text}</span>
                  </a>
                );
              } else {
                return (
                  <Link
                    key={index}
                    to={resource.link}
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
                  >
                    <IconComponent size={16} />
                    <span>{resource.text}</span>
                  </Link>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'conference' | 'webinar' | 'meetup' | 'workshop'>('all');

  // Helper function to parse event dates
  const parseEventDate = (dateStr: string): Date => {
    // Handle date ranges like "September 2-4, 2025" by using the start date
    const cleanedDate = dateStr.replace(/(\d+)-\d+,/, '$1,');

    // Handle month-only dates like "December 2024"
    if (/^[A-Za-z]+ \d{4}$/.test(cleanedDate)) {
      // Add day 1 to make it parseable
      return new Date(`${cleanedDate} 1`);
    }

    // Handle regular dates
    return new Date(cleanedDate);
  };

  // Sort events by date
  const sortEventsByDate = (events: Event[], ascending: boolean = true) => {
    return [...events].sort((a, b) => {
      const dateA = parseEventDate(a.date).getTime();
      const dateB = parseEventDate(b.date).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
  };

  const featuredEvent = upcomingEvents.find((e) => e.featured);

  // Filter and sort upcoming events (closest first, excluding featured)
  const filteredUpcoming = sortEventsByDate(
    upcomingEvents.filter((e) => !e.featured && (filter === 'all' || e.type === filter)),
    true, // ascending order for future events
  );

  // Filter and sort past events (most recent first)
  const filteredPast = sortEventsByDate(
    pastEvents.filter((e) => filter === 'all' || e.type === filter),
    false, // descending order for past events
  );

  const filterButtons = [
    { value: 'all', label: 'All Events' },
    { value: 'conference', label: 'Conferences', icon: Globe },
    { value: 'webinar', label: 'Webinars', icon: Zap },
    { value: 'meetup', label: 'Meetups', icon: Users },
    { value: 'workshop', label: 'Workshops', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative container mx-auto px-4 py-24 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">
              Build, Ship, Connect
            </h1>
            <p className="text-xl text-neutral-300 mb-8">
              Join our Zephyr Cloud community at conferences, workshops, and meetups worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Featured Event */}
        {featuredEvent && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="text-emerald-400" size={24} />
              Featured Event
            </h2>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 border border-emerald-700/50 p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 mb-4">
                    <Globe size={16} />
                    <span>{featuredEvent.type.charAt(0).toUpperCase() + featuredEvent.type.slice(1)}</span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">{featuredEvent.title}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-neutral-300">
                      <CalendarDays size={18} className="text-emerald-400" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <MapPin size={18} className="text-emerald-400" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    {featuredEvent.attendees && (
                      <div className="flex items-center gap-3 text-neutral-300">
                        <Users size={18} className="text-emerald-400" />
                        <span>{featuredEvent.attendees}+ expected attendees</span>
                      </div>
                    )}
                  </div>

                  <p className="text-neutral-300 mb-6">{featuredEvent.description}</p>

                  {featuredEvent.speakers && (
                    <div className="mb-6">
                      <p className="text-sm text-neutral-400 mb-2">Featured Speakers</p>
                      <p className="text-white font-medium">{featuredEvent.speakers.join(', ')}</p>
                    </div>
                  )}

                  <a
                    href={featuredEvent.link}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    {featuredEvent.ctaText || 'Register Now'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {featuredEvent.thumbnail && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={featuredEvent.thumbnail}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterButtons.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFilter(value as any)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                filter === value
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white',
              )}
            >
              {Icon && <Icon size={16} />}
              {label}
            </button>
          ))}
        </div>

        {/* Upcoming Events */}
        {filteredUpcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {filteredPast.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPast.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-12 border border-neutral-700">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Host a Zephyr Event</h2>
            <p className="text-neutral-300 mb-8 text-lg">
              Want to bring the power of runtime updates and Module Federation to your team? We offer custom workshops,
              speaking engagements, and acceleration weeks tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:inbound@zephyr-cloud.io"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Contact Our Events Team
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              <a
                href="/blog/sgws-case-study"
                className="inline-flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                See Acceleration Week Success
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
