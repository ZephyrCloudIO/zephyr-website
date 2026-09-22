import { Button } from '@/components/ui/button';
import SGWSLogo from '@/images/companies/sgws.webp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/acceleration-week')({
  component: AccelerationWeekPage,
});

const gains = [
  {
    title: 'A foundation you can build on',
    body: 'Domain ownership, a deployment strategy, and a governance model for growth and experimentation.',
  },
  {
    title: 'Teams that ship on their own',
    body: 'Fewer dependency bottlenecks. A team can deliver its part of the experience without waiting on every other team.',
  },
  {
    title: 'Faster speed to market',
    body: 'Digital enhancements and strategic work move when the business needs them to.',
  },
  {
    title: 'A working slice on your cloud',
    body: 'One customer experience and its backend-for-frontend, deployed through Zephyr, previewed, promoted, and rolled back.',
  },
  {
    title: 'The AI Platform on your work',
    body: 'Code, tests, documentation, troubleshooting, delivery planning, and the day-to-day management of versions and environments.',
  },
  {
    title: 'A clear start line',
    body: 'What can begin now, and what waits on a cloud transition or a security review already in motion.',
  },
];

const stats = [
  {
    figure: '6 years → 1 week',
    body: 'A release path the organization had pursued for six years came together in the room.',
  },
  {
    figure: '4–5 weeks → seconds',
    body: 'Production releases that took four to five weeks moved to sub-second deploys and rollbacks.',
  },
  {
    figure: '5 hours → seconds',
    body: 'A simple change that took up to five hours to reach a demo environment became available in seconds.',
  },
  {
    figure: 'Web, mobile, BFF, services',
    body: 'By the last day, one pipeline covered web, mobile, backend-for-frontend, and services.',
  },
  {
    figure: 'Tests in under 20 seconds',
    body: 'QA ran automated checks while code was still in progress, before a pull request was opened.',
  },
  {
    figure: '40+ people, one room',
    body: 'Engineering, QA, architecture, product, and compliance worked the problem together.',
  },
];

const quotes = [
  {
    quote: 'It has a tech conference vibe, but you’re producing business value.',
    who: 'Southern Glazer’s team · Acceleration Week 2025',
  },
  {
    quote:
      'We start with essentially nothing, and at the end of the week you’re blown away by what you were able to generate.',
    who: 'Southern Glazer’s team · Acceleration Week 2025',
  },
  {
    quote: 'You come out of a week with a year’s worth of results.',
    who: 'Southern Glazer’s team · Acceleration Week 2025',
  },
  {
    quote:
      'The beginning of the week, everyone was really confused. Nobody knew why they were here. But we had a plan. Throughout the week, we executed on that plan.',
    who: 'Southern Glazer’s team · Acceleration Week 2025',
  },
  {
    quote:
      'The group built a shared mental model, which allowed them to reason about very complex topics. I can already see how that will extend beyond this week.',
    who: 'Southern Glazer’s team · Acceleration Week 2025',
  },
  {
    quote:
      'A lot of the anxiety around what AI is, and around how we are going to move forward as an organization, is gone.',
    who: 'Closing the week',
  },
  {
    quote: 'There is immense power in bringing people together around a big, motivating, significant problem.',
    who: 'Closing the second Acceleration Week with Southern Glazer’s',
  },
];

const faqs = [
  {
    q: 'Does this replace our cloud?',
    a: 'Releases run in your account, on the cloud you choose. Cloudflare is included. Zephyr versions each release, routes it, and rolls it back. The cloud stays yours.',
  },
  {
    q: 'When can we start?',
    a: 'Broad use follows the date you set, with room for a cloud transition and a security review. The Acceleration Week can run before that date. If the cloud move or the review finishes sooner, the start can move up.',
  },
  {
    q: 'What is in scope?',
    a: 'Customer-facing experiences, built as micro-frontends that teams develop and deploy on their own, and the backend-for-frontend services those experiences depend on.',
  },
  {
    q: 'What does The AI Platform do in the week?',
    a: 'It is used on the real work: code, test creation, documentation, troubleshooting, delivery planning, and platform management. Platform management means which version is in which environment, how an experience and its backend-for-frontend stay in step, and how a change is previewed, promoted, or rolled back.',
  },
  {
    q: 'Is the week open-ended exploration?',
    a: 'The destination is set before anyone arrives. People in the room may not see the whole plan on Monday morning. Southern Glazer’s described exactly that: confusion at the start, a plan underneath it, and the plan carried out by the end of the week.',
  },
  {
    q: 'Have you run a week like this on AI?',
    a: 'Yes. Southern Glazer’s second Acceleration Week, in 2025, was aimed at AI across the way the team works. The recap at the top of this page is that week. Their first week is the one that turned a six-year release problem into sub-second deploys.',
  },
  {
    q: 'Who needs to be in the room?',
    a: 'The engineering leads who will own domains. Product and design for the experiences in scope. Architecture, security, and the people who own the cloud. Someone who can clear a blocker the same day. Zephyr works in the room on the architecture, the deployment, and The AI Platform.',
  },
  {
    q: 'What do we leave with?',
    a: 'A working slice on your cloud. The experience and its backend-for-frontend released together. Domain ownership and a governance model. The AI Platform used on your own code. A list of what can start now, and what waits on the cloud transition or security review.',
  },
];

function AccelerationWeekPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">Zephyr</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">Acceleration Week</h1>
      <p className="mt-5 max-w-2xl text-lg text-neutral-300">
        The fastest path from idea to production for your entire org.
      </p>

      <figure className="mt-10">
        <video
          className="aspect-video w-full rounded-2xl border border-neutral-800 bg-neutral-950"
          controls
          playsInline
          preload="metadata"
          poster="/videos/acceleration-week-poster.jpg"
        >
          <source src="/videos/acceleration-week-2025.mp4" type="video/mp4" />
        </video>
        <figcaption className="mt-3 text-sm text-neutral-500">
          Southern Glazer’s Wine &amp; Spirits · Acceleration Week 2025 recap
        </figcaption>
      </figure>

      <section className="mt-16 space-y-5 text-base leading-relaxed text-neutral-300">
        <h2 className="text-2xl font-semibold text-white">What Acceleration Week is</h2>
        <p>
          Acceleration Week is five days with a destination the business has already chosen. Product, design,
          engineering, architecture, and security sit in the same work, and Zephyr is in the room with them. The point
          is to take a direction that would otherwise take months and prove it, on the organization’s own cloud, before
          the company depends on it.
        </p>
        <p>
          For a front-end modernization, that destination is a micro-frontend architecture on Zephyr Cloud. Releases
          land in your account, on the cloud you already run. Cloudflare is included. The scope is the customer-facing
          experiences and the backend-for-frontend services behind them. The AI Platform is used on that same work:
          code, tests, documentation, troubleshooting, delivery, and platform management.
        </p>
        <p>
          People often arrive unsure why they are there. The week still has a plan, and the room executes it. By Friday
          there is a working slice, a shared picture of the problem, and a clear line between what can start now and
          what waits on a cloud transition or a security review.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white">What an enterprise can hope to gain</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {gains.map((item) => (
            <div key={item.title} className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-5">
              <h3 className="text-base font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Acceleration Week case study</p>
          <div className="mt-5 flex items-center gap-4">
            <img
              src={SGWSLogo}
              alt="Southern Glazer's Wine & Spirits"
              className="h-16 w-16 rounded-full bg-white object-contain"
            />
            <p className="text-lg font-medium text-white">Southern Glazer’s Wine &amp; Spirits</p>
          </div>
          <p className="mt-4 max-w-3xl text-neutral-300">
            Southern Glazer’s is the company this case study is about. The recap above is their second Acceleration
            Week, in 2025, aimed at AI. The numbers further down are from the first week, when the release path came
            together.
          </p>
          <div className="mt-8 space-y-5 border-t border-neutral-800 pt-8 text-base leading-relaxed text-neutral-300">
            <h2 className="text-2xl font-semibold text-white">The week</h2>
            <p>
              Southern Glazer’s ran Acceleration Week with Zephyr, and the destination was already chosen: a
              micro-frontend architecture on Zephyr Cloud, covering their customer-facing experiences and the
              backend-for-frontend services behind them. Releases stayed in their account, on the cloud they already
              ran. The AI Platform sat on the real work: code, tests, documentation, troubleshooting, delivery, and
              platform management.
            </p>
            <p>
              Their first week pulled a release path they had chased for six years into five days. Their second week, in
              2025, pointed the same room at AI across how the organization works. The recap above is that second week.
            </p>
            <p>
              People at Southern Glazer’s often arrived unsure why they were in the room. The week still had a plan, and
              the room executed it. By the end, separate conversations had become one shared picture of the problem, and
              that picture went back to work with them.
            </p>
          </div>
        </div>

        <h2 className="mt-10 text-2xl font-semibold text-white">What their first Acceleration Week achieved</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stats.map((item) => (
            <div key={item.figure} className="rounded-xl border border-neutral-800 p-5">
              <p className="text-lg font-semibold text-white">{item.figure}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
            </div>
          ))}
        </div>
        <blockquote className="mt-6 border-l-2 border-primary pl-5">
          <p className="text-lg text-white">
            “We tried to implement the changes we attacked for six years to get to instant deployments and rollbacks,
            and then with the acceleration week and Zephyr Cloud, it took us a week to achieve it.”
          </p>
          <footer className="mt-3 text-sm text-neutral-500">
            Alan Wizemann · Chief Digital Officer, Southern Glazer’s Wine &amp; Spirits
          </footer>
        </blockquote>
        <p className="mt-4 text-sm text-neutral-500">
          Build times in CI moved from about an hour toward minutes. They then ran the format again, with the second
          week pointed at AI.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-white">What they said in the room</h2>
        <div className="mt-6 space-y-4">
          {quotes.map((item) => (
            <blockquote key={item.quote} className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-5">
              <p className="text-white">“{item.quote}”</p>
              <footer className="mt-3 text-xs tracking-wide text-neutral-500 uppercase">{item.who}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-xl border border-neutral-800 px-5 py-4">
              <summary className="cursor-pointer text-base font-medium text-white">{item.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-950 px-6 py-10 text-center sm:px-10">
        <h2 className="text-3xl font-semibold text-white">Name the destination.</h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-400">Tell us where you are going. We will run the week.</p>
        <Button className="mt-6" asChild>
          <a href="mailto:inbound@zephyr-cloud.io?subject=Acceleration%20Week">Talk to Zephyr</a>
        </Button>
      </section>
    </div>
  );
}
