import type { Author } from '@/lib/blog/types';
import zackJAvatar from '@/images/authors/zackj.webp';
import zackCAvatar from '@/images/authors/zackc.webp';
import shaneAvatar from '@/images/authors/shane.webp';
import loisAvatar from '@/images/authors/lois.webp';
import nestorAvatar from '@/images/authors/nestor.webp';
import rodrigoAvatar from '@/images/authors/rodrigo.webp';

export const ZackJ: Author = {
  displayName: 'Zack Jackson',
  zephyrMember: true,
  avatar: zackJAvatar,
  socialLinks: [
    { link: 'https://x.com/ScriptedAlchemy', platform: 'X' },
    { link: 'https://github.com/ScriptedAlchemy', platform: 'Github' },
  ],
};

export const ZackC: Author = {
  displayName: 'Zack Chapple',
  zephyrMember: true,
  avatar: zackCAvatar,
  socialLinks: [
    { link: 'https://www.linkedin.com/in/zackarychapple/', platform: 'LinkedIn' },
    { link: 'https://x.com/Zackary_Chapple', platform: 'X' },
  ],
};

export const Shane: Author = {
  displayName: 'Shane Walker',
  zephyrMember: true,
  avatar: shaneAvatar,
  socialLinks: [
    { link: 'https://www.linkedin.com/in/shane-dev/', platform: 'LinkedIn' },
    { link: 'https://x.com/swalker326', platform: 'X' },
    { link: 'https://github.com/swalker326', platform: 'Github' },
  ],
};

export const Lois: Author = {
  displayName: 'Lois Z.',
  zephyrMember: true,
  avatar: loisAvatar,
  socialLinks: [
    { link: 'https://x.com/zmzlois', platform: 'X' },
    { link: 'https://www.linkedin.com/in/loiszhao/', platform: 'LinkedIn' },
    { link: 'https://github.com/zmzlois', platform: 'Github' },
  ],
};

export const Nestor: Author = {
  displayName: 'Néstor López',
  zephyrMember: true,
  avatar: nestorAvatar,
  socialLinks: [
    { link: 'https://x.com/nstlopez', platform: 'X' },
    { link: 'https://www.linkedin.com/in/nstlopez/', platform: 'LinkedIn' },
    { link: 'https://github.com/nsttt', platform: 'Github' },
  ],
};

export const Rodrigo: Author = {
  displayName: 'Rodrigo',
  zephyrMember: true,
  avatar: rodrigoAvatar,
  socialLinks: [
    { link: 'https://x.com/ryok90', platform: 'X' },
    { link: 'https://www.linkedin.com/in/rodrigo-yokota/', platform: 'LinkedIn' },
    { link: 'https://github.com/ryok90', platform: 'Github' },
  ],
};
