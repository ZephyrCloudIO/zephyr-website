import { LucideIcon } from 'lucide-react'
import reactUniverse from '@/images/events/react_universe.webp'

export interface EventResource {
  icon?: LucideIcon | string
  text: string
  link: string
  external?: boolean
}

export interface Event {
  title: string
  date: string
  time?: string
  location: string
  timezone?: string
  type: 'conference' | 'webinar' | 'meetup' | 'workshop'
  description: string
  link?: string
  ctaText?: string
  isPast?: boolean
  featured?: boolean
  attendees?: number
  speakers?: string[]
  thumbnail?: string
  resources?: EventResource[]
}

export const upcomingEvents: Event[] = [
  {
    title: "Global Software Architecture Summit",
    date: "October 13-15, 2025",
    time: "2:00 PM",
    location: "Barcelona, Spain",
    timezone: "CET",
    type: "conference",
    description: "Software Architecture and Business Value: Balancing Tradeoffs",
    link: "https://gsas.io/#schedule",
    ctaText: "Reserve Your Spot",
    speakers: ["Nestor Lopez"],
    attendees: 600
  },
  {
    title: "ViteConf Amsterdam",
    date: "October 9-10, 2025",
    location: "Amsterdam, Netherlands",
    timezone: "CET",
    type: "conference",
    description: "The first ever in-person Vite Conference!",
    link: "https://viteconf.amsterdam/",
    attendees: 1000,
    featured: true,
    speakers: ["Zack Chapple", "Dmitriy Shekhovtsov"]
  }
]

export const pastEvents: Event[] = [
  {
    title: "React Universe",
    date: "September 2-4, 2025",
    location: "Wrocław, Poland",
    timezone: "CET",
    type: "conference",
    description: "Explore the tools, techniques, and best practices not to be heard elsewhere.",
    link: "https://ti.to/RUC/react-universe-conf-2025/discount/Zephyr20",
    ctaText: "Get 20% Off Your Tickets",
    isPast: true,
    attendees: 650,
    speakers: ["Zack Chapple"],
    thumbnail: reactUniverse,
    resources: [
      {
        icon: "Video",
        text: "Watch Zack's Talk",
        link: "https://www.youtube.com/live/eU0MGysA8oA?t=20423s",
        external: true
      },
      {
        icon: "Video",
        text: "Watch Panel Discussion",
        link: "https://www.youtube.com/live/eU0MGysA8oA?t=22125s",
        external: true
      }
    ]
  },
  {
    title: "RenderATL",
    date: "June 11-13, 2025",
    location: "Atlanta, GA",
    timezone: "EST",
    isPast: true,
    type: "conference",
    description: "A tech conference & expo unlike anything you've ever seen — a carnival of innovation, code & culture.",
    link: "https://renderatl.com/",
    attendees: 7000,
    speakers: ["Zack Chapple", "Lois Z."]
  },
  {
    title: "Monorepo World",
    date: "October 7, 2024",
    location: "Mountain View, CA",
    timezone: "PST",
    isPast: true,
    type: "conference",
    description: "The conference for monorepos and developer tooling.",
    link: "https://monorepo.world/",
    attendees: 500,
    resources: [
      {
        icon: "Video",
        text: "Watch Recap",
        link: "https://www.youtube.com/live/Z5tg6_eIphc?t=22145s",
        external: true
      }
    ]
  },
  {
    title: "Acceleration Week at SGWS",
    date: "November 18-22, 2024",
    location: "Miami, FL",
    timezone: "EST",
    type: "workshop",
    description: "A transformative week with Southern Glazer's Wine & Spirits, implementing sub-second deployments and revolutionizing their development workflow.",
    isPast: true,
    attendees: 40,
    resources: [
      {
        icon: "FileText",
        text: "Read Case Study",
        link: "/blog/sgws-case-study",
        external: false
      },
      {
        icon: "Video",
        text: "Watch Recap",
        link: "https://www.youtube.com/watch?v=jQD8NwB669c",
        external: true
      }
    ]
  },
  {
    title: "CommitConf",
    date: "October 22-24, 2024",
    location: "Nadrud, Spain",
    timezone: "CET",
    type: "conference",
    description: "Commit is the event where we come together to explore our different ways developing and managing software. Join us for two days of sharing what we have to offer, and take the chance to break from your routine and try something new.",
    isPast: true,
    attendees: 2000,
    speakers: ["Nestor Lopez"],
    link:'https://koliseo.com/commit/commit-conf-2025/agenda/1?selected=XXD505NTl8BKAu0zei6J',
    resources: [
      {
        icon: "Video",
        text: 'Watch Recap',
        external: true,
        link: 'https://www.youtube.com/watch?v=Sv16bA3ISX8&ab_channel=CommitConf'
      }
    ]
  },
  {
    title: "Netlify Compose",
    date: "October 2, 2024",
    location: "San Francisco, CA",
    link:'https://www.netlify.com/compose/',
    timezone: "PST",
    type: "conference",
    description: "A conference highlighting the future of composable and AI software.",
    isPast: true,
    attendees: 600,
    speakers: ["Zack Chapple"],
    resources: [
      {
        icon: "Video",
        text: 'Watch Recap',
        external: true,
        link: 'https://www.netlify.com/compose/2024/akshually-composable-applications-on-netlify/'
      }
    ]
  }
]

export const getFeaturedEvent = () => upcomingEvents.find(e => e.featured)
