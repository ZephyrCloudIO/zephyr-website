export type Author = {
  displayName: string;
  zephyrMember: boolean;
  avatar: string;
  socialLinks?: Array<{
    link: string;
    platform: 'LinkedIn' | 'X' | 'YouTube' | 'Twitch' | 'Github';
  }>;
};
