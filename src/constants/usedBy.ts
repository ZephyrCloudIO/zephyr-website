import accenture from '@/images/used-by/accenture.svg';
import addepar from '@/images/used-by/addepar.svg';
import agoda from '@/images/used-by/agoda.svg';
import akamai from '@/images/used-by/akamai.svg';
import booking from '@/images/used-by/booking.svg';
import bytedance from '@/images/used-by/bytedance.svg';
import callstack from '@/images/used-by/callstack.svg';
import capgemini from '@/images/used-by/capgemini.svg';
import carrefour from '@/images/used-by/carrefour.svg';
import cloudflare from '@/images/used-by/cloudflare.svg';
import datadog from '@/images/used-by/datadog.png';
import dynatrace from '@/images/used-by/dynatrace.svg';
import ea from '@/images/used-by/ea.svg';
import enbw from '@/images/used-by/enbw.svg';
import entain from '@/images/used-by/entain.svg';
import globant from '@/images/used-by/globant.svg';
import intuit from '@/images/used-by/intuit.svg';
import lendingclub from '@/images/used-by/lendingclub.svg';
import lululemon from '@/images/used-by/lululemon.svg';
import makeswift from '@/images/used-by/makeswift.svg';
import navan from '@/images/used-by/navan.svg';
import netflix from '@/images/used-by/netflix.svg';
import nx from '@/images/used-by/nx.svg';
import questrade from '@/images/used-by/questrade.svg';
import redpanda from '@/images/used-by/redpanda.svg';
import rimac from '@/images/used-by/rimac.svg';
import sgws from '@/images/used-by/sgws.svg';
import snap from '@/images/used-by/snap.svg';
import teamworks from '@/images/used-by/teamworks.svg';
import terminal from '@/images/used-by/terminal.png';
import trimble from '@/images/used-by/trimble.svg';
import tripadvisor from '@/images/used-by/tripadvisor.svg';
import zillow from '@/images/used-by/zillow.svg';

/**
 * Companies whose people signed up to Zephyr with a work email (from the user table, by domain).
 * Logos are one-color silhouettes cropped to their ink, drawn through a CSS mask so they take the
 * site's text color; `ratio` is that cropped width / height.
 */
export type UsedByCompany = {
  name: string;
  logo: string;
  ratio: number;
  /** Optical nudge for logos that read small or large at the shared size. */
  scale?: number;
  /** Slug of a published blog case study with this company; adds the marker and links the cell. */
  caseStudy?: string;
};

export const USED_BY: UsedByCompany[] = [
  { name: 'Netflix', logo: netflix, ratio: 3.7 },
  { name: "Southern Glazer's Wine & Spirits", logo: sgws, ratio: 4.227, scale: 1.4, caseStudy: 'sgws-case-study' },
  { name: 'Agoda', logo: agoda, ratio: 1.963 },
  { name: 'Cloudflare', logo: cloudflare, ratio: 3.027 },
  { name: 'Snap Inc.', logo: snap, ratio: 4.21 },
  { name: 'ByteDance', logo: bytedance, ratio: 5.796 },
  { name: 'Booking.com', logo: booking, ratio: 6.018 },
  { name: 'Intuit', logo: intuit, ratio: 4.973, scale: 0.85 },
  { name: 'Datadog', logo: datadog, ratio: 4.079 },
  { name: 'Dynatrace', logo: dynatrace, ratio: 5.682 },
  { name: 'Tripadvisor', logo: tripadvisor, ratio: 6.539 },
  { name: 'Zillow', logo: zillow, ratio: 4.527 },
  { name: 'Akamai', logo: akamai, ratio: 2.454 },
  { name: 'Electronic Arts', logo: ea, ratio: 2.543 },
  { name: 'Accenture', logo: accenture, ratio: 3.795 },
  { name: 'Carrefour', logo: carrefour, ratio: 5.447, scale: 1.1 },
  { name: 'Capgemini', logo: capgemini, ratio: 4.481 },
  { name: 'lululemon', logo: lululemon, ratio: 1, scale: 0.8 },
  { name: 'Navan', logo: navan, ratio: 4.447, scale: 0.9 },
  { name: 'Callstack', logo: callstack, ratio: 5.03 },
  { name: 'Nx', logo: nx, ratio: 1.608, scale: 0.85 },
  { name: 'Trimble', logo: trimble, ratio: 4.265 },
  { name: 'Redpanda', logo: redpanda, ratio: 5.742 },
  { name: 'Teamworks', logo: teamworks, ratio: 4.003, scale: 1.2 },
  { name: 'Addepar', logo: addepar, ratio: 5.35 },
  { name: 'Questrade', logo: questrade, ratio: 2.149, scale: 1.3 },
  { name: 'LendingClub', logo: lendingclub, ratio: 6.818 },
  { name: 'Globant', logo: globant, ratio: 5.091 },
  { name: 'Makeswift', logo: makeswift, ratio: 5.97 },
  { name: 'Terminal', logo: terminal, ratio: 4.128 },
  { name: 'EnBW', logo: enbw, ratio: 5.692, scale: 0.9 },
  { name: 'Entain', logo: entain, ratio: 3.543, scale: 0.9 },
  { name: 'Rimac Seguros', logo: rimac, ratio: 5.994 },
];
