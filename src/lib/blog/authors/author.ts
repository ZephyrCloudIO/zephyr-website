export type Author = {
  displayName: string;
  zephyrMember: boolean;
  avatar: any;
  socialLinks?: Array<{
    link: string;
    platform: 'LinkedIn' | 'X' | 'YouTube' | 'Twitch' | 'Github';
  }>;
};
