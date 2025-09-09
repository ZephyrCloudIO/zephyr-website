interface TestimonialProps {
  author: string;
  role: string;
  children: React.ReactNode;
  avatar?: string;
  linkedIn?: string;
}

export default function Testimonial({ author, role, children, avatar, linkedIn }: TestimonialProps) {
  return (
    <div className="flex-1 min-w-[300px] pb-2 bg-neutral-900 rounded-md p-2">
      <blockquote className="relative border-l-2 border-neutral-700 pl-3 ml-2 mt-2">
        <div className="flex items-center gap-4 h-14">
          {avatar && (
            <img
              src={avatar}
              alt={`${author}'s avatar`}
              className="w-14 h-14 rounded-full object-cover border-2 border-neutral-700"
              loading="lazy"
              decoding="async"
            />
          )}
          <div>
            <div className="text-lg font-semibold text-white">
              {linkedIn ? (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-emerald-400 transition-colors duration-200"
                >
                  {author}
                </a>
              ) : (
                author
              )}
            </div>
            <div className="text-sm text-neutral-400">{role}</div>
          </div>
        </div>

        <div className="text-neutral-300 text-base font-normal pl-5 pr-10">{children}</div>
      </blockquote>
    </div>
  );
}
