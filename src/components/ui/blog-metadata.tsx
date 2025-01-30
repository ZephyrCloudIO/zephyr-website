import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

interface BlogMetadataProps {
  author: string;
  position: string;
  avatar?: string;
  publishDate?: string;
  socialLinks?: Array<{
    platform: 'LinkedIn' | 'X' | 'GitHub' | 'Website';
    url: string;
  }>;
}

export default function BlogMetadata({
  author,
  position,
  avatar,
  publishDate,
  socialLinks,
}: BlogMetadataProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return <LinkedInLogoIcon />;
      case 'X':
        return <TwitterLogoIcon />;
      case 'GitHub':
        return <GitHubLogoIcon />;
      default:
        return <ExternalLinkIcon />;
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700 my-4">
      {avatar && (
        <img
          src={avatar}
          alt={`${author}'s avatar`}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white m-0">
            {author}
          </h3>
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                  title={`${author}'s ${link.platform}`}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {position}
        </div>
        {publishDate && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}
      </div>
    </div>
  );
}
