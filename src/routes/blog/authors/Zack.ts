import { Author } from './author';
import ZackAvatar from './avatars/Zack.jpg';

export const Zack: Author = {
  displayName: 'Zack C.',
  zephyrMember: true,
  avatar: ZackAvatar,
  socialLinks: [
    {
      link: 'https://www.linkedin.com/in/zackarychapple',
      platform: 'LinkedIn',
    },
    { link: 'https://x.com/Zackary_Chapple', platform: 'X' },
  ],
};
