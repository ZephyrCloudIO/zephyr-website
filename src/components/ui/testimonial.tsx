interface TestimonialProps {
  author: string;
  role: string;
  children: React.ReactNode;
  avatar?: string;
  linkedIn?: string;
}

export default function Testimonial({
  author,
  role,
  children,
  avatar,
  linkedIn,
}: TestimonialProps) {
  return (
    <div className="flex-1 min-w-[300px] pb-2 bg-gray-900 rounded-md p-2">
      <blockquote className="relative border-l-2 border-gray-200 pl-3 dark:border-gray-700 ml-2 mt-2">
        <div className="flex items-center gap-4 h-14">
          {avatar && (
            <img
              src={avatar}
              alt={`${author}'s avatar`}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              loading="lazy"
              decoding="async"
            />
          )}
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {linkedIn ? (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {author}
                </a>
              ) : (
                author
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {role}
            </div>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-300 text-base font-normal pl-5 pr-10">
          {children}
        </div>
      </blockquote>
    </div>
  );
}
