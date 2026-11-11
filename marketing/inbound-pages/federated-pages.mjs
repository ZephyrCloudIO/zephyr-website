import formStyles from './form.css?raw';
import landingStyles from './landing.css?raw';
import pages from './pages.json';
import page0 from './pages/01-always-deployed.html?raw';
import page1 from './pages/02-saaspocalypse.html?raw';
import page2 from './pages/03-composable-enterprise.html?raw';
import page3 from './pages/04-agents-deploy.html?raw';
import page4 from './pages/05-kill-the-release-train.html?raw';
import page5 from './pages/06-rollback-isnt-a-rebuild.html?raw';
import page6 from './pages/07-one-line.html?raw';
import page7 from './pages/08-cloud-is-a-commodity.html?raw';
import page8 from './pages/09-ship-everywhere.html?raw';
import page9 from './pages/10-stop-making-users-wait.html?raw';
import page10 from './pages/11-ship-the-part.html?raw';
import leadForm from './partials/lead-form.html?raw';
const templates = {
  'always-deployed': page0,
  saaspocalypse: page1,
  'composable-enterprise': page2,
  'agents-deploy': page3,
  'kill-the-release-train': page4,
  'rollback-isnt-a-rebuild': page5,
  'one-line': page6,
  'cloud-is-a-commodity': page7,
  'ship-everywhere': page8,
  'stop-making-users-wait': page9,
  'ship-the-part': page10,
};

/** Return server-renderable campaign content without browser dependencies. */
export function getCampaign(pageId, logoUrl) {
  const template = templates[pageId];
  if (!template) throw new Error(`Unknown campaign page: ${pageId}`);
  const source = template.replace('<%= pageId %>', pageId).replace('<%= leadForm %>', leadForm);
  const body = source.match(/<body\b[^>]*>([\s\S]*)<\/body>/)?.[1];
  if (!body) throw new Error(`Missing campaign content: ${pageId}`);
  const inlineStyles = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((match) => match[1]).join('\n');
  const base = pages.find((page) => page.id === pageId)?.entry.includes('./landing.css') ? landingStyles : '';
  // CSS scope keeps campaign selectors out of the rest of the website.
  const scoped = `${base}\n${inlineStyles}\n${formStyles}`.replace(
    /(^|[{}])(\s*)(:root|html|body)(?=\s*[{,])/gm,
    '$1$2:scope',
  );
  return {
    html: body.replaceAll('/zephyr-logo.svg', logoUrl),
    css: `@scope (.zephyr-campaign) { :scope { position: relative; isolation: isolate; min-height: 100vh; } h2, h3, b, strong { font-weight: 700; } ${scoped} }`,
  };
}
