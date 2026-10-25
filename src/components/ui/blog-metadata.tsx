import { LinkedinIcon } from './linkedin-icon';
import { XIcon } from './x-icon';

interface BlogMetadataProps {
  author: string;
  position: string;
  avatar: string;
  publishDate: string;
  socialLinks?: Array<{
    platform: 'LinkedIn' | 'X';
    url: string;
  }>;
}

export default function BlogMetadata({ author, position, avatar, publishDate, socialLinks = [] }: BlogMetadataProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-6">
      <div className="flex min-w-0 items-center gap-4">
        <img src={avatar} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="m-0 truncate font-medium text-ink">{author}</p>
          <p className="m-0 text-sm text-ink-faint">{position}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <time className="text-sm text-ink-faint">{publishDate}</time>

        {socialLinks.length > 0 && (
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener"
                aria-label={`${author} on ${social.platform}`}
                className="text-ink-faint transition-colors hover:text-ink"
              >
                {social.platform === 'X' && <XIcon size={15} />}
                {social.platform === 'LinkedIn' && <LinkedinIcon size={15} />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
