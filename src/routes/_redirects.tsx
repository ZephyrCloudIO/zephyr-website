import { redirect } from '@modern-js/runtime/router';
import { redirects } from '@/lib/redirects';

// This loader will be executed server-side (if using SSR) or client-side
export const loader = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Check if we have a redirect for this path
  if (redirects[path]) {
    return redirect(redirects[path]);
  }
  
  // If no redirect found, return null to continue normal routing
  return null;
};

export default function RedirectsHandler() {
  // This component won't actually render if a redirect occurs
  return null;
}