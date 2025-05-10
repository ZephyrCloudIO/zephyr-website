import { useEffect } from 'react';
import { useNavigate } from '@modern-js/runtime/router';
import { Helmet } from '@modern-js/runtime/head';

interface RedirectProps {
  to: string;
  permanent?: boolean;
}

/**
 * Component for handling redirects in Modern.js
 * 
 * @param to - The path to redirect to
 * @param permanent - Whether this is a permanent (301) or temporary (302) redirect
 */
export const Redirect = ({ to, permanent = true }: RedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Use the navigate function for internal redirects
    if (to.startsWith('/')) {
      navigate(to, { replace: true });
    }
  }, [navigate, to]);

  // For external redirects or as a fallback, use meta refresh
  return (
    <Helmet>
      <title>Redirecting...</title>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      {permanent && <meta name="robots" content="noindex" />}
      {/* Add proper HTTP status code for SEO */}
      <link rel="canonical" href={to} />
    </Helmet>
  );
};

export default Redirect;