// Settings for boot method (camelCase as per react-use-intercom docs)
export const INTERCOM_BOOT_PROPS = {
  name: 'Zephyr Cloud',
  company: {
    name: 'Zephyr Cloud',
    companyId: 'zephyr-cloud',
  },
  avatar: {
    type: 'user' as const,
    name: 'Zephyr Cloud',
    imageUrl: 'https://zephyr-cloud.io/logo.png',
  },
  // Enable Google Analytics integration
  enableIntegrations: true,
  customAttributes: {
    page_title: 'Zephyr Cloud',
    action_color: '#eee',
    vertical_padding: 80,
    horizontal_padding: 20,
    background_color: '#eee',
    custom_launcher_selector: '#intercom-launcher',
  },
};
