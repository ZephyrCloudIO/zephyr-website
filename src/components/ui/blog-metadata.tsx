import { Calendar, Linkedin } from 'lucide-react';
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
    <div className="flex items-center justify-between py-6 mb-8 border-y border-neutral-800">
      <div className="flex items-center gap-4">
        <img src={avatar} alt={author} className="w-16 h-16 rounded-full" />
        <div>
          <h4 className="font-semibold text-lg">{author}</h4>
          <p className="text-neutral-400">{position}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-neutral-400">
          <Calendar className="w-4 h-4" />
          <time>{publishDate}</time>
        </div>

        {socialLinks.length > 0 && (
          <div className="flex gap-3">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                {social.platform === 'X' && <XIcon size={20} />}
                {social.platform === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
