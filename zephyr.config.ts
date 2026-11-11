const reviewTag = process.env.CAMPAIGN_TAG;

export default {
  dependencyUrlMode: 'selector',
  ...(reviewTag
    ? {
        remoteDependencies: {
          campaigns: `zephyr-landing-pages-review.with-tap.zephyrcloudio@${reviewTag}`,
        },
      }
    : {}),
};
