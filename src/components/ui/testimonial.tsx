interface TestimonialProps {
  author: string;
  role: string;
  children: React.ReactNode;
  avatar?: string;
  linkedIn?: string;
}

/** Pull quote used inside blog posts (MDX). */
export default function Testimonial({ author, role, children, avatar, linkedIn }: TestimonialProps) {
  return (
    <figure className="my-8 min-w-[300px] flex-1 rounded-2xl border border-line bg-surface/70 p-5">
      <blockquote className="m-0 border-l-2 border-line-strong pl-4 text-base leading-relaxed text-ink-muted">
        {children}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-full border border-line-strong object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
        <span>
          <span className="block text-sm font-medium text-ink">
            {linkedIn ? (
              <a href={linkedIn} target="_blank" rel="noopener" className="transition-colors hover:text-released-ink">
                {author}
              </a>
            ) : (
              author
            )}
          </span>
          <span className="block text-xs text-ink-faint">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
